import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TypewriterText from '../components/TypewriterText'

export default function IntroScreen({ advance }) {
  const [flapOpen, setFlapOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [twDone, setTwDone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFlapOpen(true), 700)
    const t2 = setTimeout(() => setShowContent(true), 1900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <motion.div
      className="screen intro-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
    >
      <div className="intro-glow" />

      {/* Envelope */}
      <motion.div
        className="env-wrap"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      >
        <svg className="env-svg" viewBox="0 0 110 84" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Envelope body */}
          <rect x="2" y="22" width="106" height="60" rx="5" fill="#1a2a4a" stroke="rgba(212,168,83,0.4)" strokeWidth="1.5" />
          {/* Bottom fold lines */}
          <line x1="2" y1="82" x2="55" y2="50" stroke="rgba(212,168,83,0.2)" strokeWidth="1" />
          <line x1="108" y1="82" x2="55" y2="50" stroke="rgba(212,168,83,0.2)" strokeWidth="1" />
          {/* Heart / seal */}
          <text x="55" y="65" textAnchor="middle" fontSize="22">💌</text>
          {/* Flap (top triangle that opens) */}
          <polygon
            className={`env-flap${flapOpen ? ' open' : ''}`}
            points="2,22 55,55 108,22"
            fill="#243356"
            stroke="rgba(212,168,83,0.4)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="intro-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="intro-tag">Una giornata speciale</div>

            <h1 className="intro-title">
              Missione<br />Compleanno
            </h1>

            <div className="intro-body">
              <TypewriterText
                text="Oggi non conoscerai il programma. Ogni destinazione verrà svelata solo quando sarà il momento."
                speed={38}
                onComplete={() => setTwDone(true)}
              />
            </div>

            <AnimatePresence>
              {twDone && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                >
                  <p className="intro-question">Completa tutte le missioni per sbloccare il tuo regalo di compleanno.</p>
                  <button
                    className="btn btn-gold"
                    onClick={() => advance('mission1')}
                  >
                    ✦ Accetta la sfida
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
