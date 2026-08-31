#!/usr/bin/env bash
# SessionStart hook: nudge Claude to interview the user when this clone of the
# template has not been set up yet. Prints nothing once setup is done and no
# [TÄYDENNÄ] placeholders remain, so a configured site starts silently.
set -uo pipefail

DIR="${CLAUDE_PROJECT_DIR:-$PWD}"
MARKER="$DIR/.claude/.setup-complete"

remaining() {
  grep -rl 'TÄYDENNÄ' \
    "$DIR/src" "$DIR/CLAUDE.md" "$DIR/public/llms.txt" "$DIR/README.md" \
    2>/dev/null | sed "s|^$DIR/||"
}

if [ ! -f "$MARKER" ]; then
  cat <<'TXT'
NEW SITE FROM TEMPLATE — NOT YET CONFIGURED.

This repository is a fresh clone of the Next.js site template and still holds
its placeholder content. Before doing any other work in this session, invoke
the `setup-site` skill (Skill tool, skill: "setup-site") and run the interview
it describes. Do this even if the user's first message asks for something else:
run the interview first, briefly explain why, then do what they asked.

If the user explicitly declines the interview, skip it and note that they can
run /setup-site later.
TXT
  exit 0
fi

FILES="$(remaining)"
if [ -n "$FILES" ]; then
  echo "Site setup is done, but [TÄYDENNÄ] placeholders remain in:"
  echo "$FILES" | sed 's/^/  - /'
  echo "Mention this once if it is relevant to what the user asks for; do not"
  echo "start filling them in unprompted, and never invent the missing facts."
fi
exit 0
