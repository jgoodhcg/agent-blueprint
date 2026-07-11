---
title: "Agent Blueprint Roadmap"
goal: "Maintain and evolve a portable agent operating standard for AI-assisted software projects."
---

# Roadmap

## Current Focus

- Blueprint version: `2026-07-11`
- Design System Guide version: `2026-03-07`
- Focus is the durable core: the blueprint standard, the `applying-agent-blueprint` skill, and instruction-design quality.
- The autonomous GitHub Actions pilot was sunset on 2026-06-17 (see Sunset below); its work units were dropped and its workflows, guide, and pilot app were removed.

## Work Units

See individual `[ID]-[slug].md` files in this directory. Use `draft` while clarifying and `ready` when autonomous execution can begin.

- `021-urgent-scope-validation-guardrail.md` (`draft`) - make the blueprint explicit that urgency does not waive clarification, scoped execution, or validation
- `022-design-system-artifact-and-visual-capture.md` (`draft`) - define an agent-consumable design system artifact and a project-adaptable visual state capture strategy for on-demand component screenshots

## Sunset

**Sunset 2026-06-17 — autonomous GitHub Actions pilot.** Ending roadmap-driven remote implement/review/fix automation. For this maintainer's projects the expected payoff doesn't justify the cost and effort: remote AI execution is expensive and the signal/value it adds is too low to be worth queuing project plans to run remotely, and driving agentic tools directly is more effective than scheduling them. The broader goal is well-funded and heavily pursued elsewhere — better to wait and adopt what others prove out than build it here, since it isn't what this maintainer wants to be building. The durable core (roadmap model, AGENTS.md/blueprint standard, instruction-design rules, scaffolding skill) remains active.

Work units `014`–`020` were dropped as part of this sunset. The workflows, setup guide, and pilot app were removed from the tree; they remain recoverable from git history at the tag `autonomous-gha-pilot` (e.g. `git checkout autonomous-gha-pilot -- .github/workflows/`).

## Archived

- Archived and dropped work units live under `roadmap/archived/`.
- The autonomous GitHub Actions pilot (workflows, guide, pilot app) was removed from the tree and is recoverable from the git tag `autonomous-gha-pilot`.

## Quick Ideas

Ideas not yet promoted to work units:

- Cross-agent testing — validate blueprint adoption across all four product lines (codex, claude, gemini, opencode)
- Adoption tooling — scripted alignment checks, automated drift detection
- Decision artifact examples — sample `.decisions/` entries for common scenarios
- Ambiguous work unit handling — force a decision artifact or explicit scope narrowing instead of silent assumption drift
- Skill/blueprint template dedupe — `.claude/skills/applying-agent-blueprint/reference/*` mirrors the templates embedded in `AGENT_BLUEPRINT.md` (kept inline for one-file portability); decide whether to single-source them or keep the mirror with a sync check
