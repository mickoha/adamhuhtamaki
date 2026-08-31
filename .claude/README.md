Project-level Claude Code config.

- `settings.json` — registers the `SessionStart` hook below.
- `hooks/session-start.sh` — on every session start, checks for
  `.claude/.setup-complete`. Missing → tells Claude to run the `setup-site`
  interview before anything else. Present → stays silent, unless `[TÄYDENNÄ]`
  placeholders are still left, in which case it lists them once.
- `skills/setup-site/SKILL.md` — the interview itself: identity, page structure
  and style, SEO/GEO positioning, then legal and contact details. Also runnable
  by hand as `/setup-site`.
- `.setup-complete` — marker file created at the end of the interview. Delete it
  to run the interview again.

`CLAUDE.md` in the repo root is the instruction file Claude reads automatically;
the interview fills in its `[TÄYDENNÄ]` sections.
