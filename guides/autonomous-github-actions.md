# Autonomous GitHub Actions Guide

Reference guide for setting up roadmap-driven autonomous execution in GitHub Actions.

This guide is implementation-oriented. `AGENT_BLUEPRINT.md` remains the normative spec; this file shows one concrete pattern that satisfies it.

## When To Use This

Use this guide when a project wants:

- `roadmap/` as the canonical planning surface
- manual remote dispatch through GitHub Actions UI or `gh workflow run`
- one scoped execution input such as `roadmap_path`
- committed provider/model config
- a smoke test separate from the implementation workflow

## Required Repo Pieces

- `AGENT_BLUEPRINT.md`
- `AGENTS.md`
- `roadmap/index.md`
- `roadmap/[ID]-[slug].md` work units
- committed runtime config such as `opencode.json`
- GitHub Actions secrets for the selected provider

## Required Workflow Pattern

1. Add a manual smoke-test workflow.
2. Add a manual implementation workflow.
3. Require a scoped input such as `roadmap_path` for implementation.
4. Validate that the roadmap file exists and is executable before invoking the remote agent.
5. Instruct the agent to follow the autonomous runtime policy from `AGENTS.md`.
6. Treat the referenced roadmap file as the canonical execution brief.
7. Run fast validation in the implementation stage and heavier validation in a separate PR workflow.
8. If remote review is enabled, publish a PR-visible review artifact instead of leaving review output only in workflow logs.
9. Normalize workflow-authored PR bodies so reviewers can scan roadmap context, summary, evidence, test coverage, and validation in a predictable order.

## Validation Template

- Keep one generic repository-validation job for shared checks such as formatting, script syntax, or blueprint markers.
- Add a second attached-check job such as `project-smoke` and replace its placeholder commands with repo-specific lint, test, build, integration, or e2e steps.
- If implementation PRs are created by `GITHUB_TOKEN`, explicitly dispatch the PR validation workflow after PR creation so those attached checks appear on the PR.

## PR Body Defaults

- Put the roadmap reference near the top so scope is visible before comments or checks.
- Keep `Summary` concise and human-readable.
- Add `Evidence` when screenshots or other proof artifacts exist.
- Add `Test Coverage` even when no new tests were added, so reviewers do not have to infer coverage from the diff alone.
- Keep `Validation` short and lower in the body so it stays visible without dominating the page.

## Evidence Policy

- Store workflow-owned evidence under `<project-root>/docs/evidence/<work-unit-slug>/`.
- Use the PR body `Evidence` section as the canonical place for screenshot rendering.
- Reserve bot comments for supplemental lifecycle markers such as refreshed post-fix evidence, not as the only place screenshots appear.
- For visibly UI-driven work, prefer a `before-*` and `after-*` pair in the same work-unit evidence directory so reviewers can compare states without manual cleanup.
- Treat the work-unit evidence directory as the future home for adjacent artifacts beyond screenshots.

## Comment Attribution

- Append visible provider, product, and model attribution to workflow-authored screenshot comments and review comments.
- Include a machine-checkable marker such as an HTML comment so later tooling can parse attribution without scraping prose.

## Post-Fix Review

- After a fix run updates a PR, dispatch validation first.
- Wait for validation to settle when practical, then dispatch a fresh review against the same PR.
- The latest autonomous recommendation should describe the latest code and check state, even if checks are still pending or failed.

## Demo PR Cleanup

- Treat proof or demo PRs as artifacts first, not merge targets by default.
- When multiple demo PRs exist for the same proof, keep the newest clean rerun as canonical and close older superseded PRs with a final pointer comment.
- A canonical demo PR may also be closed intentionally once the proof is recorded in roadmap history; only merge PRs that are meant to change the long-lived default branch.
- When a roadmap item depends on a demo proof, record which PR is canonical so maintainers do not have to infer it from timeline archaeology.

## Reference Files

These files are intentionally fetchable as raw GitHub artifacts.

- Guide: `guides/autonomous-github-actions.md`
- Smoke test workflow: `guides/examples/opencode-hello.yml`
- Implement workflow: `guides/examples/opencode-implement.yml`
- PR validation workflow: `guides/examples/pr-validation.yml`
- Provider config: `guides/examples/opencode.json`
- Local smoke test: `guides/examples/opencode-hello-local.sh`

## Suggested Adoption Flow

1. Copy the example files into the target repo and adapt names, secrets, and provider settings.
2. Update `AGENTS.md` with both interactive-local and autonomous-workflow execution modes.
3. Commit the provider config that the remote runtime should use.
4. Add the required GitHub Actions secrets.
5. Run the local smoke test.
6. Run the remote hello workflow.
7. Run the implementation workflow against a safe `ready` roadmap work unit.
8. Confirm the resulting PR shows attached validation checks. If the PR was workflow-authored, confirm the implementation workflow dispatched validation explicitly.
9. Run the review workflow against that PR and confirm it publishes a PR review.

## Notes

- This guide uses OpenCode examples because that is the current dogfood setup in this repo.
- The operating pattern is more important than the specific tool.
- Keep the smoke test and implementation workflow separate.
- Keep PR validation separate from roadmap implementation.
- If the PR is created by `GITHUB_TOKEN`, explicitly dispatch PR validation or use alternate credentials; do not assume `pull_request` fan-out will happen automatically.
- Do not let issue comments become the canonical work definition if the roadmap is supposed to be canonical.
- Treat the PR body as the primary human review summary. Use comments for supplemental artifacts or follow-up context, not as the only place where proof or scope appears.
