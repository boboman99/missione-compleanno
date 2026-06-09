import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MissionCard from '../components/MissionCard'
import AdventureMap from '../components/AdventureMap'
import TypewriterText from '../components/TypewriterText'

const RIDDLE = 'Il sole è alto. Il mare è davanti a te. Le gambe riposano. Il cuore è leggero. E lo stomaco… fa rumore. Cosa sta per arrivare?'

const VALID = new Set(['pranzo', 'pappa', 'cibo', 'mangiare', 'pranzare', 'fame', 'mangio'])

export default function Mission3Screen({ state, completeMission }) {
  const [answer, setAnswer] = useState('')
  const [shake, setShake] = useState(false)
  const [showErr, setShowErr] = useState(false)
  const [twDone, setTwDone] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (VALID.has(answer.toLowerCase().trim())) {
      setSuccess(true)
      setTimeout(() => completeMission(3, 'mission4'), 1800)
    } else {
      setShake(true)
      setShowErr(true)
      setTimeout(() => { setShake(false); setShowErr(false) }, 2200)
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

        <MissionCard eyebrow="Missione 03" title="L'ora della pappa">
          <div className="riddle">
            <TypewriterText
              text={RIDDLE}
              speed={32}
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
                <span className="sb-icon">🍝</span>
                <div className="sb-title">Hai fame? Bene.</div>
                <div className="sb-sub">Prossima tappa: Fiascherino</div>
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
                  placeholder="Cosa sta arrivando...?"
                  className={`answer-input${shake ? ' shake' : ''}`}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
                {showErr && <div className="err-hint">Pensa allo stomaco che borbotta 🍴</div>}
                <button type="submit" className="btn btn-gold">Conferma</button>
              </motion.form>
            ) : null}
          </AnimatePresence>
        </MissionCard>
      </div>
    </motion.div>
  )
}
