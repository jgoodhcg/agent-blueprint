---
title: "Actions Commit Identity Smoke"
status: ready
description: "Validate that a fresh GitHub Actions implementation run creates a branch/PR with github-actions[bot] git identity and normal AI trailers."
created: 2026-03-18
updated: 2026-03-18
tags: [automation, github-actions, attribution]
priority: high
---

# Actions Commit Identity Smoke

## Intent

Prove that the roadmap-driven GitHub Actions implementation flow can create a fresh branch and PR without attributing the git author/committer to the OpenCode tool brand.

## Specification

- Use the existing roadmap-driven implement workflow.
- Make one minimal README change that documents the intended autonomous commit identity behavior for GitHub Actions runs.
- The change should state that autonomous GitHub Actions commits use `github-actions[bot]` as the git author/committer while model attribution remains in `Co-authored-by` and `AI-*` trailers.
- Keep the change concise and consistent with the README's adoption-focused tone.
- Do not broaden scope beyond the README note needed for this smoke test.

## Acceptance Criteria

- [ ] The implement workflow runs successfully against this roadmap path.
- [ ] The run creates a fresh branch and opens a PR automatically.
- [ ] The resulting commit is authored and committed by `github-actions[bot]`.
- [ ] The resulting commit still includes the expected AI attribution trailers.
- [ ] `README.md` contains the concise GitHub Actions commit-identity note requested above.

## Validation

- Inspect the resulting branch/PR and commit metadata in GitHub.
- Confirm the commit author/committer is `github-actions[bot]`.
- Confirm the commit message trailers still include `Co-authored-by` and the `AI-*` lines.
