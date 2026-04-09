---
title: "Agent Blueprint Roadmap"
goal: "Maintain and evolve a portable agent operating standard for AI-assisted software projects."
---

# Roadmap

## Current Focus

- Blueprint version: `2026-03-28`
- Design System Guide version: `2026-03-07`
- Active roadmap work should now focus only on the remaining GitHub workflow gaps.
- Older proof runs, pilot experiments, README cleanup tasks, and superseded demo work are archived.
- Historical reference files for old pilot paths remain only where needed to keep past PR links understandable.

## Work Units

See individual `[ID]-[slug].md` files in this directory. Use `draft` while clarifying and `ready` when autonomous execution can begin.

- `014-pr-body-reviewability-defaults.md` (`ready`) - standardize the PR body so roadmap context, evidence, test coverage, and validation are easy to scan
- `015-screenshot-evidence-policy.md` (`ready`) - define where screenshot artifacts live and how before/after evidence is surfaced in workflow-authored PRs
- `016-post-fix-review-convergence.md` (`ready`) - ensure review recommendations converge after fix runs and green validation instead of going stale
- `017-bot-comment-model-attribution.md` (`ready`) - stamp workflow-authored comments and reviews with provider, product, and model attribution
- `018-demo-pr-cleanup-policy.md` (`draft`) - decide how superseded demo PRs should be closed, approved, merged, or preserved as canonical artifacts

## Archived

- Archived work units now live under `roadmap/archived/`.
- The Todo App pilot roadmap under `pilots/todo-app/roadmap/` is retained only as archived reference history.

## Quick Ideas

Ideas not yet promoted to work units:

- Design guide maturation — additional component patterns, expanded accessibility guidance
- Cross-agent testing — validate blueprint adoption across all four product lines (codex, claude, gemini, opencode)
- Adoption tooling — scripted alignment checks, automated drift detection
- Decision artifact examples — sample `.decisions/` entries for common scenarios
- Project-relative automation identity — instruction files and workflow examples should name the workflow-owned git identity relative to the adopting project, not with a blueprint-specific hardcoded persona
- Ambiguous work unit handling — force a decision artifact or explicit scope narrowing instead of silent assumption drift
- Base-branch drift recovery — refresh an open autonomous PR after `main` moves and confirm validation still converges
- Second proxy project — validate the same workflow pattern in a repo with a meaningfully different stack and validation suite
