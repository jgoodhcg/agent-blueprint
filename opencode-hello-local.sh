#!/usr/bin/env bash

set -euo pipefail

MODEL="zai-plan/glm-5"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SHOW_CONFIG="${OPENCODE_SHOW_CONFIG:-0}"

if ! command -v opencode >/dev/null 2>&1; then
  echo "error: opencode is not installed or not on PATH" >&2
  exit 1
fi

if [[ -z "${ZAI_CODING_PLAN_API_KEY:-}" ]]; then
  echo "error: ZAI_CODING_PLAN_API_KEY is not set" >&2
  exit 1
fi

tmp_root="$(mktemp -d)"
cleanup() {
  rm -rf "${tmp_root}"
}
trap cleanup EXIT

export XDG_DATA_HOME="${tmp_root}/data"
export XDG_STATE_HOME="${tmp_root}/state"
export XDG_CACHE_HOME="${tmp_root}/cache"
mkdir -p "${XDG_DATA_HOME}" "${XDG_STATE_HOME}" "${XDG_CACHE_HOME}"

prompt="$(cat <<'EOF'
Reply with exactly one sentence:
Hello from OpenCode running with zai-plan/glm-5 on the Z.AI Coding Plan endpoint.

Constraints:
- Do not call any tools.
- Do not inspect environment variables.
- Do not read files.
- Do not ask follow-up questions.
- Output only that one sentence and nothing else.
EOF
)"

if [[ "${SHOW_CONFIG}" == "1" ]]; then
  echo "== Resolved config =="
  opencode debug config
  echo
fi

echo "== Running hello smoke test =="
cd "${REPO_ROOT}"
opencode run --model "${MODEL}" "${prompt}"
