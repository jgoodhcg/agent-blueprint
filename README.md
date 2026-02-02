# Agent Blueprint

A single-file policy for consistent agent behavior across projects.

## Usage

1. Copy `AGENT_BLUEPRINT.md` into your project root
2. Create an `AGENTS.md` that references it (template included in the blueprint)
3. Customize `AGENTS.md` with project-specific commands and rules
4. For UI projects, optionally copy `DESIGN_SYSTEM_GUIDE.md` as well

## What's Included

The blueprint covers:
- Safety rules and trust boundaries
- Autonomous workflow model (clarify → execute → return when done/stuck)
- Validation hierarchy patterns
- Roadmap structure (`roadmap/`)
- Decision artifacts (`.decisions/`)
- Session logs (`.logs/`)
- Design system reference (for UI projects)

## Files

| File | Purpose |
|------|---------|
| `AGENT_BLUEPRINT.md` | The blueprint — copy this to all projects |
| `DESIGN_SYSTEM_GUIDE.md` | UI design system guide — copy to projects with visual interfaces |
| `collect_agents.sh` | Utility to gather AGENTS.md files from multiple projects |

## Versioning

The blueprint has a `version` field in its frontmatter. When updating the blueprint in a project, check the version and review changes.
