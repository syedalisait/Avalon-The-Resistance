import { useGameStore } from '@/store/gameStore'
import { HomePage } from '@/components/game/HomePage'
import { GameModeSelection } from '@/components/game/GameModeSelection'
import { PlayerCountSelection } from '@/components/game/PlayerCountSelection'
import { PlayerSetup } from '@/components/game/PlayerSetup'
import { RoleReveal } from '@/components/game/RoleReveal'

function App() {
  const { phase } = useGameStore()

  return (
    <>
      {phase === 'home' && <HomePage />}
      {phase === 'mode-selection' && <GameModeSelection />}
      {phase === 'player-count' && <PlayerCountSelection />}
      {phase === 'setup' && <PlayerSetup />}
      {(phase === 'reveal' || phase === 'complete') && <RoleReveal />}
    </>
  )
}

export default App
