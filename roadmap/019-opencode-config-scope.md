---
title: "Separate OpenCode Workflow Config From Local CLI Config"
status: active
description: "Prevent workflow-pinned OpenCode config from breaking local auth and provider resolution in this repo or downstream examples."
created: 2026-04-11
updated: 2026-04-11
tags: [workflow, opencode, config, local-dev]
priority: high
---

# Separate OpenCode Workflow Config From Local CLI Config

## Intent

Keep the repository's OpenCode GitHub Actions examples usable without hijacking a contributor's normal local OpenCode setup.

## Sequencing

- Execution order: first
- Dependency role: unblock local smoke tests and downstream adoption before continuing workflow ergonomics work

## Specification

- Treat workflow-pinned OpenCode provider routing as explicit runtime config, not ambient repo-root local CLI config.
- Define where workflow-only OpenCode config should live so GitHub Actions and helper scripts can opt into it explicitly.
- Preserve support for repo-local smoke tests that validate the pinned workflow route without assuming a contributor wants that route for all local OpenCode sessions.
- Update the reusable examples and guidance so downstream projects inherit the same separation between autonomous workflow config and interactive local CLI usage.
- Document the failure mode this work avoids: repo-root OpenCode config can override a user's normal provider setup and surface misleading auth-header or API-key errors only inside that project.

## Chosen Defaults

- Workflow-owned OpenCode config should live at a non-ambient path rather than `./opencode.json` in repo root.
- Workflows and smoke-test scripts should point to that config explicitly through `OPENCODE_CONFIG`.
- Local interactive OpenCode use in the repo should fall back to the contributor's normal global or shell-provided configuration unless they intentionally opt into the workflow config.
- Example docs should describe both paths clearly: local interactive usage and workflow-pinned automation usage.

## Acceptance Criteria

- [ ] The roadmap and docs define a configuration pattern that supports both local interactive OpenCode use and workflow-pinned GitHub Actions use in the same repository.
- [ ] The canonical examples for downstream projects avoid ambient repo-root OpenCode config that overrides unrelated local provider setups.
- [ ] Local smoke-test guidance remains available for validating the workflow route intentionally rather than by accident.
- [ ] The documented pattern explains why auth or API-key failures may appear only inside one repo when workflow config leaks into local CLI resolution.

## Notes

- Observed bug in this repo on 2026-04-11: local `opencode` runs failed for multiple providers only inside `agent-blueprint`, while the same local setup worked in other repositories.
- The likely trigger is repo-root `opencode.json`, which pins providers and env var names for GitHub Actions and is also picked up by local CLI resolution.
