# Avalon - The Resistance (React)

Modern React implementation of the Avalon role revelation game.

## Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite 7** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Zustand** - Lightweight state management

## Project Structure

```
src/
├── components/
│   ├── ui/                     # shadcn/ui base components (Button, Card)
│   └── game/                   # Game-specific components
│       ├── HomePage.tsx        # Landing page
│       ├── GameModeSelection.tsx   # Choose role reveal vs full game
│       ├── PlayerCountSelection.tsx # Choose 6 or 7 players
│       ├── PlayerSetup.tsx     # Enter player names
│       └── RoleReveal.tsx      # Multi-stage role revelation
├── lib/
│   ├── game-rules.ts           # Avalon rules and role definitions
│   ├── validators.ts           # Input validation
│   └── utils.ts                # Utility functions
├── store/
│   └── gameStore.ts            # Zustand state management
├── types/
│   └── game.types.ts           # TypeScript type definitions
└── App.tsx                     # Main application router
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Game Modes

1. **Role Revelation Only** ✅ - Complete setup for role assignment (currently supports 6-7 players)
2. **Full Game** 🚧 - Complete Avalon experience with missions, voting, assassination (coming soon)

## Current Player Support

- ✅ **6 players** - 4 good, 2 evil (Merlin, Perceival, 2x Arthur, Morgana, Assassin)
- ✅ **7 players** - 4 good, 3 evil (adds Minion of Modred)
- 🚧 **5, 8, 9, 10 players** - Coming soon

## Features

### Core Implementation ✅
- ✅ Modern React 19 architecture
- ✅ Dark theme optimized for passing phone around
- ✅ Custom Avalon color palette (Good/Evil teams)
- ✅ Responsive design (mobile-first)
- ✅ TypeScript for type safety
- ✅ shadcn/ui components with accessible design
- ✅ Zustand state management

### Game Flow ✅
- ✅ Complete game flow (home → mode → player count → setup → reveal → summary)
- ✅ Phase-based navigation with state machine pattern
- ✅ Automatic role assignment with Fisher-Yates shuffle
- ✅ Player name validation (duplicates, empty names)
- ✅ Title case formatting

### Role Revelation ✅
- ✅ Privacy-first reveal with 3-second countdown timer
- ✅ Multi-stage reveal (pass screen → blur screen → revealed screen)
- ✅ Correct role visibility rules:
  - Merlin sees all evil (except Modred)
  - Perceival sees Merlin and Morgana (can't tell which is which)
  - Evil players see each other (except Oberon)
  - Oberon sees no one
- ✅ Game summary screen for end-game verification

### UX Improvements ✅
- ✅ Button pulse animations for primary CTAs
- ✅ Enhanced button styling with ring glow effects
- ✅ Input auto-refocus after adding player
- ✅ Clickable reveal area (not just button)
- ✅ Card alignment fixes for consistent height
- ✅ Mobile-optimized with obvious touch targets

### Coming Soon 🚧
- 🚧 Support for 5, 8, 9, 10 players
- 🚧 Full game mode (missions, voting, assassination phase)
- 🚧 Comprehensive testing (unit, integration, E2E)

## Documentation

- **Root README.md** - Project overview and quick start
- **CLAUDE.md** - Comprehensive React app documentation for developers
- **ARCHITECTURE_PLAN.md** - Future full game implementation blueprint

## License

MIT
