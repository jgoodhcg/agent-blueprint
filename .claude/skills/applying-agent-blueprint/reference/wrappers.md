# Agent-specific wrapper templates

Optional. Thin pointers for agent-specific entrypoints (`CLAUDE.md`, `GEMINI.md`, etc.). Keep them minimal — all shared policy lives in `AGENTS.md` (`[BP-AGENT-WRAPPER]`). Create one per agent the project actually uses.

## CLAUDE.md / GEMINI.md

```markdown
# [Agent Name]

See `AGENTS.md` for project policies and operating rules.

## Agent-Specific Instructions

- [Only instructions unique to this agent — tool preferences, model-specific behavior, constraints.]
- [Override of a conflicting built-in harness instruction, if any.]
```

A wrapper can override a built-in instruction in its host agent harness. Use this only when the built-in instruction conflicts with `AGENTS.md`. Name the conflicting instruction and state the required behavior. A pointer to `AGENTS.md` does not by itself displace a harness default.

If an agent has nothing unique to add, the file is just the first two lines pointing at `AGENTS.md`. Do not duplicate rules from `AGENTS.md` or `AGENT_BLUEPRINT.md` here (`BP-INSTR-05`).
