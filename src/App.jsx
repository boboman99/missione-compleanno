import { AnimatePresence } from 'framer-motion'
import { useAdventureState } from './hooks/useAdventureState'
import ProgressBar from './components/ProgressBar'
import IntroScreen from './screens/IntroScreen'
import Mission1Screen from './screens/Mission1Screen'
import Mission2Screen from './screens/Mission2Screen'
import Mission3Screen from './screens/Mission3Screen'
import Mission4Screen from './screens/Mission4Screen'
import DayCompleteScreen from './screens/DayCompleteScreen'
import FinaleScreen from './screens/FinaleScreen'

const SCREENS = {
  intro: IntroScreen,
  mission1: Mission1Screen,
  mission2: Mission2Screen,
  mission3: Mission3Screen,
  mission4: Mission4Screen,
  'day-complete': DayCompleteScreen,
  finale: FinaleScreen,
}

const SHOW_PROGRESS = new Set(['mission1', 'mission2', 'mission3', 'mission4', 'day-complete'])

export default function App() {
  const { state, advance, completeMission } = useAdventureState()
  const Screen = SCREENS[state.phase] ?? IntroScreen

  return (
    <>
      {SHOW_PROGRESS.has(state.phase) && (
        <ProgressBar completedCount={state.completedMissions.length} />
      )}
      <AnimatePresence mode="wait">
        <Screen
          key={state.phase}
          state={state}
          advance={advance}
          completeMission={completeMission}
        />
      </AnimatePresence>
    </>
  )
}
