# Number Guessing Game - Claude Code Instructions

## Project Overview

This is an experimental project to explore agentic development workflows. The application itself (a web-based number guessing game) is secondary to learning structured collaboration patterns.

## How We Work on This Project

### Development Workflow

1. **ADRs first** - Major decisions get documented in `docs/adr/` before implementation
2. **Tickets for work** - All implementation work starts with a ticket via Beans (`beans new`)
3. **Skills capture learnings** - Patterns and guidance live in `skills/`

### Key Principles

- **Collaboration over generation** - Discuss and refine, don't just produce
- **Structure over speed** - Clean architecture matters more than shipping fast
- **Learning mode** - This is experimental; iteration is expected

## Project Structure

```
docs/adr/     # Architecture Decision Records
skills/       # Guidance documents for Claude
.beans/       # Tickets managed by Beans
src/          # Application source code
```

## Beans (Ticketing) Quick Reference

```bash
beans new              # Create a new ticket (interactive)
beans list             # List all tickets
beans show <id>        # Show ticket details
beans close <id>       # Mark ticket as done
```

Tickets are markdown files in `.beans/` - can be edited directly.

## References

- ADRs: See `docs/adr/` for all architectural decisions
- Tickets: Run `beans list` or browse `.beans/`

## Tech Stack

- Vanilla HTML, CSS, JavaScript (no build step) - see ADR-001
- Beans for file-based ticketing - see ADR-002
- Local-first development (GitHub integration later)
