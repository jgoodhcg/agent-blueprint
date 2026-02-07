#!/usr/bin/env bash
set -euo pipefail

# Collects AGENTS.md and roadmap/index.md files from projects
# for alignment checking against AGENT_BLUEPRINT.md

output_file="agents-file-reference.md"
include_roadmaps=0
roadmap_output_file=""
targets=()

while [ "$#" -gt 0 ]; do
  case "$1" in
    -o|--output)
      output_file="${2:-}"
      shift 2
      ;;
    -r|--include-roadmaps)
      include_roadmaps=1
      shift
      ;;
    --roadmap-output)
      roadmap_output_file="${2:-}"
      shift 2
      ;;
    -h|--help)
      cat <<'EOF'
Usage: collect-project-docs.sh [options] [dir...]

Collects AGENTS.md and roadmap files from projects for alignment checking
against AGENT_BLUEPRINT.md.

Options:
  -o, --output FILE         Output file for AGENTS.md collection (default: agents-file-reference.md)
  -r, --include-roadmaps    Also collect roadmap/index.md files
  --roadmap-output FILE     Output file for roadmaps (default: roadmap-file-reference.md)
  -h, --help                Show this help

If no dirs are provided, defaults to:
  ~/projects ~/projects/games
EOF
      exit 0
      ;;
    *)
      targets+=("$1")
      shift
      ;;
  esac
done

if [ "${#targets[@]}" -eq 0 ]; then
  targets=("$HOME/projects" "$HOME/projects/games")
fi

# Write header for agents file
cat > "${output_file}" <<'EOF'
<!-- GENERATED FILE - DO NOT EDIT -->
<!-- Run collect-project-docs.sh to regenerate -->
<!-- Purpose: Reference for checking project alignment to AGENT_BLUEPRINT.md -->

EOF

if [ "${include_roadmaps}" -eq 1 ]; then
  if [ -z "${roadmap_output_file}" ]; then
    roadmap_output_file="roadmap-file-reference.md"
  fi
  # Write header for roadmap file
  cat > "${roadmap_output_file}" <<'EOF'
<!-- GENERATED FILE - DO NOT EDIT -->
<!-- Run collect-project-docs.sh -r to regenerate -->
<!-- Purpose: Reference for checking roadmap alignment to AGENT_BLUEPRINT.md -->

EOF
fi

for base in "${targets[@]}"; do
  if [ ! -d "${base}" ]; then
    echo "===== PROJECT DIR MISSING: ${base} =====" >> "${output_file}"
    echo >> "${output_file}"
    if [ "${include_roadmaps}" -eq 1 ]; then
      echo "===== PROJECT DIR MISSING: ${base} =====" >> "${roadmap_output_file}"
      echo >> "${roadmap_output_file}"
    fi
    continue
  fi

  echo "===== PROJECT DIR: ${base} =====" >> "${output_file}"
  echo >> "${output_file}"
  if [ "${include_roadmaps}" -eq 1 ]; then
    echo "===== PROJECT DIR: ${base} =====" >> "${roadmap_output_file}"
    echo >> "${roadmap_output_file}"
  fi

  for d in "${base}"/*/; do
    if [ -f "${d}AGENTS.md" ]; then
      echo "===== ${d}AGENTS.md =====" >> "${output_file}"
      cat "${d}AGENTS.md" >> "${output_file}"
      echo >> "${output_file}"
    fi

    if [ "${include_roadmaps}" -eq 1 ] && [ -f "${d}roadmap/index.md" ]; then
      echo "===== ${d}roadmap/index.md =====" >> "${roadmap_output_file}"
      cat "${d}roadmap/index.md" >> "${roadmap_output_file}"
      echo >> "${roadmap_output_file}"
    fi
  done
done
