import { useState, useCallback } from 'react'

const KEY = 'missione-compleanno'

const DEFAULT = {
  phase: 'intro',
  completedMissions: [],
  dayCompletedAt: null,
  photo: null,
}

function load() {
  // dev reset: open the app with #reset in the URL
  if (typeof window !== 'undefined' && window.location.hash === '#reset') {
    localStorage.removeItem(KEY)
    history.replaceState(null, '', window.location.pathname)
    return null
  }
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // localStorage full or unavailable — silently continue
  }
}

export function useAdventureState() {
  const [state, setState] = useState(() => load() ?? DEFAULT)

  const advance = useCallback((nextPhase, extras = {}) => {
    setState(prev => {
      const next = { ...prev, phase: nextPhase, ...extras }
      save(next)
      return next
    })
  }, [])

  const completeMission = useCallback((n, nextPhase, extras = {}) => {
    setState(prev => {
      const next = {
        ...prev,
        phase: nextPhase,
        completedMissions: [...new Set([...prev.completedMissions, n])],
        ...extras,
      }
      save(next)
      return next
    })
  }, [])

  return { state, advance, completeMission }
}
