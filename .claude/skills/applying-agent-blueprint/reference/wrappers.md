# Agent-specific wrapper templates

Optional. Thin pointers for agent-specific entrypoints (`CLAUDE.md`, `GEMINI.md`, etc.). Keep them minimal — all shared policy lives in `AGENTS.md` (`[BP-AGENT-WRAPPER]`). Create one per agent the project actually uses.

A wrapper must make the harness **load** `AGENTS.md`, not merely mention it. The
harness reads only its own wrapper file; prose like "See `AGENTS.md`" is a request
the agent may never act on. Use the harness's import mechanism where one exists.

## CLAUDE.md

Claude Code expands `@path` imports at session start:

```markdown
@AGENTS.md

## Agent-Specific Instructions

- [Only instructions unique to this agent — tool preferences, model-specific behavior, constraints.]
- [Override of a conflicting built-in harness instruction, if any.]
```

The `@AGENTS.md` line must be unquoted and outside any code fence — Claude Code
skips import parsing inside code spans and fenced blocks, so `` `@AGENTS.md` ``
loads nothing and fails silently. Do not add a `# Claude` heading above it.

If Claude Code has nothing unique to add, the file is the single line `@AGENTS.md`.

## GEMINI.md and other harnesses

Use the harness's own import mechanism if it documents one, and verify it loads
before relying on it. Where none exists, keep the prose pointer:

```markdown
# [Agent Name]

See `AGENTS.md` for project policies and operating rules.

## Agent-Specific Instructions

- [Only instructions unique to this agent.]
```

A wrapper can override a built-in instruction in its host agent harness. Use this only when the built-in instruction conflicts with `AGENTS.md`. Name the conflicting instruction and state the required behavior. A pointer to `AGENTS.md` does not by itself displace a harness default.

Verify after writing: in Claude Code, `/context` must list `CLAUDE.md` under **Memory files**. Do not duplicate rules from `AGENTS.md` or `AGENT_BLUEPRINT.md` here (`BP-INSTR-05`).
