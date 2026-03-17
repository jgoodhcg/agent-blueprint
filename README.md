# Agent Blueprint

Portable operating standard for AI-assisted software projects.

Copy one file, run alignment, answer a few prompts, and your repo gets a consistent operating model for planning, execution, validation, and commit hygiene.

## What This Is

A docs-and-workflow repository defining a reusable blueprint for human + agent collaboration. Not a runtime application.

## Key Files

| File | Purpose |
|------|---------|
| `AGENT_BLUEPRINT.md` | Canonical operating spec (copy this to your project) |
| `DESIGN_SYSTEM_GUIDE.md` | Optional UI companion for design-heavy projects |
| `roadmap/index.md` | Execution roadmap created during alignment |
| `AGENTS.md` | Project-specific conventions (auto-generated) |

## Quick Start

1. Copy `AGENT_BLUEPRINT.md` (and optionally `DESIGN_SYSTEM_GUIDE.md`) to your project root.
2. Ask your coding agent: "Align this project with AGENT_BLUEPRINT.md".
3. Answer the prompts.

The agent creates `AGENTS.md` with your conventions and `roadmap/index.md` with initial work units.

## Workflow

- `AGENT_BLUEPRINT.md` is the immutable operating contract.
- Work units live in `roadmap/[ID]-[slug].md` with status: `draft → ready → active → done`.
- Agents execute `ready` units autonomously, validate, and apply commit trailers.
- `AGENTS.md` captures allowed commands, validation flow, and commit behavior.

## Who This Fits

**Good fit:** One portable standard across many repos, markdown-first workflows, low overhead, autonomous agent execution with validation.

**Not a fit:** Per-project process variation, heavy governance platforms beyond markdown.

## Experimental GitHub Automation

Roadmap-driven execution in GitHub Actions:

| Component | Purpose |
|-----------|---------|
| `.github/workflows/opencode-hello.yml` | Manual smoke test for OpenCode in Actions |
| `.github/workflows/opencode-implement.yml` | Roadmap-driven implement/review workflow |
| `opencode.json` | Provider routing and default model |

**Setup:**
1. Add `ZAI_CODING_PLAN_API_KEY` and `OPENCODE_API_KEY` secrets.
2. Test locally: `ZAI_CODING_PLAN_API_KEY=... bash ./opencode-hello-local.sh`
3. Run hello workflow: `gh workflow run opencode-hello.yml`
4. Run implementation: `gh workflow run opencode-implement.yml -f mode=implement -f roadmap_path=roadmap/XXX-slug.md`
5. Run review: `gh workflow run opencode-implement.yml -f mode=review -f roadmap_path=roadmap/XXX-slug.md -f pr_number=123 -f review_model=opencode/claude-opus-4-6`

Implementation uses `zai-plan/glm-5`. Review uses OpenCode Zen with allowlisted models.

## Versioning

Source of truth: frontmatter `version` in `AGENT_BLUEPRINT.md`. Current: `2026-03-16`. After upgrading downstream, run an alignment pass.
