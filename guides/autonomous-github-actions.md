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
8. Confirm the PR validation workflow runs automatically on the resulting PR.
9. Run the review workflow against that PR and confirm it publishes a PR review.

## Notes

- This guide uses OpenCode examples because that is the current dogfood setup in this repo.
- The operating pattern is more important than the specific tool.
- Keep the smoke test and implementation workflow separate.
- Keep PR validation separate from roadmap implementation.
- If the PR is created by `GITHUB_TOKEN`, explicitly dispatch PR validation or use alternate credentials; do not assume `pull_request` fan-out will happen automatically.
- Do not let issue comments become the canonical work definition if the roadmap is supposed to be canonical.
