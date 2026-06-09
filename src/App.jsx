import { AnimatePresence } from 'framer-motion'
import { useAdventureState } from './hooks/useAdventureState'
import ProgressBar from './components/ProgressBar'
import MenuButton from './components/MenuButton'
import TravelScreen from './screens/TravelScreen'
import IntroScreen from './screens/IntroScreen'
import Mission1Screen from './screens/Mission1Screen'
import Mission2Screen from './screens/Mission2Screen'
import Mission3Screen from './screens/Mission3Screen'
import Mission4Screen from './screens/Mission4Screen'
import Mission5Screen from './screens/Mission5Screen'
import DayCompleteScreen from './screens/DayCompleteScreen'
import FinaleScreen from './screens/FinaleScreen'

const SCREENS = {
  intro: IntroScreen,
  mission1: Mission1Screen,
  mission2: Mission2Screen,
  mission3: Mission3Screen,
  mission4: Mission4Screen,
  mission5: Mission5Screen,
  'day-complete': DayCompleteScreen,
  finale: FinaleScreen,
}

const TRAVEL_CONFIGS = {
  'travel-tellaro':     { fromIdx: 1, toIdx: 2, mode: 'travel', msg: 'Metti in moto!\nPremi quando sei arrivata a Tellaro.',                                                           btn: 'Sono arrivata! 🛵', next: 'arrive-tellaro'    },
  'arrive-tellaro':     { fromIdx: 1, toIdx: 2, mode: 'arrive', msg: 'Benvenuta a Tellaro!\nGoditi il borgo, i vicoli, la chiesa sul mare.\nPremi continua quando sei pronta.',         btn: 'Continua →',        next: 'mission3'           },
  'travel-fiascherino': { fromIdx: 2, toIdx: 3, mode: 'travel', msg: 'Prossima fermata: Fiascherino.\nPremi quando sei arrivata!',                                                     btn: 'Sono arrivata! 🛵', next: 'arrive-fiascherino' },
  'arrive-fiascherino': { fromIdx: 2, toIdx: 3, mode: 'arrive', msg: 'Eccola, Fiascherino!\nOra mangia qualcosa di buono. Fai il bagno. Rilassati.\nPremi quando hai finito.',          btn: 'Fatto, si riparte! →', next: 'mission4'         },
  'travel-lerici':      { fromIdx: 3, toIdx: 4, mode: 'travel', msg: 'Ultima tappa: Lerici.\nPremi quando sei arrivata!',                                                              btn: 'Sono arrivata! 🛵', next: 'arrive-lerici'      },
  'arrive-lerici':      { fromIdx: 3, toIdx: 4, mode: 'arrive', msg: 'Lerici.\nIl castello, il porto, il tramonto sulla baia.\nTi aspetta l\'ultima sfida per sbloccare il tuo regalo.', btn: 'Mostrami la sfida →', next: 'mission5'         },
}

const SHOW_PROGRESS = new Set([
  'mission1', 'mission2', 'mission3', 'mission4', 'mission5',
  'travel-tellaro', 'arrive-tellaro',
  'travel-fiascherino', 'arrive-fiascherino',
  'travel-lerici', 'arrive-lerici',
  'day-complete',
])

const HIDE_MENU = new Set(['finale'])

export default function App() {
  const { state, advance, completeMission, reset } = useAdventureState()

  const travelConfig = TRAVEL_CONFIGS[state.phase]
  const Screen = travelConfig ? TravelScreen : (SCREENS[state.phase] ?? IntroScreen)

  return (
    <>
      {SHOW_PROGRESS.has(state.phase) && (
        <ProgressBar completedCount={state.completedMissions.length} />
      )}
      {!HIDE_MENU.has(state.phase) && (
        <MenuButton onReset={reset} />
      )}
      <AnimatePresence mode="wait">
        {travelConfig ? (
          <TravelScreen
            key={state.phase}
            config={travelConfig}
            state={state}
            advance={advance}
          />
        ) : (
          <Screen
            key={state.phase}
            state={state}
            advance={advance}
            completeMission={completeMission}
          />
        )}
      </AnimatePresence>
    </>
  )
}
