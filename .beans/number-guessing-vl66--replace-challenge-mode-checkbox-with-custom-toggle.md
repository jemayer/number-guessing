---
# number-guessing-vl66
title: Replace challenge mode checkbox with custom toggle switch
status: todo
type: feature
created_at: 2026-02-14T10:19:55Z
updated_at: 2026-02-14T10:19:55Z
parent: number-guessing-iu48
---

CSS-only iOS-style toggle switch for the challenge mode label. Native checkbox stays hidden but functional (drives all existing JS logic unchanged). Two `<span>` elements (track + thumb) are styled via `:checked + .toggle-track` sibling selector. Includes focus ring, dark mode support, and reduced-motion compliance.
