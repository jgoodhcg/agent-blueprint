---
title: "Define Demo PR Cleanup Policy"
status: draft
description: "Decide how to treat superseded demo PRs after a workflow proof succeeds."
created: 2026-04-09
updated: 2026-04-09
tags: [workflow, demo, cleanup]
priority: medium
---

# Define Demo PR Cleanup Policy

## Intent

Avoid ad hoc cleanup after demos by deciding how the repository should treat superseded proof PRs, canonical demo artifacts, and merge-vs-close outcomes.

## Specification

- Decide how to mark one demo PR as canonical when multiple runs exist.
- Decide whether successful demo PRs should be merged, left open, or closed with a final marker.
- Define how roadmap items should be updated when a cleaner rerun supersedes an earlier proof.

## Acceptance Criteria

- [ ] The repo has a documented rule for superseded demo PRs.
- [ ] The roadmap can reflect demo outcomes without manual guesswork.
- [ ] Maintainers can explain the difference between a proof artifact and a PR intended for merge.
