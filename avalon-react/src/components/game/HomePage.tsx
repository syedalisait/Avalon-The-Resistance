// Home Page - Landing screen for Avalon game

import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function HomePage() {
  const { setPhase } = useGameStore();

  const handlePlayGame = () => {
    setPhase('mode-selection');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">⚔️🛡️🧙</div>
          <h1 className="text-5xl sm:text-6xl font-bold text-text-primary">
            Avalon
          </h1>
          <h2 className="text-2xl sm:text-3xl text-text-secondary">
            The Resistance
          </h2>
        </div>

        {/* Description Card */}
        <Card className="bg-bg-secondary border-border">
          <CardContent className="pt-6 space-y-4">
            <p className="text-text-secondary text-lg text-center leading-relaxed">
              A game of hidden loyalties and deduction.
            </p>
            <p className="text-text-secondary text-center">
              Players are secretly assigned roles as members of the Loyal Servants of Arthur
              (Good) or the Minions of Mordred (Evil). Good players work to identify and
              thwart the evil players, while evil players attempt to remain hidden and sabotage
              the quests.
            </p>
            <p className="text-text-secondary text-center">
              This tool helps you set up the game by assigning roles and revealing them
              privately to each player.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-bg-tertiary border-border">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="text-3xl">🎭</div>
              <div className="font-semibold text-text-primary">Secret Roles</div>
              <div className="text-sm text-text-secondary">
                Each player receives a hidden role
              </div>
            </CardContent>
          </Card>

          <Card className="bg-bg-tertiary border-border">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="text-3xl">👁️</div>
              <div className="font-semibold text-text-primary">Special Powers</div>
              <div className="text-sm text-text-secondary">
                Some roles can see others
              </div>
            </CardContent>
          </Card>

          <Card className="bg-bg-tertiary border-border">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="text-3xl">🔒</div>
              <div className="font-semibold text-text-primary">Privacy First</div>
              <div className="text-sm text-text-secondary">
                Pass device for private reveals
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Play Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handlePlayGame}
            size="lg"
            variant="good"
            className="text-xl py-6 px-12 animate-pulse-subtle"
          >
            ▶️ Play Game
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-text-secondary pt-4">
          <p>For 6-7 players • Role revelation mode</p>
        </div>
      </div>
    </div>
  );
}
