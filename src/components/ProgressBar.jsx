import { motion } from 'framer-motion'

const LABELS = ['', 'Missione 1 completata', 'Missione 2 completata', 'Missione 3 completata', 'Missione 4 completata', 'Avventura completata!']

export default function ProgressBar({ completedCount }) {
  const pct = (completedCount / 5) * 100

  return (
    <div className="progress-bar">
      <div className="pb-track">
        <motion.div
          className="pb-fill"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        {[20, 40, 60, 80, 100].map((tick) => (
          <div
            key={tick}
            className={`pb-tick${pct >= tick ? ' on' : ''}`}
            style={{ left: `${tick}%` }}
          />
        ))}
      </div>
      <div className="pb-label">
        {LABELS[completedCount] || 'Missione in corso...'}
      </div>
    </div>
  )
}
