// Player Setup component - Add players and assign roles

import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { ROLES } from '@/lib/game-rules';
import { validatePlayerName, validatePlayers, toTitleCase } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Role } from '@/types/game.types';

export function PlayerSetup() {
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [error, setError] = useState('');

  const { players, addPlayer, removePlayer, startReveal } = useGameStore();

  const handleAddPlayer = () => {
    setError('');

    // Validate name
    const nameValidation = validatePlayerName(name, players);
    if (!nameValidation.isValid) {
      setError(nameValidation.errors[0]);
      return;
    }

    // Validate role selection
    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    // Check if role is already taken (if not duplicable)
    const roleInfo = ROLES[selectedRole];
    if (!roleInfo.canDuplicate) {
      const isTaken = players.some(p => p.role === selectedRole);
      if (isTaken) {
        setError(`${selectedRole} is already taken`);
        return;
      }
    }

    // Add player
    addPlayer(toTitleCase(name.trim()), selectedRole);

    // Reset form
    setName('');
    setSelectedRole(null);
  };

  const handleStartGame = () => {
    const validation = validatePlayers(players);
    if (validation.isValid) {
      startReveal();
    } else {
      setError(validation.errors[0]);
    }
  };

  const isRoleTaken = (role: Role) => {
    if (ROLES[role].canDuplicate) return false;
    return players.some(p => p.role === role);
  };

  const validation = validatePlayers(players);
  const canStartGame = validation.isValid;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">
            ⚔️ Avalon Setup
          </h1>
          <p className="text-text-secondary">
            Add players and assign roles
          </p>
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
                id="playerName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name..."
                className="w-full px-4 py-2 bg-bg-tertiary border border-border rounded-lg text-text-primary placeholder-neutral focus:outline-none focus:ring-2 focus:ring-accent"
                onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-3">
                Select Role
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(ROLES) as Role[]).map((role) => {
                  const roleInfo = ROLES[role];
                  const isTaken = isRoleTaken(role);
                  const isSelected = selectedRole === role;

                  return (
                    <button
                      key={role}
                      onClick={() => !isTaken && setSelectedRole(role)}
                      disabled={isTaken}
                      className={`
                        relative p-3 rounded-lg border-2 transition-all
                        ${isTaken ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                        ${isSelected
                          ? 'border-accent bg-bg-tertiary'
                          : 'border-border bg-bg-primary hover:border-neutral'
                        }
                      `}
                    >
                      <div className="text-2xl mb-1">{roleInfo.emoji}</div>
                      <div className="text-xs font-medium text-text-primary">{role}</div>
                      <div className={`text-[10px] ${roleInfo.alignment === 'Good' ? 'text-good' : 'text-evil'}`}>
                        {roleInfo.alignment}
                      </div>
                      {isTaken && (
                        <div className="absolute top-1 right-1 text-[10px] bg-evil text-white px-1 rounded">
                          TAKEN
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
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
              className="w-full"
              size="lg"
              variant="good"
            >
              + Add Player
            </Button>
          </CardContent>
        </Card>

        {/* Players List */}
        {players.length > 0 && (
          <Card className="bg-bg-secondary border-border">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Players Added ({players.length}/10)
              </h3>
              <div className="space-y-2 mb-4">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{ROLES[player.role].emoji}</span>
                      <div>
                        <div className="font-medium text-text-primary">{player.name}</div>
                        <div className="text-xs text-text-secondary">{player.role}</div>
                      </div>
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

              {/* Validation Info */}
              <div className="space-y-2 mb-4">
                {validation.errors.map((err, i) => (
                  <div key={i} className="p-2 bg-evil bg-opacity-10 border border-evil rounded text-evil text-sm">
                    {err}
                  </div>
                ))}
                {validation.warnings.map((warn, i) => (
                  <div key={i} className="p-2 bg-accent bg-opacity-10 border border-accent rounded text-accent text-sm">
                    ⚠️ {warn}
                  </div>
                ))}
              </div>

              {/* Start Game Button */}
              <Button
                onClick={handleStartGame}
                disabled={!canStartGame}
                className="w-full"
                size="lg"
                variant={canStartGame ? "good" : "outline"}
              >
                {canStartGame ? '🎮 Start Game' : '❌ Cannot Start - Fix Errors'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
