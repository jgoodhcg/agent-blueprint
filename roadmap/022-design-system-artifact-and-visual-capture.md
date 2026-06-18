---
title: "Design System Artifact & Visual State Capture"
status: draft
description: "Define a portable design system artifact format optimized for agent consumption and a component-level screenshot strategy for capturing specific UI states on demand."
created: 2026-05-09
updated: 2026-05-09
tags: [design-system, claude-code, screenshots, e2e, components]
priority: medium
---

# Design System Artifact & Visual State Capture

## Intent

Claude Code (and similar agents) produce better UI work when they can read a structured design system and see screenshots of specific component states. Today `DESIGN_SYSTEM_GUIDE.md` covers token rules and presets but does not describe how to package the system for agent consumption or how to quickly capture a screenshot of "the date picker in an error state with a disabled submit button." This work unit closes both gaps: a machine-friendly design system artifact and a project-adaptable visual state capture strategy.

## Problem

1. **Design system is human-first.** The existing guide is thorough for human readers but not structured for easy loading into a Claude Code context window. Agents waste tokens or miss constraints when scanning the full file.
2. **No way to say "show me X state."** When iterating on UI, the fastest feedback loop is a screenshot of the exact component state in question. Projects have no blueprint-level guidance for wiring up stateless component renders, storybook snapshots, or e2e screenshot helpers to produce those captures on demand.
3. **Project-dependent implementation.** The capture mechanism will differ by stack (React Storybook, Playwright visual regression, test-render-helpers, etc.), but the contract — give me a screenshot of this component in this state — should be universal.

## Specification

### Design system artifact for agent consumption

- Define a condensed, agent-optimized version of the design system that can be included in `CLAUDE.md`, `AGENTS.md`, or loaded via a referenced file path.
- The artifact should include: active preset, resolved token values, component patterns in use, and a pointer to the full guide for deep reference.
- Keep the artifact under a target size (e.g., ~2KB) so it fits comfortably in an agent context window without consuming the entire budget.
- Optionally generate the artifact from `.interface-design/system.md` (the existing single source of truth from `DESIGN_SYSTEM_GUIDE.md`).

### Visual state capture strategy

- Provide blueprint guidance for setting up a project-level mechanism to screenshot any component in any declared state.
- Acceptable approaches include (project picks one or combines):
  - **Stateless component render scripts** — a small harness that imports a component, injects props/state, and writes a PNG.
  - **Storybook or equivalent** — per-component stories that double as both design documentation and screenshot sources.
  - **E2e test screenshot helpers** — Playwright/Cypress page-object patterns with a `screenshot(path, state)` convenience that captures a specific route or DOM state.
  - **Hybrid** — e2e screenshots for full-page states, component renders for isolated states.
- The blueprint should specify the interface contract (what to call, what it returns) but leave framework choice to the project.
- Captured screenshots should land in a predictable, documented path (this work unit defines its own convention; there is no separate evidence-policy unit).

### Claude Code integration

- Document the recommended workflow: load the design system artifact, reference the full guide, use visual captures as context when asking for UI changes.
- The artifact format should be plain markdown or a structured comment block that Claude Code can parse without custom tooling.

## Acceptance Criteria

- [ ] The blueprint provides a template or spec for an agent-consumable design system artifact (condensed token summary).
- [ ] The blueprint describes the visual state capture contract with at least one concrete implementation pattern per major stack category (e.g., React component render, Playwright e2e).
- [ ] The artifact format stays under a documented size target suitable for agent context windows.
- [ ] The capture strategy defines a clear, documented screenshot output path convention.
- [ ] `DESIGN_SYSTEM_GUIDE.md` gains a section referencing the artifact and capture guidance, or a new companion section is added to the blueprint.

## Notes

- This is intentionally stack-agnostic at the blueprint level. Concrete harness scripts belong in adopting projects, not in this repo.
- The condensed artifact idea is similar to how some projects maintain a `DESIGN.md` or `tokens.md` — the difference is explicit optimization for agent context windows rather than human browsing.
- Visual state capture dovetails with existing e2e visual regression tooling; projects that already have Playwright screenshots may only need a convenience wrapper to expose arbitrary state captures.
