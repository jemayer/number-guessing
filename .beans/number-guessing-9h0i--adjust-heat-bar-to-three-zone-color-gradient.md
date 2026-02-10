---
# number-guessing-9h0i
title: Adjust heat bar to three-zone color gradient
status: completed
type: bug
priority: normal
created_at: 2026-02-10T19:15:37Z
updated_at: 2026-02-10T19:16:46Z
---

The heat bar turns red too early. Rework the color logic into three distinct zones: blue (far away, 0-33% warmth), yellow (mid-range, 33-66%), and red (close/hot, 66-100%), with smooth interpolation between zones.
