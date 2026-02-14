---
# number-guessing-3e4t
title: Keep winning number visible in input after correct guess
status: completed
type: bug
priority: normal
created_at: 2026-02-14T10:48:53Z
updated_at: 2026-02-14T10:49:22Z
parent: number-guessing-iu48
---

`input.value = ''` in `handleGuess()` runs unconditionally after every guess, clearing the winning number immediately on a correct guess. Fix: guard both the clear and the focus call with `if (!input.disabled)` — since `setInputDisabled(true)` is called earlier in the win branch, the input value is preserved until `initGame()` resets it on the next game.
