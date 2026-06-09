import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MissionCard from '../components/MissionCard'
import AdventureMap from '../components/AdventureMap'
import TypewriterText from '../components/TypewriterText'

const RIDDLE = 'Hai nuotato. Hai riposato al sole. Il pomeriggio scende verso sera. La giornata non è ancora finita — c\'è ancora qualcosa che ti aspetta, qualcosa che si assapora lentamente. Come si chiama l\'ultimo pasto della giornata?'

const VALID = new Set(['cena', 'cena a sorpresa', 'cenare', 'ristorante', 'sorpresa', 'regalo', 'cena!'])

export default function Mission4Screen({ state, completeMission }) {
  const [answer, setAnswer] = useState('')
  const [shake, setShake] = useState(false)
  const [showErr, setShowErr] = useState(false)
  const [twDone, setTwDone] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (VALID.has(answer.toLowerCase().trim())) {
      setSuccess(true)
      setTimeout(() => completeMission(4, 'travel-lerici'), 1800)
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

        <MissionCard eyebrow="Missione 04" title="L'ultimo segreto">
          <div className="riddle">
            <TypewriterText
              text={RIDDLE}
              speed={30}
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
                <span className="sb-icon">🌅</span>
                <div className="sb-title">Hai capito.</div>
                <div className="sb-sub">Il tuo regalo di compleanno ti aspetta stasera</div>
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
                  placeholder="La risposta è..."
                  className={`answer-input${shake ? ' shake' : ''}`}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
                {showErr && <div className="err-hint">Pensa all'ultimo pasto della giornata 🌙</div>}
                <button type="submit" className="btn btn-gold">Conferma</button>
              </motion.form>
            ) : null}
          </AnimatePresence>
        </MissionCard>
      </div>
    </motion.div>
  )
}
