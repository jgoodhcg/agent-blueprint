---
version: "1.2.0"
---

# Agent Blueprint

Immutable reference for consistent agent behavior across projects. Copy into any project and reference from `AGENTS.md`.

---

## Safety

Confirm before running destructive commands, installing dependencies, or taking actions outside the repo.

---

## Workflow

### Operating Model

1. **Take direction** from a `roadmap/*.md` work unit, issue, or user request.
2. **If input is a brain dump**, create a draft work unit and clarify until scope and validation are concrete.
3. **Execute autonomously** once scope is clear; do not stop after each small step.
4. **Self-validate end-to-end** before returning: run required checks, create missing tests when needed, and run E2E for UI changes.
5. **Return to the user only when** done and validated, stuck, or blocked on an irreversible/high-impact decision.

### Validation

Projects define validation commands in `AGENTS.md`. Run them liberally:

- **Format/Lint** — fast, safe, run after changes
- **Build/Compile** — catches type and syntax errors
- **Unit tests** — run before declaring logic complete
- **E2E tests** — run after UI changes (start required services if approved)

Work through the validation hierarchy. Escalate only when lower levels pass.

### Guardrails

- Run validation after changes.
- If a command is not on the allowlist, ask.
- Keep changes minimal and focused; avoid unrelated improvements.
- For critical logic changes, review `git diff` before declaring completion.

---

## Adoption

1. Copy this file as `AGENT_BLUEPRINT.md`.
2. Create `AGENTS.md` using the template below.
3. Create `roadmap/index.md`.

Agent-specific files (`CLAUDE.md`, `GEMINI.md`, etc.) are optional and should be thin pointers to `AGENTS.md`.

---

## Alignment Contract

- `AGENTS.md` is the project policy entrypoint and references this blueprint.
- `roadmap/` is the canonical place for scoped work units and execution prompts.
- A `ready` work unit is executable without additional clarification.
- Keep policy lean: prefer references over duplicated instructions.

### Align Project With This Blueprint

When asked to align a project:
1. Compare `AGENTS.md` and `roadmap/` against this blueprint.
2. Report gaps and propose a minimal patch plan.
3. Apply focused edits and run project validation commands.
4. Return with completed changes plus any remaining questions.

---

## AGENTS.md Template

```markdown
# AGENTS

Follows AGENT_BLUEPRINT.md

## Project Overview

[One paragraph: what this is, language/framework, key domains.]

## Stack

- [Language + version]
- [Framework/runtime]
- [Database]
- [Infra/deploy target]

## Validation Commands

| Level | Command | When |
|-------|---------|------|
| 1 | `[format/lint]` | After every change |
| 2 | `[build/compile]` | After code changes |
| 3 | `[test]` | Before completing work |
| 4 | `[e2e]` | After UI changes |

## Allowed Commands

- `[command]` — [what it does]

## Require Confirmation

- `[command]` — [why]

## Never Run

- `[command]` — [why]

## Project-Specific Rules

- [constraints, data sensitivity, architectural boundaries]

## References

- For [topic], see `[doc path]`

## Key Files

- `[path]` — [purpose]
```

---

## Roadmap

This is the core execution model. Work units are prompts for autonomous agent work.

### Structure

```
roadmap/
├── index.md       # Project overview and directory of work units
├── _template.md   # Starting point for new work units
├── *.md           # Individual work unit files (with frontmatter)
└── archived/      # Completed or dropped work units
```

### Work Unit Frontmatter

Every work unit file **must** begin with YAML frontmatter for machine parsing:

```yaml
---
title: "Feature Name"
status: draft | ready | active | done | dropped
description: "One-line summary of what this work unit accomplishes"
created: 2024-01-15
updated: 2024-01-20
tags: []
priority: medium                      # high | medium | low
---
```

**Required fields:**
- `title` — Display name for the work unit
- `status` — Current state (see Status Definitions below)
- `description` — One-line summary
- `created` — Date work unit was created (YYYY-MM-DD)
- `updated` — Date of last modification (YYYY-MM-DD)
- `tags` — Array for categorization and filtering
- `priority` — high | medium | low (default: medium)

### Status Definitions

| Status | Meaning | Kanban Column |
|--------|---------|---------------|
| `draft` | Brain dump captured; has open questions | Backlog |
| `ready` | Clarified and executable as-is | Backlog |
| `active` | Currently being worked on | In Progress |
| `done` | Shipped and working | Done |
| `dropped` | Decided not to pursue | (hidden) |

### index.md Template

```markdown
---
title: "Project Name Roadmap"
goal: "One sentence: what this project exists to achieve."
---

# Roadmap

## Current Focus

[What is actively being worked on right now.]

## Work Units

See individual `*.md` files in this directory. Use `draft` while clarifying and `ready` when autonomous execution can begin.

## Quick Ideas

Ideas not yet promoted to work units:

- [Idea that doesn't need a file yet]
- [Another idea]
```

### _template.md

```markdown
---
title: "Work Unit Title"
status: draft | ready | active | done | dropped
description: "One line"
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: []
priority: high | medium | low
---

# Work Unit Title

## Intent

[What this accomplishes and why it matters.]

## Specification

[Concrete description of the change. What exists after this is done.]

## Validation

[How to know it's done:]
- [ ] Tests to create/pass
- [ ] E2E flows to run
- [ ] Visual criteria (reference style guide if applicable)

## Scope

[What's not included. Boundaries to prevent drift.]

## Context

[Pointers to relevant files, prior decisions, or constraints.]

## Open Questions (draft only)

[Unresolved items. Clear this section before moving to ready.]
```

### Brain Dump to Ready Workflow

When creating a new work unit from a brain dump:
1. Create the file with status `draft`.
2. Ask clarifying questions until scope and validation are concrete.
3. Do not extrapolate uncertain requirements; ask instead.
4. Once questions are resolved, update status to `ready`.
5. A `ready` work unit should be a complete prompt an agent can execute without further clarification.

### Rules

- `roadmap/index.md` existence identifies a compatible project.
- Every work unit file must have valid YAML frontmatter.
- Status lives in frontmatter, not in prose.
- Keep work units concrete enough to execute and validate.
- When a work unit reaches `done` or `dropped`, move the file to `archived/`.
- Update the `updated` field whenever you modify a work unit.

---

## Decision Artifacts

Optional. Use for high-impact or irreversible decisions, or when revisiting the same decision.

### Structure

Every decision has a markdown file. Optionally add a JSON file for matrix visualization.

```
.decisions/
├── database-choice.md       # Required: the decision record
├── database-choice.json     # Optional: matrix-reloaded format
└── auth-strategy.md
```

### Markdown Format (required)

```markdown
# Decision: [Title]

**Status:** proposed | accepted | superseded | rejected
**Date:** YYYY-MM-DD

## Context

[Why this decision is needed.]

## Options

### Option A
- Pros: [...]
- Cons: [...]

### Option B
- Pros: [...]
- Cons: [...]

## Decision

[What was chosen and why.]

## Consequences

[What changes. What to watch for.]
```

### Decision Matrix (optional)

For structured comparison, add a `.json` file using `matrix-reloaded` format. Run `matrix-reloaded --instructions` for schema details. The JSON provides visualization; the markdown remains the authoritative record.

---

## Design System

For projects with visual UI, use `DESIGN_SYSTEM_GUIDE.md` to establish consistent interface patterns.
The guide should use concrete, testable values (tokens/patterns), not only subjective descriptions.

If this project requires visual design and no design system exists:
1. Ask the user if they want to establish a design system.
2. If yes, copy `DESIGN_SYSTEM_GUIDE.md` into the project.
3. Follow its workflow to capture decisions in `.interface-design/system.md`.

Skip for CLI tools, libraries, backends, or other non-visual projects.
