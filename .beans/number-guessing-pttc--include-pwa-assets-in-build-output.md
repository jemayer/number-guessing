---
# number-guessing-pttc
title: Include PWA assets in build output
status: todo
type: task
created_at: 2026-02-14T09:19:07Z
updated_at: 2026-02-14T09:19:07Z
parent: number-guessing-du97
---

Ensure `manifest.json`, `sw.js`, and the `icons/` directory are copied into `dist/` as part of the build.

The current esbuild setup in `build.js` bundles JS/CSS/HTML but doesn't handle arbitrary static assets. Options:

- Add a `cp -r public/icons dist/icons` step to the build script
- Or use esbuild's `copy` plugin if already available

Also verify that `sw.js` ends up at the root of `dist/` (not nested), since service workers must be served from the scope they control.

This ticket should be completed before the service worker ticket (number-guessing-58x6) is testable end-to-end.
