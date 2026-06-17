---
title: "Agent Blueprint Roadmap"
goal: "Maintain and evolve a portable agent operating standard for AI-assisted software projects."
---

# Roadmap

## Current Focus

- Blueprint version: `2026-06-14`
- Design System Guide version: `2026-03-07`
- Active roadmap work should now focus only on the remaining GitHub workflow gaps.
- Older proof runs, pilot experiments, README cleanup tasks, and superseded demo work are archived.
- Historical reference files for old pilot paths remain only where needed to keep past PR links understandable.

## Work Units

See individual `[ID]-[slug].md` files in this directory. Use `draft` while clarifying and `ready` when autonomous execution can begin.

- `014-pr-body-reviewability-defaults.md` (`active`) - standardize the PR body so roadmap context, evidence, test coverage, and validation are easy to scan
- `015-screenshot-evidence-policy.md` (`active`) - define where screenshot artifacts live and how before/after evidence is surfaced in workflow-authored PRs
- `016-post-fix-review-convergence.md` (`active`) - ensure review recommendations converge after fix runs and green validation instead of going stale
- `017-bot-comment-model-attribution.md` (`active`) - stamp workflow-authored comments and reviews with provider, product, and model attribution
- `018-demo-pr-cleanup-policy.md` (`active`) - decide how superseded demo PRs should be closed, approved, merged, or preserved as canonical artifacts
- `019-opencode-config-scope.md` (`active`) - separate workflow-pinned OpenCode config from ambient local CLI config so repo examples support both GitHub Actions and local use
- `020-orchestrator-state-machine.md` (`draft`) - temporary controller-design artifact for the central workflow state machine before promotion into the blueprint
- `021-urgent-scope-validation-guardrail.md` (`draft`) - make the blueprint explicit that urgency does not waive clarification, scoped execution, or validation
- `022-design-system-artifact-and-visual-capture.md` (`draft`) - define an agent-consumable design system artifact and a project-adaptable visual state capture strategy for on-demand component screenshots

## Recommended Order

1. `019-opencode-config-scope.md` - should land first because a broken local OpenCode experience makes the workflow examples harder to validate and reuse.
2. `014-pr-body-reviewability-defaults.md` - sets the main reviewer-facing surface and reduces ambiguity for the remaining workflow work.
3. `015-screenshot-evidence-policy.md` - should build on the PR body defaults so evidence placement and storage do not split across competing surfaces.
4. `017-bot-comment-model-attribution.md` - should follow the evidence/comment decision so attribution lands on the final artifact surfaces.
5. `016-post-fix-review-convergence.md` - should act on the stabilized review and comment format instead of chasing churn in the artifact shape.
6. `018-demo-pr-cleanup-policy.md` - should come last because canonical demo PR handling depends on the final workflow ergonomics.
7. `021-urgent-scope-validation-guardrail.md` - should follow the current workflow tranche as a blueprint hardening pass rather than interrupt the active GitHub workflow work.
8. `022-design-system-artifact-and-visual-capture.md` - can proceed independently; no hard dependency on the active workflow tranche but should reference `015` for evidence directory conventions once that lands.

## Archived

- Archived work units now live under `roadmap/archived/`.
- The Todo App pilot roadmap under `pilots/todo-app/roadmap/` is retained only as archived reference history.

## Quick Ideas

Ideas not yet promoted to work units:

- Design guide maturation — additional component patterns, expanded accessibility guidance (promoted to `022-design-system-artifact-and-visual-capture.md` for the agent-artifact and visual capture dimension)
- Cross-agent testing — validate blueprint adoption across all four product lines (codex, claude, gemini, opencode)
- Adoption tooling — scripted alignment checks, automated drift detection
- Decision artifact examples — sample `.decisions/` entries for common scenarios
- Project-relative automation identity — instruction files and workflow examples should name the workflow-owned git identity relative to the adopting project, not with a blueprint-specific hardcoded persona
- Ambiguous work unit handling — force a decision artifact or explicit scope narrowing instead of silent assumption drift
- Base-branch drift recovery — refresh an open autonomous PR after `main` moves and confirm validation still converges
- Second proxy project — validate the same workflow pattern in a repo with a meaningfully different stack and validation suite
- Model escalation policy — after the bounded implement/review/fix loop has enough real history, evaluate a deterministic fallback ladder for repeated failed fix attempts instead of adding model-switch orchestration prematurely
- Skill/blueprint template dedupe — `.claude/skills/applying-agent-blueprint/reference/*` mirrors the templates embedded in `AGENT_BLUEPRINT.md` (kept inline for one-file portability); decide whether to single-source them or keep the mirror with a sync check
