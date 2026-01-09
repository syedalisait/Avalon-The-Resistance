# Avalon - The Resistance: Frontend Architecture Plan

## Executive Summary

This document outlines a comprehensive plan to modernize the Avalon game application from a jQuery-based implementation to a modern, mobile-first React application with superior UX, robust testing, and extensible architecture.

### Key Goals
1. **Modern Tech Stack**: Migrate from jQuery to React + Tailwind CSS + shadcn/ui
2. **Superior Mobile UX**: Design for phone pass-around gameplay with smooth animations
3. **Robust Game Logic**: Simplify and validate Avalon rules for 5-10 player games
4. **Comprehensive Testing**: Ensure correctness across all player counts and character combinations
5. **Customizable Setup**: Allow dynamic character selection based on player count

---

## Table of Contents
1. [Current State Analysis](#current-state-analysis)
2. [Technology Stack Recommendation](#technology-stack-recommendation)
3. [UI/UX Design Vision](#uiux-design-vision)
4. [Architecture Improvements](#architecture-improvements)
5. [Game Logic Improvements](#game-logic-improvements)
6. [Testing Strategy](#testing-strategy)
7. [Implementation Phases](#implementation-phases)
8. [Migration Plan](#migration-plan)

---

## 1. Current State Analysis

### What Works Well ✅
- Simple, focused scope (role revelation only)
- Clear game flow (input → reveal → display)
- Basic validation (name, role, duplicates)
- Responsive layout (Bootstrap grid)
- Lightweight (~300KB total)

### Critical Issues ❌

#### Technical Debt
- **jQuery 1.11.3** (2014) - 10+ years outdated, security risks
- **No build system** - No optimization, no modern JS features
- **Global scope pollution** - All variables exposed globally
- **Tight coupling** - Business logic mixed with DOM manipulation
- **No testing** - Manual testing only, prone to regressions

#### Game Logic Issues
- **No player count validation** - Allows < 5 or > 10 players
- **No role balance validation** - Can create all good or all evil teams
- **No setup guidance** - Players must know which characters to pick
- **Hardcoded visibility rules** - Cannot customize game variants

#### UX Issues
- **Poor mobile experience** - Small touch targets, no orientation considerations
- **No screen privacy** - Previous player could watch next player
- **No animations** - Abrupt transitions, feels static
- **Basic styling** - Doesn't feel like a modern game
- **No feedback** - Browser alerts only, no haptic/sound feedback

---

## 2. Technology Stack Recommendation

### Frontend Framework: **React 18+**

**Why React?**
- Component-based architecture (reusable PlayerCard, RoleDisplay, etc.)
- State management (useState, useReducer for game state)
- Hooks for lifecycle management (useEffect for validation)
- Rich ecosystem (testing libraries, dev tools)
- Server Components ready (future multiplayer expansion)

**Alternatives Considered:**
- Vue 3: Good, but smaller ecosystem
- Svelte: Excellent performance, but less enterprise adoption
- Vanilla JS: No framework overhead, but reinventing the wheel

### CSS Framework: **Tailwind CSS v4 + shadcn/ui**

**Why Tailwind + shadcn/ui?**

Based on [2026 research](https://medium.com/@yashbatra11111/tailwind-shadcn-ui-the-frontend-combo-everyone-uses-to-ship-uis-3x-faster-exact-setup-1c24676a01a1), this combination:
- **Ships UIs 3x faster** with pre-built accessible components
- **Tailwind v4** with CSS layers, container queries, JIT mode
- **shadcn/ui**: Copy-paste components (no runtime overhead, full control)
- **Accessibility**: WAI-ARIA compliant out of the box
- **Dark mode**: Built-in theming support
- **Tailwind v4 support**: All components updated for latest features

**Key Features from Research:**
- [TypeScript support, WCAG accessibility, SSR compatibility](https://www.untitledui.com/blog/react-component-libraries)
- [Design tokens for consistent theming](https://shadisbaih.medium.com/building-a-scalable-design-system-with-shadcn-ui-tailwind-css-and-design-tokens-031474b03690)
- [Battle-tested components](https://ui.shadcn.com/docs/tailwind-v4)

**Alternatives Considered:**
- Material UI (MUI): Heavier, Google-opinionated design
- Mantine: Good, but more opinionated than shadcn/ui
- Untitled UI: Excellent, but shadcn/ui has better community

### Build Tool: **Vite**

**Why Vite?**
- Lightning-fast HMR (Hot Module Replacement)
- Optimized production builds with Rollup
- Native ESM support
- TypeScript out of the box
- Best-in-class DX (Developer Experience)

### Additional Tools

| Tool | Purpose | Why |
|------|---------|-----|
| **TypeScript** | Type safety | Catch errors at compile time, better IDE support |
| **Vitest** | Unit testing | Fast, Vite-native, Jest-compatible API |
| **React Testing Library** | Component testing | Best practices, user-centric testing |
| **Playwright** | E2E testing | Reliable, fast, multi-browser support |
| **Framer Motion** | Animations | Smooth, declarative animations for React |
| **Zustand** | State management | Lightweight (vs Redux), simple API |
| **React Hook Form** | Form handling | Better performance than Formik, smaller bundle |
| **Zod** | Schema validation | Type-safe validation, integrates with React Hook Form |

---

## 3. UI/UX Design Vision

### Design Inspiration

Based on [Game UI Database research](https://www.gameuidatabase.com/) and [mobile game UI trends](https://allclonescript.com/blog/mobile-game-app-ui-designs):

#### Modern Gaming UI Principles
1. **Card-based design** - Characters as beautiful cards with role icons
2. **Bold typography** - Clear hierarchy, readable at arm's length
3. **Rich animations** - Slide transitions, fade-ins, scale effects
4. **Haptic feedback** - Vibration on button presses (mobile)
5. **Dark theme first** - Reduces screen glare when passing phone
6. **Generous touch targets** - Minimum 48x48px for mobile

### Mobile-First Design (Phone Pass-Around)

#### Key UX Considerations

**Privacy Protection**
```
┌─────────────────────────────────┐
│  Ready to see your role?        │
│                                 │
│  [Tap to Reveal]                │
│                                 │
│  (Blur overlay until tapped)    │
└─────────────────────────────────┘
```

**Screen Lock Reminder**
```
┌─────────────────────────────────┐
│  ⚠️ Privacy Mode Active          │
│                                 │
│  Show this to no one!           │
│  Tap when done viewing          │
│                                 │
│  [I'm Done] (5s timer)          │
└─────────────────────────────────┘
```

**Orientation Lock**
- Force portrait mode (easier to pass around)
- Prevent accidental landscape reveals

**Prevent Screen Sleep**
- Use Wake Lock API to keep screen on during setup
- Auto-sleep after completion

### Design System

#### Color Palette (Dark Theme)

```css
/* Background */
--bg-primary: #0a0a0f;      /* Deep space black */
--bg-secondary: #1a1a2e;    /* Card background */
--bg-tertiary: #16213e;     /* Elevated elements */

/* Alignment Colors */
--good: #4ade80;            /* Vibrant green */
--evil: #ef4444;            /* Danger red */
--neutral: #94a3b8;         /* Slate gray */

/* Role-Specific Colors */
--merlin: #60a5fa;          /* Blue */
--morgana: #a855f7;         /* Purple */
--assassin: #dc2626;        /* Dark red */
--perceival: #34d399;       /* Teal */

/* UI Elements */
--text-primary: #f8fafc;
--text-secondary: #cbd5e1;
--border: #334155;
--accent: #f59e0b;          /* Amber for highlights */
```

#### Typography

```css
/* Font Stack */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Sizes */
--text-xs: 0.75rem;   /* 12px - labels */
--text-sm: 0.875rem;  /* 14px - body */
--text-base: 1rem;    /* 16px - default */
--text-lg: 1.125rem;  /* 18px - subheadings */
--text-xl: 1.25rem;   /* 20px - headings */
--text-2xl: 1.5rem;   /* 24px - hero */
--text-3xl: 1.875rem; /* 30px - display */
```

#### Spacing (8px grid)

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
```

### Component Designs

#### 1. Character Selection Screen

```
┌───────────────────────────────────────┐
│  ⚔️ Avalon Setup                      │
│                                       │
│  Players: 5/10                        │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━       │
│                                       │
│  👤 Enter Your Name                   │
│  [________________]                   │
│                                       │
│  🎭 Select Your Role                  │
│                                       │
│  ┌──────────┐ ┌──────────┐          │
│  │ Merlin   │ │ Morgana  │          │
│  │    🧙    │ │    🧙    │          │
│  │  [Good]  │ │  [Evil]  │ [TAKEN] │
│  └──────────┘ └──────────┘          │
│                                       │
│  ┌──────────┐ ┌──────────┐          │
│  │Perceival │ │ Assassin │          │
│  │    🛡️    │ │    🗡️    │          │
│  │  [Good]  │ │  [Evil]  │          │
│  └──────────┘ └──────────┘          │
│                                       │
│  [+ Add Player]                       │
│                                       │
│  ── Players Added ──                  │
│  • Alice (Merlin) 🧙                  │
│  • Bob (Assassin) 🗡️                 │
│                                       │
│  [Start Game] (disabled until 5+)     │
└───────────────────────────────────────┘
```

#### 2. Role Reveal Screen

```
┌───────────────────────────────────────┐
│                                       │
│              ALICE                    │
│                                       │
│          Tap to reveal                │
│          your role                    │
│                                       │
│     ┌─────────────────────┐          │
│     │                     │          │
│     │    [👁️ REVEAL]      │          │
│     │                     │          │
│     └─────────────────────┘          │
│                                       │
│  ⚠️ Show this to no one else!         │
│                                       │
└───────────────────────────────────────┘

   (After tap with blur-out animation)

┌───────────────────────────────────────┐
│           🧙 MERLIN 🧙                 │
│                                       │
│  You are on the GOOD team             │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │  You see these EVIL players:    │ │
│  │                                 │ │
│  │  🗡️ Bob (Assassin)              │ │
│  │  🧙 Charlie (Morgana)           │ │
│  │                                 │ │
│  │  ⚠️ You do NOT see Modred!      │ │
│  └─────────────────────────────────┘ │
│                                       │
│  Remember: The Assassin will try to   │
│  kill you if good wins!               │
│                                       │
│  [✓ I Understand] (5s timer)          │
│                                       │
│  Pass to next player ➡️               │
└───────────────────────────────────────┘
```

#### 3. Game Setup Summary

```
┌───────────────────────────────────────┐
│  ✅ All Roles Revealed!               │
│                                       │
│  ┌─────────────────────────────────┐ │
│  │  GAME SETUP                     │ │
│  │                                 │ │
│  │  Players: 5                     │ │
│  │  Good: 3 👥                     │ │
│  │  Evil: 2 👥                     │ │
│  │                                 │ │
│  │  Special Roles:                 │ │
│  │  • Merlin                       │ │
│  │  • Perceival                    │ │
│  │  • Morgana                      │ │
│  │  • Assassin                     │ │
│  └─────────────────────────────────┘ │
│                                       │
│  [Start New Game]                     │
│  [Play Avalon] (external link)        │
│                                       │
└───────────────────────────────────────┘
```

### Animation Principles

Using [Framer Motion](https://www.framer.com/motion/):

```typescript
// Card entrance
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

// Role reveal (blur to sharp)
const revealVariants = {
  blurred: {
    filter: "blur(20px)",
    scale: 0.95
  },
  sharp: {
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

// Page transitions
const pageVariants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 }
}
```

---

## 4. Architecture Improvements

### Current Architecture (jQuery)

```
index.html (Structure)
    ↓
avalon.js (Logic + DOM Manipulation)
    ↓
Global Variables (characterhash, arrays)
    ↓
Event Handlers (click, validate, display)
```

**Problems:**
- Monolithic JavaScript file
- Global state (easy to corrupt)
- Tight coupling (logic + UI)
- Hard to test
- Hard to extend

### Proposed Architecture (React)

```
┌─────────────────────────────────────────────────┐
│              Application Layer                  │
│  App.tsx (Router, global providers)             │
└──────────────────┬──────────────────────────────┘
                   │
    ┌──────────────┴──────────────┐
    │                             │
┌───▼──────────────┐    ┌────────▼────────────┐
│  Game State      │    │  UI Components      │
│  (Zustand Store) │◄───┤  (React Components) │
└───┬──────────────┘    └─────────────────────┘
    │
┌───▼──────────────────────────────┐
│  Game Logic (Pure Functions)     │
│  - validatePlayers()              │
│  - calculateVisibility()          │
│  - checkRoleBalance()             │
└───┬──────────────────────────────┘
    │
┌───▼──────────────────────────────┐
│  Game Rules (Constants)           │
│  - ROLES                          │
│  - VISIBILITY_MATRIX              │
│  - PLAYER_COUNT_RULES             │
└───────────────────────────────────┘
```

### Directory Structure

```
avalon-react/
├── public/
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/           # UI Components
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ...
│   │   ├── game/            # Game-specific components
│   │   │   ├── CharacterCard.tsx
│   │   │   ├── PlayerSetup.tsx
│   │   │   ├── RoleReveal.tsx
│   │   │   └── GameSummary.tsx
│   │   └── layout/          # Layout components
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Container.tsx
│   ├── store/               # State management
│   │   └── gameStore.ts     # Zustand store
│   ├── lib/                 # Business logic
│   │   ├── game-rules.ts    # Constants, role definitions
│   │   ├── game-logic.ts    # Core game functions
│   │   ├── validators.ts    # Validation functions
│   │   └── utils.ts         # Utility functions
│   ├── hooks/               # Custom React hooks
│   │   ├── useGameState.ts
│   │   ├── useWakeLock.ts
│   │   └── useHaptic.ts
│   ├── types/               # TypeScript types
│   │   └── game.types.ts
│   ├── styles/              # Global styles
│   │   └── globals.css
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── vite-env.d.ts
├── tests/
│   ├── unit/                # Unit tests (Vitest)
│   │   ├── game-logic.test.ts
│   │   └── validators.test.ts
│   ├── integration/         # Component tests (RTL)
│   │   ├── PlayerSetup.test.tsx
│   │   └── RoleReveal.test.tsx
│   └── e2e/                 # E2E tests (Playwright)
│       └── game-flow.spec.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── components.json          # shadcn/ui config
└── README.md
```

### State Management (Zustand)

```typescript
// src/store/gameStore.ts
import { create } from 'zustand';
import { Player, GamePhase, Role } from '@/types/game.types';

interface GameState {
  // Data
  players: Player[];
  currentPlayerIndex: number;
  phase: GamePhase;

  // Actions
  addPlayer: (name: string, role: Role) => void;
  removePlayer: (playerId: string) => void;
  startReveal: () => void;
  nextPlayer: () => void;
  resetGame: () => void;

  // Computed
  isValidGame: () => boolean;
  getVisiblePlayers: (playerId: string) => Player[];
}

export const useGameStore = create<GameState>((set, get) => ({
  players: [],
  currentPlayerIndex: 0,
  phase: 'setup',

  addPlayer: (name, role) => set((state) => ({
    players: [...state.players, { id: crypto.randomUUID(), name, role }]
  })),

  removePlayer: (playerId) => set((state) => ({
    players: state.players.filter(p => p.id !== playerId)
  })),

  startReveal: () => {
    const { isValidGame } = get();
    if (isValidGame()) {
      set({ phase: 'reveal' });
    }
  },

  nextPlayer: () => set((state) => ({
    currentPlayerIndex: state.currentPlayerIndex + 1,
    phase: state.currentPlayerIndex + 1 >= state.players.length ? 'complete' : 'reveal'
  })),

  resetGame: () => set({
    players: [],
    currentPlayerIndex: 0,
    phase: 'setup'
  }),

  isValidGame: () => {
    const { players } = get();
    return validatePlayers(players);
  },

  getVisiblePlayers: (playerId) => {
    const { players } = get();
    return calculateVisiblePlayers(players, playerId);
  }
}));
```

### Type Definitions

```typescript
// src/types/game.types.ts

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

export type GamePhase = 'setup' | 'reveal' | 'complete';

export interface RoleDefinition {
  name: Role;
  alignment: Alignment;
  description: string;
  canDuplicate: boolean;
  emoji: string;
  color: string;
  visibilityRule: (players: Player[]) => Player[];
}

export interface Player {
  id: string;
  name: string;
  role: Role;
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
```

---

## 5. Game Logic Improvements

### Current Logic Issues

1. **No player count validation**
   - Allows < 5 or > 10 players (Avalon requires 5-10)

2. **No role balance validation**
   - Can create all good or all evil
   - Should enforce evil count: 5-6p=2, 7p=3, 8-9p=3-4, 10p=4

3. **Hardcoded visibility**
   - Cannot customize for variants

4. **No setup guidance**
   - Players must know which characters to pick

### Proposed Improvements

#### 1. Game Rules Configuration

```typescript
// src/lib/game-rules.ts

export const GAME_CONFIG: GameConfig = {
  minPlayers: 5,
  maxPlayers: 10,

  // Evil count by player count (official rules)
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

export const ROLES: Record<Role, RoleDefinition> = {
  Merlin: {
    name: 'Merlin',
    alignment: 'Good',
    description: 'Knows all evil players except Modred',
    canDuplicate: false,
    emoji: '🧙',
    color: 'blue',
    visibilityRule: (players) =>
      players.filter(p =>
        p.role === 'Morgana' ||
        p.role === 'Assassin' ||
        p.role === 'Minion' ||
        p.role === 'Oberon'
      )
  },

  Perceival: {
    name: 'Perceival',
    alignment: 'Good',
    description: 'Sees Merlin and Morgana but cannot distinguish them',
    canDuplicate: false,
    emoji: '🛡️',
    color: 'teal',
    visibilityRule: (players) =>
      players.filter(p => p.role === 'Merlin' || p.role === 'Morgana')
  },

  Arthur: {
    name: 'Arthur',
    alignment: 'Good',
    description: 'Generic good player with no special abilities',
    canDuplicate: true,
    emoji: '⚔️',
    color: 'green',
    visibilityRule: () => []
  },

  Morgana: {
    name: 'Morgana',
    alignment: 'Evil',
    description: 'Appears as Merlin to Perceival',
    canDuplicate: false,
    emoji: '🔮',
    color: 'purple',
    visibilityRule: (players) =>
      players.filter(p =>
        (p.role === 'Morgana' ||
         p.role === 'Modred' ||
         p.role === 'Assassin' ||
         p.role === 'Minion') &&
        p.role !== 'Oberon'
      )
  },

  Modred: {
    name: 'Modred',
    alignment: 'Evil',
    description: 'Invisible to Merlin',
    canDuplicate: false,
    emoji: '🗡️',
    color: 'red',
    visibilityRule: (players) =>
      players.filter(p =>
        (p.role === 'Morgana' ||
         p.role === 'Modred' ||
         p.role === 'Assassin' ||
         p.role === 'Minion') &&
        p.role !== 'Oberon'
      )
  },

  Minion: {
    name: 'Minion',
    alignment: 'Evil',
    description: 'Generic evil player',
    canDuplicate: true,
    emoji: '👤',
    color: 'gray',
    visibilityRule: (players) =>
      players.filter(p =>
        (p.role === 'Morgana' ||
         p.role === 'Modred' ||
         p.role === 'Assassin' ||
         p.role === 'Minion') &&
        p.role !== 'Oberon'
      )
  },

  Assassin: {
    name: 'Assassin',
    alignment: 'Evil',
    description: 'Can kill Merlin if good wins',
    canDuplicate: false,
    emoji: '🗡️',
    color: 'red',
    visibilityRule: (players) =>
      players.filter(p =>
        (p.role === 'Morgana' ||
         p.role === 'Modred' ||
         p.role === 'Assassin' ||
         p.role === 'Minion') &&
        p.role !== 'Oberon'
      )
  },

  Oberon: {
    name: 'Oberon',
    alignment: 'Evil',
    description: 'Does not know other evil players',
    canDuplicate: false,
    emoji: '👁️',
    color: 'darkred',
    visibilityRule: () => []
  }
};
```

#### 2. Validation Functions

```typescript
// src/lib/validators.ts

export function validatePlayers(players: Player[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check player count
  if (players.length < GAME_CONFIG.minPlayers) {
    errors.push(`Need at least ${GAME_CONFIG.minPlayers} players (current: ${players.length})`);
  }
  if (players.length > GAME_CONFIG.maxPlayers) {
    errors.push(`Maximum ${GAME_CONFIG.maxPlayers} players allowed (current: ${players.length})`);
  }

  // Check role balance
  const evilCount = players.filter(p => ROLES[p.role].alignment === 'Evil').length;
  const expectedEvil = GAME_CONFIG.evilCountByPlayers[players.length];

  if (evilCount !== expectedEvil) {
    errors.push(`Need exactly ${expectedEvil} evil players for ${players.length} players (current: ${evilCount})`);
  }

  // Check required roles
  const presentRoles = new Set(players.map(p => p.role));
  for (const requiredRole of GAME_CONFIG.requiredRoles) {
    if (!presentRoles.has(requiredRole)) {
      errors.push(`Required role missing: ${requiredRole}`);
    }
  }

  // Check duplicate roles
  const roleCounts = new Map<Role, number>();
  for (const player of players) {
    roleCounts.set(player.role, (roleCounts.get(player.role) || 0) + 1);
  }

  for (const [role, count] of roleCounts.entries()) {
    if (count > 1 && !ROLES[role].canDuplicate) {
      errors.push(`Role ${role} cannot be duplicated (found ${count})`);
    }
  }

  // Check for illogical setups (warnings)
  if (presentRoles.has('Perceival') && !presentRoles.has('Merlin')) {
    warnings.push('Perceival without Merlin is not recommended');
  }

  if (presentRoles.has('Perceival') && !presentRoles.has('Morgana')) {
    warnings.push('Perceival without Morgana makes the role less interesting');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

export function validatePlayerName(name: string, existingPlayers: Player[]): ValidationResult {
  const errors: string[] = [];

  if (name.trim().length === 0) {
    errors.push('Name cannot be empty');
  }

  if (name.trim().length > 20) {
    errors.push('Name too long (max 20 characters)');
  }

  if (existingPlayers.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    errors.push('Name already taken');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: []
  };
}
```

#### 3. Core Game Logic

```typescript
// src/lib/game-logic.ts

export function calculateVisiblePlayers(
  allPlayers: Player[],
  currentPlayerId: string
): Player[] {
  const currentPlayer = allPlayers.find(p => p.id === currentPlayerId);
  if (!currentPlayer) return [];

  const roleDefinition = ROLES[currentPlayer.role];
  return roleDefinition.visibilityRule(allPlayers.filter(p => p.id !== currentPlayerId));
}

export function getRecommendedSetup(playerCount: number): Role[] {
  return GAME_CONFIG.recommendedSetups[playerCount] || [];
}

export function getAvailableRoles(currentPlayers: Player[]): Role[] {
  const usedRoles = new Set<Role>();

  for (const player of currentPlayers) {
    if (!ROLES[player.role].canDuplicate) {
      usedRoles.add(player.role);
    }
  }

  return (Object.keys(ROLES) as Role[]).filter(role => !usedRoles.has(role));
}

export function getRoleBalance(players: Player[]): { good: number; evil: number } {
  return players.reduce(
    (acc, player) => {
      const alignment = ROLES[player.role].alignment;
      return alignment === 'Good'
        ? { ...acc, good: acc.good + 1 }
        : { ...acc, evil: acc.evil + 1 };
    },
    { good: 0, evil: 0 }
  );
}

export function toTitleCase(str: string): string {
  return str.replace(/^(\w)|(\s\w)/g, match => match.toUpperCase());
}
```

#### 4. Smart Setup Assistant

```typescript
// src/lib/setup-assistant.ts

export interface SetupSuggestion {
  playerCount: number;
  missingCount: number;
  suggestedRoles: Role[];
  reasoning: string;
}

export function getSuggestedNextRole(
  currentPlayers: Player[],
  targetPlayerCount: number
): SetupSuggestion {
  const remaining = targetPlayerCount - currentPlayers.length;
  const recommended = getRecommendedSetup(targetPlayerCount);
  const currentRoles = currentPlayers.map(p => p.role);

  // Find roles from recommended setup not yet added
  const missingRoles = recommended.filter(role => {
    const roleCount = currentRoles.filter(r => r === role).length;
    const recommendedCount = recommended.filter(r => r === role).length;
    return roleCount < recommendedCount;
  });

  const { good, evil } = getRoleBalance(currentPlayers);
  const targetEvil = GAME_CONFIG.evilCountByPlayers[targetPlayerCount];
  const needEvil = targetEvil - evil;
  const needGood = targetPlayerCount - currentPlayers.length - needEvil;

  let reasoning = '';
  let suggestedRoles: Role[] = [];

  if (needEvil > 0 && needGood > 0) {
    // Need both
    const evilRoles = missingRoles.filter(r => ROLES[r].alignment === 'Evil');
    const goodRoles = missingRoles.filter(r => ROLES[r].alignment === 'Good');
    suggestedRoles = [...evilRoles.slice(0, needEvil), ...goodRoles.slice(0, needGood)];
    reasoning = `Need ${needEvil} evil and ${needGood} good players`;
  } else if (needEvil > 0) {
    // Need only evil
    const evilRoles = missingRoles.filter(r => ROLES[r].alignment === 'Evil');
    suggestedRoles = evilRoles.slice(0, needEvil);
    reasoning = `Need ${needEvil} more evil players`;
  } else {
    // Need only good
    const goodRoles = missingRoles.filter(r => ROLES[r].alignment === 'Good');
    suggestedRoles = goodRoles.slice(0, needGood);
    reasoning = `Need ${needGood} more good players`;
  }

  return {
    playerCount: targetPlayerCount,
    missingCount: remaining,
    suggestedRoles,
    reasoning
  };
}
```

---

## 6. Testing Strategy

### Testing Pyramid

```
        ┌─────────┐
        │   E2E   │  (10% - Critical user flows)
        │   🌐    │
        ├─────────┤
        │Integration│  (30% - Component interactions)
        │    🔗    │
        ├─────────┤
        │  Unit   │  (60% - Business logic)
        │   ⚙️    │
        └─────────┘
```

### 1. Unit Tests (Vitest)

**Test Files:**
- `tests/unit/game-logic.test.ts`
- `tests/unit/validators.test.ts`
- `tests/unit/setup-assistant.test.ts`

**Example: Game Logic Tests**

```typescript
// tests/unit/game-logic.test.ts
import { describe, it, expect } from 'vitest';
import { calculateVisiblePlayers, getRoleBalance } from '@/lib/game-logic';
import { Player } from '@/types/game.types';

describe('calculateVisiblePlayers', () => {
  it('Merlin sees all evil except Modred', () => {
    const players: Player[] = [
      { id: '1', name: 'Alice', role: 'Merlin' },
      { id: '2', name: 'Bob', role: 'Morgana' },
      { id: '3', name: 'Charlie', role: 'Modred' },
      { id: '4', name: 'David', role: 'Assassin' }
    ];

    const visible = calculateVisiblePlayers(players, '1');

    expect(visible).toHaveLength(2);
    expect(visible.some(p => p.role === 'Morgana')).toBe(true);
    expect(visible.some(p => p.role === 'Assassin')).toBe(true);
    expect(visible.some(p => p.role === 'Modred')).toBe(false);
  });

  it('Perceival sees Merlin and Morgana', () => {
    const players: Player[] = [
      { id: '1', name: 'Alice', role: 'Perceival' },
      { id: '2', name: 'Bob', role: 'Merlin' },
      { id: '3', name: 'Charlie', role: 'Morgana' },
      { id: '4', name: 'David', role: 'Arthur' }
    ];

    const visible = calculateVisiblePlayers(players, '1');

    expect(visible).toHaveLength(2);
    expect(visible.some(p => p.role === 'Merlin')).toBe(true);
    expect(visible.some(p => p.role === 'Morgana')).toBe(true);
  });

  it('Oberon sees no one', () => {
    const players: Player[] = [
      { id: '1', name: 'Alice', role: 'Oberon' },
      { id: '2', name: 'Bob', role: 'Morgana' },
      { id: '3', name: 'Charlie', role: 'Assassin' }
    ];

    const visible = calculateVisiblePlayers(players, '1');

    expect(visible).toHaveLength(0);
  });

  it('Evil players do not see Oberon', () => {
    const players: Player[] = [
      { id: '1', name: 'Alice', role: 'Assassin' },
      { id: '2', name: 'Bob', role: 'Oberon' },
      { id: '3', name: 'Charlie', role: 'Morgana' }
    ];

    const visible = calculateVisiblePlayers(players, '1');

    expect(visible).toHaveLength(1);
    expect(visible[0].role).toBe('Morgana');
  });
});

describe('getRoleBalance', () => {
  it('calculates correct good/evil split', () => {
    const players: Player[] = [
      { id: '1', name: 'Alice', role: 'Merlin' },
      { id: '2', name: 'Bob', role: 'Perceival' },
      { id: '3', name: 'Charlie', role: 'Arthur' },
      { id: '4', name: 'David', role: 'Morgana' },
      { id: '5', name: 'Eve', role: 'Assassin' }
    ];

    const balance = getRoleBalance(players);

    expect(balance.good).toBe(3);
    expect(balance.evil).toBe(2);
  });
});
```

**Test Coverage Goals:**
- Game logic: 100%
- Validators: 100%
- Setup assistant: 95%+

### 2. Integration Tests (React Testing Library)

**Test Files:**
- `tests/integration/PlayerSetup.test.tsx`
- `tests/integration/RoleReveal.test.tsx`
- `tests/integration/GameFlow.test.tsx`

**Example: Player Setup Component Tests**

```typescript
// tests/integration/PlayerSetup.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import PlayerSetup from '@/components/game/PlayerSetup';

describe('PlayerSetup', () => {
  it('adds a player when form is submitted', async () => {
    const user = userEvent.setup();
    render(<PlayerSetup />);

    // Enter name
    const nameInput = screen.getByLabelText(/enter your name/i);
    await user.type(nameInput, 'Alice');

    // Select role
    const merlinButton = screen.getByRole('button', { name: /merlin/i });
    await user.click(merlinButton);

    // Submit
    const submitButton = screen.getByRole('button', { name: /add player/i });
    await user.click(submitButton);

    // Verify player added
    expect(screen.getByText(/alice/i)).toBeInTheDocument();
    expect(screen.getByText(/merlin/i)).toBeInTheDocument();
  });

  it('shows error when name is empty', async () => {
    const user = userEvent.setup();
    render(<PlayerSetup />);

    const merlinButton = screen.getByRole('button', { name: /merlin/i });
    await user.click(merlinButton);

    const submitButton = screen.getByRole('button', { name: /add player/i });
    await user.click(submitButton);

    expect(screen.getByText(/name cannot be empty/i)).toBeInTheDocument();
  });

  it('disables taken roles', async () => {
    const user = userEvent.setup();
    render(<PlayerSetup />);

    // Add first player with Merlin
    await user.type(screen.getByLabelText(/enter your name/i), 'Alice');
    await user.click(screen.getByRole('button', { name: /^merlin$/i }));
    await user.click(screen.getByRole('button', { name: /add player/i }));

    // Try to add second player with Merlin
    const merlinButton = screen.getByRole('button', { name: /^merlin$/i });
    expect(merlinButton).toBeDisabled();
  });

  it('shows validation errors for invalid setup', async () => {
    const user = userEvent.setup();
    render(<PlayerSetup />);

    // Add 3 good players
    for (const name of ['Alice', 'Bob', 'Charlie']) {
      await user.type(screen.getByLabelText(/enter your name/i), name);
      await user.click(screen.getByRole('button', { name: /arthur/i }));
      await user.click(screen.getByRole('button', { name: /add player/i }));
    }

    // Try to start game
    const startButton = screen.getByRole('button', { name: /start game/i });
    await user.click(startButton);

    // Should show error (need 5 players minimum)
    expect(screen.getByText(/need at least 5 players/i)).toBeInTheDocument();
  });
});
```

### 3. E2E Tests (Playwright)

**Test Files:**
- `tests/e2e/5-player-game.spec.ts`
- `tests/e2e/10-player-game.spec.ts`
- `tests/e2e/custom-setup.spec.ts`

**Example: Complete Game Flow**

```typescript
// tests/e2e/5-player-game.spec.ts
import { test, expect } from '@playwright/test';

test.describe('5-Player Game Flow', () => {
  test('complete game setup and role reveal', async ({ page }) => {
    await page.goto('/');

    // Setup 5 players with recommended roles
    const players = [
      { name: 'Alice', role: 'Merlin' },
      { name: 'Bob', role: 'Perceival' },
      { name: 'Charlie', role: 'Arthur' },
      { name: 'David', role: 'Morgana' },
      { name: 'Eve', role: 'Assassin' }
    ];

    for (const player of players) {
      await page.fill('input[name="playerName"]', player.name);
      await page.click(`button[data-role="${player.role}"]`);
      await page.click('button:has-text("Add Player")');
    }

    // Verify all players added
    for (const player of players) {
      await expect(page.locator(`text=${player.name}`)).toBeVisible();
    }

    // Start role reveal
    await page.click('button:has-text("Start Game")');

    // Verify each player can see their role
    for (let i = 0; i < players.length; i++) {
      const player = players[i];

      // Player name should be visible
      await expect(page.locator(`text=${player.name}`)).toBeVisible();

      // Click to reveal
      await page.click('button:has-text("Reveal")');

      // Verify role is shown
      await expect(page.locator(`text=${player.role}`)).toBeVisible();

      // Verify visibility rules
      if (player.role === 'Merlin') {
        await expect(page.locator('text=David')).toBeVisible(); // Morgana
        await expect(page.locator('text=Eve')).toBeVisible(); // Assassin
      }

      if (player.role === 'Perceival') {
        await expect(page.locator('text=Alice')).toBeVisible(); // Merlin
        await expect(page.locator('text=David')).toBeVisible(); // Morgana
      }

      // Go to next player (if not last)
      if (i < players.length - 1) {
        await page.click('button:has-text("Next")');
      }
    }

    // Verify game complete
    await expect(page.locator('text=All Roles Revealed')).toBeVisible();
  });

  test('validates minimum player count', async ({ page }) => {
    await page.goto('/');

    // Add only 3 players
    const players = [
      { name: 'Alice', role: 'Merlin' },
      { name: 'Bob', role: 'Arthur' },
      { name: 'Charlie', role: 'Assassin' }
    ];

    for (const player of players) {
      await page.fill('input[name="playerName"]', player.name);
      await page.click(`button[data-role="${player.role}"]`);
      await page.click('button:has-text("Add Player")');
    }

    // Try to start game
    const startButton = page.locator('button:has-text("Start Game")');
    await expect(startButton).toBeDisabled();

    // Should show error message
    await expect(page.locator('text=/need at least 5 players/i')).toBeVisible();
  });
});
```

### Test Matrix: Player Count Coverage

| Player Count | Good | Evil | Test File |
|--------------|------|------|-----------|
| 5 | 3 | 2 | `5-player-game.spec.ts` |
| 6 | 4 | 2 | `6-player-game.spec.ts` |
| 7 | 4 | 3 | `7-player-game.spec.ts` |
| 8 | 5 | 3 | `8-player-game.spec.ts` |
| 9 | 6 | 3 | `9-player-game.spec.ts` |
| 10 | 6 | 4 | `10-player-game.spec.ts` |

### CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:unit

      - name: Run integration tests
        run: npm run test:integration

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## 7. Implementation Phases

### Phase 1: Foundation (Week 1)

**Goal**: Set up modern development environment

- [ ] Initialize Vite + React + TypeScript project
- [ ] Configure Tailwind CSS v4
- [ ] Install and configure shadcn/ui
- [ ] Set up Vitest + React Testing Library
- [ ] Set up Playwright for E2E tests
- [ ] Create project structure (components, lib, store)
- [ ] Define TypeScript types (`game.types.ts`)
- [ ] Set up CI/CD pipeline (GitHub Actions)

**Deliverables:**
- Working development environment
- Empty component structure
- Test infrastructure ready

---

### Phase 2: Core Game Logic (Week 1-2)

**Goal**: Implement and test business logic

- [ ] Implement `game-rules.ts` (ROLES, GAME_CONFIG)
- [ ] Implement `game-logic.ts` (visibility calculations)
- [ ] Implement `validators.ts` (player validation)
- [ ] Implement `setup-assistant.ts` (smart suggestions)
- [ ] Write comprehensive unit tests (100% coverage)
- [ ] Document game rules and edge cases

**Deliverables:**
- Fully tested game logic
- 100% unit test coverage
- Documentation of rules

---

### Phase 3: State Management (Week 2)

**Goal**: Implement global state with Zustand

- [ ] Create `gameStore.ts` with all actions
- [ ] Implement state persistence (localStorage)
- [ ] Add state reset functionality
- [ ] Add computed values (isValidGame, etc.)
- [ ] Write tests for store actions

**Deliverables:**
- Working state management
- State persists across refreshes (optional)

---

### Phase 4: UI Components (Week 2-3)

**Goal**: Build shadcn/ui-based components

- [ ] Create `CharacterCard` component
- [ ] Create `PlayerSetup` component with form validation
- [ ] Create `RoleReveal` component with animations
- [ ] Create `GameSummary` component
- [ ] Implement responsive layouts
- [ ] Add Framer Motion animations
- [ ] Write component integration tests

**Deliverables:**
- All UI components functional
- Responsive design working
- Smooth animations

---

### Phase 5: Mobile Optimizations (Week 3)

**Goal**: Perfect mobile experience

- [ ] Implement Wake Lock API (prevent screen sleep)
- [ ] Add haptic feedback (vibration on interactions)
- [ ] Implement privacy blur/reveal animations
- [ ] Add orientation lock (portrait only)
- [ ] Optimize touch targets (min 48x48px)
- [ ] Test on real mobile devices (iOS/Android)

**Deliverables:**
- Excellent mobile UX
- Privacy protections in place

---

### Phase 6: Testing & Validation (Week 3-4)

**Goal**: Comprehensive test coverage

- [ ] Write E2E tests for 5-10 player games
- [ ] Test all character combinations
- [ ] Test edge cases (duplicate roles, invalid setups)
- [ ] Accessibility testing (keyboard nav, screen reader)
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Performance testing (Lighthouse scores)

**Deliverables:**
- 90%+ test coverage
- All player counts validated
- Accessibility compliant

---

### Phase 7: Polish & Deploy (Week 4)

**Goal**: Production-ready application

- [ ] Design final color scheme and branding
- [ ] Add sound effects (optional)
- [ ] Create onboarding/tutorial
- [ ] Write user documentation
- [ ] Optimize bundle size
- [ ] Set up production build
- [ ] Deploy to hosting (Vercel/Netlify)
- [ ] Set up analytics (optional)

**Deliverables:**
- Production deployment
- User documentation
- Analytics dashboard

---

## 8. Migration Plan

### Parallel Development Strategy

**Why Not Rewrite in Place?**
- Keep current site working during development
- Allows for A/B testing
- Safer rollback if issues arise

### Approach

1. **Create New Directory**: `avalon-react/`
2. **Develop in Parallel**: Keep `index.html` working
3. **Deploy to Subdomain**: `v2.avalon.example.com`
4. **Test Extensively**: Real users test new version
5. **Gradual Rollout**: Switch when confident
6. **Archive Old Version**: Keep for reference

### File Structure During Migration

```
Avalon-The-Resistance/
├── index.html              # OLD - Keep working
├── avalon.js               # OLD
├── avalon.css              # OLD
├── avalon-react/           # NEW - React app
│   ├── src/
│   ├── package.json
│   └── ...
├── CLAUDE.md               # Documentation
├── ARCHITECTURE_PLAN.md    # This file
└── README.md               # Update with migration notes
```

### Deployment Strategy

#### Option 1: GitHub Pages (Free)
```
Main site: https://yourusername.github.io/Avalon-The-Resistance/
New site: https://yourusername.github.io/Avalon-The-Resistance/v2/
```

#### Option 2: Vercel (Recommended)
- Automatic deployments from Git
- Preview deployments for PRs
- CDN edge caching
- Zero configuration

```bash
# Deploy to Vercel
cd avalon-react
npm install -g vercel
vercel deploy
```

#### Option 3: Netlify
- Similar to Vercel
- Drag-and-drop builds
- Free tier generous

---

## Summary: Key Improvements

### Technical
- ✅ Modern React 18+ architecture
- ✅ TypeScript for type safety
- ✅ Tailwind CSS + shadcn/ui for beautiful UI
- ✅ Zustand for simple state management
- ✅ Vitest + Playwright for comprehensive testing
- ✅ Vite for lightning-fast builds

### UX
- ✅ Mobile-first design (phone pass-around)
- ✅ Privacy blur/reveal animations
- ✅ Haptic feedback and wake lock
- ✅ Dark theme (reduces screen glare)
- ✅ Smooth Framer Motion animations
- ✅ Generous touch targets

### Game Logic
- ✅ Player count validation (5-10 players)
- ✅ Role balance validation (correct evil count)
- ✅ Smart setup assistant (suggests next roles)
- ✅ Customizable character selection
- ✅ Clear visibility rules (no hardcoded logic)
- ✅ Comprehensive testing (all player counts)

### Testing
- ✅ Unit tests (game logic, validators)
- ✅ Integration tests (components)
- ✅ E2E tests (full game flows for 5-10 players)
- ✅ 90%+ code coverage
- ✅ CI/CD pipeline

---

## Next Steps: Alignment & Approval

### Questions for You

1. **Timeline**: Is 3-4 weeks realistic for your schedule?
2. **Tech Stack**: Are you comfortable with React + TypeScript? (I can adjust if needed)
3. **Scope**: Do you want only role reveal, or expand to full game (missions, voting)?
4. **Design**: Any specific design preferences (colors, fonts, style)?
5. **Hosting**: GitHub Pages (free) or Vercel/Netlify (better DX)?
6. **Testing Priority**: How important is 100% test coverage vs shipping faster?

### Approval Checklist

Before we start implementation, please confirm:

- [ ] Technology stack approved (React + Tailwind + shadcn/ui)
- [ ] Architecture plan looks good
- [ ] Mobile-first UX priorities make sense
- [ ] Game logic improvements are correct
- [ ] Testing strategy is appropriate
- [ ] Implementation phases are realistic
- [ ] Migration plan works for you

---

**Ready to build?** Let's align on this plan, then start with Phase 1! 🚀

---

## References & Research Sources

### Technology Research
- [Best React UI Libraries for 2026](https://www.builder.io/blog/react-component-libraries-2026)
- [React Component Libraries in 2026](https://www.untitledui.com/blog/react-component-libraries)
- [Tailwind + shadcn/ui Setup Guide](https://medium.com/@yashbatra11111/tailwind-shadcn-ui-the-frontend-combo-everyone-uses-to-ship-uis-3x-faster-exact-setup-1c24676a01a1)
- [Building Scalable Design Systems](https://shadisbaih.medium.com/building-a-scalable-design-system-with-shadcn-ui-tailwind-css-and-design-tokens-031474b03690)
- [shadcn/ui Tailwind v4 Docs](https://ui.shadcn.com/docs/tailwind-v4)

### Game Design Research
- [Game UI Database](https://www.gameuidatabase.com/) - 55,000+ UI screenshots
- [Mobile Game UI Designs](https://allclonescript.com/blog/mobile-game-app-ui-designs)
- [99designs Game Web Design Ideas](https://99designs.com/inspiration/websites/game)

### Game Rules
- [The Resistance: Avalon Wiki](http://web.eecs.umich.edu/~gameprof/gamewiki/index.php/The_Resistance:_Avalon)
- [Official Avalon Rules PDF](http://upload.snakesandlattes.com/rules/r/ResistanceAvalon.pdf)
