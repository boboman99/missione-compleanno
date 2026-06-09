import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

// ══════════════════════════════════════════════════════════
//  IMPORTANTE: inserisci qui il vero ristorante prima del
//  deploy. Cerca "CAMBIA QUI" in questo file.
// ══════════════════════════════════════════════════════════
const VENUE = {
  name: '★ Da inserire ★',           // CAMBIA QUI — es: 'Ristorante Il Frantoio'
  detail: 'La cena di compleanno',    // CAMBIA QUI — es: 'Via Roma 12, Lerici'
}

const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: `${Math.random() * 100}%`,
  y: `${Math.random() * 100}%`,
  size: 1 + Math.random() * 2.5,
  dur: `${3 + Math.random() * 5}s`,
  del: `${Math.random() * 4}s`,
}))

const stagger = (i) => ({ delay: 0.15 + i * 0.18 })

export default function FinaleScreen({ state }) {
  useEffect(() => {
    const fire = (particleRatio, opts) => {
      confetti(Object.assign({}, {
        particleCount: Math.floor(200 * particleRatio),
        origin: { y: 0.6 },
        colors: ['#D4A853', '#E8C67A', '#E8B4C8', '#F8F5F0', '#ffffff'],
      }, opts))
    }

    const t = setTimeout(() => {
      fire(0.25, { spread: 26, startVelocity: 55 })
      fire(0.20, { spread: 60 })
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
      fire(0.10, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
      fire(0.10, { spread: 120, startVelocity: 45 })
    }, 400)

    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      className="finale-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Stars background */}
      <div className="finale-stars" aria-hidden>
        {STARS.map(s => (
          <span
            key={s.id}
            className="fin-star"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              '--dur': s.dur,
              '--del': s.del,
            }}
          />
        ))}
      </div>

      <motion.div className="fin-tag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={stagger(0)}>
        Gran Finale
      </motion.div>

      <motion.h1 className="fin-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={stagger(1)}>
        Buon Compleanno
      </motion.h1>

      <motion.p className="fin-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={stagger(2)}>
        L'avventura di oggi era solo l'inizio
      </motion.p>

      <div className="fin-divider" />

      {/* Restaurant reveal */}
      <motion.div
        className="fin-reveal-card"
        initial={{ opacity: 0, scale: 0.92, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...stagger(3), duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="fin-where">Questa sera ci aspetta</div>
        <div className="fin-restaurant">{VENUE.name}</div>
        <div className="fin-detail">{VENUE.detail}</div>
      </motion.div>

      {/* Polaroid photo from Mission 4 */}
      {state.photo && (
        <motion.div
          className="polaroid"
          initial={{ opacity: 0, rotate: -5, y: 20 }}
          animate={{ opacity: 1, rotate: -2.5, y: 0 }}
          transition={stagger(4)}
        >
          <img src={state.photo} alt="Il tuo momento preferito" className="polaroid-img" />
          <div className="polaroid-cap">Il tuo momento preferito ♡</div>
        </motion.div>
      )}

      <motion.span
        className="fin-heart"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...stagger(5), type: 'spring', stiffness: 200 }}
      >
        ♡
      </motion.span>
    </motion.div>
  )
}
