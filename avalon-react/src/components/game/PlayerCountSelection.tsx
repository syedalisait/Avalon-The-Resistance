// Player Count Selection - Choose 6 or 7 players

import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function PlayerCountSelection() {
  const { setPlayerCount, setPhase } = useGameStore();

  const handleSelectCount = (count: number) => {
    setPlayerCount(count);
    setPhase('setup');
  };

  const handleBack = () => {
    setPhase('mode-selection');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-3xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">
            How Many Players?
          </h1>
          <p className="text-text-secondary">
            Select the number of players for your game
          </p>
        </div>

        {/* Player Count Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 6 Players */}
          <Card
            className="bg-bg-secondary border-good hover:bg-bg-tertiary transition-all cursor-pointer"
            onClick={() => handleSelectCount(6)}
          >
            <CardHeader>
              <div className="text-center">
                <div className="text-5xl font-bold text-good mb-2">6</div>
                <CardTitle className="text-2xl text-text-primary">Players</CardTitle>
                <CardDescription className="text-text-secondary">
                  Classic setup
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Team Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-good bg-opacity-10 rounded">
                  <span className="text-good font-semibold">Good Team</span>
                  <span className="text-good font-bold">4 players</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-evil bg-opacity-10 rounded">
                  <span className="text-evil font-semibold">Evil Team</span>
                  <span className="text-evil font-bold">2 players</span>
                </div>
              </div>

              {/* Roles */}
              <div className="space-y-2 text-sm">
                <div className="font-semibold text-text-primary">Roles:</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-good">🧙 Merlin</div>
                  <div className="text-good">🛡️ Perceival</div>
                  <div className="text-good">⚔️ Arthur</div>
                  <div className="text-good">⚔️ Arthur</div>
                  <div className="text-evil">🔮 Morgana</div>
                  <div className="text-evil">🗡️ Assassin</div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Button variant="good" size="lg" className="w-full">
                  Choose 6 Players →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 7 Players */}
          <Card
            className="bg-bg-secondary border-good hover:bg-bg-tertiary transition-all cursor-pointer"
            onClick={() => handleSelectCount(7)}
          >
            <CardHeader>
              <div className="text-center">
                <div className="text-5xl font-bold text-good mb-2">7</div>
                <CardTitle className="text-2xl text-text-primary">Players</CardTitle>
                <CardDescription className="text-text-secondary">
                  Expanded setup
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Team Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-good bg-opacity-10 rounded">
                  <span className="text-good font-semibold">Good Team</span>
                  <span className="text-good font-bold">4 players</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-evil bg-opacity-10 rounded">
                  <span className="text-evil font-semibold">Evil Team</span>
                  <span className="text-evil font-bold">3 players</span>
                </div>
              </div>

              {/* Roles */}
              <div className="space-y-2 text-sm">
                <div className="font-semibold text-text-primary">Roles:</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-good">🧙 Merlin</div>
                  <div className="text-good">🛡️ Perceival</div>
                  <div className="text-good">⚔️ Arthur</div>
                  <div className="text-good">⚔️ Arthur</div>
                  <div className="text-evil">🔮 Morgana</div>
                  <div className="text-evil">🗡️ Assassin</div>
                  <div className="text-evil">👤 Minion</div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Button variant="good" size="lg" className="w-full">
                  Choose 7 Players →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Note */}
        <Card className="bg-bg-tertiary border-border">
          <CardContent className="pt-6">
            <p className="text-center text-text-secondary text-sm">
              💡 <strong>Note:</strong> Roles will be randomly assigned to players after you enter their names.
              Support for 5, 8, 9, and 10 player games coming soon!
            </p>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleBack}
            variant="outline"
            size="lg"
          >
            ← Back to Game Mode
          </Button>
        </div>
      </div>
    </div>
  );
}
