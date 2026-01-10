// Role Reveal component - Show each player their role and visible players

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { ROLES } from '@/lib/game-rules';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Player } from '@/types/game.types';

type RevealStage = 'pass' | 'blur' | 'revealed';

const REVEAL_DELAY_SECONDS = 3;

export function RoleReveal() {
  const [revealStage, setRevealStage] = useState<RevealStage>('pass');
  const [isRevealing, setIsRevealing] = useState(false);
  const [countdown, setCountdown] = useState(REVEAL_DELAY_SECONDS);
  const { players, getCurrentPlayer, getVisiblePlayers, nextPlayer, phase, resetGame, gameSummaryRevealed, revealGameSummary } = useGameStore();

  const currentPlayer = getCurrentPlayer();

  if (!currentPlayer) {
    return null;
  }

  const roleInfo = ROLES[currentPlayer.role];
  const visiblePlayers = getVisiblePlayers(currentPlayer.id);
  const isGood = roleInfo.alignment === 'Good';

  // Countdown timer effect
  useEffect(() => {
    if (isRevealing && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isRevealing && countdown === 0) {
      setIsRevealing(false);
      setRevealStage('revealed');
      setCountdown(REVEAL_DELAY_SECONDS);
    }
  }, [isRevealing, countdown]);

  const handlePassToPlayer = () => {
    setRevealStage('blur');
  };

  const handleReveal = () => {
    setIsRevealing(true);
  };

  const handleNext = () => {
    setRevealStage('pass');
    nextPlayer();
  };

  // Pre-reveal: Show "Finish Game" button
  if (phase === 'complete' && !gameSummaryRevealed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">
            Game Complete!
          </h1>
          <p className="text-text-secondary text-lg">
            All players have seen their roles. Ready to reveal the full summary?
          </p>

          <Card className="bg-accent bg-opacity-10 border-accent">
            <CardContent className="pt-6">
              <p className="text-accent text-center">
                ⚠️ After clicking "Finish Game", all player roles will be revealed.
                Make sure everyone is ready!
              </p>
            </CardContent>
          </Card>

          <Button
            onClick={revealGameSummary}
            size="lg"
            variant="good"
            className="w-full text-lg py-6"
          >
            🎯 Finish Game & Reveal All Roles
          </Button>
        </div>
      </div>
    );
  }

  // Post-reveal: Show game summary
  if (phase === 'complete' && gameSummaryRevealed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">
              All Roles Revealed!
            </h1>
            <p className="text-text-secondary text-lg">
              Everyone knows their role. The game can now begin!
            </p>
          </div>

          {/* All Players and Roles */}
          <Card className="bg-bg-secondary border-border">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4 text-center">
                Game Summary - All Players & Roles
              </h3>
              <p className="text-text-secondary text-sm text-center mb-4">
                Use this to verify roles at the end of the game
              </p>
              <div className="space-y-2">
                {players.map((player: Player) => {
                  const roleInfo = ROLES[player.role];
                  return (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{roleInfo.emoji}</span>
                        <div>
                          <div className="font-medium text-text-primary">{player.name}</div>
                          <div className="text-xs text-text-secondary">{player.role}</div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        roleInfo.alignment === 'Good'
                          ? 'bg-good bg-opacity-20 text-good'
                          : 'bg-evil bg-opacity-20 text-evil'
                      }`}>
                        {roleInfo.alignment}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-bg-tertiary border-border">
            <CardContent className="pt-6">
              <p className="text-text-secondary text-center mb-4 text-sm">
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

  // Pass screen - before revealing role
  if (revealStage === 'pass') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <div className="text-6xl mb-4">📱</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-accent mb-2">
            Pass Phone To
          </h1>
          <h2 className="text-5xl sm:text-6xl font-bold text-text-primary">
            {currentPlayer.name}
          </h2>

          <Card className="bg-accent bg-opacity-10 border-accent">
            <CardContent className="pt-6 space-y-4">
              <p className="text-text-primary text-lg">
                ⚠️ Only <strong className="text-accent">{currentPlayer.name}</strong> should see this screen
              </p>
              <p className="text-text-secondary text-sm">
                Make sure no one else is looking at the screen before tapping below
              </p>
            </CardContent>
          </Card>

          <Button
            onClick={handlePassToPlayer}
            size="lg"
            variant="good"
            className="w-full text-lg py-6"
          >
            I'm {currentPlayer.name}, Reveal My Role →
          </Button>
        </div>
      </div>
    );
  }

  // Blur screen - tap to reveal
  if (revealStage === 'blur') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <div className="text-6xl mb-4">👤</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">
            {currentPlayer.name}
          </h1>
          <p className="text-text-secondary text-lg">
            {isRevealing ? 'Reading your role...' : 'Tap to reveal your role'}
          </p>

          <Card className="bg-bg-secondary border-border">
            <CardContent className="pt-6 space-y-4">
              <div
                className="p-8 bg-bg-tertiary rounded-lg border-2 border-dashed border-border cursor-pointer hover:bg-opacity-80 transition-all"
                onClick={!isRevealing ? handleReveal : undefined}
              >
                {isRevealing ? (
                  <>
                    <div className="text-8xl font-bold mb-2 text-accent animate-pulse">
                      {countdown}
                    </div>
                    <div className="text-lg text-text-secondary">
                      Reading role information...
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-6xl mb-4 blur-lg select-none">🎭</div>
                    <div className="text-xl text-text-secondary blur-md select-none">
                      Your Role
                    </div>
                    <div className="text-sm text-good mt-4 font-medium">
                      Tap here or button below to reveal
                    </div>
                  </>
                )}
              </div>

              <Button
                onClick={handleReveal}
                size="lg"
                variant="good"
                className="w-full text-lg py-6"
                disabled={isRevealing}
              >
                {isRevealing ? `⏱️ Revealing... (${countdown}s)` : '👁️ Reveal My Role'}
              </Button>

              <p className="text-sm text-accent">
                ⚠️ {isRevealing ? 'Please wait for the reveal...' : 'Show this to NO ONE else!'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Revealed screen - show role and visible players

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

              {/* Special message for Perceival */}
              {currentPlayer.role === 'Perceival' && (
                <div className="mb-3 p-3 bg-accent bg-opacity-10 border border-accent rounded-lg">
                  <p className="text-accent text-sm text-center">
                    ⚠️ One is Merlin, one is Morgana - you cannot tell which is which!
                  </p>
                </div>
              )}

              <div className="space-y-2">
                {visiblePlayers.map((player: Player) => {
                  // Merlin sees names + roles with role emoji
                  const isMerlin = currentPlayer.role === 'Merlin';

                  // Perceival and Evil see only names with generic emoji
                  const showRoleInfo = isMerlin;

                  return (
                    <div
                      key={player.id}
                      className="flex items-center gap-3 p-3 bg-bg-tertiary rounded-lg"
                    >
                      <span className="text-2xl">
                        {showRoleInfo ? ROLES[player.role].emoji : '👤'}
                      </span>
                      <div>
                        <div className="font-medium text-text-primary">{player.name}</div>
                        {showRoleInfo && (
                          <div className="text-xs text-text-secondary">{player.role}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
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
