#!/usr/bin/env bash
# Structural alignment check for a project that adopts AGENT_BLUEPRINT.md.
# Verifies the machine-checkable core invariants. Prints PASS/FAIL per rule
# with evidence, and exits non-zero if any check fails so it can gate a loop.
#
# Usage: scripts/check.sh [repo_root]   (default: current directory)
# Checks structure only, not template wording (see SKILL.md "template sync").

set -uo pipefail

ROOT="${1:-.}"
fail=0

pass() { printf 'PASS  %-12s %s\n' "$1" "$2"; }
flunk() { printf 'FAIL  %-12s %s\n' "$1" "$2"; fail=1; }

# BP-CORE-01: AGENTS.md exists and references the blueprint.
if [ ! -f "$ROOT/AGENTS.md" ]; then
  flunk "BP-CORE-01" "AGENTS.md is missing"
elif grep -q "AGENT_BLUEPRINT.md" "$ROOT/AGENTS.md"; then
  pass "BP-CORE-01" "AGENTS.md references AGENT_BLUEPRINT.md"
else
  flunk "BP-CORE-01" "AGENTS.md does not reference AGENT_BLUEPRINT.md"
fi

# BP-CORE-02: roadmap/index.md exists.
if [ -f "$ROOT/roadmap/index.md" ]; then
  pass "BP-CORE-02" "roadmap/index.md present"
else
  flunk "BP-CORE-02" "roadmap/index.md is missing"
fi

# BP-CORE-03: every numbered work unit opens with YAML frontmatter.
units=0
bad=""
if [ -d "$ROOT/roadmap" ]; then
  while IFS= read -r f; do
    units=$((units + 1))
    [ "$(head -n 1 "$f")" = "---" ] || bad="$bad ${f#"$ROOT"/}"
  done < <(find "$ROOT/roadmap" -maxdepth 1 -type f -name '[0-9]*-*.md' 2>/dev/null)
fi
if [ "$units" -eq 0 ]; then
  pass "BP-CORE-03" "no numbered work units to check"
elif [ -z "$bad" ]; then
  pass "BP-CORE-03" "$units work unit(s) start with YAML frontmatter"
else
  flunk "BP-CORE-03" "missing frontmatter:$bad"
fi

# BP-CORE-09: trailer template present, no hardcoded runtime model value.
if [ -f "$ROOT/AGENTS.md" ] && grep -q "Co-authored-by:" "$ROOT/AGENTS.md"; then
  if grep -qE '^AI-Model:[[:space:]]*\[' "$ROOT/AGENTS.md" || ! grep -qE '^AI-Model:' "$ROOT/AGENTS.md"; then
    pass "BP-CORE-09" "trailer template present, AI-Model left as placeholder"
  else
    flunk "BP-CORE-09" "AI-Model looks hardcoded; store a placeholder, not a runtime value"
  fi
else
  flunk "BP-CORE-09" "no commit trailer template found in AGENTS.md"
fi

# BP-ADOPT-02: the references/ companion directory landed with the blueprint.
missing=""
for r in commit-attribution.md user-profile.md work-unit-example.md sources.md; do
  [ -f "$ROOT/references/$r" ] || missing="$missing $r"
done
if [ -z "$missing" ]; then
  pass "BP-ADOPT-02" "references/ has all 4 companion files"
else
  flunk "BP-ADOPT-02" "references/ is missing:$missing"
fi

# BP-CORE-14: AGENTS.md surfaces session-start triggers as executable lines
# (identifier + exact command). Only the mandatory trigger (BP-WF-HERDR) is
# machine-checkable; optional adopted triggers are checked during alignment.
if [ -f "$ROOT/AGENTS.md" ] && grep -q "BP-WF-HERDR" "$ROOT/AGENTS.md" && grep -q "herdr tab rename" "$ROOT/AGENTS.md"; then
  pass "BP-CORE-14" "AGENTS.md carries the Herdr trigger (identifier + command)"
else
  flunk "BP-CORE-14" "AGENTS.md must surface BP-WF-HERDR with the exact rename command inline"
fi

# BP-WF-HERDR-02: the tab label must be derived from the task, not hardcoded.
# A fixed project label cannot "name the primary task", so the trigger line
# must carry the <label> placeholder rather than a literal string.
if [ -f "$ROOT/AGENTS.md" ] && grep -q "herdr tab rename" "$ROOT/AGENTS.md"; then
  if grep -q 'herdr tab rename .*"<label>"' "$ROOT/AGENTS.md"; then
    pass "BP-WF-HERDR" "tab label uses the <label> placeholder"
  else
    flunk "BP-WF-HERDR" "tab label is hardcoded; use \"<label>\" derived from the task"
  fi
fi

# BP-CORE-15: AGENTS.md surfaces the public-repository safety trigger.
if [ -f "$ROOT/AGENTS.md" ] && grep -q "BP-PUBLIC" "$ROOT/AGENTS.md" && grep -q "Before staging or committing" "$ROOT/AGENTS.md"; then
  pass "BP-CORE-15" "AGENTS.md surfaces the pre-stage public-repository safety check"
else
  flunk "BP-CORE-15" "AGENTS.md does not surface BP-PUBLIC before staging or committing"
fi

# BP-SYNC: the project's AGENT_BLUEPRINT.md is a verbatim copy of canonical.
# Enforces the blueprint header rule "Do not edit a project's copy; propose
# changes in the agent-blueprint repo and re-sync". BP-VERSION compares a
# project against its own copy, so it cannot see drift from canonical.
# Canonical source: $AGENT_BLUEPRINT_CANONICAL, else a discovered
# agent-blueprint/ ancestor. Skipped (not failed) when unavailable.
canon="${AGENT_BLUEPRINT_CANONICAL:-}"
if [ -z "$canon" ]; then
  probe=$(cd "$ROOT" 2>/dev/null && pwd)
  while [ -n "$probe" ] && [ "$probe" != "/" ]; do
    if [ -f "$probe/agent-blueprint/AGENT_BLUEPRINT.md" ]; then
      canon="$probe/agent-blueprint/AGENT_BLUEPRINT.md"; break
    fi
    probe=$(dirname "$probe")
  done
fi
if [ ! -f "$ROOT/AGENT_BLUEPRINT.md" ]; then
  flunk "BP-SYNC" "AGENT_BLUEPRINT.md is missing"
elif [ -z "$canon" ] || [ ! -f "$canon" ]; then
  printf 'SKIP  %-12s %s\n' "BP-SYNC" "canonical blueprint not found; set AGENT_BLUEPRINT_CANONICAL to check drift"
elif cmp -s "$canon" "$ROOT/AGENT_BLUEPRINT.md"; then
  pass "BP-SYNC" "AGENT_BLUEPRINT.md matches canonical verbatim"
else
  flunk "BP-SYNC" "AGENT_BLUEPRINT.md differs from canonical ($canon); re-sync, do not edit the copy"
fi

# BP-VERSION: AGENTS.md carries the same version string as the blueprint.
bp_ver=$(sed -n 's/^version:[[:space:]]*"\{0,1\}\([^"]*\)"\{0,1\}$/\1/p' "$ROOT/AGENT_BLUEPRINT.md" 2>/dev/null | head -n 1)
if [ -z "$bp_ver" ]; then
  flunk "BP-VERSION" "no version in AGENT_BLUEPRINT.md frontmatter"
elif [ -f "$ROOT/AGENTS.md" ] && grep -qF "$bp_ver" "$ROOT/AGENTS.md"; then
  pass "BP-VERSION" "AGENTS.md matches blueprint version $bp_ver"
else
  flunk "BP-VERSION" "AGENTS.md does not carry blueprint version $bp_ver"
fi

# BP-WRITE-04: the project declares its persuasive-text exemptions, or "none".
if [ -f "$ROOT/AGENTS.md" ] && grep -q "BP-WRITE-04" "$ROOT/AGENTS.md"; then
  pass "BP-WRITE-04" "AGENTS.md declares its exemptions"
else
  flunk "BP-WRITE-04" "AGENTS.md does not declare BP-WRITE-04 exemptions (state 'none' if there are none)"
fi

# BP-INSTR-10: hedged modals in project policy. Advisory, not a gate.
# Deliberately does not set fail: a noisy gate gets disabled, which is the
# failure mode BP-VERIFY cites ([21]). Promote to flunk once a project is clean.
if [ -f "$ROOT/AGENTS.md" ]; then
  hedges=$(grep -nEc '\b(should|may|might|could)\b' "$ROOT/AGENTS.md" || true)
  if [ "${hedges:-0}" -eq 0 ]; then
    pass "BP-INSTR-10" "AGENTS.md has no hedged modals"
  else
    printf 'WARN  %-12s %s\n' "BP-INSTR-10" "$hedges line(s) in AGENTS.md use should/may/might/could:"
    grep -nE '\b(should|may|might|could)\b' "$ROOT/AGENTS.md" | sed 's/^/               /'
  fi
fi

echo
if [ "$fail" -eq 0 ]; then
  echo "All structural checks passed."
else
  echo "One or more checks failed."
fi
exit "$fail"
