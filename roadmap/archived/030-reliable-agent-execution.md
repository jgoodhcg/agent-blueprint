---
title: "Reliable agent execution"
status: done
description: "Add checkpoints, recovery limits, context discipline, focused scope, and behavior evaluations"
created: 2026-10-11
updated: 2026-10-11
tags: [workflow, reliability]
priority: high
---

# Reliable agent execution

## Intent

Apply selected 12-Factor Agents principles to local agent development.
Keep the existing file-based workflow and portable blueprint.

## Specification

- Add durable progress records and checkout verification on resume.
- Define bounded recovery and concise working context.
- Add a decomposition criterion to the Definition of Ready.
- Add manual behavior scenarios for relevant policy changes.
- Synchronize templates and record source attribution in documentation and the commit.

## Validation

- Run the structural checker and required blueprint checks.
- Compare the embedded work-unit template with the skill mirror.
- Review behavior scenarios against the new rules.
- Report live session evaluations separately from document review.
- Inspect the complete diff for scope, whitespace, and sensitive content.

## Scope

Documentation and manual evaluation fixtures only.
No new runtime, dependencies, remote orchestration, or changes to existing approval boundaries.

## Context

- Source: https://github.com/humanlayer/12-factor-agents
- Canonical policy: `AGENT_BLUEPRINT.md`.
- Template mirror: `skills/applying-agent-blueprint/reference/roadmap-templates.md`.
- User approved the five recommendations and the attributed commit.

## Progress

- Checkout: `main`, base revision `67832e6`; this work changed documentation only.
- Completed: all five improvements, source attribution, version references, and synchronized templates.
- Remaining: none for implementation.
- Validation: structural checker, blueprint version and invariant checks, template comparison, and `git diff --check` passed.
- Blockers: none.
- Next action: commit the reviewed documentation with the requested source and model attribution.

## Evaluation review

Instruction version: `2026-10-11`.
Scenarios E1–E6 were reviewed against their named rules.
Each scenario defines inputs, observable expected actions, and failure conditions.
Live results for E1–E6: `not run`.
No isolated behavior evaluation harness is configured in this repository.
No additional agent sessions were launched.
Script syntax validation was not needed because no scripts changed.
UI/E2E: not applicable to this documentation repository.
