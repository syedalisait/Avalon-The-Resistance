// Zustand store for Avalon game state

import { create } from 'zustand';
import { calculateVisiblePlayers } from '@/lib/game-rules';
import { validatePlayers } from '@/lib/validators';
import type { Player, GamePhase, Role, GameMode } from '@/types/game.types';

interface GameState {
  // Data
  players: Player[];
  currentPlayerIndex: number;
  phase: GamePhase;
  gameMode: GameMode | null;
  playerCount: number | null;

  // Actions
  addPlayer: (name: string, role: Role) => void;
  removePlayer: (playerId: string) => void;
  setPhase: (phase: GamePhase) => void;
  setGameMode: (mode: GameMode) => void;
  setPlayerCount: (count: number) => void;
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

  addPlayer: (name, role) => set((state) => ({
    players: [...state.players, {
      id: crypto.randomUUID(),
      name,
      role
    }]
  })),

  removePlayer: (playerId) => set((state) => ({
    players: state.players.filter(p => p.id !== playerId)
  })),

  setPhase: (phase) => set({ phase }),

  setGameMode: (mode) => set({ gameMode: mode }),

  setPlayerCount: (count) => set({ playerCount: count }),

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
