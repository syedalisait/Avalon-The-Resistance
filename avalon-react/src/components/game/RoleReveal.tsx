// Role Reveal component - Show each player their role and visible players

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { ROLES } from '@/lib/game-rules';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function RoleReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const { getCurrentPlayer, getVisiblePlayers, nextPlayer, phase, resetGame } = useGameStore();

  const currentPlayer = getCurrentPlayer();

  if (!currentPlayer) {
    return null;
  }

  const roleInfo = ROLES[currentPlayer.role];
  const visiblePlayers = getVisiblePlayers(currentPlayer.id);
  const isGood = roleInfo.alignment === 'Good';

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleNext = () => {
    setIsRevealed(false);
    nextPlayer();
  };

  if (phase === 'complete') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">
            All Roles Revealed!
          </h1>
          <p className="text-text-secondary text-lg">
            Everyone knows their role. The game can now begin!
          </p>
          <Card className="bg-bg-secondary border-border">
            <CardContent className="pt-6">
              <p className="text-text-secondary mb-4">
                You can now play Avalon using the traditional game components.
                This app has completed the role setup phase.
              </p>
              <Button onClick={resetGame} size="lg" variant="good" className="w-full">
                🔄 Start New Game
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isRevealed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <div className="text-6xl mb-4">👤</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">
            {currentPlayer.name}
          </h1>
          <p className="text-text-secondary text-lg">
            Tap to reveal your role
          </p>

          <Card className="bg-bg-secondary border-border">
            <CardContent className="pt-6 space-y-4">
              <div className="p-8 bg-bg-tertiary rounded-lg border-2 border-dashed border-border">
                <div className="text-6xl mb-4 blur-lg select-none">🎭</div>
                <div className="text-xl text-text-secondary blur-md select-none">
                  Your Role
                </div>
              </div>

              <Button
                onClick={handleReveal}
                size="lg"
                variant="good"
                className="w-full text-lg py-6"
              >
                👁️ Reveal My Role
              </Button>

              <p className="text-sm text-accent">
                ⚠️ Show this to NO ONE else!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl space-y-6">
        {/* Role Card */}
        <Card className={`bg-${roleInfo.color} border-none text-white`}>
          <CardContent className="pt-6 text-center space-y-4">
            <div className="text-6xl mb-2">{roleInfo.emoji}</div>
            <h2 className="text-3xl font-bold">{currentPlayer.role}</h2>
            <div className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
              isGood ? 'bg-good bg-opacity-20' : 'bg-evil bg-opacity-20'
            }`}>
              {roleInfo.alignment} Team
            </div>
            <p className="text-sm opacity-90 max-w-md mx-auto">
              {roleInfo.description}
            </p>
          </CardContent>
        </Card>

        {/* Visible Players */}
        {visiblePlayers.length > 0 ? (
          <Card className="bg-bg-secondary border-border">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                {currentPlayer.role === 'Perceival'
                  ? '👁️ You see these players (one is Merlin, one is Morgana):'
                  : currentPlayer.role === 'Merlin'
                  ? '👁️ You see these EVIL players (except Modred):'
                  : '👁️ You see these players on your team:'}
              </h3>
              <div className="space-y-2">
                {visiblePlayers.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center gap-3 p-3 bg-bg-tertiary rounded-lg"
                  >
                    <span className="text-2xl">{ROLES[player.role].emoji}</span>
                    <div>
                      <div className="font-medium text-text-primary">{player.name}</div>
                      {currentPlayer.role !== 'Perceival' && (
                        <div className="text-xs text-text-secondary">{player.role}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-bg-secondary border-border">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-2">🤐</div>
              <p className="text-text-secondary">
                {currentPlayer.role === 'Oberon'
                  ? 'You are Evil, but you do not know who the other evil players are.'
                  : 'You do not see any special information.'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="bg-accent bg-opacity-10 border-accent">
          <CardContent className="pt-6">
            <p className="text-accent text-sm text-center font-medium">
              ⚠️ Remember this information! Do not show anyone else.
              When ready, pass the device to the next player.
            </p>
          </CardContent>
        </Card>

        {/* Next Button */}
        <Button
          onClick={handleNext}
          size="lg"
          variant="good"
          className="w-full text-lg py-6"
        >
          ✓ I've Memorized My Role → Next Player
        </Button>
      </div>
    </div>
  );
}
