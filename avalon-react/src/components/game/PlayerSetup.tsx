// Player Setup component - Collect player names for automatic role assignment

import { useState, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { validatePlayerName, toTitleCase } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function PlayerSetup() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isShuffling, setIsShuffling] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { players, playerCount, addPlayer, removePlayer, assignRolesAndStart, setPhase } = useGameStore();

  const handleAddPlayer = () => {
    setError('');

    // Validate name
    const nameValidation = validatePlayerName(name, players);
    if (!nameValidation.isValid) {
      setError(nameValidation.errors[0]);
      return;
    }

    // Check if we've reached player limit
    if (playerCount && players.length >= playerCount) {
      setError(`Maximum ${playerCount} players allowed`);
      return;
    }

    // Add player (role will be assigned later)
    addPlayer(toTitleCase(name.trim()));

    // Reset form
    setName('');

    // Focus back to input after adding player
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleShuffleAndStart = async () => {
    setIsShuffling(true);

    // Brief delay to show loading state (simulate shuffle animation)
    await new Promise(resolve => setTimeout(resolve, 1000));

    assignRolesAndStart();
  };

  const handleBack = () => {
    setPhase('player-count');
  };

  const allPlayersAdded = playerCount !== null && players.length === playerCount;
  const canAddMore = !playerCount || players.length < playerCount;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">
            ⚔️ Enter Player Names
          </h1>
          <p className="text-text-secondary">
            Roles will be randomly assigned after all names are entered
          </p>
          <div className="text-lg font-semibold text-accent">
            Adding players ({players.length}/{playerCount || '?'})
          </div>
        </div>

        {/* Player Input Form */}
        <Card className="bg-bg-secondary border-border">
          <CardContent className="pt-6 space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="playerName" className="block text-sm font-medium text-text-secondary mb-2">
                Player Name
              </label>
              <input
                ref={inputRef}
                id="playerName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter player name..."
                disabled={!canAddMore}
                className="w-full px-4 py-2 bg-bg-tertiary border border-border rounded-lg text-text-primary placeholder-neutral focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
                onKeyPress={(e) => e.key === 'Enter' && canAddMore && handleAddPlayer()}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-evil bg-opacity-10 border border-evil rounded-lg text-evil text-sm">
                {error}
              </div>
            )}

            {/* Add Player Button */}
            <Button
              onClick={handleAddPlayer}
              className={`w-full ${canAddMore ? 'animate-pulse-subtle' : ''}`}
              size="lg"
              variant="good"
              disabled={!canAddMore}
            >
              {allPlayersAdded ? '✓ All Players Added' : '+ Add Player'}
            </Button>
          </CardContent>
        </Card>

        {/* Players List */}
        {players.length > 0 && (
          <Card className="bg-bg-secondary border-border">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Players Added
              </h3>
              <div className="space-y-2 mb-4">
                {players.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent bg-opacity-20 flex items-center justify-center text-accent font-bold">
                        {index + 1}
                      </div>
                      <div className="font-medium text-text-primary">{player.name}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePlayer(player.id)}
                      className="text-evil hover:text-evil hover:bg-evil hover:bg-opacity-10"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              {/* Info Message */}
              {allPlayersAdded && (
                <div className="p-3 bg-good bg-opacity-10 border border-good rounded-lg text-good text-sm mb-4">
                  ✓ All {playerCount} players added. Ready to shuffle and assign roles!
                </div>
              )}

              {/* Shuffle & Start Button */}
              <Button
                onClick={handleShuffleAndStart}
                disabled={!allPlayersAdded || isShuffling}
                className={`w-full ${allPlayersAdded && !isShuffling ? 'animate-pulse-subtle' : ''}`}
                size="lg"
                variant={allPlayersAdded ? "good" : "outline"}
              >
                {isShuffling ? '🎲 Shuffling Roles...' : allPlayersAdded ? '🎲 Shuffle & Start' : `❌ Add ${playerCount! - players.length} More Player${playerCount! - players.length === 1 ? '' : 's'}`}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Back Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleBack}
            variant="outline"
            size="lg"
            disabled={isShuffling}
          >
            ← Back to Player Count
          </Button>
        </div>
      </div>
    </div>
  );
}
