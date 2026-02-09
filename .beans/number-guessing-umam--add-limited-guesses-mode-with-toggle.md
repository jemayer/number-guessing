---
# number-guessing-umam
title: Add limited guesses mode with toggle
status: todo
type: feature
created_at: 2026-02-09T11:51:52Z
updated_at: 2026-02-09T11:51:52Z
parent: number-guessing-ia3n
---

Implement limited guesses as a togglable challenge mode.

UI:
- Toggle switch or button to enable/disable limited guesses
- Display remaining guesses when enabled (e.g., "Guesses: 3/10")
- Resets game when toggled

Game logic:
- Guess limits per difficulty: Easy=8, Medium=10, Hard=13, Insane=15
- Game over state when guesses run out (reveal the number)
- "Game Over" message with the correct answer and Play Again button
- Limit resets on new game and difficulty change

Storage:
- Remember the toggle preference in localStorage

Testing:
- Add tests for guess limit logic per difficulty
- Test game over condition
- Test that unlimited mode has no limit
