---
title: "Scaffold Roadmap Todo Pilot App"
status: done
description: "Add a small real web-app subproject that the GitHub automation pilot can build, test, and review."
created: 2026-04-02
updated: 2026-04-02
tags: [pilot, web, bun, preact, playwright]
priority: high
---

# Scaffold Roadmap Todo Pilot App

## Intent

Create a small but real application inside this repository so the GitHub automation pilot can be exercised against meaningful feature work, repository validation, and Playwright e2e coverage instead of documentation-only changes.

## Specification

- Add a fenced pilot subproject at `pilots/roadmap-todo/`.
- Use TypeScript, Bun, Preact, Preact Signals, and vanilla CSS.
- Keep the first version client-only; do not add a backend service.
- Implement a todo application with enough behavior to support realistic agent changes:
  - create todos
  - edit titles
  - complete and reopen items
  - delete items
  - filter by status
  - clear completed items
  - persist state locally
- Add unit tests and Playwright e2e coverage.
- Update the repository PR validation workflow so `project-smoke` runs the pilot app validation commands instead of placeholder checks.
- Document how to run the pilot app locally and how it fits into the GitHub automation pilot.

## Acceptance Criteria

- [x] `pilots/roadmap-todo/` contains a runnable Bun + Preact app with Signals-based state.
- [x] The app supports create, edit, complete, delete, filter, and clear-completed flows.
- [x] The app includes at least one unit test file and one Playwright e2e spec.
- [x] The repo PR validation workflow runs pilot-app install, typecheck, unit tests, build, and Playwright for the `project-smoke` job.
- [x] The repository docs explain that this pilot app is the concrete target for the GitHub automation workflow.

## Notes

- The goal is workflow realism, not product scope.
- A client-only app is the simpler and more useful first step than adding a Go service.
- If this proves stable, the same workflow pattern can then be repeated in a separate repository to validate portability.
