---
# number-guessing-kxbe
title: 'Epic-008: Frontend Redesign'
status: todo
type: epic
created_at: 2026-02-10T21:04:56Z
updated_at: 2026-02-10T21:04:56Z
---

Give the game a distinctive visual identity that feels like a *game*, not a form. The current UI is structurally sound (responsive, accessible, dark/light themes) but visually generic. This epic focuses on elevating the design while preserving the existing functionality and accessibility.

## Goals

- Move away from the "card centered on gradient" aesthetic
- Make it feel like a game, not a settings panel
- Lean into the hot/cold mechanic as the visual centerpiece
- Improve feedback states to be more visceral and satisfying

## Constraints

- Keep vanilla HTML/CSS/JS (no frameworks) per ADR-001
- Preserve all existing accessibility (aria-live, prefers-reduced-motion, keyboard nav)
- Maintain dark/light theme support
- Don't break existing game logic or tests

