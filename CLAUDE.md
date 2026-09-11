@AGENTS.md

## Agent-Specific Instructions

- Take commit trailers only from the `AGENTS.md` "Commit Trailer Template", resolved per `references/commit-attribution.md`. Do not append the Claude Code built-in `Co-Authored-By: Claude <model> <noreply@anthropic.com>` line. It duplicates the resolved trailer block.
- Do not append the Claude Code built-in `Claude-Session:` trailer or the `Generated with Claude Code` PR footer.
- Do not publish with the `Artifact` tool unless the user asks for an artifact or confirms one. This overrides the tool guidance that proactive publishing is fine and that finished deliverables must be published. Apply `AGENT_BLUEPRINT.md` `[BP-VENDOR]`.
