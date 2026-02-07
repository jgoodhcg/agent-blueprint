# Agent Blueprint

Lightweight, reusable operating standard for AI-assisted software projects.

## Purpose

This repository is the source for a portable blueprint you can copy into any project and tell agents to align to.
It is optimized for consistency, autonomous execution, and low process overhead.

## What To Copy Into Projects

- `AGENT_BLUEPRINT.md` (required)
- `DESIGN_SYSTEM_GUIDE.md` (optional, UI projects only)

## What This Solves

- Inconsistent agent behavior across repositories
- Weak task definition before autonomous execution
- Missing validation discipline before completion
- Ambiguous commit and audit expectations

## Quick Adoption

1. Copy `AGENT_BLUEPRINT.md` to the project root.
2. Create `AGENTS.md` that references the blueprint (template is in the blueprint).
3. Create `roadmap/index.md`.
4. Add project-specific commands and constraints in `AGENTS.md`.
5. For UI work, copy `DESIGN_SYSTEM_GUIDE.md`.

## Fit

Good fit:
- You want one immutable reference agents can follow everywhere.
- You use roadmap files as executable prompts.
- You prefer simple conventions over heavy tooling.

Not a fit:
- You want a different process per project.
- You need strict org-level governance workflows beyond markdown standards.

## Versioning

- The canonical version is the frontmatter version in `AGENT_BLUEPRINT.md`.
- When upgrading, run an alignment pass in each project.
- Upgrade to `1.3.0` includes roadmap status migration:
  - `idea` -> `draft`
  - `planned` -> `ready`
  - `paused` -> `active` (capture blocked details in `Context`)

## Repository Files

- `AGENT_BLUEPRINT.md`: canonical project standard
- `DESIGN_SYSTEM_GUIDE.md`: optional UI system companion
- `collect-project-docs.sh`: maintainer audit helper for multi-project checks
