---
title: "Define Screenshot Evidence Policy"
status: dropped
description: "Set one opinionated location and presentation policy for workflow-owned screenshots, including before/after support."
created: 2026-04-09
updated: 2026-06-17
tags: [workflow, screenshots, evidence]
priority: high
---

# Define Screenshot Evidence Policy

## Intent

Make screenshot evidence predictable so reviewers always know where artifacts live and how they should appear in PR summaries or comments.

## Sequencing

- Execution order: second
- Dependency role: refine artifact storage and before/after policy after `014` establishes the canonical PR body surface

## Specification

- Choose a canonical artifact location for pilot and future project screenshots.
- Decide when screenshots belong in the PR body, in bot comments, or both.
- Add explicit before/after support for visibly UI-driven work.
- Keep the storage convention aligned with roadmap work units rather than ad hoc image dumping.

## Chosen Defaults

- Canonical artifact directory: `<project-root>/docs/evidence/<work-unit-slug>/`
- Canonical review surface: PR body `Evidence` section
- Supplemental surface: bot comments may point to refreshed evidence after a fix, but the PR body remains the primary review summary
- Default pair for UI changes: `before-*` and `after-*` captures stored in the same work-unit evidence directory

## Acceptance Criteria

- [ ] The repository documents one canonical screenshot storage convention.
- [ ] Workflow-authored PRs present screenshots in a consistent place.
- [ ] UI-driven changes can show before/after evidence without manual cleanup.
- [ ] The chosen convention scales to future support artifacts beyond screenshots.

## Sunset

Dropped 2026-06-17 with the autonomous GitHub Actions pilot. Full rationale in `roadmap/index.md`: the remote AI execution payoff didn't justify the cost/effort for these projects.
