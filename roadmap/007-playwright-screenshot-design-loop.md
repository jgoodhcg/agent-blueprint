---
title: "Use Playwright Screenshots to Inform Pilot App Design"
status: draft
description: "Prove the implementation phase can use rendered UI screenshots to inform and justify design choices instead of coding blind."
created: 2026-04-04
updated: 2026-04-04
tags: [pilot, design, playwright, automation]
priority: high
---

# Use Playwright Screenshots to Inform Pilot App Design

## Intent

Validate a realistic design workflow where the agent can inspect rendered screenshots from the Roadmap Todo pilot app and use them to make or justify UI decisions during implementation.

## Specification

- Use `pilots/roadmap-todo/` as the execution target.
- Pick one contained UI refinement where layout, spacing, hierarchy, or copy is easier to evaluate visually than from source alone.
- Capture before-state screenshots through Playwright or an equivalent automated browser path.
- Use those screenshot artifacts as part of the implementation context, not only as after-the-fact evidence.
- Preserve accessibility and mobile-plus-desktop usability expectations already established by the pilot app.
- Keep the work scoped to presentation and interaction quality; do not add backend or service complexity.

## Acceptance Criteria

- [ ] The implementation flow uses screenshot artifacts from the running app as input to the design change.
- [ ] The resulting PR includes screenshot-backed rationale or before/after evidence.
- [ ] The visual change is understandable from PR artifacts without requiring a local checkout.
- [ ] Existing validation still passes after the UI refinement.

## Notes

- This work unit is about proving a workflow capability, not producing a large visual redesign.
- The key question is whether autonomous implementation can use visual evidence as part of design judgment instead of relying only on source inspection.

