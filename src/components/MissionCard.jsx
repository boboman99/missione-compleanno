import { motion } from 'framer-motion'

export default function MissionCard({ eyebrow, title, children, done }) {
  return (
    <motion.div
      className={`m-card${done ? ' done' : ''}`}
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      {eyebrow && <div className="mc-eyebrow">{eyebrow}</div>}
      {title && <h2 className="mc-title">{title}</h2>}
      <div className="mc-body">{children}</div>
      {done && (
        <div className="mc-done-badge">
          <span>✓</span> Missione completata
        </div>
      )}
    </motion.div>
  )
}
