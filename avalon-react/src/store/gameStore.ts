// Zustand store for Avalon game state

import { create } from 'zustand';
import { calculateVisiblePlayers, assignRoles } from '@/lib/game-rules';
import { validatePlayers } from '@/lib/validators';
import type { Player, GamePhase, GameMode } from '@/types/game.types';

interface GameState {
  // Data
  players: Player[];
  currentPlayerIndex: number;
  phase: GamePhase;
  gameMode: GameMode | null;
  playerCount: number | null;

  // Actions
  addPlayer: (name: string) => void;
  removePlayer: (playerId: string) => void;
  setPhase: (phase: GamePhase) => void;
  setGameMode: (mode: GameMode) => void;
  setPlayerCount: (count: number) => void;
  assignRolesAndStart: () => void;
  startReveal: () => void;
  nextPlayer: () => void;
  resetGame: () => void;

  // Computed
  isValidGame: () => boolean;
  getVisiblePlayers: (playerId: string) => Player[];
  getCurrentPlayer: () => Player | null;
}

export const useGameStore = create<GameState>()((set, get) => ({
  players: [],
  currentPlayerIndex: 0,
  phase: 'home',
  gameMode: null,
  playerCount: null,

  addPlayer: (name) => set((state) => ({
    players: [...state.players, {
      id: crypto.randomUUID(),
      name,
      role: 'Arthur' // Temporary placeholder role, will be reassigned during shuffle
    }]
  })),

  removePlayer: (playerId) => set((state) => ({
    players: state.players.filter(p => p.id !== playerId)
  })),

  setPhase: (phase) => set({ phase }),

  setGameMode: (mode) => set({ gameMode: mode }),

  setPlayerCount: (count) => set({ playerCount: count }),

  assignRolesAndStart: () => {
    const { players, playerCount } = get();

    if (!playerCount) {
      console.error('Player count not set');
      return;
    }

    // Get player names
    const playerNames = players.map(p => p.name);

    // Assign roles randomly using the assignRoles function
    const playersWithRoles = assignRoles(playerNames, playerCount);

    // Update state with new players (with assigned roles) and start reveal
    set({
      players: playersWithRoles,
      phase: 'reveal',
      currentPlayerIndex: 0
    });
  },

  startReveal: () => {
    const { isValidGame } = get();
    if (isValidGame()) {
      set({ phase: 'reveal', currentPlayerIndex: 0 });
    }
  },

  nextPlayer: () => set((state) => {
    const nextIndex = state.currentPlayerIndex + 1;
    if (nextIndex >= state.players.length) {
      return { phase: 'complete' };
    }
    return { currentPlayerIndex: nextIndex };
  }),

  resetGame: () => set({
    players: [],
    currentPlayerIndex: 0,
    phase: 'home',
    gameMode: null,
    playerCount: null
  }),

  isValidGame: () => {
    const { players } = get();
    const validation = validatePlayers(players);
    return validation.isValid;
  },

  getVisiblePlayers: (playerId) => {
    const { players } = get();
    const currentPlayer = players.find(p => p.id === playerId);
    if (!currentPlayer) return [];
    return calculateVisiblePlayers(players, currentPlayer);
  },

  getCurrentPlayer: () => {
    const { players, currentPlayerIndex } = get();
    return players[currentPlayerIndex] || null;
  }
}));
