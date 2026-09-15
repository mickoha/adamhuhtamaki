# Asianajotoimisto Adam Huhtamäki — Next.js Static Export Site

Rikosoikeuteen erikoistuneen asianajotoimiston sivusto: se tavoittaa rikoksesta
epäillyt, asianomistajat ja heidän läheisensä siinä hetkessä, kun poliisi on jo
ottanut yhteyttä, ja ohjaa heidät ottamaan yhteyttä asianajajaan. Toimialue on
pääkaupunkiseutu ja koko Suomi.

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

- **src/data/taydenna.ts** — THE one file to fill in. Every value the client
  still owes lives here; an empty field renders a visible `[TÄYDENNÄ: …]`
  marker on the page. Never scatter placeholders back into components.
- **src/data/site.ts** — brand, contact, company and legal details. Reads the
  unknowns from `taydenna.ts`; nav, footer, SEO, JSON-LD and the legal pages
  read this.
- **next.config.mjs** — static export, image optimizer, trailing slashes
- **tsconfig.json** — path alias `@/*` → `./src/*`
- **next-sitemap.config.js** — sitemap generation, excluded routes
- **src/styles/globals.css** — Tailwind v4 theme + `site-*` tokens
- **.htaccess** (repo root, NOT public/) — Apache redirects, copied into `out/`
  by `scripts/copy-htaccess.mjs` in postbuild. The canonical-host line is the
  one thing to change at launch (`test.adamhuhtamaki.fi` → `adamhuhtamaki.fi`);
  the `X-Robots-Tag: noindex` block is guarded by hostname and disables itself.

## Important Constraints

- **Static export only** — no `getServerSideProps`, no API routes, no dynamic
  routes, no middleware
- **No backend** — every service is external (EmailJS, GA, reCAPTCHA)
- **Cookie consent required** before Google Analytics loads. The `ah_ga`
  cookie is the only gate; do not add a tracking script that bypasses it.
  Cookie names are prefixed per site in `src/data/cookies.ts` so two sites
  sharing a host — every one of them, in localhost development — cannot read
  each other's consent.
- **The consent banner is switched on** — `FEATURES.cookieBanner` in
  `src/data/site.ts`. Setting it to `false` hides the banner *and* the footer's
  "Evästeasetukset" link, and since the banner is what sets `ah_ga`, analytics
  stops loading with it. It must be `true` in production.
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

Every one of these appears on more than one page (or will, once the service
pages land). State them the same way everywhere — the front-page copy in
`src/data/services.ts` is the reference wording.

- **Päivystys is 24/7 and the attorney answers it himself.** Never "toimisto
  vastaa" or "soitamme takaisin arkisin". If he cannot answer, he calls back
  when he is out of the courtroom.
- **Three ways the fee gets paid**, always in this order and never renamed:
  *oikeusapu* (valtion varoista, tuloihin sidottu) → *puolustaja* (tuomioistuin
  määrää, tuloista riippumatta) → *oikeusturva* (koti- tai yritysvakuutus).
  The site never promises that any of them applies to a given case; it promises
  that this is checked before invoicing.
- **First assessment on the phone costs 0 €.** Do not soften it to "usein
  maksuton" or attach conditions.
- **Hourly rates**: 270 €/h for private clients, 300 €/h for companies. Both
  are stated VAT-EXCLUSIVE with the gross figure alongside (338,85 €/h and
  376,50 €/h at VAT 25,5 %) — a private client has to see the price they
  actually pay, and that gross note is now the only place VAT appears on the
  page. Never quote one without the other, and never write the net figure as if
  it were the final price. There is no out-of-hours surcharge listed: the
  päivystys rate is the same rate, and the page says nothing about travel or
  authority fees.
- **Practice areas**: rikosoikeus and pakkokeinot are the main areas;
  vahingonkorvaus and riidanratkaisu are secondary ("Lisäksi" / "Muut
  palvelut"), never presented as equals to the first two.
- **He acts for both sides** — epäilty *and* asianomistaja. Never write the site
  as defence-only.
- **Bar association** is always "Suomen Asianajajaliitto". *Asianajaja* is a
  protected title; never call him *lakimies* or *juristi*, and never use
  *asianajaja* of anyone whose membership is not established.
- **Never promise an outcome.** No "saamme syytteen hylätyksi" -style claims, no
  win rates, no case counts beyond the approved "useita satoja
  oikeudenkäyntejä".
- **Voice is first-person SINGULAR everywhere** — "Avustan", "Hoidan",
  "Käsittelen", "Vastaan" — including the legal and cookie pages. The firm is
  one named attorney who answers his own phone; a plural "me" quietly turns it
  into an anonymous office and contradicts the selling point. Never write
  "hoidamme", "avustamme", "erikoisalueemme".
- **The form is not for sensitive detail.** Every page that carries the form
  carries the note telling visitors to say those things on the phone instead.

## Search intent — who we are NOT for

These queries look adjacent but bring the wrong visitor. Do not target them,
and do not write copy that drifts toward them:

- **Muu oikeudenala** — perheoikeus, avioero, perintö- ja jäämistöasiat,
  työoikeus, asunto- ja kiinteistöriidat, yritysjuridiikka ja sopimukset,
  velkajärjestely, ulkomaalais- ja turvapaikka-asiat.
- **"Ilmainen lakiapu" / "ilmainen juristi puhelin"** — the free thing here is
  the first phone assessment, not the representation. Do not compete for
  visitors looking for a free service.
- **Viranomaisten omat ohjeet** — "miten teen rikosilmoituksen", "poliisin
  kuulustelu kesto", "rikosuhripäivystys". These belong to the police and to
  RIKU; a page chasing them collects readers, not clients.
- **Oikeusaputoimisto ja julkinen oikeusapu yleisesti** — the state legal aid
  office is a different organisation, and confusing the two is worse than
  missing the query.
- **Opiskelu- ja tutkintohaku** — "mikä on pakkokeino", "rikosoikeuden
  perusteet", lakiopiskelijoiden hakusanat.

## Analytics

`src/components/AnalyticsTracker.tsx` (mounted in `_app`) handles all tracking
by delegation — add `data-track-section="<name>"` to a section or
`data-track-click="<label>"` to a CTA and it is tracked. `generate_lead` fires
on successful form submit in `ContactForm.tsx` **and** on the first `tel:`
click of a page view — the phone is this site's conversion, and the front page
alone carries eight call links, hence the per-page-view dedupe. The full event
list is documented at the top of `src/utils/analytics.ts`.

Every event carries `content_group` (Etusivu / Palvelusivu / Yhteystiedot /
Lakisaateinen), and gtag is given the same value on each route change so GA4's
automatic `page_view` carries it too. The mapping is `contentGroupFor()` in
`src/utils/analytics.ts`; a new route that is not added there lands in `'Muu'`.

## Evästesuostumus

Two layers, from `.claude/design/evasteet/`:

- `src/components/CookieConsent.tsx` — the banner. Two actions, `Katso
  asetukset` and `OK`. It sits **above** the floating "Soita 24/7" pill
  (`bottom: 118px` = the pill's 26px offset + its ~62px height + a 30px gap);
  the pill is the site's primary conversion and never gets displaced. If the
  pill's height changes, that offset changes with it.
- `src/components/CookieSettings.tsx` — the dialog. This is the layer that
  makes the choice real, so: the analytics switch defaults to **off**, `Vain
  välttämättömät` and `Hyväksy kaikki` are the same variant at the same size
  (the accent outline goes to the neutral `Tallenna valinnat`), closing without
  choosing saves nothing, and there is no cookie wall.

- **`src/data/cookies.ts`** is the single source: the per-site cookie prefix and
  the visitor-facing inventory. The dialog and `/evastekaytannot` render from
  the same array, so they cannot describe a cookie differently. Never add a
  category the site does not actually set — there is deliberately no
  "Markkinointi" row, because the site runs no ads and no pixels.
- **`src/utils/consent.ts`** owns every write. `saveConsent()` sets both
  cookies, deletes every `_ga*` cookie when analytics is refused, fires
  `cookie_consent` and emits the event that mounts/unmounts GA in `_app`.
- The footer's "Evästeasetukset" button calls `openCookieSettings()` — once
  answered the banner never returns, so this is the only way back.
