# Avalon Game Logic Review & Correctness Analysis

## Current Implementation Analysis

### ✅ What's Correct

#### 1. Merlin's Visibility (avalon.js:50-68)
```javascript
if (value === 'Minion' || value === 'Assassin') {
  Merlin.push(key);
}
else if (value === 'Morgana') {
  Merlin.push(key);
}
else if (value === 'Oberon') {
  Merlin.push(key);
}
```
**Status**: ✅ CORRECT
- Merlin sees: Minion, Assassin, Morgana, Oberon
- Merlin does NOT see: Modred (correctly omitted)

#### 2. Perceival's Visibility (avalon.js:54-58)
```javascript
else if (value === 'Merlin') {
  Perceival.push(key);
}
else if (value === 'Morgana') {
  Perceival.push(key);
}
```
**Status**: ✅ CORRECT
- Perceival sees both Merlin and Morgana
- Cannot distinguish between them (displayed as "Merlin/Morgana")

#### 3. Evil Visibility (avalon.js:50-64)
```javascript
if (value === 'Minion' || value === 'Assassin') {
  Evil.push(key);
}
else if (value === 'Morgana') {
  Evil.push(key);
}
else if (value === 'Modred') {
  Evil.push(key);
}
// Note: Oberon is NOT added to Evil array
```
**Status**: ✅ CORRECT
- Evil players see: Minion, Assassin, Morgana, Modred
- Evil players do NOT see: Oberon (correctly omitted)

#### 4. Oberon Isolation (avalon.js:65-67)
```javascript
else if (value === 'Oberon') {
  Merlin.push(key);
  // NOT added to Evil array
}
```
**Status**: ✅ CORRECT
- Oberon is visible to Merlin
- Oberon is invisible to other evil players
- Oberon sees no one (gets "You are Evil" message)

---

## ❌ Logic Issues & Bugs

### Issue 1: Evil Players See Themselves

**Problem**: When displaying evil players to each evil role, the current player sees their own name in the list.

**Current Code** (avalon.js:88-93):
```javascript
else if (characterhash[characterarray[counter]] === 'Modred' ||
characterhash[characterarray[counter]] === 'Minion' ||
characterhash[characterarray[counter]] === 'Morgana' ||
characterhash[characterarray[counter]] === 'Assassin') {
  $('#revealplayer').text('Evil: ' + Evil.join(', '));
}
```

**Example Bug**:
```
Evil array = ["Bob (Assassin)", "Charlie (Morgana)", "David (Modred)"]

When Bob views his role:
"Evil: Bob (Assassin), Charlie (Morgana), David (Modred)"
           ^^^^^^^^^^ Bob sees himself!
```

**Fix**: Filter out current player from Evil array before display
```javascript
const otherEvil = Evil.filter(name => name !== characterarray[counter]);
$('#revealplayer').text('Evil: ' + otherEvil.join(', '));
```

**Severity**: Medium (confusing UX, not game-breaking)

---

### Issue 2: Merlin/Perceival See Themselves If They Have Those Roles

**Problem**: Similar to Issue 1, if a player is Merlin/Morgana, Perceival would see themselves.

**Example Bug**:
```
Perceival array = ["Alice (Merlin)", "Bob (Morgana)"]

When Alice views her role (Merlin):
  - She sees herself in Perceival's view? NO, this is OK because Merlin doesn't use Perceival array

When Bob views his role (Morgana):
  - Bob is evil, he sees Evil array
  - But if there was a Perceival, they'd see Bob (correct)

When Perceival views their role:
  - Perceival array = ["Alice (Merlin)", "Bob (Morgana)"]
  - Perceival shows: "Merlin/Morgana: Alice (Merlin), Bob (Morgana)"
  - This is CORRECT (Perceival doesn't see themselves)
```

**Status**: ✅ ACTUALLY CORRECT (Perceival is never in the Perceival array)

---

### Issue 3: No Validation for Player Count

**Problem**: Game allows any number of players (even 1 or 100)

**Official Rules**:
- Minimum: 5 players
- Maximum: 10 players

**Current Code**: No validation

**Fix Needed**: Add validation before "Reveal Roles"
```javascript
if (characterarray.length < 5 || characterarray.length > 10) {
  alert('Avalon requires 5-10 players');
  return false;
}
```

**Severity**: High (breaks game balance)

---

### Issue 4: No Validation for Good/Evil Balance

**Problem**: Game allows any ratio of good to evil players

**Official Rules** (Evil count by player count):
```
5 players:  2 evil, 3 good
6 players:  2 evil, 4 good
7 players:  3 evil, 4 good
8 players:  3 evil, 5 good
9 players:  3 evil, 6 good
10 players: 4 evil, 6 good
```

**Current Code**: No validation

**Example Bad Setup**:
```
5 players: All Merlin (0 evil) - game impossible to lose
5 players: 4 evil, 1 good - game impossible to win
```

**Fix Needed**: Validate evil count matches official rules

**Severity**: High (breaks game balance)

---

### Issue 5: No Required Role Enforcement

**Problem**: Game allows games without essential roles

**Official Rules**:
- **Merlin is required** (core mechanic: good team gets information)
- **Assassin is required** (balancing mechanic: evil can win even if quests fail)

**Current Code**: No validation

**Example Bad Setup**:
```
5 players: All Arthur (no Merlin, no Assassin)
- Good team has no information advantage
- Evil team has no assassination win condition
```

**Fix Needed**: Require Merlin + Assassin at minimum

**Severity**: High (game becomes boring/unbalanced)

---

### Issue 6: Perceival Without Merlin/Morgana

**Problem**: Game allows illogical role combinations

**Example Bad Setups**:
```
Perceival + no Merlin + no Morgana
  → Perceival sees nothing (useless role)

Perceival + Merlin + no Morgana
  → Perceival knows exactly who Merlin is (too easy)
```

**Fix Needed**: Warn if illogical combinations detected

**Severity**: Medium (playable but suboptimal)

---

### Issue 7: Counter Not Reset After Game Completes

**Problem**: If user wants to play again, counter is not reset

**Current Code** (avalon.js:107-112):
```javascript
if (counter == characterarray.length - 1) {
  $('#next').prop('disabled', true);
  $('#role').prop('disabled', true);
  // No reset functionality
}
```

**Fix Needed**: Add "Start Over" button that resets:
- `characterhash = {}`
- `characterarray = []`
- `counter = 0`
- Re-enable all buttons

**Severity**: Low (page refresh works as workaround)

---

### Issue 8: No Confirmation Before Starting Reveal

**Problem**: User might accidentally click "Reveal Roles" with incomplete setup

**Example**:
```
User adds 3 players, accidentally clicks "Reveal Roles"
- No way to go back
- Have to refresh page and start over
```

**Fix Needed**: Add confirmation dialog
```javascript
const playerCount = characterarray.length;
if (playerCount < 5) {
  if (!confirm(`Only ${playerCount} players added. Start anyway?`)) {
    return false;
  }
}
```

**Severity**: Medium (UX issue, not logic error)

---

## 🔍 Edge Cases to Test

### Edge Case 1: All Evil Except Oberon
```
Setup:
  Morgana, Modred, Assassin, Minion (4 evil)
  Merlin, Arthur (2 good)

Expected Behavior:
  - Evil players see: Morgana, Modred, Assassin, Minion (all except Oberon)
  - Merlin sees: Morgana, Assassin, Minion (not Modred)
  - No Oberon in this game (no one is isolated)

Status: ✅ CORRECT (no Oberon to isolate)
```

### Edge Case 2: Only Oberon as Evil
```
Setup:
  Merlin, Perceival, Arthur, Arthur (4 good)
  Oberon (1 evil)

Expected Behavior:
  - Merlin sees: Oberon
  - Oberon sees: Nothing ("You are Evil")
  - Oberon is completely isolated

Status: ✅ CORRECT but ❌ INVALID SETUP (need 2 evil for 5 players)
```

### Edge Case 3: Morgana Without Perceival
```
Setup:
  Merlin, Arthur, Arthur (3 good)
  Morgana, Assassin (2 evil)

Expected Behavior:
  - Merlin sees: Morgana, Assassin
  - Morgana's special ability (confuse Perceival) is wasted
  - Still valid game, just suboptimal

Status: ✅ CORRECT but ⚠️ WARNING NEEDED
```

### Edge Case 4: Multiple Arthurs and Minions
```
Setup:
  Merlin, Arthur, Arthur (3 good)
  Assassin, Minion (2 evil)

Expected Behavior:
  - Arthur roles can duplicate (correct)
  - Minion roles can duplicate (correct)
  - All other roles cannot duplicate

Status: ✅ CORRECT (lines 16-23 handle this)
```

### Edge Case 5: 10-Player Game (Maximum)
```
Setup:
  Merlin, Perceival, Arthur, Arthur, Arthur, Arthur (6 good)
  Morgana, Modred, Assassin, Minion (4 evil)

Expected Behavior:
  - Merlin sees: Morgana, Assassin, Minion, but NOT Modred
  - Perceival sees: Merlin, Morgana
  - Evil (except Oberon) see: Morgana, Modred, Assassin, Minion
  - 4 evil for 10 players (correct ratio)

Status: ✅ LOGIC CORRECT but ❌ NO VALIDATION for 10-player limit
```

---

## 📊 Official Game Rules Summary

### Player Count & Evil Distribution

| Players | Evil | Good | Notes |
|---------|------|------|-------|
| 5 | 2 | 3 | Minimum game size |
| 6 | 2 | 4 | |
| 7 | 3 | 4 | Oberon often added |
| 8 | 3 | 5 | Modred often added |
| 9 | 3 | 6 | |
| 10 | 4 | 6 | Maximum game size |

### Role Requirements

**Mandatory** (every game):
- Merlin (Good) - Provides information to good team
- Assassin (Evil) - Can win for evil by killing Merlin

**Recommended** (for depth):
- Morgana (Evil) - Confuses Perceival
- Perceival (Good) - Protects Merlin's identity

**Optional** (for larger games):
- Modred (Evil) - Hidden from Merlin (7+ players)
- Oberon (Evil) - Isolated from evil team (7+ players)
- Arthur (Good) - Generic good filler
- Minion (Evil) - Generic evil filler

### Visibility Rules (From Official Rules)

**Good Team Information**:
1. **Merlin knows:**
   - All evil players EXCEPT Modred
   - Does NOT know: Modred, other good players

2. **Perceival knows:**
   - Merlin and Morgana (but can't tell which is which)
   - Does NOT know: Other players

3. **Arthur knows:**
   - Nothing (generic good)

**Evil Team Information**:
1. **Evil players (except Oberon) know:**
   - All other evil players EXCEPT Oberon
   - Does NOT know: Oberon, good players

2. **Oberon knows:**
   - Nothing (isolated evil)
   - Only knows they are evil

### Win Conditions

**Good Team Wins If:**
- 3 out of 5 quests succeed
- AND Assassin fails to kill Merlin

**Evil Team Wins If:**
- 3 out of 5 quests fail
- OR Good completes 3 quests but Assassin kills Merlin

---

## 🛠️ Recommended Fixes (Priority Order)

### High Priority (Game-Breaking)

1. **Add Player Count Validation**
   ```javascript
   if (characterarray.length < 5 || characterarray.length > 10) {
     alert('Avalon requires 5-10 players');
     return false;
   }
   ```

2. **Add Evil Count Validation**
   ```javascript
   const evilCount = Object.values(characterhash)
     .filter(role => ['Morgana', 'Modred', 'Assassin', 'Minion', 'Oberon'].includes(role))
     .length;

   const expectedEvil = {5:2, 6:2, 7:3, 8:3, 9:3, 10:4}[characterarray.length];

   if (evilCount !== expectedEvil) {
     alert(`Need ${expectedEvil} evil players for ${characterarray.length} players`);
     return false;
   }
   ```

3. **Require Merlin + Assassin**
   ```javascript
   const roles = Object.values(characterhash);
   if (!roles.includes('Merlin')) {
     alert('Merlin is required');
     return false;
   }
   if (!roles.includes('Assassin')) {
     alert('Assassin is required');
     return false;
   }
   ```

### Medium Priority (UX Issues)

4. **Filter Current Player from Evil List**
   ```javascript
   const otherEvil = Evil.filter(name => name !== characterarray[counter]);
   $('#revealplayer').text('Evil: ' + otherEvil.join(', '));
   ```

5. **Add Setup Warnings**
   ```javascript
   if (roles.includes('Perceival') && !roles.includes('Merlin')) {
     console.warn('Warning: Perceival without Merlin is not recommended');
   }
   ```

6. **Add Confirmation Dialog**
   ```javascript
   if (!isValidSetup()) {
     if (!confirm('Setup is invalid. Continue anyway?')) {
       return false;
     }
   }
   ```

### Low Priority (Nice to Have)

7. **Add Reset Button**
   ```html
   <button id="reset">Start Over</button>
   ```
   ```javascript
   $('#reset').click(function() {
     if (confirm('Reset game? All players will be cleared.')) {
       location.reload();
     }
   });
   ```

8. **Add Player Count Indicator**
   ```html
   <div id="player-count">Players: <span id="count">0</span>/10</div>
   ```
   ```javascript
   $('#submitcharacter').click(function() {
     // ... existing code ...
     $('#count').text(characterarray.length);
   });
   ```

---

## ✅ Logic Correctness Summary

| Feature | Current Status | Notes |
|---------|---------------|-------|
| Merlin visibility | ✅ CORRECT | Sees all evil except Modred |
| Perceival visibility | ✅ CORRECT | Sees Merlin + Morgana |
| Evil visibility | ✅ CORRECT | See each other except Oberon |
| Oberon isolation | ✅ CORRECT | Invisible to evil, visible to Merlin |
| Duplicate role checking | ✅ CORRECT | Arthur/Minion can duplicate |
| Player count validation | ❌ MISSING | No check for 5-10 range |
| Evil count validation | ❌ MISSING | No balance checking |
| Required roles | ❌ MISSING | Doesn't enforce Merlin/Assassin |
| Self-filtering | ❌ BUG | Evil players see themselves |
| Setup guidance | ❌ MISSING | No recommended setups |

**Overall Grade**: B- (Logic is correct, validation is missing)

---

## 🎯 Testing Checklist

### Unit Tests Needed

- [ ] Test Merlin sees all evil except Modred
- [ ] Test Merlin sees Oberon
- [ ] Test Perceival sees Merlin + Morgana
- [ ] Test Evil players see each other except Oberon
- [ ] Test Oberon sees no one
- [ ] Test duplicate role validation
- [ ] Test player count validation (5-10)
- [ ] Test evil count validation (by player count)
- [ ] Test required role validation
- [ ] Test self-filtering in visibility arrays

### Integration Tests Needed

- [ ] Test 5-player recommended setup
- [ ] Test 6-player recommended setup
- [ ] Test 7-player recommended setup
- [ ] Test 8-player recommended setup
- [ ] Test 9-player recommended setup
- [ ] Test 10-player recommended setup
- [ ] Test edge case: All Arthur + Merlin + Assassin
- [ ] Test edge case: Perceival without Morgana
- [ ] Test edge case: Maximum evil players
- [ ] Test edge case: Multiple Arthurs/Minions

### E2E Tests Needed

- [ ] Complete 5-player game flow
- [ ] Complete 10-player game flow
- [ ] Test invalid setup rejection
- [ ] Test role reveal privacy (each player sees only their role)
- [ ] Test reset functionality
- [ ] Test browser refresh (data loss handling)

---

## Conclusion

**Current Implementation**: The core visibility logic is **mathematically correct** according to official Avalon rules. The main issues are:

1. **Missing Validation**: No checks for player count, evil balance, or required roles
2. **Minor UI Bug**: Evil players see themselves in the evil list
3. **No Setup Guidance**: Players must memorize recommended setups

**Recommendation**: Before migrating to React, we should:
1. Fix the self-filtering bug (quick fix)
2. Add basic validation (player count, evil count, required roles)
3. Add recommended setup suggestions

Then migrate to React with a robust validation system and smart setup assistant.
