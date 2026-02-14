---
# number-guessing-muwb
title: Improve higher/lower feedback states
status: completed
type: feature
priority: normal
created_at: 2026-02-10T21:05:36Z
updated_at: 2026-02-12T16:40:11Z
parent: number-guessing-kxbe
---

The "higher"/"lower" feedback currently just changes text color (orange/blue). The shake animation on wrong guesses is nice, but the overall feedback loop could be more visceral and game-like.

## Ideas to explore

- Directional visual cues (arrows, motion) that reinforce higher/lower
- More dramatic wrong-guess feedback beyond the shake — maybe the input border flashes, or there's a brief color wash
- The "close" state (fire emoji) could be more integrated into the design rather than appended text
- Win state could be more explosive — the confetti is good but the rest of the UI stays static
- Consider sound-adjacent visual cues (screen flash, ripple effects) for players who have sound off

## Acceptance criteria

- A wrong guess feels like a clear "nope, try again" moment
- Higher/lower direction is communicated visually, not just through text
- Getting close feels exciting and tense
- Winning feels like a genuine payoff
