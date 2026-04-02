---
title: "Pilot GitHub-Triggered OpenCode Automation"
status: active
description: "Dogfood roadmap-canonical OpenCode GitHub Actions workflows in this repo before standardizing the pattern."
created: 2026-03-10
updated: 2026-04-02
tags: [automation, github-actions, opencode]
priority: high
---

# Pilot GitHub-Triggered OpenCode Automation

## Intent

Validate a GitHub-native autonomous workflow in this repo so future blueprint guidance is based on a working dogfood setup rather than a speculative design.

## Specification

- Current baseline: `.github/workflows/opencode-hello.yml` exists as a manually dispatched smoke test.
- The hello workflow should use committed OpenCode config and GitHub Actions secrets instead of assuming local OpenCode auth state.
- Remote execution should be pinned by committed project config instead of request-time model arguments.
- `opencode.json` should define both the `zai-coding-plan` provider for implementation and the `opencode` provider for Zen-based review.
- The required provider credentials should be `ZAI_CODING_PLAN_API_KEY` for implementation and `OPENCODE_API_KEY` for Zen review.
- The canonical execution workflow should be manually dispatched with a required `roadmap_path` input plus an explicit execution `mode`.
- The workflow should validate that `roadmap_path` points to a real `roadmap/[ID]-[slug].md` work unit in `ready` or `active` status before handing execution to OpenCode.
- Review runs should accept an explicit provider/model input rather than relying on a hardcoded allowlist.
- Review runs should require an explicit PR target such as `pr_number`.
- The implementation workflow should run OpenCode CLI directly on `ubuntu-latest` and keep GitHub orchestration in YAML rather than delegating branch/PR lifecycle to the older `anomalyco/opencode/github` wrapper.
- PR validation should be explicitly dispatched after PR creation and should publish GitHub check runs onto the PR head SHA so checks appear on the PR even when `GITHUB_TOKEN` prevents normal `pull_request` fan-out.
- Review mode should be read-only with respect to code changes and should publish a PR-visible review artifact.
- The next context should:
  1. prove one clean end-to-end run on the direct-CLI architecture
  2. update docs and example guidance to match the current workflow behavior
  3. strip demo-specific checks out of the reusable validation example
  4. decide how many times review feedback may be applied automatically, if at all
- MVP trigger model is `workflow_dispatch`, invoked manually in the Actions UI or through `gh workflow run`. GitHub Projects can be used for planning and overview, but they are not the direct execution trigger in the pilot.

## Acceptance Criteria

- [x] The hello workflow succeeds as a manual GitHub Actions smoke test.
- [x] The workflow uses the supported GitHub token configuration and does not depend on local OpenCode auth state.
- [x] Provider credentials for remote execution come from GitHub Actions secrets, not local machine state.
- [x] The workflow is pinned to the committed `zai-coding-plan/glm-5` model route and uses the Z.AI Coding Plan endpoint.
- [x] The implement workflow accepts a `roadmap_path`, validates it, and treats the referenced roadmap file as the canonical execution brief.
- [x] PR validation can be dispatched from the implementation workflow and appears on the PR as attached GitHub check runs.
- [ ] Review mode accepts an explicit provider/model input, produces PR-visible review output, and does not mutate code on a clean fresh run.
- [x] Branch and PR creation are validated from the roadmap-driven implementation path.

## Validation Procedure

1. Run `bash ./opencode-hello-local.sh` with `ZAI_CODING_PLAN_API_KEY` set and confirm the pinned `zai-coding-plan/glm-5` route works outside GitHub.
2. Run `.github/workflows/opencode-hello.yml` from the Actions UI or `gh workflow run` and confirm the workflow summary shows a successful OpenCode action outcome.
3. Run `.github/workflows/opencode-implement.yml` with `mode=implement` and a safe `ready` roadmap path, then confirm branch and PR creation or update.
4. Confirm the resulting PR shows validation via the attached `repo-validation` and `project-smoke` GitHub check runs.
5. Run `.github/workflows/opencode-implement.yml` with `mode=review`, the same roadmap path, a real `pr_number`, and an explicit `model`, then confirm the workflow posts a PR-visible review and the workflow summary records the selected model and PR target.
6. Check off acceptance criteria only after the corresponding GitHub workflow run or PR artifact exists.

## Evidence

- 2026-03-17 local smoke test succeeded via `bash ./opencode-hello-local.sh`, returning the expected GLM hello response on the Z.AI Coding Plan route used at the time.
- 2026-03-17 GitHub Actions run `23202499958` (`OpenCode Hello`) completed successfully: <https://github.com/jgoodhcg/agent-blueprint/actions/runs/23202499958>
- 2026-03-17 GitHub Actions run `23207254714` (`OpenCode Implement`) completed successfully against `roadmap/002-readme-once-over.md`: <https://github.com/jgoodhcg/agent-blueprint/actions/runs/23207254714>
- 2026-03-17 implement run created branch `readme-once-over-002`, pushed commit `1e1b1a7`, and reported PR creation blocked by repository settings for GitHub Actions. Manual PR URL from the run: <https://github.com/jgoodhcg/agent-blueprint/pull/new/readme-once-over-002>
- 2026-03-17 after enabling GitHub Actions PR permissions, rerun `23222054491` (`OpenCode Implement`) completed successfully and opened PR `#2` (`README Once-Over`): <https://github.com/jgoodhcg/agent-blueprint/actions/runs/23222054491>, <https://github.com/jgoodhcg/agent-blueprint/pull/2>
- 2026-03-25 the roadmap workflow was migrated off `anomalyco/opencode/github@latest` to a direct `opencode run` CLI invocation on `ubuntu-latest`, with branch push, PR creation, validation dispatch, and review publication handled in workflow YAML.
- 2026-03-25 fresh implement run `23555295911` completed successfully against `roadmap/004-demo-flow-snapshot.md` and opened PR `#9` (`Add Demo Flow Snapshot section to README`): <https://github.com/jgoodhcg/agent-blueprint/actions/runs/23555295911>, <https://github.com/jgoodhcg/agent-blueprint/pull/9>
- 2026-03-25 validation run `23554886722` proved the PR validation workflow logic and led to follow-up work to publish attached check runs instead of leaving validation only as detached workflow-dispatch history: <https://github.com/jgoodhcg/agent-blueprint/actions/runs/23554886722>
- 2026-03-25 PR `#9` showed attached `repo-validation` plus a second smoke check run, validating the explicit-dispatch plus check-run publication pattern.
- 2026-03-25 review runs `23555427543`, `23555690658`, and `23556216053` narrowed remaining review issues from missing review artifacts to bot self-request-changes handling, which is now patched locally and awaiting one clean fresh proof run.
- 2026-04-02 the reusable PR validation workflow and guide were updated to replace demo-specific README greps with a generic `project-smoke` placeholder job intended for downstream repo-specific commands.
- 2026-04-02 a real Bun + Preact pilot app was scaffolded at `pilots/roadmap-todo/`, and the in-repo `project-smoke` workflow was updated to validate that app with typecheck, unit, build, and Playwright steps.

## Notes

- Trigger surface: GitHub Actions UI or `gh workflow run`.
- No runtime model-selection arguments are needed for the smoke test; the workflow should use the committed project config.
- Runtime execution input should be limited to `roadmap_path`, `mode`, and explicit model-selection inputs such as `pr_number` plus optional `model`.
- Validation should be staged: fast agent-run checks during implement mode, then PR validation workflows that publish attached check runs to the PR head SHA.
- `roadmap/` is the canonical planning surface; GitHub provides the remote trigger and execution history.
- This pilot is close to blueprint-ready as an optional manual-stage automation pattern, but it still needs one fully clean end-to-end proof run and a doc pass to align the README and guides with the direct-CLI architecture.
