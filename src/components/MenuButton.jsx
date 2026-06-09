import { useState, useRef, useEffect } from 'react'

export default function MenuButton({ onReset }) {
  const [open, setOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const ref = useRef()

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setConfirm(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('touchstart', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }
  }, [])

  function handleResetClick() {
    setConfirm(true)
  }

  function handleConfirm() {
    setOpen(false)
    setConfirm(false)
    onReset()
  }

  function handleCancel() {
    setConfirm(false)
    setOpen(false)
  }

  return (
    <div className="menu-wrap" ref={ref}>
      <button
        className="menu-btn"
        onClick={() => { setOpen(o => !o); setConfirm(false) }}
        aria-label="Menu"
      >
        ⋮
      </button>

      {open && (
        <div className="menu-dropdown">
          {!confirm ? (
            <button className="menu-item" onClick={handleResetClick}>
              ↺ Ricomincia dall'inizio
            </button>
          ) : (
            <div className="menu-confirm">
              <p className="menu-confirm-text">Perderai tutti i progressi.</p>
              <div className="menu-confirm-btns">
                <button className="btn-micro btn-micro-ghost" onClick={handleCancel}>Annulla</button>
                <button className="btn-micro btn-micro-danger" onClick={handleConfirm}>Conferma</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
