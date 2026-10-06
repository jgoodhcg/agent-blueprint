---
title: "Herdr agent handoff"
status: done
description: "Define a short-trigger skill that hands off work to a new agent in a Herdr worktree, tab, or pane."
created: 2026-10-06
updated: 2026-10-06
tags: [workflow, herdr, skills]
priority: medium
---

# Herdr Agent Handoff

## Intent

Replace long handoff requests with one short trigger, a brief proposal, and an unattended handoff.

## Specification

- Add the canonical `skills/herdr-handoff/SKILL.md` with `tangent`, `continue`, and `side` modes.
- `tangent` creates a worktree at `<repo parent>/<repo name>.worktrees/<branch>` in a new Herdr workspace and keeps focus.
- `continue` requires a clean working tree, starts the agent in a new tab, focuses it, and closes the caller pane.
- `side` starts the agent in a split pane and keeps focus; the result stays in that pane.
- Write a self-contained brief to `/tmp/herdr-handoff/` and submit its text inline.
- Support a different agent kind and model ID per handoff.
- Add `[BP-WF-HANDOFF]` with rules, adoption steps, and the embedded skill template to the blueprint.
- Add a Claude Code symlink adapter and `agents/openai.yaml` metadata.
- Update current blueprint version references.

## Validation

- [x] Check Herdr command syntax against installed `--help` and `herdr --skill` output.
- [x] Confirm that the blueprint template equals `skills/herdr-handoff/SKILL.md`.
- [x] Run blueprint version and required identifier checks.
- [x] Check the diff for whitespace errors and sensitive content.
- [x] Record that UI/e2e validation does not apply.

## Scope

New skill, blueprint workflow section, adoption step, adapters, and version references.

## Context

- User often asks an agent to open a new Herdr tab and hand off a tangent, a next step, or a plan.
- GitKraken worktree convention observed locally: `<repo parent>/<repo name>.worktrees/<branch>`.
- Not tested end to end; the first real handoff will confirm the `worktree create` response fields.
