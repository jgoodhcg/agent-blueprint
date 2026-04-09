---
title: "Treat Todo App Due Dates as Local Calendar Dates"
status: done
description: "Fix the pilot app so date-only due dates render and evaluate overdue status as local calendar dates, then prove the change on a fresh autonomous PR."
created: 2026-04-05
updated: 2026-04-06
tags: [pilot, web, todo, dates, workflow]
priority: high
---

# Treat Todo App Due Dates as Local Calendar Dates

## Intent

Create a fresh autonomous PR from `main` that fixes the date-handling bug discovered during review of the first due-date feature pass. This should prove the workflow on a clean branch after the stage-specific Agent Blueprint identity change landed.

## Specification

- Update `pilots/todo-app/` only.
- Treat stored due dates as local calendar dates rather than UTC timestamps.
- Ensure the rendered due date label shows the same calendar day the user entered, regardless of local timezone offset.
- Ensure overdue evaluation uses local calendar-date semantics and does not drift around UTC parsing boundaries.
- Preserve the existing due-date field, overdue filter, and completed-item exclusion behavior.
- Update unit and Playwright coverage to guard against the local-date parsing bug.
- Keep the app client-only; do not add a backend or external date library.

## Acceptance Criteria

- [ ] A todo created with a due date such as `2026-04-10` renders as April 10 in the local UI rather than shifting by timezone.
- [ ] Overdue determination for date-only due dates is based on local calendar dates rather than UTC timestamp interpretation.
- [ ] Existing due-date, overdue-filter, and completed-item behavior still works.
- [ ] Unit tests and Playwright coverage are updated for the local-date semantics.
- [ ] The implement workflow opens a fresh PR for this roadmap item.
- [ ] The resulting workflow-owned commit on that PR is authored and committed by `Agent Blueprint Implementer <agent-blueprint-implementer@users.noreply.github.com>`.

## Notes

- This work unit intentionally starts from `main` instead of reusing PR `#11`, so the proof artifact is not mixed with earlier check names, earlier commit identity behavior, or seeded review history.
- The bug was surfaced by review feedback on PR `#11`, but this work unit should stand on its own as a clean implementation proof.
- Implement run `24009281387` opened PR `#12`, validation run `24009380566` passed, review run `24038904809` surfaced the missing timezone-coverage concern, and fix run `24040510112` plus validation run `24040566133` completed the same-PR repair loop.
- PR `#12` was later closed during cleanup, but the work unit succeeded as a workflow proof artifact before closure.
