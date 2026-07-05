# AGENTS

Follows `AGENT_BLUEPRINT.md` (version: 2026-07-04)

## Project Overview

This repository defines and maintains a portable agent operating standard. The primary deliverables are the blueprint (`AGENT_BLUEPRINT.md`) and optional UI companion (`DESIGN_SYSTEM_GUIDE.md`), plus a small audit utility script.

## Stack

- Markdown documentation
- Bash scripting (`collect-project-docs.sh`)
- Git-based workflow
- No runtime application/database in this repo

## Environment

- Version manager: n/a (no runtime application)
- Version file: n/a
- Lockfile: n/a
- Setup: n/a

## Commit Trailer Template

```text
Co-authored-by: [AI_PRODUCT_NAME] <[AI_PRODUCT_EMAIL]>
AI-Provider: [AI_PROVIDER]
AI-Product: [AI_PRODUCT_LINE]
AI-Model: [AI_MODEL]
```

Template rules:
- Fill at commit time; do not store filled runtime values in this file.
- Resolve all values (product line, provider/model, co-author identity, multi-model attribution) per `references/commit-attribution.md`.

## Validation Commands

| Level | Command | When |
|-------|---------|------|
| 1 | `bash -n collect-project-docs.sh` | After script changes |
| 2 | `rg -n "^version:" AGENT_BLUEPRINT.md` | After blueprint edits |
| 3 | `rg -n "BP-CORE-01|BP-ALIGN-REPORT|BP-RM-DOR" AGENT_BLUEPRINT.md` | Before completing blueprint changes |
| 4 | `echo "N/A: no UI/e2e in this repository"` | Always |

## Execution Modes

Local interactive work with the user is the only runtime for this repo.

- Canonical planning surface is `roadmap/`; treat the referenced work unit as the source of scope.
- Roadmap work unit filenames use 3-digit IDs in this repo: `[ID]-[slug].md`.
- Use the validation commands above when their trigger conditions apply.
- Keep changes minimal and focused on the requested work unit.
- `git status` and `git diff` are always allowed for change review.
- `rg`, `sed`, `cat`, `nl`, and `wc` are always allowed for inspecting docs and scripts.
- `bash -n collect-project-docs.sh` is allowed after script changes.
- Require user confirmation before `git commit`, dependency install/upgrade, or network calls with external side effects.
- Ask before destructive actions or anything not clearly covered by the allowlist.
- It is acceptable to stop for clarification when scope is ambiguous.

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

## Codebase Reconnaissance

Run these git commands when applying the blueprint to an existing codebase or auditing a mature blueprint-following project. The output informs AGENTS.md sections like project-specific rules, validation priorities, and key files — grounding them in observed risk rather than assumptions.

| Signal | Command | What it reveals |
|--------|---------|-----------------|
| Churn hotspots | `git log --format=format: --name-only --since="1 year ago" \| sort \| uniq -c \| sort -nr \| head -20` | Files that change most often — candidates for tighter validation or ownership rules |
| Bus factor | `git shortlog -sn --no-merges --since="6 months ago"` | Knowledge concentration — flag areas where a single contributor owns 60%+ of recent changes |
| Bug clusters | `git log -i -E --grep="fix\|bug\|broken" --name-only --format='' \| sort \| uniq -c \| sort -nr \| head -20` | Files with the most bug-related commits — cross-reference with churn to find highest-risk code |
| Project momentum | `git log --format='%ad' --date=format:'%Y-%m' \| sort \| uniq -c` | Commit frequency by month — reveals team health, departures, or batch-release patterns |
| Firefighting frequency | `git log --oneline --since="1 year ago" \| grep -iE 'revert\|hotfix\|emergency\|rollback'` | Revert/hotfix rate — frequent entries suggest deploy process or test coverage gaps |

Use the results to:
- Prioritize which areas need validation commands or stricter review.
- Identify files that warrant explicit ownership or focused test coverage.
- Calibrate project-specific rules to actual risk patterns rather than convention alone.

Source: [The Git Commands I Run Before Reading Any Code](https://piechowski.io/post/git-commands-before-reading-code/) — Ally Piechowski

## Reality Check

Before implementing, briefly consider:

- [ ] **Simpler path?** — Is complexity justified by value?
- [ ] **Existing solution?** — Am I reinventing or missing a library/pattern?
- [ ] **Right problem?** — Is the framing sound, or am I treating symptoms?
- [ ] **Known pitfalls?** — Are there anti-patterns or failure modes to avoid?

If any answer gives pause, flag it before proceeding.

## Decision Artifacts

- For high-impact or irreversible decisions, create `.decisions/[name].json`.
- Use `matrix-reloaded` format for structured comparison.
- Do not run `matrix-reloaded` CLI commands; use project-provided instructions/schema only.
- Optional: add `.decisions/[name].md` for human-readable narrative context.
- Treat JSON decision matrices as the authoritative record.

## References

- For operating rules, see `AGENT_BLUEPRINT.md`
- For active work units and execution prompts, see `roadmap/`
- For decision artifacts and matrix format, see `AGENT_BLUEPRINT.md` section `Decision Artifacts [BP-DECISIONS]`
- For UI system workflows, see `DESIGN_SYSTEM_GUIDE.md`
- For cross-project audit collection, see `collect-project-docs.sh`

## Key Files

- `AGENT_BLUEPRINT.md` — canonical blueprint
- `AGENTS.md` — repo-specific policy entrypoint
- `README.md` — human adoption guide
- `DESIGN_SYSTEM_GUIDE.md` — optional UI design system guide
- `collect-project-docs.sh` — multi-project reference collector
- `.claude/skills/applying-agent-blueprint/` — invokable skill that scaffolds/aligns `AGENTS.md` and companion files from the blueprint
- `.claude/skills/roam-thread-summary/` — invokable skill that emits a paste-ready Roam `[[ai-thread]]` block summary of the session
- `roadmap/index.md` — project roadmap and work unit directory
- `.decisions/` — decision artifacts (matrix-reloaded JSON records)

## Knowledge Base

Tool: Roam Research

When asked to generate a Roam summary or thread, use the `roam-thread-summary` skill:
- Required parent block: `- [[ai-thread]] [[<model-id>]] [[agent-blueprint]]`
- Optional refs (only if instructed): tool (`opencode` | `claude-code` | `gemini-cli` | `codex-cli`), topic pages
- Sections: ask user what they want (chronological, functional, Q&A)

## User Profile

See `.agent-profile.md` (git-ignored) for interaction preferences.
