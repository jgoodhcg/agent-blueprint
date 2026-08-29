---
title: "Prose slop linter and enforcement gate"
status: draft
description: "Deterministic checker for AI writing tells and STE violations, runnable as an agent self-check and a pre-commit hook"
created: 2026-08-03
updated: 2026-08-28
tags: [instruction-design, tooling, enforcement]
priority: medium
---

# Prose Slop Linter and Enforcement Gate

## Intent

Instruction-level style rules decay. `BP-INSTR-09` and `BP-INSTR-10` tell an agent
how to write, but nothing catches the output when the agent drifts. A
deterministic checker closes that gap and is the one artifact here that does not
depend on the model remembering a rule.

Two call sites, one implementation:

1. An agent runs it as a self-check before final output.
2. A pre-commit hook runs it over documentation files, code comments, and
   commit messages.

## Specification

[To define. Draft shape:]

- A script that reports `file:line` violations and exits non-zero on failure.
- Two rule families: STE structure (hedge modals, sentence length, trailing
  conditions, contractions, semicolons) and lexical AI tells ("claudisms").
- Exempt the untouchables: code blocks, inline code, identifiers, file paths,
  quoted error text, product names.
- Scope the run to changed files, not the whole tree.
- Apply the STE-based rule set to all agent-authored prose by default.
- Support exact-text exclusions and named project exemptions per
  `[BP-COMM-STE]`.

## Validation

- [ ] Runs clean against `AGENT_BLUEPRINT.md` after the 2026-08-02 modal pass.
- [ ] Flags a seeded violation of each rule family.
- [ ] Reports zero false positives on code blocks and quoted error strings.
- [ ] Completes fast enough for a pre-commit hook on a normal changeset.

## Scope

Not included until scoped: rewriting text automatically, enforcing against
prose outside the repo, and any dependency on a model at lint time. The linter
must be deterministic.

## Context

- Prior art: [Vale](https://vale.sh) with the `vale-ai-tells` rule package,
  gated via PostToolUse and pre-commit hooks. Evaluate before writing anything
  new — this may be configuration, not code.
- Lexical tell source to review: `claudisms.ai` (not yet read).
- The slop-substitution table in
  [SimpleEnglish](https://github.com/AminBlg/SimpleEnglish) (AminBlg, MIT) is a
  ready-made lexical rule set. Reusing it verbatim requires carrying the MIT
  copyright notice.
- Rules to enforce: `[BP-INSTR]` in `AGENT_BLUEPRINT.md`, especially
  `BP-INSTR-09` and `BP-INSTR-10`.

## Open Questions (draft only)

- Configure Vale, or write a small self-contained script? Vale adds a
  dependency to a repo that currently has none.
- Does this ship inside `agent-blueprint` for downstream projects to copy, or
  as a separate tool?
- Should the pre-commit hook block a commit, or warn only?
- Which files are in scope: documentation only, or code comments too?
