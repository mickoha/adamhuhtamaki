# Handoff: evästebanneri ja asetusdialogi

## Overview

Cookie consent UI for adamhuhtamaki.fi, built as one Design Component:

| File | Viewport |
| --- | --- |
| `Evasteet.dc.html` | desktop — the banner shown over the real front page, the dialog, all four switch states, the expanded cookie tables |

Design system: **Nocturne** (`_ds/nocturne-…/styles.css`). Every color, radius, shadow and font comes from its tokens; no hard-coded hex, no new colors, no new type sizes.

The page mounts the real `Etusivu.dc.html` beneath the overlay (`<dc-import name="Etusivu">`) so the banner's relationship to the hero and to the floating "Soita 24/7" pill is visible rather than asserted.

**Mobile (`Evasteet mobiili.dc.html`) is not built yet** — it is the one outstanding deliverable from the brief.

## Token mapping — read this first

The brief names tokens `--color-site-*` / `--radius-site-*` / `--shadow-site-modal` from `src/styles/globals.css`. This project's bound design system exposes the same roles without the `site` segment, so the prototype uses these. Rename on the way into the codebase:

| Brief | This prototype | Used for |
| --- | --- | --- |
| `--color-site-surface` | `--color-surface` | banner and dialog ground |
| `--color-site-divider` | `--color-divider` | hairlines, table rules |
| `--color-site-muted` | `--color-neutral-400` | banner body, notes |
| `--color-site-subtle` | `--color-neutral-500` | row descriptions, "Aina käytössä" |
| `--color-site-accent` | `--color-accent` | focus ring, switch-on border, links |
| `--radius-site-lg` | `--radius-lg` | banner, dialog, tables |
| `--shadow-site-modal` | `--shadow-lg` | banner, dialog |
| — | `--color-accent-900` / `-300` | switch track / knob when on |
| — | `--color-neutral-800` / `-500` | switch track / knob when off |

Backdrop is `rgba(22,24,38,0.72)` — the literal ground color every scrim on this site uses, as specified.

## Layer 1 — the banner

Bottom-right card. `position: fixed; right: 26px; bottom: 118px; z-index: 70`, `width: min(420px, calc(100vw - 2rem))`, `padding: 22px 24px 24px`, `border: 1px solid var(--color-divider)`, `--radius-lg`, `--shadow-lg`, `background: var(--color-surface)`.

**The call pill.** The floating "Soita 24/7" pill is fixed bottom-right at `z-index: 60` and is the site's primary conversion. The banner **sits above it** — `bottom: 118px` clears the pill's 26px offset plus its ~66px height plus a 26px gap. The pill does not move. That is the decision to carry into the codebase: if the pill's height changes, this offset changes with it. (The alternative, shifting the pill while the banner is open, was rejected — moving the primary CTA is worse than stacking.)

- Heading `--font-heading`, 15px, weight 500 (headings never exceed 500 in this system)
- Body 13px / 1.6, `--color-neutral-400`, inline link to `/evastekaytannot/` in `--color-accent-300`
- Actions right-aligned in a wrapping row, `gap: 10px`: `Katso asetukset` (`.btn .btn-secondary`) then `OK` (`.btn .btn-primary`), both 13.5px
- Entry animation `cardIn` 200ms; under `prefers-reduced-motion` every `[data-anim]` element drops to a 120ms opacity fade

**Below 620px** the two buttons stack full width with **OK first** — not yet implemented, it belongs in the mobile file.

**Voice.** The site speaks in the first person singular everywhere else ("hoidan", "avustan"). The banner copy the client supplied uses the plural ("Käytämme"), and it ships verbatim as given — see § Copy. Flag for the client: aligning it to the singular would match the rest of the site.

## Layer 2 — the dialog

The one modal on this site. `role="dialog"`, `aria-modal="true"`, `aria-labelledby` the title.

- Centred card, `width: min(600px, calc(100vw - 2rem))`, `max-height: 85vh`, `display: flex; flex-direction: column`
- Three bands: a fixed header (title, intro, close icon button), a `flex: 1; min-height: 0; overflow-y: auto` category list, and a fixed action row. Only the middle band scrolls — on a short phone the actions are never something you scroll to find.
- Backdrop `rgba(22,24,38,0.72)` + `blur(3px)`; clicking it closes **without saving**
- Title 20px `--font-heading` weight 500; intro one sentence at 13.5px `--color-neutral-400`

### Category row — a repeatable component

Two rows ship, but the row is built to repeat: name (15px, weight 500), a one-line description (13px, `--color-neutral-500`, `max-width: 46ch`), control on the right, and a disclosure underneath.

| Row | Control |
| --- | --- |
| Välttämättömät | static text "Aina käytössä" in `--color-neutral-500`. **No switch, not even a disabled one** — a greyed switch reads as something the visitor failed to turn on |
| Analytiikka | a real switch, **default off** |

**The switch** is a real `<input type="checkbox" role="switch">` at `opacity: 0` filling a 46×26px label, with the track and knob rendered beneath it. Track: `999px` radius, `--color-neutral-800` + `--color-divider` border when off, `--color-accent-900` + `--color-accent` border when on. Knob: 18px circle, `left: 4px → 24px`, `--color-neutral-500 → --color-accent-300`. Transitions 180ms.

Focus is handled in the logic class (`onFocus`/`onBlur` → `switchFocused`) so the ring lands on the visible track: `outline: 2px solid var(--color-accent); outline-offset: 2px`. All four states — off, on, off+focused, on+focused — are shown as static swatches in the "Kytkimen tilat" section at the bottom of the page.

**"Näytä evästeet"** disclosures are native `<details data-ck>` with the site's FAQ marker: a 13px plus glyph rotating 45° into a cross over 200ms, never a chevron. Each holds that category's table (`.table`, 12.5px, `min-width: 520px`) inside `overflow-x: auto` so the table scrolls in its own container instead of forcing the dialog sideways.

Two notes sit under the tables on an `--color-accent-800` left rule: the reCAPTCHA facts under Välttämättömät, and the EmailJS fact under Analytiikka. Both are load-bearing content, not captions.

### Action row

Pinned to the bottom of the card, `border-top: 1px solid var(--color-divider)`, `padding: 20px 30px 24px`, three buttons each `flex: 1 1 160px` with identical 14px / `12px 18px` sizing:

`Vain välttämättömät` (secondary) · `Tallenna valinnat` (primary) · `Hyväksy kaikki` (secondary)

The refusal and the accept-all are visually identical — same variant, same size, same padding. The accent-outlined primary goes to **Tallenna valinnat**, the neutral confirmation of whatever the visitor chose, precisely so that neither refusing nor accepting everything is the visually favoured act.

### Focus order and keyboard behaviour

1. Banner: `Katso asetukset` → `OK`
2. On open, focus moves to the first focusable element inside the dialog (the close button)
3. `Tab` cycles: close → Välttämättömät disclosure → Analytiikka switch → Analytiikka disclosure → Vain välttämättömät → Tallenna valinnat → Hyväksy kaikki → back to close. The trap is implemented in `trapFocus()` on the dialog's `onKeyDown`, filtering to visible elements so a collapsed `<details>` never receives focus.
4. `Esc` (document-level listener) closes without saving
5. On close, focus returns to the `Katso asetukset` button via `settingsRef`
6. Background scroll is locked (`document.body.style.overflow = "hidden"`) while open and restored on close and on unmount

The design system's 2px accent `:focus-visible` ring must survive on every control. Do not restyle it per component.

## Consent storage and the analytics gate

All in the logic class:

- `read(name)` reads the cookie, falling back to `localStorage` under an `ah_` prefix (the prototype runs in a sandboxed frame where cookies may be blocked; production needs only the cookie path)
- `write(name, value, days)` sets `path=/; SameSite=Lax`
- `persist(analytics)` writes `LOCAL_CONSENT=1` and `ga_=true|false`, both **730 days**, closes both layers, and calls `loadAnalytics()` when analytics was granted
- `loadAnalytics()` is the single gate and is currently a guarded no-op. **This is where the GA4 tag gets injected**, once, only after consent. Nothing analytics-related may load anywhere else on the site.
- `closeDialog()` re-reads the stored values, so closing without choosing discards the toggle and leaves the banner up
- `resetConsent()` expires both cookies and brings the banner back — prototype affordance only

`/evastekaytannot/` already carries a working analytics toggle. Both it and this dialog read the same `ga_` cookie and must never show different states; treat them as one control with two mounts.

## Reopening it later

Once answered, the banner never returns. In production the way back is an **"Evästeasetukset"** link in the footer's legal row beside Evästekäytännöt and Palveluehdot, at the same 12.5px `--color-neutral-500` treatment, which reopens the dialog.

The prototype cannot inject that link into the imported front page's footer, so it is stubbed as a small fixed bar at bottom-left labelled "Prototyyppi", holding `Evästeasetukset`, `Nollaa suostumus` and a live status readout. **The bar is scaffolding — it does not ship.**

## Tweaks

Two props are exposed for review: `analyticsDefaultOn` and `showBannerOnLoad`. They exist so a reviewer can see the "on" state without clicking; the shipped default is analytics **off**, banner **on** until answered.

## Assumptions stated inline

Nothing here invents a fact about the site's cookies — the inventory is exactly the brief's. Two pieces of wording were not in the brief and are mine, to be approved or replaced:

- the dialog title **"Evästeasetukset"**
- the dialog intro **"Alla on kaikki, mitä tämä sivusto tallentaa selaimeesi. Analytiikka on pois päältä, kunnes sallit sen itse."**
- the two category descriptions (the analytics one was revised on request to promise aggregate-only data)

## Open items

| Item | Where |
| --- | --- |
| `Evasteet mobiili.dc.html` — 390px, stacked banner actions with OK first, pinned action row on a short viewport | outstanding deliverable |
| Banner voice: plural "Käytämme" vs the site's singular | banner body |
| Approve the dialog title, intro and category descriptions | see § Assumptions |
| **GA4 must be configured so the aggregate-only promise is true**: IP anonymisation on, Google signals off, advertising identifiers off. Otherwise `_ga` is an identifier and the Analytiikka description overstates the case | analytics setup |
| `_ga_XXXXXXXX` — real measurement-ID suffix | Analytiikka table |
| Inject the GA4 tag inside `loadAnalytics()` | logic class |
| Footer legal-row "Evästeasetukset" link on every page; remove the prototype bar | footer |
| `/evastekaytannot/` — confirm its toggle reads and writes the same `ga_` cookie | cookie policy page |
| Below-620px banner stacking | mobile file |

---

# Copy

Verbatim. Where a prototype and this section disagree, this section wins.

## Banner

**Heading**

> Evästeiden käyttö tällä sivustolla

**Body**

> Tämä verkkosivusto käyttää evästeitä parantaakseen käyttökokemustasi ja analysoidakseen sivuston liikennettä. Käytämme sekä välttämättömiä evästeitä, jotka ovat tarpeen verkkosivuston perustoimintojen kannalta, että suorituskykyä ja analytiikkaa varten tarkoitettuja evästeitä. [Lue lisää evästeistä.](/evastekaytannot/)

**Actions**

> Katso asetukset · OK

## Dialog

**Title and intro** (not client-supplied — awaiting approval)

> Evästeasetukset

> Alla on kaikki, mitä tämä sivusto tallentaa selaimeesi. Analytiikka on pois päältä, kunnes sallit sen itse.

**Close button label**

> Sulje tallentamatta

### Välttämättömät

**Row**

> Välttämättömät — Aina käytössä

**Description** (not client-supplied)

> Sivuston toiminta, evästevalintasi muistaminen ja yhteydenottolomakkeen roskapostisuojaus.

**Disclosure**

> Näytä evästeet

| Eväste | Asettaja | Kesto | Tarkoitus |
| --- | --- | --- | --- |
| `LOCAL_CONSENT` | tämä sivusto | 2 vuotta | Muistaa, että olet vastannut evästekysymykseen, jottei banneria näytetä uudelleen. |
| `ga_` | tämä sivusto | 2 vuotta | Muistaa, sallitko analytiikan. Tämä on ainoa asia, joka päästää Google Analyticsin lataamaan. |
| `_GRECAPTCHA` | Google reCAPTCHA | 6 kuukautta | Erottaa ihmisen roskapostirobotista yhteydenottolomakkeessa. |

**reCAPTCHA note**

> reCAPTCHA latautuu vasta, kun kosket yhteydenottolomakkeeseen — ei sivun avautuessa eikä sivuilla, joita vain luet. Ilman sitä lomake olisi avoin väärinkäytölle, ja siksi se on välttämättömissä eikä valittavissa.

### Analytiikka

**Row**

> Analytiikka — switch, default off

**Description** (revised on request)

> Kerää vain koostetietoa: mitkä sivut luetaan, mihin osioihin lukijat pääsevät ja käytetäänkö puhelinnumeroa vai lomaketta. Yksilöivää tietoa ei kerätä eikä kävijää voi tunnistaa.

**Switch label (aria)**

> Salli analytiikkaevästeet

**Disclosure**

> Näytä evästeet

| Eväste | Asettaja | Kesto | Tarkoitus |
| --- | --- | --- | --- |
| `_ga` | Google Analytics 4 | 2 vuotta | Erottaa käyttäjät toisistaan. |
| `_ga_XXXXXXXX` | Google Analytics 4 | 2 vuotta | Ylläpitää istunnon tilaa. |

**Form note**

> Yhteydenottolomake itsessään ei aseta evästeitä. Viesti lähtee suoraan EmailJS-palvelun kautta.

### Action row

> Vain välttämättömät · Tallenna valinnat · Hyväksy kaikki

## Reopening

**Footer legal row**

> Evästeasetukset

## Switch-state reference section (prototype only)

> Kytkimen tilat · Analytiikkakytkin, neljä tilaa

> Kytkin on aito input type="checkbox", jonka päällä on renderöity rata ja nuppi. Fokusrengas on järjestelmän 2px accent-rengas.

> Pois (oletus) · Päällä · Pois + fokus · Päällä + fokus
