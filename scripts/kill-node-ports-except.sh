#!/usr/bin/env bash
# Kill processes listening on common dev ports, except KEEP (default 4011).
# Requires: lsof (macOS/Linux) or fuser (Linux).
set -euo pipefail
KEEP="${1:-4011}"
PORTS=(3000 3001 3002 3003 4000 4010 4012 5000 5173 8080)

kill_port() {
  local p="$1"
  if [[ "$p" == "$KEEP" ]]; then
    return 0
  fi
  if command -v lsof >/dev/null 2>&1; then
    local pids
    pids="$(lsof -tiTCP:"$p" -sTCP:LISTEN 2>/dev/null || true)"
    if [[ -n "${pids:-}" ]]; then
      echo "Killing port $p (PIDs: $pids)"
      kill $pids 2>/dev/null || true
    fi
  elif command -v fuser >/dev/null 2>&1; then
    fuser -k "${p}/tcp" 2>/dev/null && echo "Killed listeners on $p" || true
  else
    echo "Install lsof or fuser to kill by port." >&2
    exit 1
  fi
}

for p in "${PORTS[@]}"; do
  kill_port "$p"
done
echo "Done. Port $KEEP left alone."
