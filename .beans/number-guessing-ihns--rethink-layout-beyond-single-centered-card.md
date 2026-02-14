---
# number-guessing-ihns
title: Rethink layout beyond single centered card
status: completed
type: feature
priority: normal
created_at: 2026-02-10T21:05:37Z
updated_at: 2026-02-12T16:40:11Z
parent: number-guessing-kxbe
---

The single centered card works but doesn't use screen real estate creatively. Everything is stacked vertically in a 400px column, which makes the game feel small and form-like.

## Ideas to explore

- Use more of the viewport — the game area could breathe more
- Stats and settings could live in a sidebar, drawer, or header rather than being stacked below the main game
- The difficulty selector and challenge mode toggle could be presented more like game mode selection
- On larger screens, there's room for the layout to be more expressive
- The game input area (the core loop: guess, feedback, heat) should dominate visually

## Acceptance criteria

- The core game loop (input, feedback, heat bar) is the visual focal point
- Secondary UI (stats, settings, difficulty) is accessible but doesn't crowd the main experience
- Layout works well on both mobile and desktop
- Feels more like a game screen than a form
