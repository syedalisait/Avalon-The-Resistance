# Avalon - The Resistance

A modern web app for facilitating the role revelation phase of Avalon: The Resistance without players closing their eyes.

## 🎮 What is This?

In the traditional Avalon board game, the setup phase requires players to close their eyes while certain roles identify each other (evil players see each other, Merlin sees evil, Perceival sees Merlin/Morgana). Players often cheat by peeking!

This app solves that by allowing players to pass a phone/device around, with each player privately viewing their role and associated information.

## 🚀 Live Demo

**Production:** https://syedalisait.github.io/Avalon-The-Resistance/

## ✨ Features

### Role Revelation Mode (✅ Complete)
- 🎲 Automatic role assignment with fair shuffling
- 📱 Privacy-first design: pass phone between players
- ⏱️ 3-second reveal delay prevents timing attacks
- 👁️ Correct Avalon visibility rules:
  - Merlin sees all evil (except Modred)
  - Perceival sees Merlin and Morgana (but can't tell which is which)
  - Evil players see each other (except Oberon)
  - Oberon sees no one
- 📊 Game summary screen for end-game verification
- 📱 Mobile-optimized with pulse animations and obvious buttons
- ♿ Accessible design with keyboard navigation

### Coming Soon
- 🎯 Support for 5, 8, 9, and 10 player games (currently supports 6-7 players)
- 🎮 Full Game Mode with missions, voting, and assassination phase

## 🛠️ Tech Stack

### Role Revelation App (Current)
- **React 19** + TypeScript
- **Vite 7** - Fast build tool
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Accessible UI components
- **Zustand** - State management

### Legacy jQuery App
The original jQuery implementation is still available in the root directory (`index.html`, `avalon.js`, `avalon.css`) but is deprecated.

## 🏗️ Project Structure

```
/
├── avalon-react/          # Modern React app (active development)
│   ├── src/
│   │   ├── components/
│   │   │   ├── game/      # Game flow components
│   │   │   └── ui/        # shadcn/ui components
│   │   ├── lib/
│   │   │   ├── game-rules.ts     # Avalon rules and role definitions
│   │   │   └── validators.ts     # Input validation
│   │   ├── store/
│   │   │   └── gameStore.ts      # Zustand state management
│   │   └── types/
│   │       └── game.types.ts     # TypeScript definitions
│   └── README.md          # React app documentation
├── index.html             # Legacy jQuery app (deprecated)
├── avalon.js              # Legacy game logic (deprecated)
├── README.md              # This file
├── CLAUDE.md              # Technical documentation for React app
└── ARCHITECTURE_PLAN.md   # Full game architecture blueprint
```

## 🚦 Getting Started

### Development

```bash
cd avalon-react
npm install
npm run dev
```

Visit http://localhost:5173

### Production Build

```bash
cd avalon-react
npm run build
npm run preview
```

## 📖 Documentation

- **CLAUDE.md** - Comprehensive React app documentation (great for learning React!)
- **ARCHITECTURE_PLAN.md** - Future full game implementation blueprint

## 🎯 Game Flow

1. **Home** → Choose "Play Game"
2. **Mode Selection** → Choose "Role Revelation Only"
3. **Player Count** → Choose 6 or 7 players
4. **Setup** → Enter player names
5. **Shuffle** → Roles randomly assigned
6. **Reveal** → Pass phone to each player to see their role
7. **Summary** → View all roles for verification
8. **Play offline** → Continue with physical game board

## 🎭 Supported Roles

### Good Team
- 🧙 **Merlin** - Sees all evil (except Modred)
- 🛡️ **Perceival** - Sees Merlin and Morgana (can't tell which is which)
- ⚔️ **Arthur** - Generic good servant

### Evil Team
- 🔮 **Morgana** - Appears as Merlin to Perceival
- 🗡️ **Assassin** - Can assassinate Merlin at end (not implemented yet)
- 👤 **Minion of Modred** - Generic evil minion
- 🌑 **Modred** - Invisible to Merlin
- 👁️ **Oberon** - Invisible to other evil players

## 🔄 Version History

- **v2.0** - React rewrite with modern UX (current)
- **v1.0** - Original jQuery implementation (deprecated)

## 📝 License

MIT

## 🙏 Credits

Built with [Claude Code](https://claude.com/claude-code)

## 📚 Learn More

- [Official Avalon Rules](http://upload.snakesandlattes.com/rules/r/ResistanceAvalon.pdf)
- [Game Wiki](http://web.eecs.umich.edu/~gameprof/gamewiki/index.php/The_Resistance:_Avalon)
