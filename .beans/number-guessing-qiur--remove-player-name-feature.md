---
# number-guessing-qiur
title: Remove player name feature
status: todo
type: task
created_at: 2026-02-14T09:22:39Z
updated_at: 2026-02-14T09:22:39Z
parent: number-guessing-m2sr
---

Remove all player name functionality. Stats section must remain intact.

**`index.html`**
- Remove `#player-section` div (greeting + "Change" button)
- Remove `#name-prompt` div (label, input, Save/Skip buttons)

**`game.js`**
- Remove imports: `getPlayerName`, `setPlayerName`
- Remove `loadGameData` import if it becomes unused (currently also used in `updateStatsDisplay` and `resetStats` — keep if still needed)
- Remove DOM refs: `playerGreeting`, `changeNameBtn`, `namePrompt`, `playerNameInput`, `saveNameBtn`, `skipNameBtn`
- Remove functions: `updatePlayerGreeting`, `showNamePrompt`, `saveName`, `skipName`, `initPlayerName`
- Remove event listeners for the above elements
- Remove `initPlayerName()` call from init block
- Update `resetStats`: remove `updatePlayerGreeting()` and `showNamePrompt()` calls; update confirm message to not mention "name"

**`storage.js`**
- Remove `getPlayerName` and `setPlayerName` exports
- Remove `playerName: ''` from `getDefaultData()`

**`storage.test.js`**
- Remove `getPlayerName`, `setPlayerName` imports
- Remove `getPlayerName` and `setPlayerName` describe blocks
- Update `getDefaultData` test (remove `playerName` assertion)
- Clean up test fixtures that include `playerName` in stored mock data

**`style.css`**
- Remove rules for: `#player-section`, `#player-greeting`, `#change-name-btn`, `#name-prompt`, `#name-form`, `#player-name-input`, `#skip-name-btn`

After changes, run `npx vitest run` to confirm no regressions.
