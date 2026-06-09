import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MissionCard from '../components/MissionCard'
import AdventureMap from '../components/AdventureMap'
import TypewriterText from '../components/TypewriterText'

const RIDDLE = 'C\'è qualcuno che oggi ha studiato ogni dettaglio del percorso: le strade, i posti, le tappe. Tu devi soltanto goderti il panorama dal sellino. Fidati della tua guida. Dove andiamo per colazione?'

export default function Mission1Screen({ state, completeMission }) {
  const [answer, setAnswer] = useState('')
  const [shake, setShake] = useState(false)
  const [showErr, setShowErr] = useState(false)
  const [twDone, setTwDone] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (answer.toLowerCase().trim() === 'aurea') {
      setSuccess(true)
      setTimeout(() => completeMission(1, 'mission2'), 1800)
    } else {
      setShake(true)
      setShowErr(true)
      setTimeout(() => { setShake(false); setShowErr(false) }, 2200)
    }
  }

  const screenVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -40 },
  }

  return (
    <motion.div className="screen" variants={screenVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.38 }}>
      <div className="screen-inner">
        <AdventureMap completedMissions={state.completedMissions} />

        <MissionCard eyebrow="Missione 01" title="La prima tappa">
          <div className="riddle">
            <TypewriterText
              text={RIDDLE}
              speed={28}
              onComplete={() => setTwDone(true)}
            />
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                className="success-burst"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className="sb-icon">☕</span>
                <div className="sb-title">Esatto! Si parte!</div>
                <div className="sb-sub">Prima tappa: Aurea, Massa</div>
              </motion.div>
            ) : twDone ? (
              <motion.form
                key="form"
                className="answer-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <input
                  type="text"
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  placeholder="Scrivi il nome del locale..."
                  className={`answer-input${shake ? ' shake' : ''}`}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
                {showErr && <div className="err-hint">Pensa... è il nome del locale ☕</div>}
                <button type="submit" className="btn btn-gold">Conferma</button>
              </motion.form>
            ) : null}
          </AnimatePresence>
        </MissionCard>
      </div>
    </motion.div>
  )
}
