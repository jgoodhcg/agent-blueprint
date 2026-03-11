---
title: "Pilot GitHub-Triggered OpenCode Automation"
status: ready
description: "Dogfood a comment-triggered OpenCode GitHub Actions workflow in this repo before standardizing the pattern."
created: 2026-03-10
updated: 2026-03-10
tags: [automation, github-actions, opencode]
priority: high
---

# Pilot GitHub-Triggered OpenCode Automation

## Intent

Validate a GitHub-native autonomous workflow in this repo so future blueprint guidance is based on a working dogfood setup rather than a speculative design.

## Specification

- Current baseline: `.github/workflows/opencode-hello.yml` exists and is triggered by `/opencode hello` or `/oc hello` issue comments.
- The first run failed because the workflow used an unsupported OpenCode action input (`token`) and did not have cloud provider credentials configured in GitHub Actions.
- Remote execution should use a cloud-accessible provider, currently planned as the Z.AI Coding Plan API, with credentials stored in GitHub Actions secrets rather than relying on local OpenCode configuration.
- The next context should:
  1. update the hello workflow to use supported GitHub token wiring
  2. wire the workflow to the Z.AI provider and repository secret
  3. rerun the hello workflow until it successfully posts a comment on the triggering issue
  4. only after that, build the next slice: comment-triggered issue -> branch -> PR automation
- MVP trigger model remains comment-based. GitHub Projects can be used for planning and overview, but they are not the direct execution trigger in the pilot.

## Acceptance Criteria

- [ ] The hello workflow successfully replies to a GitHub issue comment from OpenCode running in GitHub Actions.
- [ ] The workflow uses supported GitHub token configuration and no unsupported OpenCode action inputs.
- [ ] Provider credentials for remote execution come from GitHub Actions secrets, not local machine state.
- [ ] The issue-to-PR automation slice is left as the explicit next step after the hello workflow succeeds.

## Notes

- Trigger vocabulary: `/opencode hello` for the smoke test, later `/opencode implement` for real execution.
- Validation for repo changes should continue to use the commands listed in `AGENTS.md`.
- GitHub Issues are the remote execution surface for the pilot; `roadmap/` remains the local planning and handoff fallback.
