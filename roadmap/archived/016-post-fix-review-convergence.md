---
title: "Make Post-Fix Review Converge Cleanly"
status: dropped
description: "Reduce stale review recommendations by sequencing or rerunning review after fix completion and green validation."
created: 2026-04-09
updated: 2026-06-17
tags: [workflow, review, fix, validation]
priority: high
---

# Make Post-Fix Review Converge Cleanly

## Intent

Eliminate the awkward demo state where a PR is actually healthy but the most visible autonomous review comment is stale because it ran before the fix or before checks turned green.

## Sequencing

- Execution order: fourth
- Dependency role: should converge the final review surface after `014`, `015`, and `017` settle what humans actually see on the PR timeline

## Specification

- Decide whether review should wait for validation, rerun automatically after fix, or both.
- Ensure the latest visible recommendation reflects the latest PR state.
- Keep the loop understandable on one PR timeline instead of requiring manual interpretation.

## Chosen Defaults

- A successful fix run dispatches PR validation first.
- The workflow waits for validation to settle when practical, then dispatches a fresh review against the same PR.
- If validation has not settled before timeout, the follow-up review still runs so the visible recommendation reflects the current pending state instead of an older stale state.

## Acceptance Criteria

- [ ] A fix run no longer leaves the PR with an obviously stale recommendation comment.
- [ ] The final autonomous recommendation reflects current checks and code state.
- [ ] The workflow behavior is documented well enough for demo and day-to-day use.

## Sunset

Dropped 2026-06-17 with the autonomous GitHub Actions pilot. Full rationale in `roadmap/index.md`: the remote AI execution payoff didn't justify the cost/effort for these projects.
