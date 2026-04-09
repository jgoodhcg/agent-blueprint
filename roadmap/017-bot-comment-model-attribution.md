---
title: "Add Model Attribution to Workflow Comments and Reviews"
status: ready
description: "Stamp workflow-authored PR comments and reviews with provider, product, and model attribution."
created: 2026-04-09
updated: 2026-04-09
tags: [workflow, attribution, github]
priority: medium
---

# Add Model Attribution to Workflow Comments and Reviews

## Intent

Make every workflow-authored review artifact self-describing so a human can see which model and provider produced it without reading Actions logs.

## Specification

- Resolve provider, product, and model once per workflow run.
- Append that attribution consistently to autonomous review comments and screenshot-evidence comments.
- Keep the format concise and machine-checkable.

## Acceptance Criteria

- [ ] Autonomous review comments include provider, product, and model attribution.
- [ ] Screenshot evidence comments include the same attribution.
- [ ] The formatting is consistent across implement, review, and fix stages where comments are published.
