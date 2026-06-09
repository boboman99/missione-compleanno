import { useState, useEffect } from 'react'

export default function TypewriterText({ text, speed = 35, onComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(id)
        setDone(true)
        onComplete?.()
      }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return (
    <span className="tw-text">
      {displayed}
      {!done && <span className="tw-cursor">|</span>}
    </span>
  )
}
