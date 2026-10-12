---
title: "Credential Entry"
status: done
description: "Default to credential entry paths that keep secrets out of shell history and process listings"
created: 2026-10-12
updated: 2026-10-12
tags: [blueprint, safety, secrets]
priority: medium
---

# Credential Entry

## Intent

Integration tests and CLI flows need passwords. Typing secrets into command lines persists them in shell history and process listings. Default entry paths now avoid both.

## Specification

- Add `### Credential Entry [BP-SAFE-SECRET]` to `AGENT_BLUEPRINT.md` `[BP-SAFE]`.
- Add rules `BP-SAFE-SECRET-01`–`03`: pass credentials as environment variables; never place literal secrets in command lines, script bodies, tracked files, or chat; load variables from an untracked `.env.local` file or a secret manager; for interactive runs, use a hidden prompt inside the script or tell the user to run `read -rs VARNAME` in their own terminal.
- Include the portable hidden-prompt example.
- Bump the blueprint and synchronized version references to `2026-10-12`.

## Acceptance Criteria

- [x] Blueprint carries the rules and the hidden-prompt example.
- [x] Rules cover agent-run commands (env file, secret manager) and human-run commands (in-script prompt).
- [x] Version references use `2026-10-12`.

## Scope

No new tooling, no secret-manager integration, and no `check.sh` rule. `[BP-PUBLIC-CHECK]` is unchanged.

## Context

- `AGENT_BLUEPRINT.md` `[BP-SAFE]`, `[BP-PUBLIC-IGNORE]`
- Origin: a consuming project used `read -rs CRONOMETER_PASSWORD` before running an integration script.

## Validation

- `bash -n collect-project-docs.sh`: passed.
- `bash -n skills/applying-agent-blueprint/scripts/check.sh`: passed.
- `skills/applying-agent-blueprint/scripts/check.sh .`: passed.
- Blueprint version and required-rule searches: passed.
- UI/E2E: not applicable; this repository has no UI.
