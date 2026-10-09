---
title: "Handoff worktree root"
status: done
description: "Make the tangent worktree location explicit per project and correct when the caller is in a worktree."
created: 2026-10-08
updated: 2026-10-08
tags: [workflow, herdr, skills]
priority: medium
---

# Handoff Worktree Root

## Intent

Remove ambiguity in `<repo parent>` and prevent nested worktree roots when a handoff starts inside a worktree.

## Specification

- Define the worktree root as a sibling folder of the main checkout: `<main checkout folder>.worktrees`.
- Require each adopting project to record its worktree root in `AGENTS.md` `## Environment`.
- Resolve the main checkout from `git rev-parse --git-common-dir`, so a tangent from a worktree becomes a sibling worktree.
- Update the skill, the embedded template, the `AGENTS.md` templates, and version references.

## Validation

- [x] Confirm that the blueprint template equals `skills/herdr-handoff/SKILL.md`.
- [x] Confirm that the resolution commands give the same root from the main checkout and from a worktree.
- [x] Run blueprint version and required identifier checks.
- [x] Record that UI/e2e validation does not apply.

## Context

- Confirmed GitKraken layout: `~/projects/gleanmo` with worktree `~/projects/gleanmo.worktrees/dev-1`.
- `git rev-parse --show-toplevel` returns the worktree, not the main checkout; the old placeholders produced nested paths from a worktree.
