---
title: "Public Repository Safety"
status: done
description: "Default repositories to public visibility and guard sensitive content before commits"
created: 2026-08-18
updated: 2026-08-18
tags: [safety, privacy, git]
priority: high
---

# Public Repository Safety

## Intent

Prevent agents from committing private drafts, personal data, credentials, or other sensitive material to repositories that can become public.

## Specification

- Treat repository visibility as public unless `AGENTS.md` explicitly says otherwise.
- Define a small default ignore policy with a conventional `.private/` path for sensitive local content.
- Require agents to inspect candidate paths and diffs before staging or committing.
- Require separate confirmation for named sensitive-content candidates.
- Prohibit committing live authentication material.
- Make concise factual STE the default conversational response style unless the user requests expansion.
- Bump the blueprint and synchronized version references to `2026-08-18`.

## Acceptance Criteria

- [x] `AGENT_BLUEPRINT.md` contains deterministic public-repository and sensitive-content rules.
- [x] The embedded and skill reference `AGENTS.md` templates contain the required trigger bridge.
- [x] This repository declares its visibility and applies the new rule.
- [x] Version references use `2026-08-18`.
- [x] Required repository validation commands pass.

## Scope

No secret-scanning dependencies or Git history rewrites were added. Publishable draft paths remain tracked.

## Context

- `AGENT_BLUEPRINT.md` `[BP-SAFE]`, `[BP-WF-COMMIT]`, and `[BP-WF-PROFILE]`
- `.claude/skills/applying-agent-blueprint/reference/agents-template.md`
- `.gitignore`
- `AGENTS.md`

## Validation

- `bash -n collect-project-docs.sh`: passed.
- `bash -n .claude/skills/applying-agent-blueprint/scripts/check.sh`: passed.
- `.claude/skills/applying-agent-blueprint/scripts/check.sh .`: passed.
- Blueprint version and required-rule searches: passed.
- `git diff --check`: passed.
- UI/E2E: not applicable; this repository has no UI.
