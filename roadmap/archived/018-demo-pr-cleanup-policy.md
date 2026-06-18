---
title: "Define Demo PR Cleanup Policy"
status: dropped
description: "Decide how to treat superseded demo PRs after a workflow proof succeeds."
created: 2026-04-09
updated: 2026-06-17
tags: [workflow, demo, cleanup]
priority: medium
---

# Define Demo PR Cleanup Policy

## Intent

Avoid ad hoc cleanup after demos by deciding how the repository should treat superseded proof PRs, canonical demo artifacts, and merge-vs-close outcomes.

## Sequencing

- Execution order: fifth
- Dependency role: final cleanup policy should follow the workflow ergonomics decisions from `014` through `017`

## Specification

- Decide how to mark one demo PR as canonical when multiple runs exist.
- Decide whether successful demo PRs should be merged, left open, or closed with a final marker.
- Define how roadmap items should be updated when a cleaner rerun supersedes an earlier proof.

## Chosen Defaults

- When multiple demo PRs exist for the same proof, the newest clean rerun becomes the canonical artifact.
- Superseded demo PRs should be closed with a final pointer comment to the canonical artifact.
- Canonical demo PRs may also be closed intentionally once the proof is recorded in roadmap history; they are artifacts first, not merge targets by default.
- Only PRs intended to land durable repository changes should remain merge candidates.
- Roadmap history should record which demo PR is canonical when proof context matters later.

## Acceptance Criteria

- [ ] The repo has a documented rule for superseded demo PRs.
- [ ] The roadmap can reflect demo outcomes without manual guesswork.
- [ ] Maintainers can explain the difference between a proof artifact and a PR intended for merge.

## Sunset

Dropped 2026-06-17 with the autonomous GitHub Actions pilot. Full rationale in `roadmap/index.md`: the remote AI execution payoff didn't justify the cost/effort for these projects.
