# ADR-003: Testing Strategy

**Status:** Accepted
**Date:** 2026-02-05

## Context

We need automated tests to catch regressions and ensure code quality. As an agentic workflow, tests also serve as a safety net - Claude can verify changes don't break existing functionality before committing.

## Decision

We will use **Vitest** for testing, with the following practices:

### Framework Choice: Vitest
- Fast, modern test runner with native ES modules support
- Zero-config for simple projects
- Jest-compatible API (familiar patterns)
- Works well with vanilla JavaScript

### What We Test
- **Game logic** (pure functions): random number generation bounds, guess comparison, win detection, proximity hints
- **DOM interactions** (integration): form submission, UI updates, difficulty switching

### What We Don't Test (for now)
- Visual styling (would require visual regression tools)
- Browser-specific quirks (manual testing sufficient at this scale)

### Testing Rules
1. All new game logic must have corresponding tests
2. Tests must pass before committing
3. Failing tests block the commit - fix the code or update the test

## Consequences

- **Positive:** Confidence in refactoring and adding features
- **Positive:** Claude can self-verify changes work correctly
- **Positive:** Documents expected behavior
- **Negative:** Adds npm/Node.js dependency to previously dependency-free project
- **Mitigation:** Keep dev dependencies minimal; production code stays vanilla

## Implementation

1. Initialize npm project
2. Install Vitest as dev dependency
3. Create test file(s) in `src/` or `tests/`
4. Add test script to package.json
5. Update CLAUDE.md with testing workflow

## Notes

This introduces a build tool dependency for development only. The production code remains vanilla HTML/CSS/JS with no build step required.
