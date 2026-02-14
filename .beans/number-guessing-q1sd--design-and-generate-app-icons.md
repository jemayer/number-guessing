---
# number-guessing-q1sd
title: Design and generate app icons
status: todo
type: feature
created_at: 2026-02-14T09:18:31Z
updated_at: 2026-02-14T09:18:31Z
parent: number-guessing-du97
---

Create SVG-based app icons that match the game's visual identity (heat gauge aesthetic, dark/light palette). Export to the required raster sizes:

- 192×192 PNG — Android home screen / manifest `icons`
- 512×512 PNG — Android splash / maskable
- 180×180 PNG — Apple touch icon (`apple-touch-icon`)

Store icons in `public/icons/`. The SVG source should be kept alongside the PNGs for future re-export.

Consider making the 512px version maskable (safe zone: centered content within inner 80% circle) so Android adaptive icons crop cleanly.

