# AGENTS

Follows `AGENT_BLUEPRINT.md` (version: 1.4.4)

## Project Overview

This repository defines and maintains a portable agent operating standard. The primary deliverables are the blueprint (`AGENT_BLUEPRINT.md`) and optional UI companion (`DESIGN_SYSTEM_GUIDE.md`), plus a small audit utility script.

## Stack

- Markdown documentation
- Bash scripting (`collect-project-docs.sh`)
- Git-based workflow
- No runtime application/database in this repo

## Commit Trailer Template

```text
Co-authored-by: [AI_PRODUCT_NAME] <[AI_PRODUCT_EMAIL]>
AI-Provider: [AI_PROVIDER]
AI-Product: [AI_PRODUCT_LINE]
AI-Model: [AI_MODEL]
```

Template rules:
- `AI_PRODUCT_LINE`: `codex|claude|gemini|opencode`
- Product-line derivation:
  - Codex or ChatGPT coding agent -> `codex`
  - Claude -> `claude`
  - Gemini -> `gemini`
  - OpenCode -> `opencode` (regardless underlying provider/model, including z.ai)
- `AI_PROVIDER` and `AI_MODEL`: runtime-derived at commit time
- `AI_PRODUCT_NAME` and `AI_PRODUCT_EMAIL` format:
  - `codex` -> `Codex <codex@users.noreply.github.com>`
  - `claude` -> `Claude <claude@users.noreply.github.com>`
  - `gemini` -> `Gemini <google-gemini@users.noreply.github.com>`
  - `opencode` -> `GLM <zai-org@users.noreply.github.com>`
- Do not store filled runtime values in this file

## Validation Commands

| Level | Command | When |
|-------|---------|------|
| 1 | `bash -n collect-project-docs.sh` | After script changes |
| 2 | `rg -n "^version:" AGENT_BLUEPRINT.md` | After blueprint edits |
| 3 | `rg -n "BP-CORE-01|BP-ALIGN-REPORT|BP-RM-DOR" AGENT_BLUEPRINT.md` | Before completing blueprint changes |
| 4 | `echo "N/A: no UI/e2e in this repository"` | Always |

## Allowed Commands

- `rg`, `sed`, `cat`, `nl`, `wc` — inspect and validate docs/scripts
- `bash -n collect-project-docs.sh` — shell syntax validation
- `git status`, `git diff` — change review

## Require Confirmation

- `git commit` — user approves message and scope first
- Any dependency install/upgrade — modifies environment
- Network calls — external side effects
- Destructive commands — potential data loss

## Never Run

- `git reset --hard` — destructive history rewrite
- `rm -rf` — destructive deletion
- `matrix-reloaded` — disallowed in agent sessions; use provided instructions/schema instead
- Edits outside repo root — out of scope

## Project-Specific Rules

- Keep `README.md` human-facing and adoption-focused.
- Keep `AGENT_BLUEPRINT.md` as the canonical operational spec.
- Keep `CLAUDE.md` and `GEMINI.md` as thin pointers to this file.
- Preserve one-file portability of the blueprint across projects.
- Keep language concise and deterministic; avoid unnecessary ceremony.

## Decision Artifacts

- For high-impact or irreversible decisions, create `.decisions/[name].json`.
- Use `matrix-reloaded` format for structured comparison.
- Do not run `matrix-reloaded` CLI commands; use project-provided instructions/schema only.
- Optional: add `.decisions/[name].md` for human-readable narrative context.
- Treat JSON decision matrices as the authoritative record.

## References

- For operating rules, see `AGENT_BLUEPRINT.md`
- For decision artifacts and matrix format, see `AGENT_BLUEPRINT.md` section `Decision Artifacts [BP-DECISIONS]`
- For UI system workflows, see `DESIGN_SYSTEM_GUIDE.md`
- For cross-project audit collection, see `collect-project-docs.sh`

## Key Files

- `AGENT_BLUEPRINT.md` — canonical blueprint
- `AGENTS.md` — repo-specific policy entrypoint
- `README.md` — human adoption guide
- `DESIGN_SYSTEM_GUIDE.md` — optional UI design system guide
- `collect-project-docs.sh` — multi-project reference collector

## Knowledge Base

Tool: Roam Research

When asked to generate a Roam summary or thread:
- Parent block: `- [[<tool>]] [[<model-id>]] [[ai-thread]] [[agent-blueprint]]`
- Tool names: `opencode` | `claude-code` | `gemini-cli` | `codex-cli`
- Page refs: only include `[[Page Name]]` if explicitly instructed
- Sections: ask user what they want (chronological, functional, Q&A)

## User Profile

See `.agent-profile.md` (git-ignored) for interaction preferences.
