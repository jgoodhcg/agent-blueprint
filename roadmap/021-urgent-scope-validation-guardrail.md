---
title: "Explicit Guardrail For Urgent But Underspecified Requests"
status: draft
description: "Make the blueprint state plainly that urgency does not waive clarification, scoped execution, or validation."
created: 2026-04-20
updated: 2026-04-20
tags: [blueprint, workflow, validation, scope]
priority: medium
---

# Explicit Guardrail For Urgent But Underspecified Requests

## Intent

Close a small but important gap in the blueprint: rushed or emotionally phrased coding requests should not cause agents to invent scope, skip clarification, or claim completion without validation.

## Sequencing

- Execution order: after the current GitHub workflow tranche
- Dependency role: blueprint hardening follow-up, not a blocker for the active workflow work

## Specification

- Add explicit wording to `AGENT_BLUEPRINT.md` that urgency does not override the normal operating model.
- State that an agent must still restate scope, surface missing context, and define or confirm a validation target before treating an underspecified coding request as executable.
- Clarify that "do it fast" changes prioritization, not correctness standards.
- Prefer a durable process rule over tone-policing; the goal is better inputs and safer execution, not a politeness requirement.
- Consider whether the blueprint should include a minimal input contract for coding requests, such as current behavior, expected behavior, relevant files or errors, constraints, and how success will be checked.

## Acceptance Criteria

- [ ] The blueprint explicitly states that urgent or emotionally phrased requests do not waive clarification or validation requirements.
- [ ] The guidance distinguishes speed from permission to guess.
- [ ] The resulting wording is portable across interactive local use and autonomous workflow use.
- [ ] Any added input-contract guidance stays short and operational rather than turning into ceremony.

## Notes

- Motivation: comparison against an April 20, 2026 tweet example where a vague, hostile, time-boxed coding prompt was contrasted with predictable bad outcomes.
- This should likely land near `[BP-WF-OPS]` or `[BP-WF-GUARD]`, with optional companion wording in `AGENTS.md` template guidance if needed.
