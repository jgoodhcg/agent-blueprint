---
name: herdr-handoff
description: Hand off work to a new agent in Herdr. Modes are a tangent in a new worktree workspace, a context-clearing continuation in a new tab, or a side task in a split pane. Use when the user says handoff, hand off, or spin off, or asks for another Herdr agent to take a tangent, next step, plan, or side question.
---

# Herdr Handoff

Hand off one unit of work to a new agent in Herdr.
Agree on the plan in one short exchange, then run every step without more questions.

## Preconditions

- If `HERDR_ENV` is not `1`, tell the user that the session is not in Herdr and stop.
- Run `herdr pane current --current`.
  Record `workspace_id`, `tab_id`, `pane_id`, and `cwd` from `.result.pane`.
- If installed syntax or response fields differ from this skill, read `herdr --skill` and the relevant `--help` output.

## Modes

| Mode | Use when | Location | Focus after handoff |
|------|----------|----------|---------------------|
| `tangent` | The work branches away from the current task | New Git worktree in a new Herdr workspace | Stays on the caller |
| `continue` | The current task continues with a clear context | New tab in the caller's workspace | Moves to the new tab; the caller pane closes |
| `side` | A small task or question supports the current work | New pane split from the caller pane | Stays on the caller |

Infer the mode from the user's words and the session.
Ask only if two modes fit equally well.

## Step 1: Propose

Show one compact proposal:

```text
Mode: <mode> -> <location detail>
Agent: <kind>, <model ID>
Name: <agent name>
Brief: <one line per brief section>
```

- Use the current harness and the exact current model ID unless the user names others.
- Make the agent name match `[a-z][a-z0-9_-]{0,31}`, for example `tangent-trailer-parser`.
- For `tangent`, show the branch name, base ref, and worktree path.
  If the working tree has uncommitted changes, state that they will not move to the worktree.
- For `continue`, run `git status --porcelain`.
  If the output is not empty, show the changes and offer to commit them or stop.
  Commit only with user approval and the project's commit rules.
- Discuss changes with the user.
  When the user approves, run Steps 2 through 5 without further questions.

## Step 2: Write the Brief

Write the brief to `/tmp/herdr-handoff/<YYYYMMDD-HHMMSS>-<slug>.md`.
The new agent has none of this session's context; make the brief self-contained.

```markdown
# Handoff: <title>

Mode: <mode>
From: <caller agent kind and model ID>, pane <caller pane ID>

## Goal
## Scope
## Decisions Made
## Relevant Files
## Validation
## Done When
```

- Point to a roadmap work unit or plan file instead of copying it.
- Do not put secrets or credentials in the brief.

## Step 3: Create the Location

`tangent`:

```sh
herdr worktree create --cwd "<repo root>" --branch "<branch>" --base "<base ref>" \
  --path "<repo parent>/<repo name>.worktrees/<branch>" --label "<emoji> <task words>" --no-focus
```

- Use the GitKraken worktree convention: `<repo parent>/<repo name>.worktrees/<branch>`.
- Use a branch name without `/` so that the folder name equals the branch name.
- Read the new pane ID from `.result.root_pane.pane_id`.

`continue`:

```sh
herdr tab create --workspace "<caller workspace ID>" --cwd "<caller cwd>" --label "<emoji> <task words>" --no-focus
```

- Read the new tab ID from `.result.tab.tab_id` and the new pane ID from `.result.root_pane.pane_id`.

`side`:

```sh
herdr pane layout --pane "<caller pane ID>"
herdr pane split --current --direction <right|down> --cwd "<caller cwd>" --no-focus
```

- Split a wide pane to the right and a narrow or tall pane down.
- Read the new pane ID from `.result.pane.pane_id`.

## Step 4: Start and Prompt the Agent

```sh
herdr agent start "<agent name>" --kind <kind> --pane "<new pane ID>" -- <model args>
herdr agent prompt "<agent name>" "$(cat <brief path>)" --wait --until working --until blocked --timeout 30000
```

| Kind | Model args |
|------|------------|
| `claude` | `--model <model ID>` |
| `codex` | `-m <model ID>` |
| `gemini` | `-m <model ID>` |
| `opencode` | `--model <provider>/<model ID>` |
| Other | Read `<cli> --help` |

- Omit model args when the user keeps the harness default.
- Pass the brief text inline, so the new agent needs no permission to read `/tmp`.
- Success is the `working` state.
  If the state is `blocked`, tell the user that the new agent waits for input.
- Do not wait for the new agent to finish its task.

## Step 5: Finish

- `tangent` and `side`: report the agent name, location, and brief path.
  Keep focus on the caller pane.
- `continue`: if the new agent is not `working`, report the state and keep the caller pane open.
  Otherwise, report the agent name and brief path, then run these two commands last:

```sh
herdr tab focus "<new tab ID>"
herdr pane close "<caller pane ID>"
```

Closing the caller pane ends this session.
Run no command after it.

## Failure Rules

- If a command fails, stop and report the command, the error, and the IDs created so far.
- Close only panes, tabs, and workspaces that this handoff created, plus the caller pane in `continue` mode.
- Never derive IDs from examples, list order, or focus; parse them from JSON responses.
