import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MissionCard from '../components/MissionCard'
import AdventureMap from '../components/AdventureMap'

/* ── Illustrazioni SVG dei borghi ── */

function IllLerici() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="80" height="80" fill="#0a2a45" />
      {/* mare */}
      <rect y="52" width="80" height="28" fill="#0d3d5a" />
      <path d="M0,52 Q20,48 40,52 Q60,56 80,52 L80,56 L0,56Z" fill="#0c4a6e" />
      {/* cielo */}
      <rect width="80" height="52" fill="#1a3a5c" />
      {/* colline */}
      <path d="M0,50 Q15,32 30,38 Q40,42 50,35 Q62,28 80,40 L80,52 L0,52Z" fill="#1a2a18" />
      {/* castello */}
      <rect x="24" y="22" width="18" height="18" fill="#c4a870" />
      <rect x="22" y="20" width="4" height="6" fill="#c4a870" />
      <rect x="28" y="20" width="4" height="4" fill="#c4a870" />
      <rect x="34" y="20" width="4" height="6" fill="#c4a870" />
      <rect x="28" y="26" width="5" height="8" fill="#0a2a45" />
      {/* finestre */}
      <rect x="24" y="26" width="3" height="3" fill="#fbbf24" opacity="0.8" />
      <rect x="35" y="26" width="3" height="3" fill="#fbbf24" opacity="0.8" />
      {/* riflesso mare */}
      <path d="M20,60 Q30,58 40,60" stroke="rgba(255,220,100,0.2)" strokeWidth="1" fill="none" />
      <path d="M35,66 Q45,64 55,66" stroke="rgba(255,220,100,0.15)" strokeWidth="1" fill="none" />
      {/* nome */}
      <text x="40" y="76" textAnchor="middle" fontSize="7" fill="#D4A853" fontFamily="Georgia,serif" fontStyle="italic">Lerici</text>
    </svg>
  )
}

function IllVernazza() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="80" height="80" fill="#0c3050" />
      {/* mare */}
      <rect y="55" width="80" height="25" fill="#0e4a70" />
      {/* cielo */}
      <rect width="80" height="55" fill="#1e4a78" />
      {/* case colorate a scalare */}
      <rect x="5"  y="35" width="10" height="22" fill="#e85d3a" />
      <rect x="17" y="28" width="11" height="29" fill="#f5c542" />
      <rect x="30" y="32" width="10" height="25" fill="#5cb85c" />
      <rect x="42" y="26" width="12" height="31" fill="#e8a84a" />
      <rect x="56" y="36" width="10" height="21" fill="#e05060" />
      {/* tetti */}
      <polygon points="5,35 10,27 15,35"  fill="#a83020" />
      <polygon points="17,28 22,19 28,28" fill="#b09020" />
      <polygon points="30,32 35,23 40,32" fill="#2a8a2a" />
      <polygon points="42,26 48,16 54,26" fill="#b07020" />
      <polygon points="56,36 61,28 66,36" fill="#a02030" />
      {/* torre */}
      <rect x="34" y="10" width="7" height="23" fill="#d4c090" />
      <rect x="33" y="8"  width="9" height="5"  fill="#c4b080" />
      {/* finestre piccole */}
      {[7,19,32,44,58].map((x,i) => (
        <rect key={i} x={x+2} y={42} width="3" height="4" fill="rgba(255,240,180,0.7)" />
      ))}
      <text x="40" y="76" textAnchor="middle" fontSize="7" fill="#fbbf24" fontFamily="Georgia,serif" fontStyle="italic">Vernazza</text>
    </svg>
  )
}

function IllPortovenere() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="80" height="80" fill="#0a1e30" />
      {/* mare */}
      <rect y="54" width="80" height="26" fill="#0d3a5a" />
      <path d="M0,54 Q20,50 40,54 Q60,58 80,54 L80,58 L0,58Z" fill="#0c4060" />
      {/* cielo */}
      <rect width="80" height="54" fill="#162a44" />
      {/* promontorio */}
      <path d="M0,54 Q10,44 20,48 Q30,52 40,45 Q50,38 60,42 Q70,46 80,54Z" fill="#1c2c18" />
      {/* chiesa San Pietro — strisce bianche/nere */}
      <rect x="25" y="18" width="20" height="28" fill="#f0f0f0" />
      <rect x="25" y="22" width="20" height="4" fill="#222" />
      <rect x="25" y="30" width="20" height="4" fill="#222" />
      <rect x="25" y="38" width="20" height="4" fill="#222" />
      {/* abside rotonda */}
      <path d="M25,46 Q35,52 45,46" fill="#e8e8e8" stroke="#222" strokeWidth="1.5" />
      {/* campanile */}
      <rect x="44" y="10" width="8" height="22" fill="#f0f0f0" />
      <rect x="43" y="22" width="10" height="3" fill="#222" />
      <rect x="43" y="30" width="10" height="3" fill="#222" />
      <polygon points="44,10 48,4 52,10" fill="#c0c0c0" />
      {/* finestra a rosa */}
      <circle cx="35" cy="24" r="3" fill="none" stroke="#222" strokeWidth="1" />
      <circle cx="35" cy="24" r="1" fill="#aad4f5" />
      <text x="40" y="76" textAnchor="middle" fontSize="6.5" fill="#94A3B8" fontFamily="Georgia,serif" fontStyle="italic">Portovenere</text>
    </svg>
  )
}

const BOROUGHS = {
  lerici:      { label: 'Lerici',      Ill: IllLerici      },
  vernazza:    { label: 'Vernazza',    Ill: IllVernazza    },
  portovenere: { label: 'Portovenere', Ill: IllPortovenere },
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const GRID_ITEMS = ['lerici','lerici','lerici','lerici','lerici','vernazza','vernazza','portovenere','portovenere']
const WIN_COUNT = 3

export default function Mission4Screen({ state, completeMission }) {
  const [grid] = useState(() => shuffle(GRID_ITEMS))
  const [revealed, setRevealed] = useState(new Set())
  const [won, setWon] = useState(false)

  function handleReveal(idx) {
    if (revealed.has(idx) || won) return
    const next = new Set([...revealed, idx])
    setRevealed(next)
    const lericCount = [...next].filter(i => grid[i] === 'lerici').length
    if (lericCount >= WIN_COUNT) {
      setWon(true)
      setTimeout(() => completeMission(4, 'travel-lerici'), 2200)
    }
  }

  const lericFound = [...revealed].filter(i => grid[i] === 'lerici').length
  const sv = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -40 },
  }

  return (
    <motion.div className="screen" variants={sv} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.38 }}>
      <div className="screen-inner">
        <AdventureMap completedMissions={state.completedMissions} />

        <MissionCard eyebrow="Missione 04" title="Gratta e vinci">
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Tocca le tessere per scoprirle. Trova 3 immagini uguali per scoprire la tua prossima destinazione.
          </p>

          {/* Contatore Lerici */}
          <div className="sc-counter">
            {Array.from({ length: WIN_COUNT }).map((_, i) => (
              <span key={i} className={`sc-star${i < lericFound ? ' found' : ''}`}>★</span>
            ))}
            <span className="sc-counter-label">{lericFound}/{WIN_COUNT}</span>
          </div>

          {/* Griglia 3×3 */}
          <div className="sc-grid">
            {grid.map((borough, idx) => {
              const isRevealed = revealed.has(idx)
              const isWinning = isRevealed && borough === 'lerici'
              const { Ill } = BOROUGHS[borough]
              return (
                <div
                  key={idx}
                  className={`sc-cell${isRevealed ? ' revealed' : ''}${isWinning && won ? ' winning' : ''}`}
                  onClick={() => handleReveal(idx)}
                >
                  <div className="sc-front">
                    <span className="sc-front-icon">?</span>
                  </div>
                  <div className="sc-back">
                    <Ill />
                  </div>
                </div>
              )
            })}
          </div>

          <AnimatePresence>
            {won && (
              <motion.div
                className="success-burst"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="sb-icon">🎰</span>
                <div className="sb-title">Hai vinto!</div>
                <div className="sb-sub">La prossima tappa è Lerici</div>
              </motion.div>
            )}
          </AnimatePresence>
        </MissionCard>
      </div>
    </motion.div>
  )
}
