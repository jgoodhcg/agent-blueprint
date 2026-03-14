---
title: "Pilot GitHub-Triggered OpenCode Automation"
status: ready
description: "Dogfood roadmap-canonical OpenCode GitHub Actions workflows in this repo before standardizing the pattern."
created: 2026-03-10
updated: 2026-03-13
tags: [automation, github-actions, opencode]
priority: high
---

# Pilot GitHub-Triggered OpenCode Automation

## Intent

Validate a GitHub-native autonomous workflow in this repo so future blueprint guidance is based on a working dogfood setup rather than a speculative design.

## Specification

- Current baseline: `.github/workflows/opencode-hello.yml` exists as a manually dispatched smoke test.
- The hello workflow should use the built-in GitHub Actions token path (`use_github_token: true`) instead of assuming local OpenCode auth state.
- Remote execution should be pinned by committed project config instead of request-time model arguments.
- `opencode.json` should define a custom provider that targets the Z.AI Coding Plan endpoint and sets the default model to `zai-plan/glm-5`.
- The only required provider credential for the hello and implement workflows should be `ZAI_CODING_PLAN_API_KEY` from GitHub Actions secrets.
- The canonical execution workflow should be manually dispatched with a required `roadmap_path` input, either from the Actions UI or via `gh workflow run`.
- The workflow should validate that `roadmap_path` points to a real `roadmap/*.md` work unit in `ready` or `active` status before handing execution to OpenCode.
- The next context should:
  1. rerun the hello workflow until it succeeds as a manual smoke test
  2. validate the roadmap-driven implement workflow with a real `roadmap_path`
  3. verify branch and PR creation behavior from the roadmap-driven path
  4. only after that, standardize the pattern in the blueprint
- MVP trigger model is `workflow_dispatch`, invoked manually in the Actions UI or through `gh workflow run`. GitHub Projects can be used for planning and overview, but they are not the direct execution trigger in the pilot.

## Acceptance Criteria

- [ ] The hello workflow succeeds as a manual GitHub Actions smoke test.
- [ ] The workflow uses the supported GitHub token configuration and does not depend on local OpenCode auth state.
- [ ] Provider credentials for remote execution come from GitHub Actions secrets, not local machine state.
- [ ] The workflow is pinned to the committed `zai-plan/glm-5` model route and uses the Z.AI Coding Plan endpoint.
- [ ] The implement workflow accepts a `roadmap_path`, validates it, and treats the referenced roadmap file as the canonical execution brief.
- [ ] Branch and PR creation are validated from the roadmap-driven workflow path.

## Notes

- Trigger surface: GitHub Actions UI or `gh workflow run`.
- No runtime model-selection arguments are needed for the smoke test; the workflow should use the committed project config.
- Runtime execution input should be limited to `roadmap_path` for the roadmap-driven workflow.
- Validation for repo changes should continue to use the commands listed in `AGENTS.md`.
- `roadmap/` is the canonical planning surface; GitHub provides the remote trigger and execution history.
