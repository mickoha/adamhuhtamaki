# Handoff: site footer

The footer is **global** — it appears at the bottom of every page (front page, Rikosoikeus, Pakkokeinot, Muut palvelut, and any under-construction placeholder). Build it once as a shared component; only the link lists ever need per-page current-state styling.

Source of truth: the `<footer>` element in `Etusivu.dc.html` (desktop) and `Etusivu mobiili.dc.html` (mobile — now the same content, stacked). Values below come from the Nocturne tokens in the bound design system — never hard-code a value a token carries.

## Anatomy (desktop)

Two columns, vertically centred against each other. The left column carries identity and navigation, the right column carries everything a visitor acts on, right-aligned against the page's open right edge.

```
┌──────────────────────────────────────────────────────────────────────┐
│ [background photo + left-to-right scrim]                             │
│                                                                      │
│  ▣ raven + wordmark                              PÄIVYSTYS 24/7      │
│  short positioning ¶                             +358 40 000 0000    │
│  [Soita rikospäivystykseen]                                          │
│                                                  SÄHKÖPOSTI          │
│  PALVELUT                                        adam@huhtamaki.fi   │
│  Rikosoikeus                                                         │
│  Pakkokeinot                                     KÄYNTIOSOITE        │
│  Vahingonkorvaus                                 Osoite 1, Helsinki  │
│  Riidanratkaisu                                 ──────────────────── │
│                                       Suomen Asianajajaliiton  ▣ ▣▣  │
│  TOIMISTO                                       jäsen          ▣ ▣▣  │
│  Yhteystiedot                                                        │
│  Palkkiot ja oikeusapu                                               │
│  Usein kysytyt                                                       │
│  Tietosuojaseloste                                                   │
│ ──────────────────────────────────────────────────────────────────── │
│  © 2026 … · Y-tunnus …                Palvelu suomeksi, ruotsiksi …  │
└──────────────────────────────────────────────────────────────────────┘
```

## Container

- `position: relative; overflow: hidden`
- `background: var(--color-neutral-900)`
- `border-top: 1px solid var(--color-divider)`
- Inner wrapper: `padding: 76px 56px 30px`; content rows are `max-width: 1400px`, left-aligned (page-wide asymmetry: whitespace sits on the right).

### Background image + scrim

Two absolutely positioned layers filling the container, both behind the content (`position: relative` on the content wrapper is what lifts it):

1. The photograph, `inset: 0`, `object-fit: cover`. In the prototype this is a drag-and-drop slot (`image-slot.js` — prototype only, do not port). Supply a dark, low-detail frame; it carries almost no information and must not compete with the text.
2. A non-interactive scrim (`pointer-events: none`):
   `linear-gradient(100deg, rgba(22,24,38,0.97) 0%, rgba(22,24,38,0.93) 46%, rgba(22,24,38,0.78) 100%)`
   Same 100° angle as the hero scrim, so hero and footer bookend the page with the same light direction: dense on the left where the type sits, opening up on the right.

Not wrapped in `.lighten` — it is a background under a scrim, not a content photograph. Keep it that way.

## Grid

```css
display: grid;
grid-template-columns: minmax(0, 1fr) auto;
gap: 56px 80px;
align-items: center;
max-width: 1400px;
```

`align-items: center` is deliberate: the shorter right column sits centred against the taller left one. The right column spans both left-column rows (`grid-row: 1 / span 2; grid-column: 2`).

### Left column, row 1 — brand

- Lockup: raven mark (inline SVG, **30×30**, filled `var(--color-text)`, `var(--color-bg)` eye dot, two `2.4px` legs) + `gap: 14px` + two-line wordmark:
  - `ADAM HUHTAMÄKI` — `var(--font-heading)`, weight 500, **16px**, `letter-spacing: .06em`, `white-space: nowrap`
  - `Asianajotoimisto` — **10.5px**, `letter-spacing: .2em`, uppercase, `var(--color-neutral-500)`
  - Line height on the stack: `1.15`
  - Same mark as the header, one size down (header is 30px with a 17px wordmark). Replace with the client's real raven asset; keep it `currentColor`-driven.
- Paragraph: `margin-top: 22px`, `max-width: 320px`, **14px** / `1.75`, `var(--color-neutral-400)`
  > Rikosasioiden puolustus ja pakkokeinoasiat. Päivystys vuorokauden ympäri koko Suomessa.
- CTA: `.btn .btn-primary`, `margin-top: 26px`, `display: inline-flex`, **13.5px**, `padding: 10px 18px`, `href="tel:…"` → **Soita rikospäivystykseen**. Outlined, like every primary in the system.

### Left column, row 2 — the two link lists, stacked

One wrapper (`grid-column: 1`) as a `display: flex; flex-direction: column; gap: 34px` stack holding **PALVELUT** above **TOIMISTO**. Each list is itself `display: flex; flex-direction: column; gap: 14px`.

Heading: **10.5px**, `letter-spacing: .2em`, uppercase, `var(--color-accent)`.
Links: **14.5px**, `var(--color-neutral-300)`, hover `var(--color-text)`.

**PALVELUT**
| Label | Target |
| --- | --- |
| Rikosoikeus | `Rikosoikeus` page |
| Pakkokeinot | `Pakkokeinot` page |
| Vahingonkorvaus | `Palvelut#vahingonkorvaus` |
| Riidanratkaisu | `Palvelut#riidanratkaisu` |

**TOIMISTO**
| Label | Target |
| --- | --- |
| Yhteystiedot | `#yhteys` (front page anchor) |
| Palkkiot ja oikeusapu | `#palkkiot` |
| Usein kysytyt | `#ukk` |
| Tietosuojaseloste | **placeholder `#`** — needs a real page |

The three anchor targets live on the front page only. From a subpage they must resolve to `/#yhteys`, `/#palkkiot`, `/#ukk` (absolute, not bare fragments) — this is the one thing that breaks if the footer is ported naively.

### Right column — contact and membership

`display: flex; flex-direction: column; align-items: flex-end; text-align: right; gap: 26px`. Every block inside is also `align-items: flex-end`, so all three contact rows and the membership row share one right edge.

Labels: **10.5px**, `.2em`, uppercase, `var(--color-neutral-500)` — **neutral**, not accent, unlike the list headings. The accent in this footer belongs to the two list headings and the outlined button; the contact labels stay quiet so the phone number itself is the loudest thing in the column.

| Label | Value |
| --- | --- |
| PÄIVYSTYS 24/7 | `+358 40 000 0000` — `var(--font-heading)`, **19px**, `var(--color-text)`, hover `var(--color-accent-300)`, `tel:` link |
| SÄHKÖPOSTI | `adam@huhtamaki.fi` — **14.5px**, `mailto:` link (inherits the design system's `a` color) |
| KÄYNTIOSOITE | `Osoite 1, 00100 Helsinki` — **14.5px** / `1.6`, `var(--color-neutral-300)`, plain text |

### Membership mark (Suomen Asianajajaliitto)

Last block in the right column, separated by `margin-top: 8px; padding-top: 26px; border-top: 1px solid var(--color-divider)` and `align-self: stretch` so the hairline runs the column's full width. Inside: `display: flex; align-items: center; justify-content: flex-end; gap: 18px` — caption first, mark last (the mark holds the outer right edge).

- Mark: `assets/asianajajaliitto.png` (the Asianajajaliitto *yhteisömerkki* as supplied by the client), **88×88**, `flex: none`, `alt="Suomen Asianajajaliitto"`.
- Caption: **13px** / `1.6`, `var(--color-neutral-300)` — "Suomen Asianajajaliiton jäsen", broken over two lines on desktop.

Rules for this asset:

- The mark is **not recolored, tinted, outlined, cropped or rotated**, and does not go through `.lighten`. It stays the supplied blue on the dark ground; the color break is intentional and correct — it is a certification mark, not part of the palette.
- Keep clear space of at least the mark's own cap-height on all sides (the 18px gap and 26px rule offset satisfy this at 88px).
- Do not scale below **64px** wide; below that the wordmark inside it stops being legible.
- Supply the PNG at 2× or, preferably, swap in the vector (SVG/EPS) version before launch. Use only the current official file from Asianajajaliitto, and only for as long as the membership holds.

## Legal bar

`margin-top: 60px; padding-top: 26px; border-top: 1px solid var(--color-divider); max-width: 1400px`
`display: flex; flex-wrap: wrap; gap: 20px 40px; align-items: center; justify-content: space-between`
**12.5px**, `var(--color-neutral-500)`.

- Left: `© 2026 Asianajotoimisto Adam Huhtamäki Oy · Y-tunnus 0000000-0`
- Right: `Palvelu suomeksi, ruotsiksi ja englanniksi`

The membership statement used to live here; it now sits with the mark in the right column, so don't state it twice. The year must be generated, not hard-coded. Middots are `·` (U+00B7) with a space each side.

## Mobile

`Etusivu mobiili.dc.html` now carries the same footer, single column — same content, same tokens, same background photo and 100° scrim. Differences only:

| | Desktop | Mobile |
| --- | --- | --- |
| Wrapper padding | `76px 56px 30px` | `48px 20px 104px` |
| Structure | 2-col grid, `align-items: center` | `flex` column, `gap: 40px` |
| Block order | brand · lists left / contact right | brand → Palvelut → Toimisto → contact → membership → legal |
| Alignment | right column right-aligned | everything flush left |
| Brand paragraph | `max-width: 320px` | full width |
| Membership mark | 88px, caption on the left | 72px, caption on the right, one line |
| Legal bar | one row, space-between | stacked, `gap: 12px` |

The `104px` bottom padding is load-bearing: it keeps the fixed "Soita 24/7" pill off the legal text. Never take it below **88px**.

## Behaviour and states

- No JavaScript. The footer is static markup.
- Link hover is a color change only — no underline, no movement. The design system's `:focus-visible` accent ring must survive the port on every link and on the button.
- Contrast: `--color-neutral-500` on `--color-neutral-900` is legal-fine-print scale only. Don't use that step for anything a user must read to act.
- The phone number appears here for the sixth time on the page. If it comes from a CMS, one field feeds all six.

## Placeholders in this component

| Placeholder | Field |
| --- | --- |
| `+358 40 000 0000` | Päivystys 24/7 |
| `adam@huhtamaki.fi` | Sähköposti |
| `Osoite 1, 00100 Helsinki` | Käyntiosoite |
| `Y-tunnus 0000000-0` | legal bar |
| `#` | Tietosuojaseloste target |
| footer background image | not yet supplied |
| `asianajajaliitto.png` | raster placeholder — vector version wanted |

Also confirm the exact registered company name (`… Oy`).
