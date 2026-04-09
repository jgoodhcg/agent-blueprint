---
title: "Run a Workflow Regression Proof on Todo App"
status: ready
description: "Create one fresh pilot PR that deliberately exercises the updated workflow defaults: canonical screenshot evidence, attributed comments, post-fix re-review, and intentional demo cleanup."
created: 2026-04-09
updated: 2026-04-09
tags: [pilot, workflow, screenshot, attribution, review, fix, cleanup]
priority: high
---

# Run a Workflow Regression Proof on Todo App

## Intent

Produce one fresh pilot PR that proves the April 9, 2026 workflow changes work together on a realistic visible change instead of only in documentation.

This work unit is not mainly about product polish. It is a workflow regression test that should exercise:

- PR-body-first evidence presentation
- roadmap-scoped evidence storage
- attributed screenshot and review comments
- post-fix validation convergence with a fresh re-review
- intentional demo artifact cleanup after the proof is complete

## Specification

- Use `pilots/todo-app/` as the execution target.
- Open a fresh PR from `main` for this roadmap item.
- Keep the initial implementation narrow, UI-visible, and easy to review:
  - add a compact "Today focus" treatment to the main screen that makes today's tasks visually distinct from the general list
  - keep the change confined to layout, emphasis, and copy on the existing main screen
  - do not add backend work, persistence changes, or new data fields
- Capture bot-generated screenshot evidence for the visible change.
- Ensure the resulting PR body shows canonical evidence in the `Evidence` section using roadmap-scoped artifact paths under `pilots/todo-app/docs/evidence/014-todo-app-workflow-regression-proof/`.
- Ensure workflow-authored screenshot comments and autonomous review comments include provider, product, and model attribution.
- After the first autonomous review comment lands, leave one contained human follow-up comment on the same PR. The follow-up should be small but UI-visible. Preferred example:
  - ask for stronger copy or visual guidance in the empty state for the Today focus treatment
- Run the fix workflow against that same PR.
- The fix must refresh the PR state on the same branch and same PR rather than opening a replacement.
- After the fix, confirm the workflow dispatches validation and a fresh review so the latest visible recommendation matches the latest PR state.
- Once the proof is complete, treat the resulting PR as a demo artifact first:
  - record whether it is the canonical artifact for this work unit
  - close any superseded pilot demo PRs if new duplicates are created while testing
  - it is acceptable for the final proof PR to be intentionally closed instead of merged if the goal is workflow evidence rather than landing a lasting product change

## Acceptance Criteria

- [ ] A fresh implement run opens a PR for this roadmap item from `main`.
- [ ] The PR body includes a visible `Evidence` section with roadmap-scoped screenshot artifacts.
- [ ] Screenshot-related workflow comments include provider/product/model attribution.
- [ ] Autonomous review comments include the same attribution.
- [ ] A human follow-up comment lands on the same PR after the first review.
- [ ] A fix run updates that same PR and refreshes the visible state.
- [ ] Validation is dispatched after the fix and a fresh review is queued against the updated PR.
- [ ] The latest autonomous recommendation reflects the post-fix PR state rather than an older stale state.
- [ ] The final proof can be explained as a demo artifact under the cleanup policy, whether it is left open briefly or intentionally closed after capture.

## Validation

- Confirm the implement run references this exact roadmap file.
- Confirm screenshot files land under `pilots/todo-app/docs/evidence/014-todo-app-workflow-regression-proof/`.
- Confirm the PR body, not only comments, carries the primary screenshot evidence.
- Confirm at least one workflow-authored comment contains both a visible attribution footer and a machine-checkable attribution marker.
- Confirm the fix run dispatches validation and then a follow-up review run.
- Confirm the newest review comment is the one a human would naturally use to judge the final PR state.

## Notes

- This is the first pilot work unit created after the earlier demo PR cleanup policy was established.
- Keep the product change intentionally modest so failures are easier to attribute to workflow behavior instead of feature complexity.
- If the first implementation prompt drifts beyond the visible main-screen change, narrow the scope and rerun rather than letting the proof balloon.
