---
title: "Pilot GitHub-Triggered OpenCode Automation"
status: ready
description: "Dogfood roadmap-canonical OpenCode GitHub Actions workflows in this repo before standardizing the pattern."
created: 2026-03-10
updated: 2026-03-17
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
- `opencode.json` should define both the `zai-plan` provider for implementation and the `opencode` provider for Zen-based review.
- The required provider credentials should be `ZAI_CODING_PLAN_API_KEY` for implementation and `OPENCODE_API_KEY` for Zen review.
- The canonical execution workflow should be manually dispatched with a required `roadmap_path` input plus an explicit execution `mode`.
- The workflow should validate that `roadmap_path` points to a real `roadmap/[ID]-[slug].md` work unit in `ready` or `active` status before handing execution to OpenCode.
- Review runs should use an allowlisted Zen frontier model rather than arbitrary model strings.
- Review runs should require an explicit PR target such as `pr_number`.
- The next context should:
  1. rerun the hello workflow until it succeeds as a manual smoke test
  2. validate the roadmap-driven implement workflow with a real `roadmap_path`
  3. validate Zen-backed review mode with an allowlisted frontier model
  4. decide how many times review feedback may be applied automatically, if at all
- MVP trigger model is `workflow_dispatch`, invoked manually in the Actions UI or through `gh workflow run`. GitHub Projects can be used for planning and overview, but they are not the direct execution trigger in the pilot.

## Acceptance Criteria

- [x] The hello workflow succeeds as a manual GitHub Actions smoke test.
- [x] The workflow uses the supported GitHub token configuration and does not depend on local OpenCode auth state.
- [x] Provider credentials for remote execution come from GitHub Actions secrets, not local machine state.
- [x] The workflow is pinned to the committed `zai-plan/glm-5` model route and uses the Z.AI Coding Plan endpoint.
- [ ] The implement workflow accepts a `roadmap_path`, validates it, and treats the referenced roadmap file as the canonical execution brief.
- [ ] Review mode accepts an allowlisted Zen model and produces review output without mutating code.
- [ ] Branch and PR creation are validated from the roadmap-driven implementation path.

## Validation Procedure

1. Run `bash ./opencode-hello-local.sh` with `ZAI_CODING_PLAN_API_KEY` set and confirm the pinned `zai-plan/glm-5` route works outside GitHub.
2. Run `.github/workflows/opencode-hello.yml` from the Actions UI or `gh workflow run` and confirm the workflow summary shows a successful OpenCode action outcome.
3. Run `.github/workflows/opencode-implement.yml` with `mode=implement` and a safe `ready` roadmap path, then confirm branch and PR creation or update.
4. Run `.github/workflows/opencode-implement.yml` with `mode=review`, the same roadmap path, a real `pr_number`, and an allowlisted `review_model`, then confirm the workflow summary records the selected model and PR target.
5. Check off acceptance criteria only after the corresponding GitHub workflow run or PR artifact exists.

## Evidence

- 2026-03-17 local smoke test succeeded via `bash ./opencode-hello-local.sh`, returning the expected `zai-plan/glm-5` hello response.
- 2026-03-17 GitHub Actions run `23202499958` (`OpenCode Hello`) completed successfully: <https://github.com/jgoodhcg/agent-blueprint/actions/runs/23202499958>

## Notes

- Trigger surface: GitHub Actions UI or `gh workflow run`.
- No runtime model-selection arguments are needed for the smoke test; the workflow should use the committed project config.
- Runtime execution input should be limited to `roadmap_path`, `mode`, and explicit review inputs such as `pr_number` plus an allowlisted review model.
- Validation for repo changes should continue to use the commands listed in `AGENTS.md`.
- `roadmap/` is the canonical planning surface; GitHub provides the remote trigger and execution history.
