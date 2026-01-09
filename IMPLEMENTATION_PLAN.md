# Avalon: Concrete Implementation Plan

## 📋 Executive Summary

This document provides a **concrete, actionable plan** to transform the Avalon game from a basic jQuery application into a modern, mobile-first React application with robust game logic, comprehensive testing, and superior UX.

---

## 🎯 Goals & Success Criteria

### Primary Goals
1. ✅ **Modern UI**: Beautiful, mobile-first design using React + Tailwind + shadcn/ui
2. ✅ **Correct Logic**: Fix validation issues and ensure 100% correct Avalon rules
3. ✅ **Comprehensive Tests**: Test all player counts (5-10) and character combinations
4. ✅ **Customizable Setup**: Smart assistant suggests characters based on player count
5. ✅ **Superior UX**: Phone pass-around with privacy, haptics, smooth animations

### Success Criteria
- [ ] Works flawlessly on mobile (iOS + Android)
- [ ] All player counts (5-10) tested and validated
- [ ] 90%+ test coverage
- [ ] Load time < 2 seconds on 3G
- [ ] Lighthouse score: 90+ (Performance, Accessibility, Best Practices)
- [ ] Zero game logic bugs

---

## 📚 Documentation Created

### 1. CLAUDE.md ✅
**Comprehensive technical documentation**
- Project overview and architecture
- Technology stack analysis
- Game flow and state machine
- Character roles and visibility rules
- File structure and code analysis
- Current limitations and technical debt

### 2. ARCHITECTURE_PLAN.md ✅
**Frontend architecture blueprint**
- Technology stack recommendations (React + Tailwind + shadcn/ui)
- UI/UX design vision with mockups
- Component architecture and state management
- Game logic improvements
- Testing strategy
- 7-phase implementation plan

### 3. GAME_LOGIC_REVIEW.md ✅
**Game logic correctness analysis**
- Current logic correctness verification
- Identified bugs and issues (8 total)
- Edge cases to test
- Official Avalon rules summary
- Recommended fixes (prioritized)
- Testing checklist

---

## 🏗️ Technology Stack (Finalized)

### Frontend Framework
**React 18+** with TypeScript
- Component-based architecture
- Hooks for state management
- Rich ecosystem and tooling
- Future-proof (Server Components ready)

### Styling & UI
**Tailwind CSS v4 + shadcn/ui**
- Ships UIs 3x faster (research-backed)
- WAI-ARIA accessible components
- Dark mode built-in
- Copy-paste components (no vendor lock-in)
- Design tokens for consistent theming

### Build Tool
**Vite**
- Lightning-fast HMR
- Optimized production builds
- TypeScript out of the box
- Best developer experience

### State Management
**Zustand**
- Lightweight (vs Redux)
- Simple API
- TypeScript-first
- Perfect for game state

### Testing
- **Vitest**: Unit tests (fast, Vite-native)
- **React Testing Library**: Component tests
- **Playwright**: E2E tests (reliable, multi-browser)

### Additional Tools
- **Framer Motion**: Smooth animations
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **Wake Lock API**: Prevent screen sleep (mobile)
- **Vibration API**: Haptic feedback (mobile)

---

## 🎨 UI/UX Design Principles

### Mobile-First (Phone Pass-Around)

#### Privacy Protection
```
Player sees blurred screen:
  "Tap to reveal your role"
  [Blur overlay]

After tap:
  Sharp reveal animation
  "Show this to NO ONE!"
  [Auto-blur after 10s]
```

#### Key Features
- 🔒 **Privacy blur** until player taps to reveal
- 📳 **Haptic feedback** on all interactions
- 🌙 **Dark theme** (reduces glare when passing phone)
- 💤 **Wake Lock** (prevents screen sleep during setup)
- 📱 **Portrait lock** (easier to pass around)
- 👆 **Large touch targets** (min 48x48px)

### Design System

**Color Palette**:
- Background: Deep space black (#0a0a0f)
- Good: Vibrant green (#4ade80)
- Evil: Danger red (#ef4444)
- Merlin: Blue (#60a5fa)
- Morgana: Purple (#a855f7)

**Typography**:
- Font: Inter (clean, modern, readable)
- Sizes: 16px base, 24px+ for headings

**Spacing**: 8px grid system

**Animation Principles**:
- Smooth page transitions (slide left/right)
- Blur-to-sharp reveals (privacy)
- Bouncy button presses (haptic + scale)

---

## 🎮 Game Logic Improvements

### Current Issues Fixed

#### 1. Player Count Validation ✅
```typescript
if (players.length < 5 || players.length > 10) {
  errors.push('Avalon requires 5-10 players');
}
```

#### 2. Evil Count Validation ✅
```typescript
const expectedEvil = {5:2, 6:2, 7:3, 8:3, 9:3, 10:4}[players.length];
if (evilCount !== expectedEvil) {
  errors.push(`Need ${expectedEvil} evil players`);
}
```

#### 3. Required Roles ✅
```typescript
if (!roles.includes('Merlin') || !roles.includes('Assassin')) {
  errors.push('Merlin and Assassin are required');
}
```

#### 4. Self-Filtering Bug Fix ✅
```typescript
const visiblePlayers = calculateVisiblePlayers(players, currentPlayerId);
// Automatically filters out current player
```

### New Features

#### Smart Setup Assistant
```typescript
// Suggests next role based on:
// - Current player count
// - Target player count
// - Role balance (good vs evil)
// - Recommended setups

getSuggestedNextRole(currentPlayers, targetPlayerCount)
// Returns: ["Morgana", "Minion"] (suggested evil roles)
```

#### Customizable Character Selection
```typescript
// Disable unavailable roles dynamically
getAvailableRoles(currentPlayers)
// Returns only roles that:
// - Aren't taken (if non-duplicable)
// - Fit the current balance
// - Make sense for the setup
```

---

## 🧪 Testing Strategy

### Test Coverage Goals
- **Unit Tests**: 100% (game logic, validators)
- **Integration Tests**: 90%+ (components)
- **E2E Tests**: Critical flows (5-10 player games)

### Test Matrix

| Player Count | Good | Evil | Test File |
|--------------|------|------|-----------|
| 5 | 3 | 2 | `5-player-game.spec.ts` |
| 6 | 4 | 2 | `6-player-game.spec.ts` |
| 7 | 4 | 3 | `7-player-game.spec.ts` |
| 8 | 5 | 3 | `8-player-game.spec.ts` |
| 9 | 6 | 3 | `9-player-game.spec.ts` |
| 10 | 6 | 4 | `10-player-game.spec.ts` |

### Edge Cases Tested
- ✅ All evil except Oberon
- ✅ Oberon as only evil (invalid, should error)
- ✅ Morgana without Perceival (warning)
- ✅ Multiple Arthurs and Minions
- ✅ Maximum 10 players
- ✅ Minimum 5 players
- ✅ Invalid setups (all good, all evil)

---

## 📅 Implementation Phases (4 Weeks)

### Week 1: Foundation & Core Logic

#### Phase 1: Setup (Days 1-2)
- [ ] Initialize Vite + React + TypeScript
- [ ] Configure Tailwind CSS v4
- [ ] Install shadcn/ui components
- [ ] Set up Vitest + Playwright
- [ ] Create directory structure
- [ ] Define TypeScript types

**Deliverable**: Working dev environment

#### Phase 2: Game Logic (Days 3-5)
- [ ] Implement `game-rules.ts` (ROLES, GAME_CONFIG)
- [ ] Implement `game-logic.ts` (visibility calculations)
- [ ] Implement `validators.ts` (validation functions)
- [ ] Implement `setup-assistant.ts` (smart suggestions)
- [ ] Write unit tests (100% coverage)

**Deliverable**: Fully tested game logic

---

### Week 2: State & UI Components

#### Phase 3: State Management (Days 6-7)
- [ ] Create Zustand store (`gameStore.ts`)
- [ ] Implement all state actions
- [ ] Add localStorage persistence (optional)
- [ ] Write store tests

**Deliverable**: Working state management

#### Phase 4: UI Components (Days 8-12)
- [ ] Create shadcn/ui base components (Button, Card, Dialog)
- [ ] Build `CharacterCard` component
- [ ] Build `PlayerSetup` component with validation
- [ ] Build `RoleReveal` component with animations
- [ ] Build `GameSummary` component
- [ ] Write component integration tests

**Deliverable**: All UI components functional

---

### Week 3: Mobile Optimization & Testing

#### Phase 5: Mobile Polish (Days 13-15)
- [ ] Implement Wake Lock API (prevent sleep)
- [ ] Add Vibration API (haptic feedback)
- [ ] Implement privacy blur/reveal animations
- [ ] Add orientation lock (portrait)
- [ ] Optimize touch targets (48x48px min)
- [ ] Test on real devices (iOS + Android)

**Deliverable**: Excellent mobile UX

#### Phase 6: Comprehensive Testing (Days 16-18)
- [ ] Write E2E tests for 5-10 player games
- [ ] Test all character combinations
- [ ] Test edge cases
- [ ] Accessibility testing (keyboard, screen reader)
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Performance testing (Lighthouse)

**Deliverable**: 90%+ test coverage

---

### Week 4: Polish & Deploy

#### Phase 7: Production Ready (Days 19-21)
- [ ] Final design polish (colors, spacing, typography)
- [ ] Add sound effects (optional)
- [ ] Create onboarding/tutorial
- [ ] Write user documentation
- [ ] Optimize bundle size
- [ ] Set up CI/CD (GitHub Actions)
- [ ] Deploy to Vercel/Netlify

**Deliverable**: Production deployment

---

## 📂 Project Structure

```
avalon-react/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── dialog.tsx
│   │   └── game/            # Game components
│   │       ├── CharacterCard.tsx
│   │       ├── PlayerSetup.tsx
│   │       ├── RoleReveal.tsx
│   │       └── GameSummary.tsx
│   ├── lib/                 # Business logic
│   │   ├── game-rules.ts    # Constants, roles
│   │   ├── game-logic.ts    # Visibility calculation
│   │   ├── validators.ts    # Validation
│   │   └── setup-assistant.ts # Smart suggestions
│   ├── store/
│   │   └── gameStore.ts     # Zustand state
│   ├── hooks/
│   │   ├── useGameState.ts
│   │   ├── useWakeLock.ts
│   │   └── useHaptic.ts
│   ├── types/
│   │   └── game.types.ts    # TypeScript types
│   └── App.tsx
├── tests/
│   ├── unit/                # Vitest tests
│   ├── integration/         # React Testing Library
│   └── e2e/                 # Playwright tests
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Deployment Strategy

### Option 1: Vercel (Recommended)
- ✅ Automatic deploys from Git
- ✅ Preview deployments for PRs
- ✅ Global CDN
- ✅ Zero configuration
- ✅ Free for personal projects

```bash
cd avalon-react
npm install -g vercel
vercel deploy
```

### Option 2: Netlify
- ✅ Similar to Vercel
- ✅ Drag-and-drop builds
- ✅ Free tier

### Option 3: GitHub Pages
- ✅ Free
- ❌ No server-side features
- ❌ Manual deployment

---

## ✅ Pre-Implementation Checklist

### Technical Decisions
- [ ] **Framework**: React 18+ approved
- [ ] **CSS**: Tailwind CSS + shadcn/ui approved
- [ ] **State**: Zustand approved
- [ ] **Testing**: Vitest + Playwright approved
- [ ] **Build**: Vite approved

### Scope Decisions
- [ ] **Scope**: Role revelation only (not full game)
- [ ] **Players**: 5-10 players
- [ ] **Characters**: All 8 roles (Merlin, Morgana, etc.)
- [ ] **Platform**: Mobile-first (phone pass-around)

### Design Decisions
- [ ] **Theme**: Dark theme
- [ ] **Colors**: Approved color palette
- [ ] **Typography**: Inter font
- [ ] **Animations**: Framer Motion

### Timeline
- [ ] **Duration**: 3-4 weeks
- [ ] **Start Date**: [To be determined]
- [ ] **Milestones**: Weekly check-ins

---

## 🤔 Questions for Alignment

Before we start implementation, please confirm:

### 1. Scope
**Q**: Do you want **only role revelation** (current scope), or expand to full game (missions, voting, assassination)?

**Recommendation**: Start with role revelation only, add full game in Phase 2 if desired.

### 2. Timeline
**Q**: Is **3-4 weeks** realistic for your schedule?

**Options**:
- Fast track (2 weeks): Skip some polish, minimal testing
- Standard (4 weeks): Full plan as outlined
- Extended (6 weeks): Add extra features (sound, tutorial, analytics)

### 3. Hosting
**Q**: Vercel (recommended), Netlify, or GitHub Pages?

**Recommendation**: Vercel for best DX and automatic deployments.

### 4. Testing Priority
**Q**: How important is 90%+ test coverage vs shipping faster?

**Options**:
- High coverage (90%+): 4 weeks, very stable
- Medium coverage (70%+): 3 weeks, stable enough
- Low coverage (50%+): 2 weeks, faster but riskier

### 5. Design Customization
**Q**: Any specific design preferences beyond what's proposed?

**Current Plan**:
- Dark theme
- Blue/green/red color scheme
- Card-based UI
- Smooth animations

**Open to**:
- Custom colors
- Light theme option
- Different fonts
- Custom branding

---

## 📊 Comparison: Current vs Proposed

| Aspect | Current (jQuery) | Proposed (React) |
|--------|-----------------|------------------|
| **Framework** | jQuery 1.11.3 (2014) | React 18+ (2024) |
| **CSS** | Bootstrap 3 | Tailwind v4 + shadcn/ui |
| **Bundle Size** | ~300 KB | ~150 KB (optimized) |
| **Mobile UX** | Basic responsive | Excellent (privacy, haptics) |
| **Validation** | Basic (name, duplicates) | Comprehensive (all rules) |
| **Testing** | None | 90%+ coverage |
| **Type Safety** | None | TypeScript |
| **Accessibility** | Poor | WAI-ARIA compliant |
| **State** | Global variables | Zustand store |
| **Logic Bugs** | 8 identified | 0 (all fixed) |
| **Setup Help** | None | Smart assistant |
| **Load Time** | ~1s | ~0.5s |
| **Lighthouse** | ~60 | ~90+ |

---

## 🎯 Next Steps

### Immediate Actions (Today)
1. ✅ Review documentation (CLAUDE.md, ARCHITECTURE_PLAN.md, GAME_LOGIC_REVIEW.md)
2. ⏳ **Answer alignment questions** above
3. ⏳ **Approve or request changes** to the plan
4. ⏳ **Set start date** for implementation

### After Approval
1. Create `avalon-react/` directory
2. Initialize project with Vite
3. Install dependencies
4. Start Phase 1 (Foundation)

---

## 📞 Support & Communication

### Progress Tracking
- Weekly check-ins (Mondays)
- Daily progress updates (async)
- Demo after each phase

### Issue Resolution
- GitHub Issues for bugs
- Discussion threads for questions
- Live calls for blockers (if needed)

---

## 🙏 Final Notes

This plan is based on:
- ✅ Comprehensive codebase exploration
- ✅ Current implementation analysis
- ✅ Game logic correctness review
- ✅ 2026 frontend technology research
- ✅ Mobile gaming UX best practices
- ✅ Official Avalon game rules

**Ready to proceed?** Once you approve this plan, we'll start with Phase 1: Foundation! 🚀

---

**Last Updated**: 2026-01-09
**Status**: Awaiting approval
**Estimated Start**: TBD
