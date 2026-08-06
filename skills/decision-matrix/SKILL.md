---
name: decision-matrix
description: Create or revise a collaborative decision matrix in Google Sheets through the gws CLI. Use when a user asks for a decision matrix, wants to compare options against criteria, is weighing alternatives, or provides a Google Sheet for structured evaluation.
---

# Decision Matrix

Build the matrix as a compact Google Sheet. Keep the decision framing, options, criteria, and assessments visible in one grid.

Read [references/google-sheets.md](references/google-sheets.md) before writing or formatting a Sheet.

## Workflow

1. Frame the decision as a question.
2. Define each option with a short label and one-sentence description.
3. Define criteria that distinguish the options. Add weights only when they help the decision.
4. Assess every option against every criterion with concise evidence or reasoning.
5. Ask the user for a blank shared Google Sheet when no writable Sheet exists. The `gws` service account cannot create a user-owned Sheet reliably.
6. Inspect an existing Sheet before overwriting it. Confirm the target range when the Sheet contains unrelated data.
7. Write values with `gws sheets spreadsheets values update`.
8. Apply the canonical layout and colors with `gws sheets spreadsheets batchUpdate`.
9. Read the written range back with `gws sheets spreadsheets values get` and verify the row and column alignment.
10. Return the Sheet link and identify any uncertain assessments. Do not declare a decision unless the user asks.

## Assessment Rules

- Use `green` only for a notable comparative benefit.
- Use `yellow` only for a notable negative.
- Use `red` only for a blocker that eliminates the option.
- Leave neutral or contextual cells uncolored.
- Put a weight in the criterion label, such as `Longevity — 20%`; do not add a separate weight column unless the user asks.
- Treat popularity as instrumental when the user values it for adoption, ecosystem health, or longevity.
- Separate non-compensable gates from weighted scores. A high total must not erase a blocker.

## Artifact Rules

- Make the Google Sheet the primary collaborative artifact.
- Do not run the `matrix-reloaded` CLI from agent sessions.
- Do not create a local JSON substitute unless Google Sheets access is unavailable and the user accepts the fallback.
- Do not add report sections, recommendation rows, legends, or a recorded decision unless the user requests them.
- Put decision notes in A2 or in Sheet comments when the user wants to preserve them.
