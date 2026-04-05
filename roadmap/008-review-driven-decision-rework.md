---
title: "Prove Review-Driven Decision Rework on a Real PR"
status: draft
description: "Exercise a real review loop where review catches substantive product or UX decisions that require implementation rework."
created: 2026-04-04
updated: 2026-04-04
tags: [pilot, review, product, workflow]
priority: high
---

# Prove Review-Driven Decision Rework on a Real PR

## Intent

Validate that review mode can do more than code cleanup by surfacing product, UX, or scope decisions that should be reconsidered before merge.

## Specification

- Use a contained pilot-app PR where at least one meaningful product or UX choice is present.
- Run the autonomous review workflow against that PR after implementation and validation are available.
- Expect the review to either explicitly approve the decision or call out at least one decision point that needs reconsideration.
- If review requests changes, follow with a fix run that updates behavior or UI rather than limiting itself to tests, naming, or comments.
- Keep the loop on the same PR so the decision history is visible in one place.

## Acceptance Criteria

- [ ] Review mode posts PR-visible feedback that references at least one explicit decision point.
- [ ] A follow-up implementation or fix run addresses that decision on the same PR when changes are requested.
- [ ] The final PR state reflects the resolved decision in code, review history, or both.
- [ ] Validation is green again after the rework.

## Notes

- This is aimed at the common failure mode where an autonomous review is technically accurate but not product-useful.
- The proof target is a review loop that changes implementation direction, not just polish.

