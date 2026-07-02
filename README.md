# Agent Blueprint

Portable operating standard for AI-assisted software projects.

Copy one file, run alignment, answer a few prompts, and your repo gets a consistent operating model for planning, execution, validation, and commit hygiene.

## What This Repository Is

This is a docs repository.

It defines a reusable blueprint you can copy into any codebase so human + agent collaboration follows the same rules each time.

## Core Files

- `AGENT_BLUEPRINT.md` (the main spec)
- `DESIGN_SYSTEM_GUIDE.md` (optional, for UI-heavy projects)
- `roadmap/index.md` (execution roadmap, created during alignment)

## Quick Start

1. Copy `AGENT_BLUEPRINT.md` and optionally `DESIGN_SYSTEM_GUIDE.md` to your project root.
2. Ask your coding agent: "Align this project with AGENT_BLUEPRINT.md".
3. Answer any prompts the agent provides.

For Claude Code users, the `applying-agent-blueprint` skill (`.claude/skills/applying-agent-blueprint/`) operationalizes this: copy it into your project's `.claude/skills/` and the agent will scaffold `AGENTS.md`, `roadmap/`, and optional companion files, then validate the result.

## How It Works In Practice

1. `AGENT_BLUEPRINT.md` is the immutable operating contract.
2. During alignment, the agent creates or updates `AGENTS.md` and `roadmap/index.md`.
3. `roadmap/[ID]-[slug].md` files become executable work units (`draft -> ready -> active -> done`).
4. `AGENTS.md` captures project-specific conventions for allowed commands, validation flow, and commit behavior.
5. The workflow enforces commit approval, self-validation before handoff, and commit trailer handling.

## Who This Fits

Good fit:
- You want one portable standard across many repos.
- You like markdown-first workflows and low process overhead.
- You want agents to execute ready work autonomously, with validation.

Not a fit:
- You want a different process in every project.
- You need a heavy governance platform beyond markdown standards.

## Versioning

- The source of truth is the frontmatter version in `AGENT_BLUEPRINT.md`.
- Current blueprint version in this repo: `2026-07-02`.
- After upgrading in downstream projects, run an alignment pass.

### Why date-based versions, not semver

- A version number should tell you **when**, not make a speculative promise about compatibility.
- Semver encodes intent ("this is a breaking change") but that intent is unreliable — accidental breakage ships as patches, and major bumps happen for trivial reasons.
- Date versions are honest, monotonically increasing, and require zero decision overhead. There is no debate about whether a change is "major" or "minor."
- This aligns with the approach used by Babashka, several Clojure libraries, and other projects that favor simplicity over ceremony.

## Sunset: Experimental GitHub Automation

The autonomous GitHub Actions pilot (roadmap-driven remote implement/review/fix) was sunset on 2026-06-17. The workflows, setup guide, and pilot app were removed; they remain recoverable from git history at the tag `autonomous-gha-pilot`. See the Sunset section of `roadmap/index.md` for the rationale.
