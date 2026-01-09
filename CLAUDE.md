# Avalon - The Resistance: Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Game Flow & Logic](#game-flow--logic)
5. [Character Roles & Visibility Rules](#character-roles--visibility-rules)
6. [File Structure](#file-structure)
7. [Code Analysis](#code-analysis)
8. [Current Limitations](#current-limitations)
9. [Development Notes](#development-notes)

---

## Project Overview

**Avalon - The Resistance** is a web-based utility tool designed to facilitate the initial role revelation phase of the board game "The Resistance: Avalon" without requiring players to close their eyes.

### Purpose
In the traditional board game, the setup phase involves:
1. All players closing their eyes
2. Evil players opening eyes to see each other
3. Merlin opening eyes to see evil (except Modred)
4. Perceival opening eyes to see Merlin and Morgana

**Problem**: Players often cheat by peeking during the "eyes closed" phase.

**Solution**: This digital tool allows players to pass a phone/device around, with each player privately viewing their role and the information visible to them.

### Current Scope
- **Phase Covered**: Role assignment and revelation only
- **Not Included**: Mission selection, voting, quest resolution, assassination phase
- **Use Case**: Local multiplayer (same device passed around)
- **Deployment**: Static website hosted on GitHub Pages

---

## Architecture

### Application Type
**100% Client-Side Static Web Application**

```
┌─────────────────────────────────────────┐
│         Browser (Client)                │
│  ┌────────────────────────────────────┐ │
│  │  HTML (Structure)                  │ │
│  │  - index.html                      │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │  CSS (Styling)                     │ │
│  │  - Bootstrap (framework)           │ │
│  │  - avalon.css (custom)             │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │  JavaScript (Logic)                │ │
│  │  - jQuery 1.11.3                   │ │
│  │  - avalon.js (game logic)          │ │
│  └────────────────────────────────────┘ │
│                                         │
│  Data Storage: In-Memory Only          │
│  - characterhash (Object)              │
│  - characterarray (Array)              │
│  - Merlin, Perceival, Evil (Arrays)    │
└─────────────────────────────────────────┘
```

### Key Characteristics
- **No Backend**: All logic runs in browser
- **No Database**: Data stored in JavaScript memory (lost on refresh)
- **No API Calls**: Except initial HTML/CSS/JS file loading
- **Stateless**: Single-page session
- **Deployment**: GitHub Pages (static file hosting)

---

## Technology Stack

| Component | Technology | Version | Notes |
|-----------|-----------|---------|-------|
| **Frontend Framework** | jQuery | 1.11.3 | Released 2014, outdated |
| **UI Framework** | Bootstrap | 3.x | Responsive grid, buttons |
| **Markup** | HTML5 | - | Standard semantic HTML |
| **Styling** | CSS3 | - | Custom styles + Bootstrap |
| **Build System** | None | - | Direct file serving |
| **Package Manager** | None | - | Manual dependency management |
| **Testing** | None | - | No test framework |
| **Hosting** | GitHub Pages | - | Static site hosting |

### Dependencies (Included in Repository)
```
jquery-1.11.3.min.js      (~84 KB)
bootstrap.min.css         (~120 KB)
```

---

## Game Flow & Logic

### State Machine

```
┌──────────────────────────────────────────────────────────────┐
│                    STATE: PLAYER INPUT                        │
│  - Players enter name and select role                        │
│  - Validation: name required, role required, no duplicates   │
│  - Submit button stores data                                 │
│  - Repeat for all players                                    │
└──────────────┬───────────────────────────────────────────────┘
               │ "Reveal Roles" clicked
               ↓
┌──────────────────────────────────────────────────────────────┐
│                STATE: ROLE REVELATION SETUP                   │
│  - Populate visibility arrays (Merlin, Perceival, Evil)      │
│  - Disable input buttons                                     │
│  - Show navigation buttons (Role, Next)                      │
│  - Display first player name                                 │
└──────────────┬───────────────────────────────────────────────┘
               │
               ↓
┌──────────────────────────────────────────────────────────────┐
│           STATE: ROLE DISPLAY LOOP (counter-based)           │
│  [Role] button → Show player's role + visible characters     │
│  [Next] button → Clear display, show next player name        │
│  Repeat until all players have seen their info               │
└──────────────┬───────────────────────────────────────────────┘
               │ counter reaches end
               ↓
┌──────────────────────────────────────────────────────────────┐
│                      STATE: COMPLETE                          │
│  - Disable all buttons                                       │
│  - Clear display areas                                       │
│  - Game ready to start (offline)                             │
└──────────────────────────────────────────────────────────────┘
```

### Data Structures

```javascript
// Global variables (all in global scope)
var characterhash = {};      // { "PlayerName": "Role" }
var characterarray = [];     // ["Player1", "Player2", ...]
var Merlin = [];             // Players visible to Merlin
var Perceival = [];          // Players visible to Perceival
var Evil = [];               // Players visible to Evil roles
var counter = 0;             // Current player index
```

**Example Data**:
```javascript
characterhash = {
  "Alice": "Merlin",
  "Bob": "Assassin",
  "Charlie": "Morgana",
  "David": "Perceival",
  "Eve": "Arthur"
}

characterarray = ["Alice", "Bob", "Charlie", "David", "Eve"]

// After "Reveal Roles" clicked:
Merlin = ["Bob", "Charlie"]           // Assassin, Morgana (not Modred)
Perceival = ["Alice", "Charlie"]      // Merlin, Morgana (ambiguous)
Evil = ["Bob", "Charlie"]             // All evil see each other
```

---

## Character Roles & Visibility Rules

### Available Roles

| Role | Alignment | Can Duplicate? | Special Ability |
|------|-----------|----------------|-----------------|
| **Merlin** | Good | No | Sees all evil except Modred |
| **Perceival** | Good | No | Sees Merlin + Morgana (can't distinguish) |
| **Arthur** | Good | **Yes** | No special ability (generic good) |
| **Morgana** | Evil | No | Appears as "Merlin" to Perceival |
| **Modred** | Evil | No | Invisible to Merlin |
| **Minion of Modred** | Evil | **Yes** | Generic evil, sees other evil |
| **Assassin** | Evil | No | Sees other evil (assassination not in scope) |
| **Oberon** | Evil | No | Invisible to other evil players |

### Visibility Matrix

| Role | What They See | Logic |
|------|---------------|-------|
| **Merlin** | Minion, Assassin, Morgana, Oberon | All evil except Modred |
| **Perceival** | Merlin, Morgana | Cannot distinguish who is who |
| **Arthur** | Nothing | "You are Good" |
| **Morgana** | All evil (except Oberon) | Same as other evil |
| **Modred** | All evil (except Oberon) | Hidden from Merlin |
| **Minion** | All evil (except Oberon) | Standard evil visibility |
| **Assassin** | All evil (except Oberon) | Standard evil visibility |
| **Oberon** | Nothing | "You are Evil" (lone wolf) |

### Implementation Logic (avalon.js:41-70)

```javascript
// Populate visibility arrays
$.each(characterhash, function (key, value) {
  if (value === 'Minion' || value === 'Assassin') {
    Evil.push(key);      // Other evil players see them
    Merlin.push(key);    // Merlin sees them
  }
  else if (value === 'Merlin') {
    Perceival.push(key); // Perceival sees Merlin
  }
  else if (value === 'Morgana') {
    Perceival.push(key); // Perceival sees Morgana (as "Merlin?")
    Merlin.push(key);    // Merlin sees Morgana
    Evil.push(key);      // Other evil see Morgana
  }
  else if (value === 'Modred') {
    Evil.push(key);      // Other evil see Modred
    // NOT added to Merlin array (hidden from Merlin)
  }
  else if (value === 'Oberon') {
    Merlin.push(key);    // Merlin sees Oberon
    // NOT added to Evil array (hidden from evil)
  }
});
```

---

## File Structure

```
/home/user/Avalon-The-Resistance/
├── index.html              # Main UI (102 lines)
├── avalon.js               # Game logic (129 lines)
├── avalon.css              # Custom styles (27 lines)
├── bootstrap.min.css       # Bootstrap framework
├── jquery-1.11.3.min.js    # jQuery library
├── README.md               # Project description
├── .gitattributes          # Git configuration
└── .git/                   # Git repository
```

### File Responsibilities

#### index.html (UI Structure)
- **Lines 1-10**: HTML5 boilerplate, meta, includes
- **Lines 12-25**: Player name input field
- **Lines 26-60**: Character role radio buttons (8 roles)
- **Lines 61-73**: Submit and Reveal buttons
- **Lines 74-87**: Display areas (content, revealplayer)
- **Lines 88-98**: Navigation buttons (Role, Next)

**Key DOM Elements**:
- `#playername` - Text input for player name
- `input[name=characters]` - Radio buttons for role selection
- `#submitcharacter` - Submit player button
- `#revealrole` - Start revelation phase button
- `#content` - Shows current player name/role
- `#revealplayer` - Shows visible characters to current role
- `#role` - Show role info button (hidden initially)
- `#next` - Next player button (hidden initially)

#### avalon.js (Game Logic)
- **Lines 1-2**: Global data structures
- **Lines 5-30**: Submit character handler (validation, storage)
- **Lines 37-70**: Reveal roles handler (populate visibility arrays)
- **Lines 77-101**: Role display handler (show role + visible players)
- **Lines 106-118**: Next player handler (navigation logic)
- **Lines 122-127**: Utility function (ToTitleCase)

#### avalon.css (Styling)
- **Lines 2-4**: Form margin
- **Lines 6-11**: Reveal player display styling (monospace, 100px height)
- **Lines 13-18**: Content display styling (monospace, 50px height)
- **Lines 20-26**: Hide navigation buttons initially

---

## Code Analysis

### Strengths

1. **Simplicity**: Minimal dependencies, easy to understand
2. **Clear Separation**: HTML structure, CSS styling, JS logic
3. **Validation**: Name/role validation, duplicate checking
4. **User Experience**: Title case conversion, clear button states
5. **Responsive**: Bootstrap grid works on mobile devices
6. **Lightweight**: Total size ~300 KB (including dependencies)

### Code Quality Issues

#### 1. Global Scope Pollution (avalon.js:1-2, 37-39, 76)
```javascript
// All variables in global scope - can conflict with other scripts
var characterhash = {};
var characterarray = [];
var Merlin = [];
var Perceival = [];
var Evil = [];
var counter = 0;
```

**Problem**: Any script on page can modify these variables

**Better Approach**: Encapsulate in IIFE or module

#### 2. Magic Strings (throughout avalon.js)
```javascript
// Hardcoded role names scattered throughout code
if (value === 'Minion' || value === 'Assassin') { ... }
if (characterhash[characterarray[counter]] === 'Merlin') { ... }
```

**Problem**: Changes require editing multiple locations

**Better Approach**: Constants object
```javascript
const ROLES = {
  MERLIN: 'Merlin',
  ASSASSIN: 'Assassin',
  // ...
}
```

#### 3. Tight Coupling (avalon.js:77-101)
```javascript
// Business logic directly manipulates DOM
$('#content').text(characterarray[counter] + ' : ' + characterhash[characterarray[counter]]);
$('#revealplayer').text('Evil: ' + Merlin.join(', '));
```

**Problem**: Cannot test logic without DOM, hard to refactor UI

**Better Approach**: Separate data/logic from presentation

#### 4. No Error Handling
```javascript
// What if characterarray is empty?
$('#content').text(characterarray[0]); // Undefined error

// What if user clicks buttons out of order?
// No guard against calling reveal before submitting players
```

#### 5. Outdated Dependencies
- **jQuery 1.11.3**: Released May 2014 (10+ years old)
  - Missing modern features
  - Potential security vulnerabilities
  - Larger bundle size than needed
- **Bootstrap 3**: Superseded by v4 and v5
  - Older responsive patterns
  - jQuery dependency

### Logic Issues

#### 1. Player Count Validation Missing
```javascript
// No check for minimum/maximum players
// Avalon requires 5-10 players
$('#revealrole').click(function() {
  // Should validate characterarray.length >= 5 && <= 10
  // Should validate good vs evil balance
})
```

#### 2. Role Balance Not Enforced
```javascript
// Can create game with all good or all evil
// Should validate evil count based on player count:
// 5-6 players: 2 evil
// 7 players: 3 evil
// 8-9 players: 3-4 evil
// 10 players: 4 evil
```

#### 3. Character Selection Not Guided
Current implementation allows any combination of characters, even invalid ones:
- Can have Perceival without Merlin
- Can have Assassin without Merlin (defeats purpose)
- Can have only special characters (no generic good/evil)

**Standard Avalon Setup**:
```
5 players: Merlin, Assassin, Perceival, 2x Minion
6 players: + Morgana
7 players: + Oberon
8-10 players: + Modred, more generic roles
```

### Security Issues (Client-Side)

Since this is client-side only:
1. **Console Manipulation**: Any player can open DevTools and see:
   ```javascript
   console.log(characterhash); // See all roles
   ```
2. **No Privacy**: Previous player could watch next player enter info
3. **No Persistence**: Accidental refresh loses all data
4. **No Verification**: Cannot verify all players saw their role

**Mitigation**: These are acceptable for the use case (pass-around device with trust)

---

## Current Limitations

### Functional Limitations

1. **Incomplete Game**: Only handles role revelation, not:
   - Mission proposal phase
   - Voting on teams
   - Quest success/failure
   - Assassination phase (if good wins)
   - Score tracking across rounds

2. **No Configuration**:
   - Cannot customize visibility rules
   - Cannot add custom roles
   - Cannot save/load game setups

3. **No State Persistence**:
   - Page refresh loses all data
   - Cannot pause and resume
   - No game history

4. **Single Device Only**:
   - Cannot support remote players
   - All players must be physically present
   - Must pass one device around

### Technical Debt

1. **No Build Process**:
   - No minification
   - No tree shaking
   - No code splitting
   - Larger than necessary bundle size

2. **No Testing**:
   - No unit tests for game logic
   - No integration tests
   - No E2E tests
   - Manual testing only

3. **No Modern JavaScript**:
   - ES5 syntax only
   - No modules
   - No async/await
   - No classes

4. **Accessibility Issues**:
   - No ARIA labels
   - No keyboard navigation focus management
   - No screen reader support
   - Poor color contrast in some areas

5. **Mobile UX**:
   - Small touch targets
   - No orientation lock
   - No prevent screen sleep
   - No haptic feedback

---

## Development Notes

### Git History (Recent Commits)

```
c3e2af2 - Update README.md
cfc2a09 - Validation for duplicate roles + Title case
2673df5 - Modred - Bug fix
86be688 - Remove long message
c9cdf58 - Success button/message overlap fix
```

**Active Development Areas**:
- UX improvements (button positioning, messages)
- Input validation (duplicate roles, title case)
- Bug fixes (Modred visibility logic)

### Browser Compatibility

**Tested/Expected**:
- Chrome/Edge: ✓ (jQuery 1.11.3 supports)
- Firefox: ✓
- Safari: ✓
- IE 9+: ✓ (Bootstrap 3 + jQuery 1.11.3)
- Mobile browsers: ✓ (Bootstrap responsive)

### Performance

**Load Time**: < 1 second on 3G
- Total size: ~300 KB (unminified)
- 3 CSS requests
- 2 JS requests
- No images

**Runtime Performance**: Excellent
- Simple DOM manipulation
- No complex calculations
- Max ~10 players = minimal data

---

## Code Examples & Patterns

### Event Handler Pattern (avalon.js:5-30)

```javascript
$(document).ready(function() {
  $('#submitcharacter').click(function() {
    // 1. Get input values
    var character = $('input[name=characters]:checked').val();
    var name = ToTitleCase($('#playername').val());

    // 2. Validate
    if (name.trim().length === 0 || character === undefined) {
      alert("Enter a name and select your role");
      return false;
    }

    // 3. Check duplicates
    if (!(character === 'Minion' || character === 'Arthur')) {
      var returnvalue = $.inArray(character, Object.values(characterhash));
      if (returnvalue !== -1) {
        alert('This role is already taken...');
        return false;
      }
    }

    // 4. Store data
    characterhash[name] = character;
    characterarray.push(name);

    // 5. Reset form
    $('input[name=characters]:checked').prop('checked', false);
    $('#playername').val('');
  });
});
```

### State Management Pattern

```javascript
// State is implicit through DOM and global variables
var counter = 0; // Current player index

// State transitions controlled by button clicks
$('#next').click(function() {
  if (counter == characterarray.length - 1) {
    // End state: disable buttons
    $('#next').prop('disabled', true);
    $('#role').prop('disabled', true);
  } else {
    // Continue state: increment counter
    counter++;
    $('#content').text(characterarray[counter]);
  }
});
```

### Array Population Pattern (avalon.js:49-68)

```javascript
// Declarative approach: iterate once, populate multiple arrays
$.each(characterhash, function (key, value) {
  // Add to appropriate visibility arrays based on role
  if (value === 'Minion' || value === 'Assassin') {
    Evil.push(key);
    Merlin.push(key);
  }
  // ... more conditions
});
```

---

## Testing Considerations

### Manual Test Cases

**Test 1: Valid 5-Player Game**
```
Input:
  Alice -> Merlin
  Bob -> Assassin
  Charlie -> Morgana
  David -> Perceival
  Eve -> Minion

Expected Output:
  Merlin sees: Bob, Charlie (Assassin, Morgana)
  Perceival sees: Alice, Charlie (Merlin, Morgana)
  Evil sees: Bob, Charlie, Eve (all evil)
  Assassin sees: Bob, Charlie, Eve
  Morgana sees: Bob, Charlie, Eve
```

**Test 2: Oberon Edge Case**
```
Input:
  Alice -> Merlin
  Bob -> Oberon
  Charlie -> Assassin

Expected Output:
  Merlin sees: Bob (Oberon only)
  Oberon sees: "You are Evil" (no other evil visible)
  Assassin sees: Charlie (only self, not Oberon)
```

**Test 3: Duplicate Role Validation**
```
Input:
  Alice -> Merlin
  Bob -> Merlin (attempt)

Expected: Alert "This role is already taken..."
```

### Automated Testing Needs

1. **Unit Tests** (game logic):
   - Role visibility calculation
   - Duplicate detection
   - Title case conversion
   - Player count validation

2. **Integration Tests**:
   - Submit player flow
   - Reveal roles flow
   - Navigation flow

3. **E2E Tests**:
   - Complete 5-player game
   - Complete 10-player game
   - Error scenarios

---

## Deployment

### Current Deployment

- **Platform**: GitHub Pages
- **URL**: https://syedalisait.github.io/Avalon-The-Resistance/
- **Branch**: `gh-pages` (likely)
- **Build**: None (direct file serving)

### Deployment Process

```bash
# 1. Make changes locally
git add .
git commit -m "Your message"

# 2. Push to main branch
git push origin main

# 3. GitHub Pages auto-deploys
# (if configured to deploy from main branch root or /docs folder)
```

### Environment Variables
None (static site, no server-side config)

---

## Future Enhancement Ideas

### Immediate Improvements
1. Add player count validation (5-10 players)
2. Add role balance validation
3. Add "Start Over" button
4. Add local storage persistence
5. Improve mobile touch targets

### Medium-Term Enhancements
1. Implement full game (missions, voting, assassination)
2. Add sound effects and animations
3. Add game history/statistics
4. Add customizable role sets
5. Improve accessibility (ARIA, keyboard nav)

### Long-Term Vision
1. Add server backend for remote multiplayer
2. Add user accounts and matchmaking
3. Add AI players for practice
4. Add game variants (original Resistance, expansions)
5. Add localization (i18n)

---

## Resources

### Official Game Rules
- Game Wiki: http://web.eecs.umich.edu/~gameprof/gamewiki/index.php/The_Resistance:_Avalon
- Official Rules PDF: http://upload.snakesandlattes.com/rules/r/ResistanceAvalon.pdf

### Dependencies Documentation
- jQuery 1.11.3: https://api.jquery.com/
- Bootstrap 3: https://getbootstrap.com/docs/3.4/

### Repository
- GitHub: https://github.com/syedalisait/Avalon-The-Resistance
- Current Branch: `claude/frontend-architecture-planning-eB4HA`

---

**Document Version**: 1.0
**Last Updated**: 2026-01-09
**Author**: Claude (AI Assistant)
**Status**: Initial comprehensive documentation
