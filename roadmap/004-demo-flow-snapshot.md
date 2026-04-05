---
title: "Add Demo Flow Snapshot to README"
status: ready
description: "Create a visible README section that demonstrates the implementation, validation, and review loop."
created: 2026-03-25
updated: 2026-04-04
tags: [demo, github-actions, readme]
priority: high
---

# Add Demo Flow Snapshot to README

## Intent

Create a clean, obvious roadmap unit for the live demo so the resulting PR shows a human-readable content change and the PR checks have something concrete to validate.

## Specification

- Update `README.md` under `## Experimental GitHub Automation`.
- Add a new subsection exactly titled `## Demo Flow Snapshot`.
- Under that heading, add a short intro sentence explaining that this section exists to demonstrate the GitHub roadmap automation loop.
- Add one compact bullet or sentence that includes the exact phrase `Implementation -> PR validation -> Review -> Human review`.
- Keep the change small and presentation-friendly; do not rewrite unrelated README content.
- Reference this roadmap file in the PR summary.

## Acceptance Criteria

- [ ] `README.md` contains a `## Demo Flow Snapshot` section under the GitHub automation material.
- [ ] That section contains the exact phrase `Implementation -> PR validation -> Review -> Human review`.
- [ ] The implementation workflow opens or updates a PR for this roadmap unit.
- [ ] The PR validation workflow shows attached repository and project validation checks on the PR head SHA.
- [ ] Review mode can be run against the resulting PR.

## Notes

- This work unit is intentionally performative for a live demo.
- The workflow pattern is now proven with attached validation checks and PR-visible review publication, but this specific README content change is still pending.
- Current in-repo validation uses human-facing check names for repository-level checks plus Roadmap Todo app checks; downstream repos should still replace the project-specific validation jobs with their own suite.
