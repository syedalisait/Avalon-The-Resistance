// Avalon game rules and role definitions

import type { Role, RoleDefinition, GameConfig, Player } from '@/types/game.types';

export const GAME_CONFIG: GameConfig = {
  minPlayers: 5,
  maxPlayers: 10,

  // Evil count by player count (official Avalon rules)
  evilCountByPlayers: {
    5: 2,
    6: 2,
    7: 3,
    8: 3,
    9: 3,
    10: 4
  },

  // Required roles for a valid game
  requiredRoles: ['Merlin', 'Assassin'],

  // Recommended role setups by player count
  recommendedSetups: {
    5: ['Merlin', 'Perceival', 'Arthur', 'Morgana', 'Assassin'],
    6: ['Merlin', 'Perceival', 'Arthur', 'Arthur', 'Morgana', 'Assassin'],
    7: ['Merlin', 'Perceival', 'Arthur', 'Arthur', 'Morgana', 'Oberon', 'Assassin'],
    8: ['Merlin', 'Perceival', 'Arthur', 'Arthur', 'Arthur', 'Morgana', 'Modred', 'Assassin'],
    9: ['Merlin', 'Perceival', 'Arthur', 'Arthur', 'Arthur', 'Morgana', 'Modred', 'Assassin', 'Minion'],
    10: ['Merlin', 'Perceival', 'Arthur', 'Arthur', 'Arthur', 'Arthur', 'Morgana', 'Modred', 'Assassin', 'Minion']
  }
};

// Role presets for automatic assignment (6 and 7 player games)
export const ROLE_PRESETS: Record<number, Role[]> = {
  6: ['Merlin', 'Perceival', 'Arthur', 'Morgana', 'Assassin', 'Arthur'],
  7: ['Merlin', 'Perceival', 'Arthur', 'Arthur', 'Morgana', 'Assassin', 'Minion']
};

export const ROLES: Record<Role, RoleDefinition> = {
  Merlin: {
    name: 'Merlin',
    alignment: 'Good',
    description: 'Knows all evil players except Modred',
    canDuplicate: false,
    emoji: '🧙',
    color: 'merlin'
  },

  Perceival: {
    name: 'Perceival',
    alignment: 'Good',
    description: 'Sees Merlin and Morgana but cannot distinguish them',
    canDuplicate: false,
    emoji: '🛡️',
    color: 'perceival'
  },

  Arthur: {
    name: 'Arthur',
    alignment: 'Good',
    description: 'Generic good player with no special abilities',
    canDuplicate: true,
    emoji: '⚔️',
    color: 'good'
  },

  Morgana: {
    name: 'Morgana',
    alignment: 'Evil',
    description: 'Appears as Merlin to Perceival',
    canDuplicate: false,
    emoji: '🔮',
    color: 'morgana'
  },

  Modred: {
    name: 'Modred',
    alignment: 'Evil',
    description: 'Invisible to Merlin',
    canDuplicate: false,
    emoji: '🗡️',
    color: 'modred'
  },

  Minion: {
    name: 'Minion',
    alignment: 'Evil',
    description: 'Generic evil player',
    canDuplicate: true,
    emoji: '👤',
    color: 'evil'
  },

  Assassin: {
    name: 'Assassin',
    alignment: 'Evil',
    description: 'Can kill Merlin if good wins',
    canDuplicate: false,
    emoji: '🗡️',
    color: 'assassin'
  },

  Oberon: {
    name: 'Oberon',
    alignment: 'Evil',
    description: 'Does not know other evil players',
    canDuplicate: false,
    emoji: '👁️',
    color: 'oberon'
  }
};

// Calculate which players are visible to a given role
export function calculateVisiblePlayers(allPlayers: Player[], currentPlayer: Player): Player[] {
  const role = currentPlayer.role;
  const otherPlayers = allPlayers.filter(p => p.id !== currentPlayer.id);

  switch (role) {
    case 'Merlin':
      // Merlin sees all evil except Modred
      return otherPlayers.filter(p =>
        p.role === 'Morgana' ||
        p.role === 'Assassin' ||
        p.role === 'Minion' ||
        p.role === 'Oberon'
      );

    case 'Perceival':
      // Perceival sees Merlin and Morgana (cannot distinguish)
      return otherPlayers.filter(p =>
        p.role === 'Merlin' ||
        p.role === 'Morgana'
      );

    case 'Morgana':
    case 'Modred':
    case 'Assassin':
    case 'Minion':
      // Evil players see each other (except Oberon)
      return otherPlayers.filter(p =>
        p.role === 'Morgana' ||
        p.role === 'Modred' ||
        p.role === 'Assassin' ||
        p.role === 'Minion'
      );

    case 'Arthur':
    case 'Oberon':
      // Arthur and Oberon see nobody
      return [];

    default:
      return [];
  }
}

// Fisher-Yates shuffle algorithm for randomizing role assignment
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]; // Create a copy to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Assign roles randomly to player names based on player count
export function assignRoles(playerNames: string[], playerCount: number): Player[] {
  // Get the preset roles for this player count
  const roles = ROLE_PRESETS[playerCount];

  if (!roles) {
    throw new Error(`No role preset found for ${playerCount} players`);
  }

  if (playerNames.length !== playerCount) {
    throw new Error(`Expected ${playerCount} player names, got ${playerNames.length}`);
  }

  // Shuffle the roles to randomize assignment
  const shuffledRoles = shuffleArray(roles);

  // Create Player objects by zipping names with shuffled roles
  return playerNames.map((name, index) => ({
    id: crypto.randomUUID(),
    name,
    role: shuffledRoles[index]
  }));
}
