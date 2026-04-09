---
title: "Run a Full Implement Review Fix Demo on Todo App"
status: archived
description: "Create a fresh pilot-app PR that demonstrates implement, validation, autonomous review, human feedback, same-PR fix, rerun review, and final human approval readiness with screenshot evidence."
created: 2026-04-08
updated: 2026-04-09
tags: [pilot, demo, screenshot, review, fix, workflow]
priority: high
---

# Run a Full Implement Review Fix Demo on Todo App

## Intent

Produce one clean, demo-grade PR timeline in this repository that exercises the full GitHub Actions workflow loop:

- implement opens a fresh PR from a roadmap work unit
- implementation includes screenshot evidence from the rendered app
- PR validation attaches green checks to the PR head SHA
- autonomous review leaves a clear recommendation comment for a human reviewer
- a real human reviewer leaves at least one concrete follow-up comment
- fix updates the same PR in response to that comment
- autonomous review runs again on the updated PR
- the PR ends ready for final human approval

This work unit is intentionally a demo script for the workflow itself, not just a product change request.

## Specification

- Update `pilots/todo-app/` only for the implementation and fix stages.
- Keep the underlying product change presentation-focused and intentionally small enough to review quickly.
- The implementation change for the first PR should be exactly this:
  - make the composer the obvious primary action on the first screen
  - reduce the visual dominance of the hero copy relative to the composer
  - improve the hierarchy between the hero summary, composer, filters, empty state, and todo cards so a new user can tell where to start immediately
- Stay confined to the main screen layout, emphasis, and copy. Do not add backend work, new data fields, or state model changes in the initial implementation.
- Use Playwright or an equivalent automated browser path during implementation to capture screenshot evidence from the rendered app.
- Include screenshot-backed evidence in the resulting PR metadata if possible:
  - ideally before and after screenshots in the PR body, or
  - a clearly linked screenshot note in a PR comment if body embedding is impractical.
- Preserve existing todo behavior unless the human follow-up comment explicitly requests a contained scope expansion.
- After the first autonomous review comment lands, a human reviewer should add one contained, concrete follow-up comment on the same PR. Good examples:
  - ask for one copy or layout refinement,
  - ask for one small scope extension related to the visible change,
  - ask for one clearer presentation decision that can be satisfied without redesigning the whole app.
- The fix stage must target that same PR, inspect the human comment context, and make the narrowest change that addresses it.
- If the fix materially changes the UI, refresh the screenshot evidence or add one follow-up screenshot note on the same PR.
- The rerun autonomous review should comment on the updated PR state using the same recommendation-led review format now used by the workflow.
- Prefer a human follow-up comment that tweaks the implemented direction rather than replacing it. Good examples:
  - ask for stronger empty-state guidance toward the composer,
  - ask for clearer filter placement or copy,
  - ask for one additional visual cue that reinforces the first action path.

## Acceptance Criteria

- [ ] A fresh implement run opens a PR for this roadmap item from `main`.
- [ ] The implementation PR includes screenshot evidence that makes the visual change understandable without local checkout.
- [ ] The initial implementation is limited to making the composer and first-action path clearer on the existing main screen.
- [ ] PR validation attaches green repository and project checks to the implementation PR.
- [ ] Autonomous review posts a recommendation-led PR comment on that implementation PR.
- [ ] A human reviewer leaves at least one concrete follow-up comment on the same PR after the first autonomous review.
- [ ] A dedicated fix run updates that same PR in response to the human comment.
- [ ] The updated PR returns to green validation after the fix.
- [ ] Autonomous review runs again on the updated PR and leaves a second recommendation-led comment.
- [ ] The final PR timeline is suitable for a live demo of implement -> review -> human feedback -> fix -> review -> human approval.

## Validation

- Confirm the implement run references this roadmap file and opens a fresh PR.
- Confirm screenshot evidence is visible from the PR body or linked PR comments.
- Confirm the initial implementation stayed within the narrow hierarchy-and-copy scope instead of drifting into broader product changes.
- Confirm the first autonomous review comment is clear enough for a human to decide whether to approve, request follow-up, or trigger fix.
- Confirm the human follow-up comment is concrete enough that the fix stage can act on it without ambiguity.
- Confirm the fix run updates the same branch and PR rather than opening a replacement.
- Confirm the rerun review comment reflects the updated state of the PR after the fix.

## Notes

- This work unit intentionally combines the goals previously explored in `007`, `008`, and `011` into one tighter demo sequence.
- The highest priority is a believable, low-risk demo artifact under time pressure, not a broad visual redesign.
- The previous broad version of this work unit caused an implement run to stall inside the model step, so this roadmap item is now deliberately narrowed to reduce planning drift.
- If embedding screenshots directly in the PR body turns out to be awkward in the current workflow, a PR comment with stable screenshot references is an acceptable fallback for this demo.
- Historical demo PR: `#17`
- Superseded by cleaner rerun: `#18`
