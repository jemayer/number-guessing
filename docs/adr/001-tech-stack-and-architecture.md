# ADR-001: Tech Stack and Architecture

**Status:** Accepted
**Date:** 2026-02-05

## Context

We're building a number guessing game as a web application. The primary goal is learning agentic development workflows, not building production software. The tech stack choice should minimize friction and complexity.

## Decision

We will use **vanilla HTML, CSS, and JavaScript** with no build step or framework.

### What This Means

- Single HTML file (or small set of files) served statically
- Plain CSS for styling
- Vanilla JS for game logic and interactivity
- No bundler, transpiler, or package manager required initially
- Can be opened directly in a browser via `file://` or simple HTTP server

## Options Considered

### Option A: Vanilla HTML/CSS/JS (Selected)
- **Pros:** Zero setup, no dependencies, instant feedback, focus stays on workflow
- **Cons:** No component model, manual DOM manipulation

### Option B: Node.js + Express
- **Pros:** Server-side logic, API patterns, closer to "real" web development
- **Cons:** Adds complexity not needed for a guessing game

### Option C: Modern SPA Framework (React/Vue/Svelte)
- **Pros:** Industry-standard patterns, component architecture
- **Cons:** Build tooling overhead, learning curve, overkill for this use case

## Consequences

- **Positive:** Can start implementing immediately with no setup
- **Positive:** Easy to understand and modify the entire codebase
- **Positive:** Workflow learning isn't blocked by tooling issues
- **Negative:** Won't exercise patterns needed for larger applications
- **Mitigation:** Can introduce complexity via future ADRs if desired

## Notes

This decision prioritizes learning the agentic workflow over building with production patterns. The simplicity is intentional and appropriate for the experimental nature of this project.
