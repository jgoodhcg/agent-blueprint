---
title: "Agent Blueprint Roadmap"
goal: "Maintain and evolve a portable agent operating standard for AI-assisted software projects."
---

# Roadmap

## Current Focus

- Blueprint version: `2026-03-28`
- Design System Guide version: `2026-03-07`
- GitHub automation pilot: direct-CLI OpenCode workflows in this repo, triggered through GitHub Actions UI or `gh workflow run`, with workflow-owned commit/push/PR handling now proven on a real Bun + Preact pilot app
- Next proof target: richer autonomous loops on the pilot app, especially screenshot-informed implementation, review-driven rework, and fix runs that address review comments plus failing GitHub checks

## Work Units

See individual `[ID]-[slug].md` files in this directory. Use `draft` while clarifying and `ready` when autonomous execution can begin.

- `001-github-opencode-pilot.md` (`done`) - dogfood the GitHub Actions pilot before standardizing adoption guidance in the blueprint
- `002-readme-once-over.md` (`ready`) - tighten the README for maintainer quick reference and clearer GitHub-repo orientation
- `003-actions-commit-identity-smoke.md` (`ready`) - validate neutral GitHub Actions commit identity on a fresh automated branch/PR
- `004-demo-flow-snapshot.md` (`ready`) - create a small, visible README change for a clean implement -> validate -> review demo
- `005-roadmap-todo-pilot.md` (`done`) - scaffold a small real web app inside this repo so the GitHub automation pilot has meaningful build, test, and e2e validation
- `006-roadmap-todo-due-dates.md` (`active`) - add due dates and an overdue filter to the pilot app as the first real workflow-driven feature
- `007-playwright-screenshot-design-loop.md` (`draft`) - prove screenshot-informed UI decisions during implementation on the pilot app
- `008-review-driven-decision-rework.md` (`draft`) - prove review can catch substantive product or UX decisions that require rework
- `009-fix-review-comments-and-failed-checks.md` (`ready`) - prove the fix loop can address PR review feedback and failing GitHub checks on the same PR

## Quick Ideas

Ideas not yet promoted to work units:

- Design guide maturation — additional component patterns, expanded accessibility guidance
- Cross-agent testing — validate blueprint adoption across all four product lines (codex, claude, gemini, opencode)
- Adoption tooling — scripted alignment checks, automated drift detection
- Decision artifact examples — sample `.decisions/` entries for common scenarios
- Ambiguous work unit handling — force a decision artifact or explicit scope narrowing instead of silent assumption drift
- Base-branch drift recovery — refresh an open autonomous PR after `main` moves and confirm validation still converges
- Second proxy project — validate the same workflow pattern in a repo with a meaningfully different stack and validation suite
