import { motion } from 'framer-motion'
import AdventureMap from '../components/AdventureMap'

// Midpoint coordinates for "en route" scooter position
const HALFWAY = {
  1: { x: 123, y: 172 }, // Massa → Tellaro
  2: { x: 171, y: 243 }, // Tellaro → Fiascherino
  3: { x: 198, y: 297 }, // Fiascherino → Lerici
}

export default function TravelScreen({ config, state, advance }) {
  const { mode, fromIdx, msg, btn, next } = config
  const scooterOverride = mode === 'travel' ? HALFWAY[fromIdx] : null

  return (
    <motion.div
      className="travel-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div style={{ width: '100%', maxWidth: 300 }}>
        <AdventureMap
          completedMissions={state.completedMissions}
          scooterOverride={scooterOverride}
        />
      </div>

      <motion.div
        className="ts-icon"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        {mode === 'travel' ? '🛵' : '📍'}
      </motion.div>

      <motion.p
        className="ts-message"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38 }}
      >
        {msg.split('\n').map((line, i) => (
          <span key={i}>{line}{i < msg.split('\n').length - 1 && <br />}</span>
        ))}
      </motion.p>

      <motion.button
        className="btn btn-gold"
        style={{ maxWidth: 280 }}
        onClick={() => advance(next)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.52 }}
      >
        {btn}
      </motion.button>
    </motion.div>
  )
}
