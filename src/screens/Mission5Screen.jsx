import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MissionCard from '../components/MissionCard'
import AdventureMap from '../components/AdventureMap'

async function compressImage(dataUrl) {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      const MAX = 800
      const ratio = Math.min(1, MAX / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width  = Math.round(img.width  * ratio)
      canvas.height = Math.round(img.height * ratio)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', 0.72))
    }
    img.onerror = () => resolve(dataUrl)
    img.src = dataUrl
  })
}

export default function Mission5Screen({ state, completeMission }) {
  const [preview, setPreview] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef()

  async function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)
    const reader = new FileReader()
    reader.onload = async ev => {
      const compressed = await compressImage(ev.target.result)
      setPreview(compressed)
      setLoading(false)
    }
    reader.readAsDataURL(file)
  }

  function handleConfirm() {
    setConfirmed(true)
    setTimeout(() => completeMission(5, 'day-complete', { photo: preview }), 1800)
  }

  function handleRetry() {
    setPreview(null)
    inputRef.current.value = ''
  }

  const sv = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -40 },
  }

  return (
    <motion.div className="screen" variants={sv} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.38 }}>
      <div className="screen-inner">
        <AdventureMap completedMissions={state.completedMissions} />

        <MissionCard eyebrow="Missione 05" title="Esploratore di Lerici">
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>
            Siamo a Lerici. Guarda intorno a te — il castello, il porto, un vicolo, il mare.
            Fotografa la cosa che ti piace di più. Qualsiasi cosa. Questa sarà la tua.
          </p>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.div
                key="done"
                className="success-burst"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="sb-icon">📸</span>
                <div className="sb-title">Perfetto. È tua.</div>
                <div className="sb-sub">Conserverai questo ricordo per sempre</div>
              </motion.div>
            ) : preview ? (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <div style={{ borderRadius: 12, overflow: 'hidden' }}>
                  <img src={preview} alt="La tua foto" className="photo-preview-img" />
                </div>
                <p className="photo-confirm-q">
                  È davvero questa la cosa<br />che ti è piaciuta di più?
                </p>
                <div className="photo-btns">
                  <button className="btn btn-gold" onClick={handleConfirm}>
                    ✓ Sì, è perfetta
                  </button>
                  <button className="btn btn-outline" onClick={handleRetry}>
                    Riprovo
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button
                  className="photo-trigger"
                  onClick={() => inputRef.current.click()}
                  disabled={loading}
                >
                  <span className="pt-icon">{loading ? '⏳' : '📷'}</span>
                  <div className="pt-text">
                    {loading ? 'Elaborazione...' : 'Scatta una foto'}
                  </div>
                  <div className="pt-sub">Tocca per aprire la fotocamera</div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </MissionCard>
      </div>
    </motion.div>
  )
}
