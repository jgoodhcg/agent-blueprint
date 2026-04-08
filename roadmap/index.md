---
title: "Agent Blueprint Roadmap"
goal: "Maintain and evolve a portable agent operating standard for AI-assisted software projects."
---

# Roadmap

## Current Focus

- Blueprint version: `2026-03-28`
- Design System Guide version: `2026-03-07`
- GitHub automation pilot: direct-CLI OpenCode workflows in this repo, triggered through GitHub Actions UI or `gh workflow run`, with workflow-owned implement, review, fix, commit, push, and PR-validation redispatch now proven on a real Bun + Preact pilot app
- Current repository state: one open demo PR may still exist from workflow tuning, but the next real demo should start from a fresh roadmap item and a fresh PR timeline
- Next proof target: a full demo loop on the Roadmap Todo pilot covering implement, screenshot-backed PR context, autonomous review, human follow-up, same-PR fix, and rerun review

## Work Units

See individual `[ID]-[slug].md` files in this directory. Use `draft` while clarifying and `ready` when autonomous execution can begin.

- `001-github-opencode-pilot.md` (`done`) - dogfood the GitHub Actions pilot before standardizing adoption guidance in the blueprint
- `002-readme-once-over.md` (`ready`) - tighten the README for maintainer quick reference and clearer GitHub-repo orientation
- `003-actions-commit-identity-smoke.md` (`done`) - validate stage-specific GitHub Actions commit identity on a fresh automated branch/PR
- `004-demo-flow-snapshot.md` (`ready`) - create a small, visible README change for a clean implement -> validate -> review demo
- `005-roadmap-todo-pilot.md` (`done`) - scaffold a small real web app inside this repo so the GitHub automation pilot has meaningful build, test, and e2e validation
- `006-roadmap-todo-due-dates.md` (`done`) - add due dates and an overdue filter to the pilot app as the first real workflow-driven feature proof
- `007-playwright-screenshot-design-loop.md` (`draft`) - prove screenshot-informed UI decisions during implementation on the pilot app
- `008-review-driven-decision-rework.md` (`draft`) - prove review can catch substantive product or UX decisions that require rework
- `009-fix-review-comments-and-failed-checks.md` (`done`) - prove the fix loop can address PR review feedback and failing GitHub checks on the same PR
- `010-roadmap-todo-local-due-dates.md` (`done`) - fix date-only due dates to behave as local calendar dates on a fresh autonomous PR
- `011-roadmap-todo-visual-hierarchy-loop.md` (`ready`) - open a screenshot-informed pilot-app PR designed for a real human review comment and same-PR fix follow-up
- `012-roadmap-todo-full-loop-demo.md` (`ready`) - run one clean demo-grade implement -> review -> human comment -> fix -> review loop with screenshot evidence on the pilot app
- `013-roadmap-todo-full-loop-demo-clean-run.md` (`ready`) - run a fresh clean-room version of the same demo so the Actions list and PR timeline are contiguous for a live walkthrough

## Quick Ideas

Ideas not yet promoted to work units:

- Design guide maturation — additional component patterns, expanded accessibility guidance
- Cross-agent testing — validate blueprint adoption across all four product lines (codex, claude, gemini, opencode)
- Adoption tooling — scripted alignment checks, automated drift detection
- Decision artifact examples — sample `.decisions/` entries for common scenarios
- Project-relative automation identity — instruction files and workflow examples should name the workflow-owned git identity relative to the adopting project, not with a blueprint-specific hardcoded persona
- Squash/finalize action — after implement/review/fix loops are proven, explore a dedicated action that can produce a clean squash-merge style end state instead of leaving the full autonomous commit history as the final branch shape
- Ambiguous work unit handling — force a decision artifact or explicit scope narrowing instead of silent assumption drift
- Base-branch drift recovery — refresh an open autonomous PR after `main` moves and confirm validation still converges
- Second proxy project — validate the same workflow pattern in a repo with a meaningfully different stack and validation suite
