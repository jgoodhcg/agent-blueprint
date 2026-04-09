---
title: "Refresh Todo App Visual Hierarchy for a Full Loop Trial"
status: ready
description: "Create a fresh pilot-app PR that uses screenshot-informed implementation, invites a human UX comment, and is small enough for review and fix to iterate on the same branch."
created: 2026-04-06
updated: 2026-04-06
tags: [pilot, design, screenshot, review, fix]
priority: high
---

# Refresh Todo App Visual Hierarchy for a Full Loop Trial

## Intent

Open a fresh autonomous PR that exercises the most realistic end-to-end loop in this repo:

- implementation makes a contained UI refinement on the pilot app
- implementation uses rendered screenshot evidence instead of coding blind
- the resulting PR is easy for a human reviewer to comment on
- a later fix run can address that comment on the same PR

This work unit is intentionally designed as a workflow proof artifact, not just a feature request.

## Specification

- Update `pilots/todo-app/` only.
- Keep the work presentation-focused and confined to the main screen layout and copy.
- Improve the visual hierarchy between the hero area, composer, filters, empty state, and todo cards so the primary action is clearer at a glance.
- Use Playwright or an equivalent automated browser path to capture screenshot evidence from the rendered app during implementation.
- Include screenshot-backed rationale or before/after evidence in the resulting PR metadata if possible.
- Preserve the existing todo behavior, including filtering, editing, completion, due dates, and clear-completed behavior.
- Preserve mobile usability and existing validation coverage; add or update tests only where needed to support the UI change.
- Do not add a backend, external design library, or complex state changes.

## Acceptance Criteria

- [ ] The implement workflow opens a fresh PR for this roadmap item.
- [ ] The implementation uses screenshot evidence from the rendered app as part of the design change.
- [ ] The resulting UI makes the main action path easier to understand from the first screen.
- [ ] The resulting PR contains enough visual or textual context that a human reviewer can comment on the design decision without local checkout.
- [ ] Existing validation remains green on the implementation PR.
- [ ] The PR is a good candidate for a follow-up human review comment and same-PR fix run.

## Notes

- This is the next deliberate proof target after establishing separate `implement`, `review`, and `fix` workflows.
- The goal is not a major redesign; the goal is a contained PR with enough product/UX surface area to exercise the full loop cleanly.
- Implement run `24042334398` did open fresh PR `#13`, which proves the roadmap item can drive a new branch/PR through the current workflow stack.
- That PR was intentionally closed during cleanup before review and fix work began, so this work unit remains `ready` rather than `done`.
