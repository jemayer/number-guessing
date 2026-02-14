---
# number-guessing-60b0
title: Add iOS PWA meta tags
status: completed
type: feature
priority: normal
created_at: 2026-02-14T09:18:52Z
updated_at: 2026-02-14T09:35:27Z
parent: number-guessing-du97
---

Add iOS-specific meta tags to `index.html` that improve the home screen install experience on Safari:

- `<link rel="apple-touch-icon" href="/icons/icon-180.png">` — icon shown on iOS home screen
- `<meta name="apple-mobile-web-app-capable" content="yes">` — enables standalone mode on iOS
- `<meta name="apple-mobile-web-app-status-bar-style" content="default">` — status bar appearance (or `black-translucent` for dark theme)
- `<meta name="apple-mobile-web-app-title" content="Number Guess">` — short name under icon

Depends on icon assets from the icon design ticket (number-guessing-q1sd).
