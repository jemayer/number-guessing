# ADR-002: Ticketing System

**Status:** Accepted
**Date:** 2026-02-05

## Context

We need a way to track work items (tickets) that integrates well with our agentic development workflow. The system should be file-based, git-friendly, and accessible to both humans and Claude Code.

## Decision

We will use **Beans** (https://github.com/hmans/beans), a flat-file issue tracker designed for AI collaboration.

### What This Means

- Tickets stored as markdown files in `.beans/` directory
- Configuration in `.beans.yml`
- CLI available for managing tickets
- Tickets are version-controlled alongside code

## Options Considered

### Option A: Beans (Selected)
- **Pros:** Purpose-built for agent collaboration, markdown-based, CLI tooling included, actively maintained
- **Cons:** External dependency

### Option B: Custom Markdown Format
- **Pros:** Zero dependencies, full control
- **Cons:** No tooling, reinventing existing solutions

### Option C: GitHub Issues
- **Pros:** Industry standard, rich features
- **Cons:** Not local-first, requires GitHub setup, external to codebase

## Consequences

- **Positive:** Tickets live in the repo, visible to Claude Code
- **Positive:** Git history tracks ticket lifecycle
- **Positive:** CLI tooling reduces friction
- **Negative:** Team needs to learn Beans conventions
- **Mitigation:** Document usage in skills/

## Notes

If Beans proves too heavy or doesn't fit our workflow, we can revisit this decision. The markdown-based approach means migration would be straightforward.
