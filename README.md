# Static marketing site template

Next.js Pages Router with `output: 'export'` — the build produces plain HTML in
`out/`, deployable to any static host. No server, no database, no API routes.
Everything dynamic runs in the browser or in an external service.

**What comes with it**

- **Static export** (Next 15, TypeScript strict, Tailwind CSS v4 design tokens)
- **Image optimization** without a server — `next-image-export-optimizer` + sharp
  pre-convert `public/images` to WebP at build time
- **Cookie consent** that actually gates Google Analytics: no Google script is
  requested before the visitor accepts, and the /evastekaytannot page lets them
  withdraw consent (which deletes the `_ga*` cookies)
- **Contact form** via EmailJS + invisible reCAPTCHA v3, with lead tracking
- **Analytics by delegation** — add `data-track-section` / `data-track-click`
  attributes; no per-component event wiring
- **SEO/GEO scaffolding** — canonical + OpenGraph tags, JSON-LD built from the
  same data the page renders, sitemap + robots.txt, `llms.txt`
- **Finnish legal pages** (tietosuojaseloste, palveluehdot, evästekäytännöt) as
  fill-in skeletons

## Start a new site

```bash
cp -R template my-new-site && cd my-new-site
rm -rf .git                      # if you copied a repo
npm install
cp .env.example .env.local       # then fill in the keys
npm run dev                      # http://localhost:3000
```

Then work through this list. Everything marked `[TÄYDENNÄ: …]` in the source is
a deliberate placeholder — the site is not launch-ready until none are left.

1. **`src/data/site.ts`** — name, URL, description, contact details, business
   ID, address, legal dates. Nearly everything else reads from this file.
2. **`.env.local`** — `SITE_URL`, GA4 measurement ID, reCAPTCHA site key, the
   three EmailJS ids. All are public by design (they end up in the HTML), so
   never put a secret key here.
3. **`src/styles/globals.css`** — the `--color-site-*` tokens are the brand.
   Change the two brand colors first (`primary`, `accent`); the rest of the
   palette is a neutral gray scale that usually survives a rebrand.
   `src/utils/fonts.ts` swaps the typefaces.
4. **`public/`** — replace the placeholder `logo.svg`, `logo-white.svg` and
   `favicon.svg`; generate the favicon set at realfavicongenerator.net and
   uncomment the PNG/ICO links in `_document.tsx`; add `og-image-adam-huhtamaki.jpg` at
   1200×630; fill in `site.webmanifest`; edit `.htaccess` for your canonical
   host (or delete it if your host handles redirects).
5. **`src/data/nav.ts`** — header and footer links.
6. **Pages** — `src/pages/index.tsx` and `palvelut.tsx` are the two shapes
   (homepage, subpage). Copy `palvelut.tsx` for each new page; the file name is
   the URL. `404.tsx` and the legal pages are ready as they are.
7. **`src/data/faq.ts` + `features.ts`** — the copy that feeds both the visible
   sections and the JSON-LD.
8. **`public/llms.txt`** — a plain-language map of the site for AI answer
   engines. Keep it current when pages change.
9. **`next-sitemap.config.js`** — check that every page shows up in
   `out/sitemap.xml` after a build; add the stragglers to `additionalPaths`.

## Commands

```bash
npm run dev     # dev server
npm run build   # next build → out/ + WebP conversion + sitemap/robots
npm run start   # serve the built out/ folder locally
npm run lint    # eslint (flat config, eslint.config.mjs)
```

Deploy by uploading `out/` (Apache/nginx/S3), or point Netlify, Vercel or
Cloudflare Pages at the repo with build `npm run build` and publish dir `out`.

## External services

| Service | What it does | Where it is configured |
| --- | --- | --- |
| EmailJS | Sends the contact form from the browser | `.env.local`, `ContactForm.tsx` |
| reCAPTCHA v3 | Spam protection on that form | `.env.local` |
| Google Analytics 4 | Traffic + conversion tracking | `.env.local`, mounted in `_app.tsx` |

EmailJS template variables must be `{{name}}`, `{{email}}`, `{{number}}`,
`{{message}}`. Turn on EmailJS's own reCAPTCHA verification so the token the
form sends is checked server-side — otherwise the captcha is decoration.

In GA4, mark `generate_lead` as a key event and register the custom parameters
you care about (`section_name`, `cta_label`, `cta_type`, `cta_location`) as
custom dimensions. The full event list is documented at the top of
`src/utils/analytics.ts`.

## Consent model

Two first-party cookies, two years each:

- `LOCAL_CONSENT=TRUE` — the visitor answered the banner (it stays hidden)
- `ga_=TRUE` — analytics accepted

`ga_` is the only gate. Without it `_app` never mounts `<GoogleAnalytics>` and
`trackEvent()` returns immediately, so no event is queued or sent. "Vain
välttämättömät" sets only `LOCAL_CONSENT`. The visitor can flip analytics back
off at `/evastekaytannot/`, which deletes `ga_` and every `_ga*` cookie Google
had set.

## Content rules that are structural, not stylistic

- **FAQ copy lives in `src/data/faq.ts`.** The visible accordion and the
  `FAQPage` JSON-LD are built from the same array — schema that does not match
  the visible text is ignored by search engines. Never hand-write a FAQPage node.
- **Contact details live in `src/data/site.ts`.** The CTA block, the footer and
  the Organization schema all read from it, so the rendered text and the
  structured data cannot drift.
- **`trailingSlash: true`.** Canonicals, schema URLs and internal links all end
  in a slash; the non-slash form is a 301, and pointing a canonical at a
  redirect wastes it.
- **Answer first.** The first two sentences of every section answer the exact
  question in its heading. One question per H2 — answer engines retrieve
  sections, not pages.
- **Never invent facts.** No made-up figures, prices, customer counts or
  business IDs. Leave a `[TÄYDENNÄ: …]` marker and flag it instead.

## Known state

Built and verified on Next 15 (Pages Router). `npm audit` reports one high
advisory for the `postcss` copy inside Next 15's own dependency tree — clearing
it means moving to Next 16, which is a separate migration (`next lint` is gone
there, among other changes). It affects the build toolchain, not the shipped
static site.

## Not included on purpose

No CMS, no blog engine, no i18n routing, no dark mode. Each of those is a real
decision with real upkeep — add the one you actually need rather than carrying
three you don't.
