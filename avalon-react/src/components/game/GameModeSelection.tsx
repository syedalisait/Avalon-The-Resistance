// Game Mode Selection - Choose between Role Revelation and Full Game

import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function GameModeSelection() {
  const { setGameMode, setPhase } = useGameStore();

  const handleSelectRoleRevelation = () => {
    setGameMode('role-revelation');
    setPhase('player-count');
  };

  const handleBack = () => {
    setPhase('home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-3xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">
            Choose Game Mode
          </h1>
          <p className="text-text-secondary">
            Select how you want to use this tool
          </p>
        </div>

        {/* Game Mode Cards */}
        <div className="space-y-4">
          {/* Role Revelation Mode - Active */}
          <Card
            className="bg-bg-secondary border-good cursor-pointer hover:bg-bg-tertiary transition-colors"
            onClick={handleSelectRoleRevelation}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🎭</span>
                  <div>
                    <CardTitle className="text-2xl text-text-primary">
                      Role Revelation Only
                    </CardTitle>
                    <CardDescription className="text-text-secondary">
                      Recommended • Quick setup
                    </CardDescription>
                  </div>
                </div>
                <div className="text-good text-sm font-semibold px-3 py-1 bg-good bg-opacity-10 rounded-full">
                  AVAILABLE
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                Assign roles and reveal them privately to each player. Perfect for setting up
                your physical Avalon game. After roles are revealed, continue playing offline
                with your game board.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-text-secondary">
                <li>✓ Automatic role assignment</li>
                <li>✓ Private role reveals</li>
                <li>✓ Perfect for in-person games</li>
                <li>✓ Takes 2-3 minutes</li>
              </ul>
            </CardContent>
          </Card>

          {/* Full Game Mode - Coming Soon */}
          <Card className="bg-bg-secondary border-border opacity-60 cursor-not-allowed">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🎮</span>
                  <div>
                    <CardTitle className="text-2xl text-text-primary">
                      Full Digital Game
                    </CardTitle>
                    <CardDescription className="text-text-secondary">
                      Play the entire game digitally
                    </CardDescription>
                  </div>
                </div>
                <div className="text-accent text-sm font-semibold px-3 py-1 bg-accent bg-opacity-10 rounded-full">
                  COMING SOON
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary">
                Play Avalon entirely on your device with mission selection, voting, quest
                resolution, and assassination phase. Perfect for remote play or when you don't
                have the physical game.
              </p>
              <ul className="mt-3 space-y-1 text-sm text-text-secondary">
                <li>• Complete game mechanics</li>
                <li>• Mission tracking</li>
                <li>• Vote history</li>
                <li>• Remote multiplayer</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleBack}
            variant="outline"
            size="lg"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
