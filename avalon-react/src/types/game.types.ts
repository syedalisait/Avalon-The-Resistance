// Avalon Game Types

export type Role =
  | 'Merlin'
  | 'Perceival'
  | 'Arthur'
  | 'Morgana'
  | 'Modred'
  | 'Minion'
  | 'Assassin'
  | 'Oberon';

export type Alignment = 'Good' | 'Evil';

export type GamePhase =
  | 'mode-selection'    // Choose: Role Revelation only or Full Game
  | 'setup'             // Add players and assign roles
  | 'reveal'            // Show each player their role
  | 'mission'           // Full game: mission selection (future)
  | 'vote'              // Full game: voting phase (future)
  | 'assassination'     // Full game: assassin kills Merlin (future)
  | 'complete';         // Game finished

export type GameMode = 'role-revelation' | 'full-game';

export interface Player {
  id: string;
  name: string;
  role: Role;
}

export interface RoleDefinition {
  name: Role;
  alignment: Alignment;
  description: string;
  canDuplicate: boolean;
  emoji: string;
  color: string;
}

export interface GameConfig {
  minPlayers: number;
  maxPlayers: number;
  evilCountByPlayers: Record<number, number>;
  requiredRoles: Role[];
  recommendedSetups: Record<number, Role[]>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface GameState {
  mode: GameMode | null;
  phase: GamePhase;
  players: Player[];
  currentPlayerIndex: number;
}
