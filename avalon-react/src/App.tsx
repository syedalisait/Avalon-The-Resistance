import { useGameStore } from '@/store/gameStore'
import { PlayerSetup } from '@/components/game/PlayerSetup'
import { RoleReveal } from '@/components/game/RoleReveal'

function App() {
  const { phase } = useGameStore()

  return (
    <>
      {phase === 'setup' && <PlayerSetup />}
      {(phase === 'reveal' || phase === 'complete') && <RoleReveal />}
    </>
  )
}

export default App
