---
# number-guessing-czyx
title: Add custom number pad
status: completed
type: feature
priority: normal
created_at: 2026-02-14T10:11:10Z
updated_at: 2026-02-14T10:13:20Z
parent: number-guessing-iu48
---

Replace the system keyboard on mobile with a custom in-app number pad. The native `<input>` remains the source of truth; `inputmode="none"` suppresses the virtual keyboard on mobile while desktop users can still type physically.

**Changes:**
- `src/index.html`: Add `inputmode="none"` to `#guess-input`, remove `autofocus`, add `#numpad` grid (0–9, ⌫, ✓) below `#game-core`
- `src/style.css`: Style `.num-key` buttons to match design system; disable state via `#numpad.disabled`; responsive tweaks
- `src/game.js`: Add numpad click handler that appends digits, handles backspace, and calls `form.requestSubmit()` for submit

No changes to `handleGuess()`, `shakeInput()`, or game logic.
