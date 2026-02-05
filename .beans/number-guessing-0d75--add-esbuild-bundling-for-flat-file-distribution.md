---
# number-guessing-0d75
title: Add esbuild bundling for flat file distribution
status: completed
type: task
priority: normal
created_at: 2026-02-05T19:50:02Z
updated_at: 2026-02-05T19:51:14Z
---

Bundle JS files so the game works with file:// protocol (no server needed).

- Install esbuild as dev dependency
- Add build script to package.json
- Output bundled file to dist/
- Copy HTML/CSS to dist/ with updated script reference
- Update .gitignore for dist/