---
# number-guessing-s1y4
title: Add difficulty levels
status: completed
type: feature
priority: normal
created_at: 2026-02-05T19:08:21Z
updated_at: 2026-02-05T19:09:43Z
parent: number-guessing-4zvr
---

Add difficulty selection to the game:

Levels:
- Easy: 1-50
- Medium: 1-100 (default, current behavior)
- Hard: 1-500
- Insane: 1-1000

Requirements:
- UI to select difficulty (buttons or dropdown)
- Update instruction text to show current range
- Reset game when difficulty changes
- Remember to update input max attribute for validation