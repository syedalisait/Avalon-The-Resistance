# Avalon - The Resistance (React)

Modern React implementation of the Avalon role revelation game.

## Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Vite 7** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Zustand** - Lightweight state management (coming soon)

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui base components
│   └── game/            # Game-specific components (coming soon)
├── lib/
│   ├── game/            # Game logic and rules
│   └── utils.ts         # Utility functions
├── store/               # Zustand state management (coming soon)
├── hooks/               # Custom React hooks (coming soon)
├── types/               # TypeScript type definitions
└── App.tsx              # Main application component
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

1. **Role Revelation Only** - Quick setup for role assignment
2. **Full Game** - Complete Avalon experience with missions (coming soon)

## Features

- ✅ Modern React 19 architecture
- ✅ Dark theme optimized for passing phone around
- ✅ Custom Avalon color palette (Good/Evil teams)
- ✅ Responsive design (mobile-first)
- ✅ TypeScript for type safety
- ✅ shadcn/ui components
- 🚧 Game logic implementation
- 🚧 Role revelation flow
- 🚧 Player setup
- 🚧 Comprehensive testing

## Commits

Each commit is atomic and can be rolled back independently:

- **Commit 1** (`f3a2371`): Initialize Vite + React + TypeScript
- **Commit 2** (`0af57e1`): Configure Tailwind CSS v4 with Avalon theme
- **Commit 3** (`35e9254`): Install shadcn/ui components
- **Commit 4**: Set up project structure and TypeScript types

## Rollback

To revert a specific commit:
```bash
git revert <commit-hash>
git push
```

## License

MIT
