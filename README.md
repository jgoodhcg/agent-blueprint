# Agent Blueprint

An immutable single-file reference for consistent agent behavior across projects.

## Usage

1. Copy `AGENT_BLUEPRINT.md` into your project root
2. Create an `AGENTS.md` that references it (template included in the blueprint)
3. Create `roadmap/index.md` and use roadmap work units as execution prompts
4. Customize `AGENTS.md` with project-specific commands and rules
5. For UI projects, optionally copy `DESIGN_SYSTEM_GUIDE.md` as well

## What's Included

The blueprint covers:
- Minimal safety boundary for high-risk actions
- Autonomous workflow model (brain dump -> draft -> ready -> execute -> validate)
- Validation hierarchy patterns
- Roadmap-first execution structure (`roadmap/`)
- Alignment contract for "align this project with the blueprint"
- Optional decision artifacts (`.decisions/`)
- Design system reference (for UI projects)

## Files

| File | Purpose |
|------|---------|
| `AGENT_BLUEPRINT.md` | The blueprint — copy this to all projects |
| `DESIGN_SYSTEM_GUIDE.md` | UI design system guide — copy to projects with visual interfaces |
| `collect-project-docs.sh` | Utility to gather AGENTS.md files from multiple projects |

## Versioning

The blueprint has a `version` field in its frontmatter. When updating the blueprint in a project, check the version and review changes.
