import type { GameConfig, Role, RoleDefinition } from '@/types/game.types';

// Official Avalon game configuration
export const GAME_CONFIG: GameConfig = {
  minPlayers: 5,
  maxPlayers: 10,

  // Evil count by player count (official rules)
  evilCountByPlayers: {
    5: 2,   // 5 players: 2 evil, 3 good
    6: 2,   // 6 players: 2 evil, 4 good
    7: 3,   // 7 players: 3 evil, 4 good
    8: 3,   // 8 players: 3 evil, 5 good
    9: 3,   // 9 players: 3 evil, 6 good
    10: 4   // 10 players: 4 evil, 6 good
  },

  // Required roles for a valid game
  requiredRoles: ['Merlin', 'Assassin'],

  // Recommended setups by player count
  recommendedSetups: {
    5: ['Merlin', 'Perceival', 'Arthur', 'Morgana', 'Assassin'],
    6: ['Merlin', 'Perceival', 'Arthur', 'Morgana', 'Assassin', 'Minion'],
    7: ['Merlin', 'Perceival', 'Arthur', 'Arthur', 'Morgana', 'Oberon', 'Assassin'],
    8: ['Merlin', 'Perceival', 'Arthur', 'Arthur', 'Morgana', 'Modred', 'Assassin', 'Minion'],
    9: ['Merlin', 'Perceival', 'Arthur', 'Arthur', 'Arthur', 'Morgana', 'Modred', 'Assassin', 'Minion'],
    10: ['Merlin', 'Perceival', 'Arthur', 'Arthur', 'Arthur', 'Arthur', 'Morgana', 'Modred', 'Assassin', 'Minion']
  }
};

// Role definitions with metadata
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
    emoji: '⚔️',
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
