---
title: "Standard Script Names"
status: done
description: "Reserve default script names across projects so start and dev mean one thing"
created: 2026-10-12
updated: 2026-10-12
tags: [blueprint, environment, conventions]
priority: medium
---

# Standard Script Names

## Intent

The same operation carried different script names across projects (`start` vs `serve`), forcing re-discovery every session. Reserved defaults restore cross-project muscle memory for agents and users.

## Specification

- Add `### Standard Script Names [BP-ENV-SCRIPTS]` to `AGENT_BLUEPRINT.md` `[BP-ENV]` with a reserved-names table: `dev`, `build`, `start`, `test`, `lint`, `typecheck`.
- Add rules `BP-ENV-SCRIPTS-01`–`04`: one meaning per reserved name; no synonyms; deviations recorded in `AGENTS.md`; at alignment, list conflicts and ask the user once how to resolve each (rename, alias, keep), then apply the directed changes and record kept conflicts as deviations.
- Mirror the script-name-deviations line in both `AGENTS.md` templates (blueprint `[BP-AGENTS-TPL]` and skill reference).
- Add a `BP-ENV-SCRIPTS` row to the alignment rubric in the skill reference.
- Bump the blueprint and synchronized version references to `2026-10-12`.

## Acceptance Criteria

- [x] Blueprint carries the reserved-names table and rules `BP-ENV-SCRIPTS-01`–`04`.
- [x] Alignment asks the user about conflicts once and records kept ones as deviations.
- [x] Both `AGENTS.md` templates and the alignment rubric reference the new rules.
- [x] Version references use `2026-10-12`.

## Scope

No `check.sh` enforcement: script-name conflicts need a project-aware user decision, not a structural grep. No forced renames in existing projects.

## Context

- `AGENT_BLUEPRINT.md` `[BP-ENV]`
- `skills/applying-agent-blueprint/reference/agents-template.md`
- `skills/applying-agent-blueprint/reference/alignment.md`
- Origin: two TypeScript/Bun projects used `bun run start` and `bun run serve` for the same operation.

## Validation

- `bash -n collect-project-docs.sh`: passed.
- `bash -n skills/applying-agent-blueprint/scripts/check.sh`: passed.
- `skills/applying-agent-blueprint/scripts/check.sh .`: passed.
- Blueprint version and required-rule searches: passed.
- UI/E2E: not applicable; this repository has no UI.
