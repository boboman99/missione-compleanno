import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MissionCard from '../components/MissionCard'
import AdventureMap from '../components/AdventureMap'

const img = name => `${import.meta.env.BASE_URL}images/${name}`

const VILLAGES = [
  { id: 0, label: 'Monterosso', correct: false, src: img('Monterosso.jpg') },
  { id: 1, label: 'Camogli',    correct: false, src: img('Camogli.jpg')    },
  { id: 2, label: 'Tellaro',    correct: true,  src: img('Tellaro.jpg')    },
]

const CLUES = [
  'Non siamo mai stati insieme nella nostra prossima tappa.',
  'La nostra prossima tappa non ha un porticciolo così affollato.',
]

export default function Mission2Screen({ state, completeMission }) {
  const [wrongIds, setWrongIds] = useState(new Set())
  const [correctId, setCorrectId] = useState(null)
  const [cluesShown, setCluesShown] = useState(0)
  const [success, setSuccess] = useState(false)

  function handleVillageClick(v) {
    if (wrongIds.has(v.id) || correctId !== null) return

    if (v.correct) {
      setCorrectId(v.id)
      setSuccess(true)
      setTimeout(() => completeMission(2, 'travel-tellaro'), 1800)
    } else {
      setWrongIds(prev => new Set([...prev, v.id]))
      setCluesShown(prev => Math.min(prev + 1, CLUES.length))
    }
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

        <MissionCard eyebrow="Missione 02" title="Trova il borgo">
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Uno di questi borghi è la nostra prossima tappa. Usa gli indizi per trovarlo.
          </p>

          {/* Village grid */}
          <div className="villages-grid">
            {VILLAGES.map(v => (
              <div
                key={v.id}
                className={`v-card${correctId === v.id ? ' correct' : ''}${wrongIds.has(v.id) ? ' wrong' : ''}`}
                onClick={() => handleVillageClick(v)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && handleVillageClick(v)}
              >
                <img src={v.src} alt={v.label} className="v-photo" />
                <div className="v-badge">{v.label}</div>
                {correctId === v.id && (
                  <div className="v-correct-overlay">✓</div>
                )}
              </div>
            ))}
          </div>

          {/* Clues */}
          <div className="clues-box">
            <AnimatePresence>
              {CLUES.slice(0, cluesShown).map((clue, i) => (
                <motion.div
                  key={i}
                  className="clue-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  🗺 {clue}
                </motion.div>
              ))}
            </AnimatePresence>

            {cluesShown < CLUES.length && !success && (
              <button
                className="btn btn-ghost"
                onClick={() => setCluesShown(prev => Math.min(prev + 1, CLUES.length))}
              >
                💡 Mostra indizio ({cluesShown}/{CLUES.length})
              </button>
            )}
          </div>

          <AnimatePresence>
            {success && (
              <motion.div
                className="success-burst"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="sb-icon">🏘️</span>
                <div className="sb-title">Trovato! Sei brava.</div>
                <div className="sb-sub">In viaggio verso Tellaro...</div>
              </motion.div>
            )}
          </AnimatePresence>
        </MissionCard>
      </div>
    </motion.div>
  )
}
