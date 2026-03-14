# Agent Blueprint

Portable operating standard for AI-assisted software projects.

## Quick Reference

| File | Purpose |
|------|---------|
| `AGENT_BLUEPRINT.md` | Canonical operating spec (copy to your repo) |
| `AGENTS.md` | Project-specific agent config (generated during alignment) |
| `roadmap/index.md` | Work unit backlog and execution status |
| `DESIGN_SYSTEM_GUIDE.md` | Optional UI design system companion |
| `collect-project-docs.sh` | Multi-project audit collection utility |

Validation: `bash -n collect-project-docs.sh` (after script changes)

## What This Is

A docs-and-workflow repository, not a runtime application. Copy one file into any codebase to get a consistent operating model for planning, execution, validation, and commit hygiene.

## Quick Start

1. Copy `AGENT_BLUEPRINT.md` to your project root.
2. Optionally copy `DESIGN_SYSTEM_GUIDE.md` for UI-heavy projects.
3. Ask your coding agent: "Align this project with AGENT_BLUEPRINT.md".
4. Answer prompts; the agent creates `AGENTS.md` and `roadmap/index.md`.

## Workflow Model

1. **Blueprint is immutable** — `AGENT_BLUEPRINT.md` defines the operating contract.
2. **Alignment generates config** — `AGENTS.md` captures project-specific rules (commands, validation, commit behavior).
3. **Roadmap drives execution** — `roadmap/*.md` files are work units with status (`draft → ready → active → done`).
4. **Validation before handoff** — agents run specified checks and request commit approval.

## Experimental GitHub Automation

This repo pilots roadmap-driven execution via GitHub Actions:

- `opencode-hello.yml` — manual smoke test for OpenCode in Actions
- `opencode-implement.yml` — roadmap work unit execution workflow
- `opencode.json` — pins provider routing (`zai-plan/glm-5`)

**Setup:**
1. Add `ZAI_CODING_PLAN_API_KEY` as a repository secret.
2. Run hello test: `gh workflow run opencode-hello.yml`
3. Run roadmap execution: `gh workflow run opencode-implement.yml -f roadmap_path=roadmap/some-unit.md`

**Local testing:** `ZAI_CODING_PLAN_API_KEY=... bash ./opencode-hello-local.sh`

The roadmap work unit is the canonical execution brief; GitHub only supplies the trigger and path.

## Versioning

Blueprint version is in `AGENT_BLUEPRINT.md` frontmatter. Current: `2026-03-07`. After upgrading downstream, run an alignment pass.

## Who This Fits

**Good fit:** One portable standard across many repos, markdown-first workflows, autonomous agent execution with validation.

**Not a fit:** Different process per project, heavy governance platforms beyond markdown standards.
