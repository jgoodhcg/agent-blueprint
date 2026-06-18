---
title: "Add Model Attribution to Workflow Comments and Reviews"
status: dropped
description: "Stamp workflow-authored PR comments and reviews with provider, product, and model attribution."
created: 2026-04-09
updated: 2026-06-17
tags: [workflow, attribution, github]
priority: medium
---

# Add Model Attribution to Workflow Comments and Reviews

## Intent

Make every workflow-authored review artifact self-describing so a human can see which model and provider produced it without reading Actions logs.

## Sequencing

- Execution order: third
- Dependency role: add attribution after `015` settles which comments or PR-body-adjacent artifacts remain canonical

## Specification

- Resolve provider, product, and model once per workflow run.
- Append that attribution consistently to autonomous review comments and screenshot-evidence comments.
- Keep the format concise and machine-checkable.

## Chosen Defaults

- Visible footer: `Attribution: <provider> / <product> / <model>`
- Machine-checkable marker: HTML comment carrying the same three fields
- Coverage: autonomous review comments plus screenshot-evidence lifecycle comments in implement and fix stages

## Acceptance Criteria

- [ ] Autonomous review comments include provider, product, and model attribution.
- [ ] Screenshot evidence comments include the same attribution.
- [ ] The formatting is consistent across implement, review, and fix stages where comments are published.

## Sunset

Dropped 2026-06-17 with the autonomous GitHub Actions pilot. Full rationale in `roadmap/index.md`: the remote AI execution payoff didn't justify the cost/effort for these projects.
