# Brief: evästebanneri ja asetusdialogi

Design brief for the cookie consent UI on **Asianajotoimisto Adam Huhtamäki**
(adamhuhtamaki.fi). Written for the design AI; deliver desktop + mobile
prototypes in the same form as the other handoffs in this project.

Design system: **Nocturne** — the dark system already used across the site.
Every colour, radius, shadow and font comes from its tokens; no hard-coded hex,
no new colours, no new type sizes. Tokens are `--color-site-*` in
`src/styles/globals.css`.

---

## 1. The structure

Two layers.

**Layer 1 — the banner.** Two actions only:

| Action | Treatment |
| --- | --- |
| **OK** | `.btn .btn-primary` — accepts everything |
| **Katso asetukset** | `.btn .btn-secondary` — opens the dialog |

**Layer 2 — the dialog.** Where the visitor sees what is actually stored and
chooses. This layer **must** carry a genuine, single-click refusal —
`Vain välttämättömät` — at the same size and weight as its accept button. The
banner's asymmetry is the client's decision; the dialog is what makes the
choice real, so nothing in it may be buried, pre-ticked, or styled to recede.

Non-negotiables inside the dialog:

- Analytics toggle defaults to **off**. Never pre-ticked.
- `Vain välttämättömät` and `Hyväksy kaikki` are visually equal.
- No cookie wall — the site stays fully readable either way.
- No "legitimate interest" toggles.
- Closing the dialog without choosing saves nothing and leaves the banner up.

---

## 2. What the site actually stores

This inventory is real — design against it exactly and do not invent
categories. The site runs **no advertising and no social pixels**, so there is
no "Markkinointi" row. Offering a toggle that controls nothing is itself a dark
pattern.

### Välttämättömät — always on, no switch

| Cookie | Set by | Lifetime | Purpose |
| --- | --- | --- | --- |
| `LOCAL_CONSENT` | this site | 2 vuotta | Muistaa, että olet vastannut evästekysymykseen, jottei banneria näytetä uudelleen. |
| `ga_` | this site | 2 vuotta | Muistaa, salltiko analytiikan. Tämä on ainoa asia, joka päästää Google Analyticsin lataamaan. |
| `_GRECAPTCHA` | Google reCAPTCHA | 6 kuukautta | Erottaa ihmisen roskapostirobotista yhteydenottolomakkeessa. |

**reCAPTCHA is worth showing explicitly in the UI**, because it is the one
third-party thing that runs without analytics consent. Two facts the design
should surface, both true of this build:

- It loads **only when the visitor first touches the contact form** — not on
  page load, and never on a page they only read.
- Without it the form is open to abuse, which is why it sits under
  "välttämättömät" rather than under a toggle.

### Analytiikka — switch, default off

| Cookie | Set by | Lifetime | Purpose |
| --- | --- | --- | --- |
| `_ga` | Google Analytics 4 | 2 vuotta | Erottaa käyttäjät toisistaan. |
| `_ga_XXXXXXXX` | Google Analytics 4 | 2 vuotta | Ylläpitää istunnon tilaa. |

What it is used for, in the visitor's terms: which pages are read, which
sections people reach, and whether they call or use the form. Never to identify
an individual visitor.

**The contact form itself sets no cookies** — it posts straight to EmailJS.
Say so in the dialog; visitors assume forms track them.

---

## 3. Banner (layer 1)

Bottom-right card on desktop, bottom full-width on mobile.

**It must not cover the floating "Soita 24/7" call pill**, which is fixed
bottom-right at `z-index: 60` and is this site's primary conversion. Either sit
above it or shift the pill while the banner is open — state which in the README.

- Ground `--color-site-surface`, hairline `--color-site-divider`,
  `--radius-site-lg`, `--shadow-site-modal`, `width: min(420px, calc(100vw - 2rem))`.
- Heading ~15px, weight 500 — headings never exceed 500 in this system.
- Body ~13px / 1.6, `--color-site-muted`, two sentences maximum.
- First person **singular** throughout ("käytän", never "käytämme"). The whole
  site speaks as one named attorney; a plural "we" breaks it.
- Inline link to `/evastekaytannot/`.
- Actions right-aligned in a row; stacked full-width below 620px, **OK first**.

Copy:

> **Evästeet tällä sivustolla**
>
> Käytän välttämättömiä evästeitä sivuston toimintaan ja analytiikkaevästeitä
> nähdäkseni, mitkä sivut ovat lukijoille hyödyllisiä.
> [Lue lisää evästeistä](/evastekaytannot/)
>
> `Katso asetukset` · `OK`

---

## 4. Dialog (layer 2)

The one modal on this site.

- Centred card, `width: min(600px, calc(100vw - 2rem))`, `max-height: 85vh`
  with the **category list scrolling inside** while the title and the action row
  stay fixed. On a short phone the actions must never be the thing you have to
  scroll to find.
- Ground `--color-site-surface`, `--radius-site-lg`, `--shadow-site-modal`.
- Backdrop `rgba(22,24,38,0.72)` — the ground colour every scrim on this site
  uses. Backdrop click closes without saving.
- Title ~20px, one-sentence intro, then the category rows.

**Category row** — design this as a repeatable component, not a fixed pair:

- Name ~15px; one-line description ~13px `--color-site-subtle`; control right.
- Välttämättömät: **no switch**. A static "Aina käytössä" in
  `--color-site-subtle`. Do not draw a disabled toggle — a greyed switch reads
  as something the visitor failed to turn on.
- Analytiikka: a real switch, default off.
- Under each row, a **"Näytä evästeet"** disclosure revealing that category's
  table: cookie name, setter, lifetime, purpose. Native `<details>` with the
  site's FAQ marker — a plus rotating 45° into a cross, never a chevron. The
  table must scroll horizontally inside its own container on mobile rather than
  forcing the dialog to scroll sideways.

**Action row**, pinned to the bottom of the card:

`Vain välttämättömät` · `Tallenna valinnat` · `Hyväksy kaikki`

Equal size and padding across all three.

### Behaviour the prototype must show

- `role="dialog"`, `aria-modal="true"`, labelled by its title.
- Focus moves into the dialog on open, is trapped while open, and returns to
  the **Katso asetukset** button on close. `Esc` closes without saving.
- Background scroll locked while open.
- The system's 2px `--color-site-accent` `:focus-visible` ring on every control
  — this is how the site is keyboard-navigable and it must survive.
- The switch is a real `<input type="checkbox">` styled as a switch, not a div.
  Show **all four states**: off, on, focused, on+focused.
- `prefers-reduced-motion`: opacity only, no slide or scale.

---

## 5. Reopening it later

Once answered the banner never returns, so the visitor needs a way back:

- An **"Evästeasetukset"** link in the footer's legal row, beside
  Evästekäytännöt and Palveluehdot, same 12.5px `--color-site-neutral-500`
  treatment. It reopens the dialog.

`/evastekaytannot/` already carries a working analytics toggle. The dialog and
that page read the same `ga_` cookie and must never show different states —
design them to look like the same control.

---

## 6. Deliverables

Match the other handoffs in this project:

- `Evasteet.dc.html` — desktop: banner, dialog, every switch state, the
  expanded cookie tables
- `Evasteet mobiili.dc.html` — 390px, including the pinned action row on a
  short viewport
- A README with the token table, both layers, focus order, the Finnish copy
  verbatim, and an "Open items" table

Show the banner **over the real front page**, not on a blank canvas, so its
relationship to the hero and the floating call pill is visible.

State any assumption inline rather than inventing a fact — nothing on this site
ships invented content.
