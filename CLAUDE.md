# Avalon - The Resistance: React App Technical Documentation

## Table of Contents
1. [Introduction for Non-React Developers](#introduction-for-non-react-developers)
2. [Tech Stack Explained](#tech-stack-explained)
3. [Project Structure](#project-structure)
4. [Key React Concepts](#key-react-concepts)
5. [Game Flow Architecture](#game-flow-architecture)
6. [Component Breakdown](#component-breakdown)
7. [State Management with Zustand](#state-management-with-zustand)
8. [Role Visibility Logic](#role-visibility-logic)
9. [Styling with Tailwind CSS](#styling-with-tailwind-css)
10. [React Patterns Used](#react-patterns-used)
11. [Adding New Features](#adding-new-features)
12. [Troubleshooting](#troubleshooting)
13. [Deployment](#deployment)
14. [Future Full Game Features](#future-full-game-features)

---

## Introduction for Non-React Developers

This document explains the Avalon React app for developers who may not be familiar with React. Think of this as a beginner-friendly guide that explains not just WHAT the code does, but WHY and HOW it works.

### What is This App?

A web application that helps players set up the Avalon board game by:
1. Collecting player names
2. Randomly assigning roles
3. Privately revealing each player's role
4. Showing what information each role can see

### Why React?

React is like a **component factory** for building user interfaces. Instead of writing repetitive HTML, you create reusable "components" (like buttons, cards, forms) that can be used multiple times with different data.

**Traditional way (jQuery):**
```javascript
// Have to manually create and update HTML
$('#container').html('<button>Click me</button>');
$('#container button').click(function() { /*...*/ });
```

**React way:**
```jsx
// Define a component once, reuse everywhere
<Button onClick={handleClick}>Click me</Button>
```

---

## Tech Stack Explained

### 1. **React 19** - The UI Framework

**What it is:** A JavaScript library for building user interfaces.

**Think of it as:** A factory that produces interactive webpage "widgets" (components).

**Key benefit:** Write UI components once, reuse them everywhere with different data.

### 2. **TypeScript** - Type Safety

**What it is:** JavaScript with type checking.

**Think of it as:** Spell-check for your code.

**Example:**
```typescript
// TypeScript catches errors before runtime
let playerName: string = "Alice";
playerName = 123; // ❌ Error: Type 'number' is not assignable to type 'string'
```

### 3. **Vite** - Build Tool

**What it is:** A tool that:
- Runs a development server (hot reload)
- Bundles your code for production
- Handles TypeScript compilation

**Think of it as:** A factory assembly line that transforms your source code into optimized production code.

**Commands:**
```bash
npm run dev   # Start development server
npm run build # Create production bundle
```

### 4. **Tailwind CSS** - Utility-First CSS

**What it is:** CSS framework with pre-built utility classes.

**Think of it as:** LEGO blocks for styling.

**Example:**
```html
<!-- Traditional CSS -->
<style>.my-button { width: 100%; padding: 1rem; background: green; }</style>
<button class="my-button">Click</button>

<!-- Tailwind CSS -->
<button class="w-full p-4 bg-green-500">Click</button>
```

### 5. **Zustand** - State Management

**What it is:** A global store for your app's data.

**Think of it as:** A shared storage box that any component can read from or write to.

**Why needed:** React components need to share data (player list, current phase, etc.).

### 6. **shadcn/ui** - Component Library

**What it is:** Pre-built, accessible UI components.

**Think of it as:** A library of professional-looking, ready-to-use components (buttons, cards, dialogs).

**Key feature:** You own the code (copy-paste into your project, not a package dependency).

---

## Project Structure

```
avalon-react/src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── button.tsx         # Button with variants (good, evil, outline)
│   │   └── card.tsx           # Card container components
│   └── game/                  # Game-specific components
│       ├── HomePage.tsx       # Landing page
│       ├── GameModeSelection.tsx    # Choose game mode
│       ├── PlayerCountSelection.tsx # Choose player count
│       ├── PlayerSetup.tsx    # Enter player names
│       └── RoleReveal.tsx     # Multi-stage role revelation
├── lib/
│   ├── game-rules.ts          # Avalon rules and role definitions
│   ├── validators.ts          # Input validation functions
│   └── utils.ts               # Utility functions (cn for class merging)
├── store/
│   └── gameStore.ts           # Zustand state management
├── types/
│   └── game.types.ts          # TypeScript type definitions
├── App.tsx                    # Main app component (router)
├── index.css                  # Global CSS + Tailwind + animations
└── main.tsx                   # React app entry point
```

### File Explanations

| File | Purpose |
|------|---------|
| `main.tsx` | Entry point that mounts React app to DOM |
| `App.tsx` | Main router - shows different screens based on phase |
| `gameStore.ts` | Global state - stores players, phase, game data |
| `game-rules.ts` | Avalon rules - ROLES object, role presets |
| `validators.ts` | Input validation - check names, duplicates |
| `button.tsx` | Reusable button with variants (good/evil/outline) |
| `card.tsx` | Reusable card container |
| `HomePage.tsx` | Landing screen with "Play Game" button |
| `PlayerSetup.tsx` | Screen for entering player names |
| `RoleReveal.tsx` | Multi-screen role revelation flow |

---

## Key React Concepts

### 1. Components = Reusable UI Building Blocks

**What are components?**
Think of components like HTML templates that accept data.

**Example:**
```tsx
// Button component defined once
function Button({ children, onClick }) {
  return (
    <button className="px-4 py-2 bg-green-500" onClick={onClick}>
      {children}
    </button>
  );
}

// Used multiple times with different data
<Button onClick={() => alert('Play')}>Play Game</Button>
<Button onClick={() => alert('Setup')}>Setup</Button>
```

### 2. Props = Passing Data to Components

**Props** are like function arguments, but for components.

**Example:**
```tsx
// Component definition
function PlayerCard({ name, role }) {
  return <div>{name} is {role}</div>;
}

// Usage - passing data via props
<PlayerCard name="Alice" role="Merlin" />
<PlayerCard name="Bob" role="Assassin" />
```

### 3. State = Data That Can Change

**State** is data that can change over time (like player list, current phase).

**Example:**
```tsx
// useState hook creates state
const [count, setCount] = useState(0);

// Reading state
<div>Count: {count}</div>

// Updating state
<button onClick={() => setCount(count + 1)}>Increment</button>
```

### 4. Hooks = Special Functions for React Features

**Hooks** are functions that let you "hook into" React features.

**Common hooks:**
- `useState` - Create state
- `useEffect` - Run code when something changes
- `useRef` - Reference DOM elements

**Example:**
```tsx
// Countdown timer using useState and useEffect
const [countdown, setCountdown] = useState(3);

useEffect(() => {
  if (countdown > 0) {
    setTimeout(() => setCountdown(countdown - 1), 1000);
  }
}, [countdown]); // Run when countdown changes
```

### 5. Conditional Rendering

Show different UI based on conditions.

**Example:**
```tsx
{phase === 'home' && <HomePage />}
{phase === 'setup' && <PlayerSetup />}
{phase === 'reveal' && <RoleReveal />}
```

---

## Game Flow Architecture

### Phase-Based Navigation

The app uses a **state machine** pattern with phases:

```
Phase Flow:
home
  ↓ (click "Play Game")
mode-selection
  ↓ (choose "Role Revelation")
player-count
  ↓ (choose 6 or 7 players)
setup
  ↓ (enter names, click "Shuffle & Start")
reveal
  ↓ (all players see roles)
complete
  ↓ (show game summary)
```

### Implementation (App.tsx)

```tsx
function App() {
  const { phase } = useGameStore();

  return (
    <div className="min-h-screen bg-bg-primary">
      {phase === 'home' && <HomePage />}
      {phase === 'mode-selection' && <GameModeSelection />}
      {phase === 'player-count' && <PlayerCountSelection />}
      {phase === 'setup' && <PlayerSetup />}
      {phase === 'reveal' && <RoleReveal />}
    </div>
  );
}
```

---

## Component Breakdown

### 1. HomePage.tsx

**Purpose:** Landing page with "Play Game" button

**Key features:**
- Hero section with game title and description
- Feature cards (Secret Roles, Special Powers, Privacy)
- "Play Game" button with pulse animation

**Code structure:**
```tsx
export function HomePage() {
  const { setPhase } = useGameStore();

  const handlePlayGame = () => {
    setPhase('mode-selection'); // Navigate to next phase
  };

  return (
    <div className="...">
      {/* Hero section */}
      <h1>Avalon - The Resistance</h1>

      {/* Features */}
      <Card>Secret Roles</Card>
      <Card>Special Powers</Card>

      {/* CTA Button */}
      <Button onClick={handlePlayGame} variant="good">
        ▶️ Play Game
      </Button>
    </div>
  );
}
```

**State used:**
- `setPhase` - Changes app phase to navigate

### 2. GameModeSelection.tsx

**Purpose:** Choose between Role Revelation (active) or Full Game (coming soon)

**Key features:**
- Two clickable cards
- "Role Revelation" - navigates to player-count phase
- "Full Game" - disabled (coming soon)
- Back button to return home

**State used:**
- `setPhase` - Navigate between phases
- `setGameMode` - Store selected mode

### 3. PlayerCountSelection.tsx

**Purpose:** Choose 6 or 7 players

**Key features:**
- Two cards with team breakdown (good vs evil)
- Shows which roles will be assigned
- Cards aligned with `items-stretch` for consistent height
- Buttons with pulse animation

**Code pattern:**
```tsx
const handleSelectCount = (count: number) => {
  setPlayerCount(count);  // Store player count
  setPhase('setup');      // Navigate to setup
};
```

**State used:**
- `setPlayerCount` - Store selected count (6 or 7)
- `setPhase` - Navigate to setup phase

### 4. PlayerSetup.tsx

**Purpose:** Collect player names

**Key features:**
- Input field for player names
- Auto-refocus after adding player (useRef hook)
- Real-time validation (duplicates, empty names)
- "Shuffle & Start" button assigns roles and navigates

**Important pattern - Auto-refocus:**
```tsx
const inputRef = useRef<HTMLInputElement>(null);

const handleAddPlayer = () => {
  // ... validation and add player ...

  setName(''); // Clear input

  // Auto-refocus input
  setTimeout(() => {
    inputRef.current?.focus();
  }, 0);
};

// Attach ref to input
<input ref={inputRef} ... />
```

**State used:**
- `players` - List of added players
- `playerCount` - Target number of players
- `addPlayer` - Add player to list
- `assignRolesAndStart` - Shuffle roles and navigate

### 5. RoleReveal.tsx - The Most Complex Component

**Purpose:** Multi-stage role revelation flow

**Three stages:**

#### Stage 1: Pass Screen
Shows "Pass phone to [PlayerName]" with privacy warning.

**Purpose:** Give player time to receive device privately.

```tsx
if (revealStage === 'pass') {
  return (
    <div>
      <h1>Pass Phone To</h1>
      <h2>{currentPlayer.name}</h2>
      <Button onClick={handlePassToPlayer}>
        I'm {currentPlayer.name}, Reveal My Role →
      </Button>
    </div>
  );
}
```

#### Stage 2: Blur Screen
Shows blurred role with 3-second countdown.

**Purpose:**
- All players wait same time (prevents timing attacks)
- Build anticipation

**Key feature:** Both the dotted area AND button are clickable.

```tsx
if (revealStage === 'blur') {
  return (
    <div>
      {/* Clickable dotted border area */}
      <div className="cursor-pointer" onClick={handleReveal}>
        {isRevealing ? (
          <div className="text-8xl animate-pulse">{countdown}</div>
        ) : (
          <div className="blur-lg">🎭 Your Role</div>
        )}
      </div>

      {/* Button also triggers reveal */}
      <Button onClick={handleReveal} disabled={isRevealing}>
        {isRevealing ? `Revealing... (${countdown}s)` : 'Reveal My Role'}
      </Button>
    </div>
  );
}
```

**Countdown implementation:**
```tsx
const [countdown, setCountdown] = useState(3);
const [isRevealing, setIsRevealing] = useState(false);

useEffect(() => {
  if (isRevealing && countdown > 0) {
    setTimeout(() => setCountdown(countdown - 1), 1000);
  } else if (isRevealing && countdown === 0) {
    setRevealStage('revealed'); // Move to next stage
  }
}, [isRevealing, countdown]);
```

#### Stage 3: Revealed Screen
Shows role and visible players.

**Key features:**
- Show role emoji, name, alignment
- Show visible players (different for each role)
- Special message for Perceival
- "Next Player" button

**State used:**
- `getCurrentPlayer` - Get current player from store
- `getVisiblePlayers` - Get players visible to current player
- `nextPlayer` - Move to next player

---

## State Management with Zustand

### What is Zustand?

Zustand is a **global state store** - a centralized place to store data that multiple components need access to.

**Why needed?**
React components are isolated. Without a global store, passing data between components requires "prop drilling" (passing props through many levels).

### gameStore.ts Structure

```typescript
interface GameState {
  // ===== DATA (State) =====
  players: Player[];              // List of players with roles
  phase: GamePhase;               // Current app phase
  currentPlayerIndex: number;     // Which player is revealing
  playerCount: number | null;     // Target number (6 or 7)
  gameMode: GameMode;             // Role revelation or full game
  gameSummaryRevealed: boolean;   // Has summary been shown?

  // ===== ACTIONS (Functions) =====
  setPhase: (phase: GamePhase) => void;
  setGameMode: (mode: GameMode) => void;
  setPlayerCount: (count: number) => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  assignRolesAndStart: () => void;
  nextPlayer: () => void;
  getCurrentPlayer: () => Player | null;
  getVisiblePlayers: (playerId: string) => Player[];
  resetGame: () => void;
  revealGameSummary: () => void;
}
```

### How to Use Zustand

**1. Import the store:**
```tsx
import { useGameStore } from '@/store/gameStore';
```

**2. Extract what you need:**
```tsx
const { players, phase, addPlayer, setPhase } = useGameStore();
```

**3. Read state:**
```tsx
<div>Current phase: {phase}</div>
<div>Total players: {players.length}</div>
```

**4. Update state:**
```tsx
<button onClick={() => setPhase('setup')}>Go to Setup</button>
<button onClick={() => addPlayer('Alice')}>Add Alice</button>
```

### Key Store Functions Explained

#### assignRolesAndStart()
Assigns random roles to players and starts game.

**How it works:**
1. Get player names from state
2. Get role preset for player count (6 or 7)
3. Shuffle roles using Fisher-Yates algorithm
4. Assign roles to players
5. Set phase to 'reveal'

```typescript
assignRolesAndStart: () => {
  const count = get().playerCount;
  const playerNames = get().players.map(p => p.name);
  const assignedPlayers = assignRoles(playerNames, count);

  set({ players: assignedPlayers, phase: 'reveal' });
}
```

#### getVisiblePlayers(playerId)
Returns list of players visible to the given player.

**Logic:**
```typescript
Merlin sees:      All evil EXCEPT Modred
Perceival sees:   Merlin + Morgana (can't tell which is which)
Evil sees:        Other evil EXCEPT Oberon
Oberon sees:      No one
Arthur sees:      No one
```

---

## Role Visibility Logic

### How Visibility Works

Each role has different visibility rules. The `getVisiblePlayers` function implements these rules.

### Visibility Matrix

| Role | Sees |
|------|------|
| **Merlin** | Morgana, Assassin, Minion, Oberon (NOT Modred) |
| **Perceival** | Merlin, Morgana (can't distinguish) |
| **Morgana** | Other evil (NOT Oberon) |
| **Assassin** | Other evil (NOT Oberon) |
| **Minion** | Other evil (NOT Oberon) |
| **Modred** | Other evil (NOT Oberon) |
| **Oberon** | No one |
| **Arthur** | No one |

### Implementation

```typescript
getVisiblePlayers: (playerId: string) => {
  const player = get().players.find(p => p.id === playerId);
  const role = player?.role;

  if (role === 'Merlin') {
    // See all evil EXCEPT Modred
    return players.filter(p =>
      ['Morgana', 'Assassin', 'Minion', 'Oberon'].includes(p.role)
    );
  }

  if (role === 'Perceival') {
    // See Merlin and Morgana (ambiguous)
    return players.filter(p =>
      ['Merlin', 'Morgana'].includes(p.role)
    );
  }

  if (['Morgana', 'Assassin', 'Minion', 'Modred'].includes(role)) {
    // Evil sees other evil EXCEPT Oberon
    return players.filter(p =>
      ['Morgana', 'Assassin', 'Minion', 'Modred'].includes(p.role)
      && p.id !== playerId
    );
  }

  // Oberon and Arthur see no one
  return [];
}
```

---

## Styling with Tailwind CSS

### Tailwind Utility Classes

Tailwind provides pre-built CSS classes for common styles.

**Common patterns:**

```tsx
// Layout
className="flex items-center justify-center"  // Flexbox centering
className="grid grid-cols-2 gap-4"            // 2-column grid

// Spacing
className="p-4"      // padding: 1rem (all sides)
className="px-4"     // padding-left and padding-right
className="py-2"     // padding-top and padding-bottom
className="m-4"      // margin: 1rem
className="gap-4"    // gap: 1rem (for flex/grid)

// Sizing
className="w-full"   // width: 100%
className="h-16"     // height: 4rem
className="min-h-screen"  // min-height: 100vh

// Colors (custom theme)
className="bg-bg-primary"     // Background: #0a0a0f
className="bg-good"           // Background: #4ade80 (green)
className="bg-evil"           // Background: #ef4444 (red)
className="text-text-primary" // Text: #f8fafc (white)

// Typography
className="text-xl"          // font-size: 1.25rem
className="font-bold"        // font-weight: 700
className="text-center"      // text-align: center

// Borders
className="border border-border"  // 1px solid border
className="rounded-lg"            // border-radius: 0.5rem

// Shadows
className="shadow-xl"        // box-shadow (large)

// Transitions
className="transition-all"   // transition: all 0.3s
className="hover:scale-105"  // scale on hover

// Responsive
className="sm:text-xl md:text-2xl lg:text-3xl"  // Different sizes per breakpoint
```

### Custom Theme Colors

Defined in `tailwind.config.ts`:

```typescript
colors: {
  // Backgrounds
  'bg-primary': '#0a0a0f',    // Darkest
  'bg-secondary': '#1a1a2e',  // Medium dark
  'bg-tertiary': '#16213e',   // Lighter dark

  // Teams
  'good': '#4ade80',  // Green
  'evil': '#ef4444',  // Red

  // UI
  'text-primary': '#f8fafc',    // White text
  'text-secondary': '#cbd5e1',  // Gray text
  'border': '#334155',          // Border color
  'accent': '#f59e0b',          // Orange/amber (warnings)
}
```

### Custom Animations

Defined in `index.css`:

```css
@keyframes pulse-subtle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.02);
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s ease-in-out infinite;
}
```

**Usage:**
```tsx
<Button className="animate-pulse-subtle">
  Play Game
</Button>
```

---

## React Patterns Used

### 1. Conditional Rendering

Show/hide components based on conditions.

```tsx
// Phase-based routing
{phase === 'home' && <HomePage />}
{phase === 'setup' && <PlayerSetup />}

// Conditional UI
{error && <div className="text-evil">{error}</div>}
{players.length > 0 && <PlayerList />}
```

### 2. Conditional Styling

Change styles based on state.

```tsx
// Ternary operator
<Button className={allPlayersAdded ? 'bg-good' : 'bg-gray-500'}>
  {allPlayersAdded ? 'Start' : 'Add more players'}
</Button>

// Template literal with condition
<Button className={`w-full ${canAddMore ? 'animate-pulse-subtle' : ''}`}>
  Add Player
</Button>
```

### 3. State + Effects (Timer Pattern)

```tsx
const [countdown, setCountdown] = useState(3);
const [isRevealing, setIsRevealing] = useState(false);

useEffect(() => {
  if (isRevealing && countdown > 0) {
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(timer); // Cleanup
  } else if (isRevealing && countdown === 0) {
    // Countdown complete
    setRevealStage('revealed');
  }
}, [isRevealing, countdown]);
```

### 4. Refs for DOM Access

```tsx
const inputRef = useRef<HTMLInputElement>(null);

// Focus input programmatically
const focusInput = () => {
  inputRef.current?.focus();
};

// Attach to element
<input ref={inputRef} />
```

### 5. Event Handlers

```tsx
// Inline arrow function
<Button onClick={() => setPhase('setup')}>Next</Button>

// Named function
const handleClick = () => {
  console.log('Clicked!');
  setPhase('setup');
};
<Button onClick={handleClick}>Next</Button>

// With parameters
<Button onClick={() => handleSelectCount(6)}>6 Players</Button>
```

---

## Adding New Features

### Example: Adding 5-Player Support

**Step 1: Update game-rules.ts**

Add 5-player preset:
```typescript
export const ROLE_PRESETS: { [key: number]: Role[] } = {
  5: ['Merlin', 'Perceival', 'Arthur', 'Morgana', 'Assassin'],
  6: ['Merlin', 'Perceival', 'Arthur', 'Arthur', 'Morgana', 'Assassin'],
  7: ['Merlin', 'Perceival', 'Arthur', 'Arthur', 'Morgana', 'Assassin', 'Minion'],
};
```

**Step 2: Update game.types.ts**

```typescript
export type PlayerCount = 5 | 6 | 7 | 8 | 9 | 10;
```

**Step 3: Update PlayerCountSelection.tsx**

Add a new card:
```tsx
{/* 5 Players */}
<Card onClick={() => handleSelectCount(5)}>
  <CardHeader>
    <div className="text-5xl font-bold text-good">5</div>
    <CardTitle>Players</CardTitle>
    <CardDescription>Compact setup</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Team breakdown */}
    <div>Good Team: 3 players</div>
    <div>Evil Team: 2 players</div>

    {/* Roles */}
    <div>
      <div>🧙 Merlin</div>
      <div>🛡️ Perceival</div>
      <div>⚔️ Arthur</div>
      <div>🔮 Morgana</div>
      <div>🗡️ Assassin</div>
    </div>

    <Button variant="good" size="lg" className="w-full">
      Choose 5 Players →
    </Button>
  </CardContent>
</Card>
```

**Step 4: Test**

1. Run `npm run dev`
2. Click "Play Game"
3. Choose 5 players
4. Add 5 player names
5. Verify roles assigned correctly

---

## Troubleshooting

### Issue: Button doesn't look clickable

**Symptom:** Button is green but has no pulse animation.

**Solution:**
Check if `animate-pulse-subtle` class is applied:
```tsx
<Button className="animate-pulse-subtle">Play Game</Button>
```

### Issue: Input doesn't refocus after adding player

**Symptom:** After clicking "Add Player", cursor doesn't return to input.

**Solution:**
1. Check if `inputRef` is created:
   ```tsx
   const inputRef = useRef<HTMLInputElement>(null);
   ```

2. Check if ref is attached to input:
   ```tsx
   <input ref={inputRef} />
   ```

3. Check if `focus()` is called after adding:
   ```tsx
   setTimeout(() => inputRef.current?.focus(), 0);
   ```

### Issue: Role visibility is wrong

**Symptom:** Merlin sees Modred, or Evil doesn't see each other.

**Solution:**
Check `getVisiblePlayers` logic in `gameStore.ts`. Verify the role filters match the Avalon rules.

### Issue: TypeScript errors

**Symptom:** Red underlines in VSCode, build fails.

**Common causes:**
1. **Missing type:** Add type annotation
   ```tsx
   // ❌ Bad
   const players = [];

   // ✅ Good
   const players: Player[] = [];
   ```

2. **Wrong type:** Check `game.types.ts` for correct type
   ```tsx
   // ❌ Bad
   const phase: string = 'home';

   // ✅ Good
   const phase: GamePhase = 'home';
   ```

### Issue: Tailwind classes not working

**Symptom:** Classes applied but no styling.

**Solution:**
1. Check if class is in `tailwind.config.ts` theme
2. Verify class name spelling
3. Check if conflicting classes
4. Clear cache and rebuild: `rm -rf dist && npm run build`

### Issue: Component not updating

**Symptom:** State changes but UI doesn't update.

**Solution:**
1. Check if using Zustand correctly:
   ```tsx
   // ❌ Bad: Mutating state directly
   players.push(newPlayer);

   // ✅ Good: Using store action
   addPlayer(newPlayer.name);
   ```

2. Check if state is actually changing (add console.log)

---

## Deployment

### Current Setup

**Platform:** GitHub Pages (static hosting)

**Build process:**
1. Run `npm run build` in `avalon-react/`
2. Output goes to `avalon-react/dist/`
3. GitHub Pages serves from `dist/`

### Manual Deployment

```bash
cd avalon-react
npm run build
# Commit and push dist/ folder
git add dist/
git commit -m "Build for deployment"
git push
```

### Vercel Deployment (Alternative)

1. Connect GitHub repo to Vercel
2. Set build settings:
   - **Root Directory:** `avalon-react`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Auto-deploys on every push

---

## Future Full Game Features

For implementing the full Avalon game (missions, voting, assassination), refer to **ARCHITECTURE_PLAN.md** which contains:

### Mission Phase
- Quest proposal UI
- Team selection
- Voting mechanism
- Success/fail cards

### Quest Resolution
- Hidden vote submission
- Simultaneous reveal
- Quest tracker (5 quests)

### Assassination Phase
- Assassin selection UI
- Merlin identification
- Win condition logic

### Testing Strategy
- Vitest for unit tests
- React Testing Library for components
- Playwright for E2E tests

### Architecture Patterns
- State machine for game phases
- Event sourcing for game history
- Optimistic updates for better UX

---

## Quick Reference

### Component Hierarchy
```
App.tsx
├── HomePage
├── GameModeSelection
├── PlayerCountSelection
├── PlayerSetup
│   ├── Button (Add Player)
│   ├── Button (Shuffle & Start)
│   └── Card (Player list)
└── RoleReveal
    ├── Pass Screen
    ├── Blur Screen (countdown)
    └── Revealed Screen
```

### State Flow
```
User Action → Component Event Handler → Zustand Action → State Update → UI Re-render
```

### File Editing Checklist

When adding a new feature:
- [ ] Update types in `game.types.ts`
- [ ] Add business logic to `game-rules.ts`
- [ ] Add validation to `validators.ts`
- [ ] Update store in `gameStore.ts`
- [ ] Create/update component
- [ ] Test in browser
- [ ] Build and verify: `npm run build`

---

## Summary

This React app uses:
- **Components** for reusable UI
- **Zustand** for global state
- **TypeScript** for type safety
- **Tailwind** for styling
- **Phase-based navigation** for game flow

Key files:
- `App.tsx` - Router
- `gameStore.ts` - State
- `game-rules.ts` - Avalon rules
- Component files - UI screens

For full game implementation, see **ARCHITECTURE_PLAN.md**.
