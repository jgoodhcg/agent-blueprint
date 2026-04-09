---
title: "Make Post-Fix Review Converge Cleanly"
status: ready
description: "Reduce stale review recommendations by sequencing or rerunning review after fix completion and green validation."
created: 2026-04-09
updated: 2026-04-09
tags: [workflow, review, fix, validation]
priority: high
---

# Make Post-Fix Review Converge Cleanly

## Intent

Eliminate the awkward demo state where a PR is actually healthy but the most visible autonomous review comment is stale because it ran before the fix or before checks turned green.

## Specification

- Decide whether review should wait for validation, rerun automatically after fix, or both.
- Ensure the latest visible recommendation reflects the latest PR state.
- Keep the loop understandable on one PR timeline instead of requiring manual interpretation.

## Acceptance Criteria

- [ ] A fix run no longer leaves the PR with an obviously stale recommendation comment.
- [ ] The final autonomous recommendation reflects current checks and code state.
- [ ] The workflow behavior is documented well enough for demo and day-to-day use.
