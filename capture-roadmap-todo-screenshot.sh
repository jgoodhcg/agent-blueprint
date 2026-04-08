#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "usage: $0 <output-path>" >&2
  exit 1
fi

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
output_path="$1"
runtime_dir="${RUNNER_TEMP:-/tmp}"
server_log="${runtime_dir}/roadmap-todo-vite.log"

mkdir -p "$(dirname "${output_path}")"

cleanup() {
  if [[ -n "${server_pid:-}" ]]; then
    kill "${server_pid}" >/dev/null 2>&1 || true
    wait "${server_pid}" >/dev/null 2>&1 || true
  fi
}

trap cleanup EXIT

cd "${repo_root}/pilots/roadmap-todo"

bunx playwright install --with-deps chromium
bunx vite --host 127.0.0.1 --port 4173 >"${server_log}" 2>&1 &
server_pid=$!

for _ in $(seq 1 60); do
  if curl -fsS http://127.0.0.1:4173 >/dev/null; then
    break
  fi
  sleep 1
done

if ! curl -fsS http://127.0.0.1:4173 >/dev/null; then
  echo "roadmap-todo dev server did not become ready; see ${server_log}" >&2
  exit 1
fi

bunx playwright screenshot \
  --browser chromium \
  --device "Desktop Chrome" \
  --full-page \
  --wait-for-selector ".panel" \
  --wait-for-timeout 1000 \
  http://127.0.0.1:4173 \
  "${output_path}"
