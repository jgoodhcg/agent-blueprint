---
title: "Agent Blueprint Roadmap"
goal: "Maintain and evolve a portable agent operating standard for AI-assisted software projects."
---

# Roadmap

## Current Focus

- Blueprint version: `2026-03-28`
- Design System Guide version: `2026-03-07`
- GitHub automation baseline is now proven in this repo: roadmap-driven implement, attached PR validation, autonomous review comments, same-PR fix, and bot-generated screenshot evidence all ran successfully on the pilot app
- `pilots/todo-app/` remains the validation target, and its pilot-only demo work units now live under `pilots/todo-app/roadmap/`
- Root roadmap work should now focus on the workflow itself: PR reviewability, screenshot policy, post-fix review convergence, model attribution, and demo cleanup policy

## Work Units

See individual `[ID]-[slug].md` files in this directory. Use `draft` while clarifying and `ready` when autonomous execution can begin.

- `001-github-opencode-pilot.md` (`done`) - dogfood the GitHub Actions pilot before standardizing adoption guidance in the blueprint
- `002-readme-once-over.md` (`ready`) - tighten the README for maintainer quick reference and clearer GitHub-repo orientation
- `003-actions-commit-identity-smoke.md` (`done`) - validate stage-specific GitHub Actions commit identity on a fresh automated branch/PR
- `004-demo-flow-snapshot.md` (`ready`) - create a small, visible README change for a clean implement -> validate -> review demo
- `005-roadmap-todo-pilot.md` (`done`) - scaffold a small real web app inside this repo so the GitHub automation pilot has meaningful build, test, and e2e validation
- `006-roadmap-todo-due-dates.md` (`done`) - add due dates and an overdue filter to the Todo App pilot as the first real workflow-driven feature proof
- `007-playwright-screenshot-design-loop.md` (`draft`) - prove screenshot-informed UI decisions during implementation on the pilot app
- `008-review-driven-decision-rework.md` (`draft`) - prove review can catch substantive product or UX decisions that require rework
- `009-fix-review-comments-and-failed-checks.md` (`done`) - prove the fix loop can address PR review feedback and failing GitHub checks on the same PR
- `014-pr-body-reviewability-defaults.md` (`ready`) - standardize the PR body so roadmap context, evidence, test coverage, and validation are easy to scan
- `015-screenshot-evidence-policy.md` (`ready`) - define where screenshot artifacts live and how before/after evidence is surfaced in workflow-authored PRs
- `016-post-fix-review-convergence.md` (`ready`) - ensure review recommendations converge after fix runs and green validation instead of going stale
- `017-bot-comment-model-attribution.md` (`ready`) - stamp workflow-authored comments and reviews with provider, product, and model attribution
- `018-demo-pr-cleanup-policy.md` (`draft`) - decide how superseded demo PRs should be closed, approved, merged, or preserved as canonical artifacts

## Pilot Work Units

Pilot-only demo work units were moved out of the main backlog and now live under `pilots/todo-app/roadmap/`.

- `010` - `013` remain available there as historical demo artifacts and pilot-scoped work

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
