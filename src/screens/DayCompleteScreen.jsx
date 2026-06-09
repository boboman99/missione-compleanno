import { motion } from 'framer-motion'
import AdventureMap from '../components/AdventureMap'

const STARS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${8 + Math.random() * 84}%`,
  y: `${5 + Math.random() * 90}%`,
  dur: `${2.2 + Math.random() * 2}s`,
  del: `${Math.random() * 2.5}s`,
  emoji: ['✦', '✧', '✦', '★', '✦'][i % 5],
}))

export default function DayCompleteScreen({ state, advance }) {
  return (
    <motion.div
      className="dc-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
    >
      {/* Sparkles */}
      <div className="dc-sparkles" aria-hidden>
        {STARS.map(s => (
          <span
            key={s.id}
            className="dc-star"
            style={{
              left: s.x,
              top: s.y,
              '--dur': s.dur,
              '--del': s.del,
              fontSize: 14,
              color: '#D4A853',
            }}
          >
            {s.emoji}
          </span>
        ))}
      </div>

      {/* Map — tutte le missioni completate */}
      <div style={{ width: '100%', maxWidth: 300 }}>
        <AdventureMap completedMissions={[1, 2, 3, 4, 5]} />
      </div>

      <motion.div
        className="dc-chip"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        ✓ Hai vinto — 5/5 missioni
      </motion.div>

      <motion.h2
        className="dc-title"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        Missione completata
      </motion.h2>

      <motion.p
        className="dc-text"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Hai completato tutte le missioni.{'\n'}
        Il tuo regalo di compleanno è sbloccato.{'\n'}
        Torna alla base. Preparati. Stanotte si festeggia.
      </motion.p>

      <motion.button
        className="btn btn-gold"
        style={{ maxWidth: 280 }}
        onClick={() => advance('finale', { dayCompletedAt: new Date().toISOString() })}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        🎁 Scopri il tuo premio
      </motion.button>
    </motion.div>
  )
}
