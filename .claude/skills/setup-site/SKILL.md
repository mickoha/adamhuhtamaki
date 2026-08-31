---
name: setup-site
description: Interview the user about a new website cloned from this template, then fill in every [TÄYDENNÄ] placeholder across src/data, CLAUDE.md, the page copy and llms.txt. USE THIS SKILL when a clone of the template is still unconfigured (the SessionStart hook says so), when the user runs /setup-site, or when they say they are starting a new site, "uusi sivusto", "aloitetaan projekti", or asks to fill in the placeholders.
---

# Site setup interview

Turn a fresh clone of this template into a specific site. The output is real
content in real files — not a plan, not a summary.

## Rules

- **Ask in the user's language.** They write Finnish → interview in Finnish.
- **Never invent a fact.** No made-up Y-tunnus, address, phone, price,
  customer count, founding year or statistic. Anything the user does not know
  stays a `[TÄYDENNÄ: …]` placeholder, and you list what is still open at the end.
- **Batch the questions.** Use `AskUserQuestion` for genuine choices (4 questions
  per call, max 4 options each, with a recommended option first). Ask free-text
  facts — names, numbers, addresses — in one plain message with a numbered list,
  so the user can answer them all at once.
- **Do not stall.** Run phase 1, write what it unlocks, then continue. Never
  hold the whole build hostage to one unanswered question.
- **Finnish copy goes through the `finnish-web-copy` skill.** Invoke it before
  writing any visible page text; the SEO/GEO rules in `CLAUDE.md` apply too.

## Phase 1 — identity (blocking, plain message)

Ask these together, numbered:

1. Brand name as it appears on the site, and the registered company name.
2. Domain (canonical URL, no trailing slash).
3. In one sentence: what does the business do, and for whom?
4. Who is the primary visitor — job title / situation, not a demographic?
5. What is the one action the site exists to produce (call, form, booking, quote)?
6. Where does the business operate (city / region / whole country)?

Then write immediately: `SITE.name`, `legalName`, `url`, `description`,
`tagline` in `src/data/site.ts`, and the title + first paragraph of `CLAUDE.md`.

## Phase 2 — shape and style (AskUserQuestion, one call)

- **Page structure** — keep the template's `/palvelut/` + `/yhteystiedot/`
  (recommended); add service subpages; single long landing page.
- **Tone** — asiantunteva ja suora (recommended); lämmin ja lähestyttävä;
  tekninen ja yksityiskohtainen.
- **Colour direction** — keep the template's navy + cyan (recommended); the
  user supplies brand hex codes; pick a direction from a described mood.
- **Integrations to wire now** — EmailJS contact form / reCAPTCHA v3 /
  Google Analytics 4 / none yet (multiSelect).

Apply: `NAV_LINKS` + `FOOTER_MAIN` in `src/data/nav.ts`, the `--color-site-*`
tokens in `src/styles/globals.css` (plus `SITE.themeColor`, which must match
`--color-site-primary`), and tell the user which `.env.local` keys they now
need from `.env.example`.

## Phase 3 — positioning (plain message, feeds SEO + GEO)

1. Which 3–5 search phrases should this site win?
2. Which searches look relevant but bring the wrong audience — who are you NOT for?
3. Which facts must never be stated differently on two pages (pricing structure,
   what the service explicitly does not do, official partner/integration names)?
4. Who are the two or three competitors a customer compares you against, and
   what is the honest difference?
5. What do customers actually ask before buying? (raw questions → the FAQ)

Write: the "Facts that must stay consistent" and "Search intent — who we are
NOT for" sections of `CLAUDE.md`, then `src/data/faq.ts` (answer-first, 2–4
sentences, the JSON-LD is generated from this array — never hand-write one),
`src/data/features.ts` (benefits with concrete bullets, not feature names), the
hero/CTA copy in `src/sections/`, the page copy in `src/pages/`, and
`public/llms.txt`.

## Phase 4 — legal and contact details (plain message)

Phone (E.164 + display form), public email, privacy-contact email and name,
Y-tunnus, ALV-tunnus, street address, postal code, city, founding year, and
today's date for `LEGAL.effectiveFi` / `CONTENT_UPDATED_FI` +
`CONTENT_UPDATED_ISO`. Say up front that anything they do not have to hand can
stay a placeholder — these are exactly the facts that must not be guessed.

Write: `CONTACT`, `COMPANY`, `LEGAL` and the content-updated constants in
`src/data/site.ts`. `src/components/Privacy.tsx` and `Terms.tsx` read from
these, so check what is left over in those two files afterwards.

## Finish

1. `npm run lint` and `npm run build`, and fix what breaks.
2. `grep -rn 'TÄYDENNÄ' src public/llms.txt CLAUDE.md README.md` — report every
   remaining placeholder as a checklist of what the user still owes.
3. Replace the placeholder assets the user must supply: `public/logo.svg`,
   `logo-white.svg`, `og-cover.jpg` (1200×630).
4. Create the marker so the setup prompt stops firing:
   `touch .claude/.setup-complete`
5. Close with: what was written, what is still open, and which `.env.local`
   keys are needed before deploy.
