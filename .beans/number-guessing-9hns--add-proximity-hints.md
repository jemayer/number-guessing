---
# number-guessing-9hns
title: Add proximity hints
status: todo
type: feature
created_at: 2026-02-05T19:08:23Z
updated_at: 2026-02-05T19:08:23Z
parent: number-guessing-4zvr
---

Show a hint when the player's guess is close to the target.

Proximity thresholds (roughly 10% of range):
- Easy (1-50): within 5
- Medium (1-100): within 10
- Hard (1-500): within 50
- Insane (1-1000): within 100

Requirements:
- Display "You're getting close!" alongside higher/lower feedback
- Hint appears when guess is within threshold but not correct
- Style the hint distinctly (e.g., subtle text or icon)
- Threshold should scale with selected difficulty