import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MissionCard from '../components/MissionCard'
import AdventureMap from '../components/AdventureMap'

/* ----------------------------------------------------------------
   VILLAGE ILLUSTRATIONS — inline SVG scenes (no external images)
   Replace these with real photos by changing the components below
   to: <img src={`${import.meta.env.BASE_URL}images/village1.jpg`} ... />
   ---------------------------------------------------------------- */

function VillageA() {
  return (
    <svg viewBox="0 0 100 134" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="100" height="134" fill="#0a3a5c" />
      {/* Sky */}
      <rect width="100" height="70" fill="#1a4a7a" />
      {/* Sea */}
      <rect y="70" width="100" height="64" fill="#0d3a5a" />
      {/* Boats */}
      <ellipse cx="25" cy="88" rx="14" ry="5" fill="#c0392b" />
      <rect x="22" y="76" width="2" height="12" fill="#8b0000" />
      <polygon points="22,76 32,82 22,82" fill="#e74c3c" />
      <ellipse cx="68" cy="95" rx="12" ry="4" fill="#e74c3c" />
      <rect x="65" y="84" width="2" height="11" fill="#c0392b" />
      {/* Houses */}
      <rect x="5" y="45" width="18" height="28" fill="#e8dcc8" />
      <polygon points="5,45 14,34 23,45" fill="#c44" />
      <rect x="28" y="38" width="22" height="35" fill="#d5c9b4" />
      <polygon points="28,38 39,26 50,38" fill="#a33" />
      <rect x="55" y="50" width="16" height="23" fill="#e0d4be" />
      <polygon points="55,50 63,41 71,50" fill="#b44" />
      {/* Windows */}
      <rect x="9" y="52" width="4" height="4" fill="#5a8fb0" opacity="0.8" />
      <rect x="15" y="52" width="4" height="4" fill="#5a8fb0" opacity="0.8" />
      <rect x="34" y="46" width="4" height="5" fill="#5a8fb0" opacity="0.8" />
      <rect x="42" y="46" width="4" height="5" fill="#5a8fb0" opacity="0.8" />
      {/* Water ripples */}
      <path d="M 5 108 Q 15 105 25 108 Q 35 111 45 108" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
      <path d="M 50 116 Q 62 113 74 116" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
    </svg>
  )
}

function VillageB() {
  return (
    <svg viewBox="0 0 100 134" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Warm earthy tones */}
      <rect width="100" height="134" fill="#2c1810" />
      {/* Sky */}
      <rect width="100" height="60" fill="#4a3525" />
      {/* Ground */}
      <rect y="60" width="100" height="74" fill="#3a2515" />
      {/* Stone path */}
      <ellipse cx="50" cy="120" rx="28" ry="8" fill="#5a4530" />
      {/* Arch */}
      <rect x="30" y="30" width="40" height="50" fill="#8b7050" />
      <path d="M 30,55 Q 50,30 70,55" fill="#6a5040" />
      {/* Arch opening */}
      <rect x="38" y="50" width="24" height="30" fill="#1a1008" />
      <path d="M 38,65 Q 50,42 62,65" fill="#1a1008" />
      {/* Windows */}
      <rect x="15" y="40" width="12" height="14" rx="2" fill="#c4a870" />
      <path d="M 15,47 Q 21,38 27,47" fill="#a08050" />
      <rect x="72" y="38" width="12" height="14" rx="2" fill="#c4a870" />
      <path d="M 72,45 Q 78,36 84,45" fill="#a08050" />
      {/* Dog silhouette */}
      <g transform="translate(44, 92)">
        <ellipse cx="6" cy="5" rx="8" ry="5" fill="#1a0e08" />
        <circle cx="14" cy="2" r="4" fill="#1a0e08" />
        {/* Ears */}
        <ellipse cx="12" cy="-1" rx="2" ry="3" fill="#1a0e08" transform="rotate(-20 12 -1)" />
        <ellipse cx="16" cy="-1" rx="2" ry="3" fill="#1a0e08" transform="rotate(20 16 -1)" />
        {/* Legs */}
        <rect x="0" y="8" width="3" height="7" rx="1" fill="#1a0e08" />
        <rect x="5" y="8" width="3" height="7" rx="1" fill="#1a0e08" />
        <rect x="10" y="8" width="3" height="6" rx="1" fill="#1a0e08" />
        <rect x="15" y="8" width="2" height="6" rx="1" fill="#1a0e08" />
        {/* Tail */}
        <path d="M -2,4 Q -8,0 -7,5" stroke="#1a0e08" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Eye */}
        <circle cx="14.5" cy="1.5" r="0.8" fill="#fff" />
      </g>
      {/* Cobblestones */}
      {[40,52,63,45,58,70].map((x,i) => (
        <ellipse key={i} cx={x} cy={113 + (i%2)*5} rx="5" ry="3" fill="#4a3525" stroke="#3a2515" strokeWidth="0.5" />
      ))}
    </svg>
  )
}

function VillageC() {
  // Tellaro — case quasi sull'acqua, molto mare visibile
  return (
    <svg viewBox="0 0 100 134" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Deep turquoise sea dominates */}
      <rect width="100" height="134" fill="#0a2a3a" />
      <rect width="100" height="45" fill="#1a4a6a" />
      {/* Sea fills most of the image */}
      <rect y="45" width="100" height="89" fill="#0d3d5a" />
      {/* Crystal water reflections */}
      <path d="M 0,70 Q 20,65 40,70 Q 60,75 80,70 Q 90,67 100,70" fill="none" stroke="rgba(100,200,230,0.2)" strokeWidth="1.5" />
      <path d="M 0,82 Q 25,78 50,82 Q 75,86 100,82" fill="none" stroke="rgba(100,200,230,0.15)" strokeWidth="1" />
      <path d="M 0,95 Q 30,91 60,95 Q 80,98 100,95" fill="none" stroke="rgba(100,200,230,0.12)" strokeWidth="1" />
      {/* Houses right at the water's edge */}
      <rect x="2" y="28" width="15" height="22" fill="#e8e0d0" />
      <polygon points="2,28 9,19 17,28" fill="#c44" />
      <rect x="19" y="22" width="18" height="28" fill="#e0d8c8" />
      <polygon points="19,22 28,12 37,22" fill="#b43" />
      <rect x="39" y="26" width="14" height="24" fill="#eed8b8" />
      <polygon points="39,26 46,17 53,26" fill="#d44" />
      <rect x="55" y="30" width="16" height="20" fill="#e4dcc8" />
      <polygon points="55,30 63,21 71,30" fill="#a33" />
      <rect x="73" y="33" width="14" height="17" fill="#ddd4bc" />
      <polygon points="73,33 80,25 87,33" fill="#b44" />
      {/* Church tower */}
      <rect x="43" y="10" width="7" height="18" fill="#e8e0d0" />
      <polygon points="43,10 46,5 50,10" fill="#c44" />
      {/* Windows */}
      <rect x="6" y="33" width="4" height="4" fill="#7ab0d0" opacity="0.9" />
      <rect x="23" y="28" width="4" height="5" fill="#7ab0d0" opacity="0.9" />
      <rect x="30" y="28" width="4" height="5" fill="#7ab0d0" opacity="0.9" />
      <rect x="43" y="32" width="3" height="4" fill="#7ab0d0" opacity="0.9" />
      {/* Water at base of houses */}
      <path d="M 0 50 Q 10 47 20 50 Q 30 53 40 50 Q 55 47 70 50 Q 85 53 100 50 L 100 55 L 0 55 Z" fill="#0d3d5a" />
      {/* Sunlight on water */}
      <path d="M 55,75 L 70,65 L 72,66 L 57,76 Z" fill="rgba(255,220,100,0.08)" />
      <path d="M 50,90 L 70,78 L 72,80 L 52,92 Z" fill="rgba(255,220,100,0.06)" />
    </svg>
  )
}

const VILLAGES = [
  { id: 0, label: 'Borgo A', correct: false, Component: VillageA },
  { id: 1, label: 'Borgo B', correct: false, Component: VillageB },
  { id: 2, label: 'Borgo C', correct: true,  Component: VillageC },
]

const CLUES = [
  'La nostra destinazione non ha le barche rosse.',
  'La nostra destinazione non ha il cane.',
  'La nostra destinazione è quella più vicina al mare.',
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
      // Auto-reveal next clue when wrong answer
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
                <v.Component />
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
