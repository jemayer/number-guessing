---
# number-guessing-e2s6
title: Set up Vitest and add initial tests
status: completed
type: task
priority: normal
created_at: 2026-02-05T19:20:58Z
updated_at: 2026-02-05T19:27:19Z
---

Implement testing infrastructure per ADR-003:

Setup:
- Initialize npm project (package.json)
- Install Vitest as dev dependency
- Configure test script

Initial tests to write:
- Random number is within bounds (1 to maxNumber)
- Guess comparison logic (higher/lower/correct)
- Proximity hint threshold calculation
- Proximity detection (isClose function)

Note: May need to refactor game.js to export functions for testing.