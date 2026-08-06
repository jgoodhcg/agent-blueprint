---
title: "Agent-Agnostic Skills"
status: done
description: "Define a canonical cross-agent skill framework and add the Google Sheets decision-matrix skill."
created: 2026-08-06
updated: 2026-08-06
tags: [skills, portability, google-workspace]
priority: high
---

# Agent-Agnostic Skills

## Intent

Make reusable skills available across Codex, Claude Code, OpenCode, Gemini, and other agents without making a provider-specific directory the source of truth.

## Specification

- Define `skills/<skill-name>/SKILL.md` as the canonical skill location.
- Keep canonical skill instructions independent of model provider and agent client.
- Use `AGENTS.md` as the universal discovery and trigger layer.
- Treat client-specific metadata and configured search paths as compatibility adapters.
- Add a `decision-matrix` skill that creates compact, `matrix-reloaded`-formatted Google Sheets through `gws`.
- Reference the shared skill from the `~/projects` orchestration policy.

## Acceptance Criteria

- [x] The decision-matrix skill validates with `quick_validate.py`.
- [x] The skill defines the exact two-header-row grid and XLSX-derived styling.
- [x] The blueprint documents the agent-neutral skill framework.
- [x] Root and repository `AGENTS.md` files reference the canonical skill.
- [x] OpenCode searches the canonical skill directory.

## Notes

The existing `.claude/skills/` directory remains a legacy compatibility location. Migrating unrelated skills is outside this work unit.
