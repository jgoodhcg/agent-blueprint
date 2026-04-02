---
title: "Add Due Dates and Overdue Filter to Roadmap Todo"
status: ready
description: "Use the pilot app for the first real GitHub automation feature by adding due dates and overdue filtering."
created: 2026-04-02
updated: 2026-04-02
tags: [pilot, web, todo, workflow]
priority: high
---

# Add Due Dates and Overdue Filter to Roadmap Todo

## Intent

Create the first non-trivial roadmap work unit against `pilots/roadmap-todo/` so the GitHub automation pilot is validated on a real app feature instead of documentation-only changes.

## Specification

- Update `pilots/roadmap-todo/` only.
- Add an optional due date field when creating a todo.
- Persist the due date alongside the existing todo state.
- Show the due date on each todo card when present.
- Mark overdue open items visually.
- Add a new filter for overdue items in addition to the existing status filters.
- Keep completed items out of the overdue view even if their due date is in the past.
- Update unit and Playwright coverage to cover due dates and the overdue filter.
- Keep the app client-only; do not add a backend or new data service.

## Acceptance Criteria

- [ ] Users can assign an optional due date when creating a todo.
- [ ] Todos with past due dates and incomplete status are visually marked as overdue.
- [ ] The app exposes an overdue filter that only shows incomplete overdue items.
- [ ] Todos without due dates still work normally.
- [ ] Unit tests and Playwright tests cover the new due date and overdue behavior.
- [ ] Existing create, edit, complete, delete, filter, and clear-completed flows still work.

## Notes

- This is intentionally the first real feature-sized work unit for the pilot app.
- The goal is to exercise state changes, UI changes, and validation updates in one contained pass.
