# Agent Blueprint

Portable operating standard for AI-assisted software projects.

Copy one file, run alignment, answer a few prompts, and your repo gets a consistent operating model for planning, execution, validation, and commit hygiene.

## What This Repository Is

This is a docs-and-workflow repository, not a runtime application.

It defines a reusable blueprint you can copy into any codebase so human + agent collaboration follows the same rules each time.

## Core Files

- `AGENT_BLUEPRINT.md` (the main spec)
- `DESIGN_SYSTEM_GUIDE.md` (optional, for UI-heavy projects)
- `roadmap/index.md` (execution roadmap, created during alignment)

## Quick Start

1. Copy `AGENT_BLUEPRINT.md` and optionally `DESIGN_SYSTEM_GUIDE.md` to your project root.
2. Ask your coding agent: "Align this project with AGENT_BLUEPRINT.md".
3. Answer any prompts the agent provides.

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
- Current blueprint version in this repo: `2026-03-16`.
- After upgrading in downstream projects, run an alignment pass.

## Experimental GitHub Automation

- `.github/workflows/opencode-hello.yml` provides a minimal manual smoke test for OpenCode in GitHub Actions.
- `.github/workflows/opencode-implement.yml` is the roadmap-driven execution and review workflow.
- `.github/workflows/pr-validation.yml` is the pull-request validation workflow for repository checks that should run automatically after PR updates.
- `opencode.json` commits the provider routing and default model for the workflow.
- Add `ZAI_CODING_PLAN_API_KEY` and `OPENCODE_API_KEY` repository secrets in GitHub Actions.
- Implementation runs default to `zai-coding-plan/glm-5`.
- Review runs default to `opencode/gpt-5.4`.
- You can override the model in either mode with `-f model=provider/model`, using any `opencode/<model-id>` available in your Zen plan or any `zai-coding-plan/<model-id>` available in your Z.AI Coding Plan access.
- Local smoke test: run `ZAI_CODING_PLAN_API_KEY=... bash ./opencode-hello-local.sh` to verify the pinned provider route without GitHub.
- Optional local config dump: add `OPENCODE_SHOW_CONFIG=1` when running the local smoke test.
- Run the hello smoke test from the Actions UI or with `gh workflow run opencode-hello.yml`.
- Run roadmap implementation from the Actions UI or with `gh workflow run opencode-implement.yml -f mode=implement -f roadmap_path=roadmap/002-readme-once-over.md`.
- Override the model when needed, for example `gh workflow run opencode-implement.yml -f mode=implement -f roadmap_path=roadmap/002-readme-once-over.md -f model=opencode/gemini-3.1-pro`.
- Run roadmap review from the Actions UI or with `gh workflow run opencode-implement.yml -f mode=review -f roadmap_path=roadmap/002-readme-once-over.md -f pr_number=123 -f model=opencode/gpt-5.4`.
- Review mode now expects the agent to write a structured review artifact that the workflow publishes as a real PR review.
- The roadmap work unit is the canonical execution brief; GitHub only supplies the trigger and the `roadmap_path`.
- In this repo the automatic PR validation workflow is lightweight because there is no application runtime; in an app repo this is where lint, compile, unit, integration, and e2e checks would run.
- Because implementation PRs are created by `GITHUB_TOKEN`, the implementation workflow explicitly dispatches PR validation after the PR is created; plain `pull_request` fan-out is not sufficient for that case.
- Recommended pilot proof order:
  1. Run the local smoke test.
  2. Run `opencode-hello.yml` and confirm the workflow summary reports a successful OpenCode action outcome.
  3. Run `opencode-implement.yml` in `implement` mode against a safe `ready` roadmap work unit and confirm it creates or updates the expected branch/PR.
  4. Confirm the PR triggers `.github/workflows/pr-validation.yml` automatically.
  5. Run `opencode-implement.yml` in `review` mode against that PR and confirm it posts a PR-visible review with the selected model and target PR.
  6. Update the acceptance checklist in `roadmap/001-github-opencode-pilot.md` only after the corresponding GitHub evidence exists.

For the current POC loop, orchestration is intentionally manual between stages:
- dispatch `implement`
- let PR validation workflows run on the resulting PR
- dispatch `review` after checks are green or after you want review feedback on the current state
- if checks fail or review requests changes, rerun `implement` against the same roadmap unit to update the PR

## Demo Flow Snapshot

This section demonstrates the GitHub roadmap automation loop in action.

The typical flow: **Implementation -> PR validation -> Review -> Human review**.
