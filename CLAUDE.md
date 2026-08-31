# [TÄYDENNÄ: Sivuston nimi] — Next.js Static Export Site

[TÄYDENNÄ: yksi lause siitä, mikä sivusto on ja kenelle.]

Pages Router with `output: 'export'` — fully static HTML, no server-side
features, API routes, or dynamic routes.

## First run in a new clone

If this file still contains `[TÄYDENNÄ]` sections, the site has not been set up
yet. Invoke the `setup-site` skill and run its interview before doing anything
else — it asks what this site is, who it is for and what must stay factually
consistent, then fills in `src/data/`, the page copy and this file. A
`SessionStart` hook (`.claude/hooks/session-start.sh`) normally triggers it
automatically; `.claude/.setup-complete` marks the interview as done.

## Tech Stack

- **Framework**: Next.js 15 (Pages Router, static export)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`) with `site-*` design
  tokens defined in `src/styles/globals.css`. No CSS-in-JS, no component library.
- **Fonts**: next/font (Google Fonts), configured in `src/utils/fonts.ts`
- **Images**: next-image-export-optimizer + sharp (WebP at build time)
- **Forms**: EmailJS + Google reCAPTCHA v3
- **Analytics**: Google Analytics via @next/third-parties (cookie-consent gated)
- **SEO**: next-sitemap for sitemap/robots.txt generation

## Project Structure

```
src/
  pages/          # Routes (_app, _document, 404, index, subpages, legal pages)
  sections/       # Page sections (Hero, Features, Faq, CTA, PageHero)
  components/     # Reusable pieces (Nav, SEO, JsonLd, ContactForm, Wrap, …)
  data/           # Content as typed data: site.ts, nav.ts, faq.ts, features.ts,
                  # schema.ts
  hooks/          # useInView
  utils/          # analytics.ts, fonts.ts
  styles/         # globals.css (Tailwind + design tokens)
public/           # Static assets, images/, llms.txt, .htaccess
```

## Commands

```bash
npm run dev        # dev server
npm run build      # build + WebP conversion + sitemap
npm run start      # serve the built out/ folder
npm run lint       # eslint
```

## Key Configuration

- **src/data/site.ts** — brand, contact, company and legal details. Edit this
  before anything else; nav, footer, SEO, JSON-LD and the legal pages read it.
- **next.config.mjs** — static export, image optimizer, trailing slashes
- **tsconfig.json** — path alias `@/*` → `./src/*`
- **next-sitemap.config.js** — sitemap generation, excluded routes
- **src/styles/globals.css** — Tailwind v4 theme + `site-*` tokens

## Important Constraints

- **Static export only** — no `getServerSideProps`, no API routes, no dynamic
  routes, no middleware
- **No backend** — every service is external (EmailJS, GA, reCAPTCHA)
- **Cookie consent required** before Google Analytics loads. `ga_` is the only
  gate; do not add a tracking script that bypasses it.
- **`NEXT_PUBLIC_*` values are public** — they are compiled into the HTML. Never
  put a private key in `.env.local`.

## Content rules (SEO + GEO)

The site competes for AI-answer citations as much as for blue links. See also
the `finnish-web-copy` skill for the Finnish language rules.

- **Answer first, every section.** The first 2–3 sentences answer the exact
  question, before any preamble. A section opening with "tässä oppaassa
  käymme läpi…" is dead weight — cut it.
- **One question per H2.** Answer engines retrieve chunks, not whole pages. Each
  section must stand alone as a complete mini-answer under its own heading.
- **Specifics over adjectives.** Exact figure, spec, integration name, date.
  "Tehokas ratkaisu" is invisible; a named integration and a concrete output
  gets lifted into answers.
- **Comparison tables with real numbers** get quoted wholesale into AI answers.
  Prefer a table over prose whenever the content is genuinely comparative.
- **FAQ + matching JSON-LD.** Schema must match the visible text or it is
  ignored. This is enforced structurally: FAQ copy lives in `src/data/faq.ts`
  and `faqPageSchemaFrom()` in `src/data/schema.ts` builds the `FAQPage` node
  from the same array the `<Faq>` section renders. Never hand-write a FAQPage.
- **`public/llms.txt`** is a plain map of the best pages — keep it current when
  pages or positioning change.
- **Visible "Päivitetty" date.** Subpages render `CONTENT_UPDATED_FI` via
  `PageHero`; bump `CONTENT_UPDATED_FI` / `CONTENT_UPDATED_ISO` in
  `src/data/site.ts` whenever page copy changes.
- **Never invent facts.** No fabricated stats, prices, customer counts, business
  IDs, or sources. If a real figure would help and isn't available, leave a
  `[TÄYDENNÄ: …]` placeholder and flag it.

## Facts that must stay consistent

[TÄYDENNÄ: listaa tähän tuotteen/palvelun faktat, joita ei saa esittää eri
sivuilla eri tavalla — hinnoittelun rakenne, mitä palvelu ei tee, virallinen
tapa nimetä kumppanit ja integraatiot.]

## Search intent — who we are NOT for

[TÄYDENNÄ: hakusanat, jotka näyttävät osuvilta mutta tuovat väärää yleisöä.
Kirjaa ne tähän, niin niitä ei vahingossa tavoitella myöhemmin.]

## Analytics

`src/components/AnalyticsTracker.tsx` (mounted in `_app`) handles all tracking
by delegation — add `data-track-section="<name>"` to a section or
`data-track-click="<label>"` to a CTA and it is tracked. `generate_lead` fires
on successful form submit in `ContactForm.tsx`. The full event list is
documented at the top of `src/utils/analytics.ts`.
