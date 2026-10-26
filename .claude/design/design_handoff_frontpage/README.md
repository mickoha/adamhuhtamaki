# Handoff: Asianajotoimisto Adam Huhtamäki — front page (desktop + mobile)

## Overview

Marketing front page for a Finnish criminal-defence law firm, Asianajotoimisto Adam Huhtamäki. The firm specialises in criminal law (*rikosoikeus*) and coercive measures (*pakkokeinot*), with damages and dispute resolution as secondary areas. The single most important business goal is **reachability**: a 24/7 criminal emergency line (*rikospäivystys*) that must be one tap away everywhere on the page.

Two views are delivered: a desktop page and a separate 390 px-wide mobile page. All other pages of the site are **not** part of this handoff — see "Out of scope".

## About the design files

The files in this bundle are **design references created in HTML** — prototypes that show the intended look, copy and behaviour. They are not production code to copy directly.

The task is to **recreate these designs in the target codebase's existing environment** (React, Vue, Astro, WordPress theme, etc.) using its established patterns, component library and build tooling. If no codebase exists yet, choose an appropriate stack (a static-first framework such as Astro or Next.js suits a marketing site of this size) and implement the designs there.

Notes on how the prototypes are built, so nothing surprises you:
- `Etusivu.dc.html` and `Etusivu mobiili.dc.html` are single-file prototypes. `support.js` is the prototype runtime — **do not port it**.
- All layout styling is inline. This is a constraint of the prototyping environment, not a recommendation. Use normal CSS/Tailwind/CSS-modules in production.
- The design system's real stylesheet is included at `design-system/styles.css`. **Port this** — it holds all tokens (`--color-*`, `--font-*`, `--space-*`, `--radius-*`, `--shadow-*`) plus the component layer (`.btn`, `.card`, `.tag`, `.input`, `.field`, `.radio`, `.table`, `.lighten`). `design-system/readme.md` is the written design-system guide.
- Desktop and mobile are two separate files only because the prototype tool cannot express media queries. **In production build one responsive page**, with the mobile file as the specification for the small breakpoint (single breakpoint at ~900 px is enough).

## Fidelity

**High-fidelity.** Colors, type sizes, spacing, copy and interaction states are final and intentional. Recreate them pixel-accurately using the ported tokens. The Finnish copy is approved — do not rewrite it. Two content areas are placeholders and must be replaced with real data before launch (see "Placeholder content").

## Design tokens

From `design-system/styles.css` (Nocturne, dark theme). Never hard-code a value the tokens carry.

| Token | Value |
| --- | --- |
| `--color-bg` | `#161826` |
| `--color-surface` | `#232532` |
| `--color-text` | `#e9e9ed` |
| `--color-accent` | `#9184d9` |
| `--color-divider` | `color-mix(in srgb, #e9e9ed 16%, transparent)` |
| `--color-neutral-100…900` | `#f3f5fe, #e4e7f5, #cfd3e5, #b2b6ca, #9397ab, #75798c, #595d6c, #3f424d, #292b31` |
| `--color-accent-100…900` | `#f5f4ff, #e7e5fe, #d2cefd, #b5abfc, #968ae0, #796cbf, #5d5294, #423a6a, #2b2741` |
| `--color-section` / `-glow` / `-ghost` | `#262a60` / `#353b80` / `#4c5397` |
| `--font-heading` / `--font-body` | `"Inter", system-ui, sans-serif`, heading weight **500** |
| `--space-1…8` | `2.8, 5.6, 8.4, 11.2, 16.8, 22.4 px` |
| `--radius-sm/md/lg` | `4 / 8 / 14 px` |
| `--shadow-sm` | `0 0 0 1px #3f424d` |
| `--shadow-md` | `0 0 0 1px #595d6c, 0 6px 18px rgba(0,0,0,.55)` |
| `--shadow-lg` | `0 0 0 1px #9397ab, 0 16px 40px rgba(0,0,0,.65)` |

Design-system rules that matter here:
- Primary buttons are **outlined** (1 px accent border on transparent), never filled.
- The accent appears as a line, a mark or a glow — never as a large flood. The only saturated fills are the `--color-section` bands.
- Photographs go through `.lighten` (`mix-blend-mode: lighten`) so their dark values fall away into the page. Prefer photos shot on dark backgrounds.
- Focus is always `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px }` — never the browser default.
- Headings never go bolder than 500; hierarchy comes from size and space.
- Free-standing hairlines fade to transparent over the last 48 px each side: `linear-gradient(to right, transparent, var(--color-divider) 48px, var(--color-divider) calc(100% - 48px), transparent)`.

Type scale actually used (desktop → mobile):
- h1 hero: 68 px / 1.03 / -0.025em → 38 px / 1.06
- section h2: 40–42 px / 1.1 / -0.02em → 27–28 px / 1.12
- panel h3: 34 px → 26 px; card h3/h4: 23–26 px → 20–21 px
- lead paragraph: 18–19 px / 1.6–1.65 → 15.5–16 px
- body: 15–17 px / 1.65–1.7 → 14.5–15.5 px
- kicker / eyebrow: 11.5 px, `letter-spacing: .24em`, uppercase, `--color-accent` → 10 px / `.2em`
- fine print: 12.5 px `--color-neutral-500`

## Screens / views

### 1. Desktop front page (`Etusivu.dc.html`)

Page width is fluid; content blocks are `max-width: 1400px` with `padding-inline: 56px`, left-aligned (asymmetric — whitespace sits on the right).

**Header** — sticky, `top: 0`, `z-index: 40`, flex row, `padding: 18px 56px`, height ≈ 73 px.
- Background is **scroll-reactive**: at `scrollY ≤ 24` it is `rgba(22,24,38,.28)` with `backdrop-filter: blur(4px)` and a transparent bottom border; past 24 px it becomes `rgba(22,24,38,.86)`, `blur(14px)` and `border-bottom: 1px solid var(--color-divider)`. Transition `220ms ease` on background, border-color and backdrop-filter.
- Left: logo lockup — a raven mark (inline SVG, 30×30, filled `--color-text`, a `--color-bg` eye dot and two 2.4 px legs) plus a two-line wordmark: `ADAM HUHTAMÄKI` (heading font, 17 px, `letter-spacing: .06em`) over `ASIANAJOTOIMISTO` (10.5 px, `.22em`, `--color-neutral-500`). `flex: none` and `white-space: nowrap` on both lines — they must never wrap.
- Center-right nav, 14 px, `gap: 24px`, `white-space: nowrap`: **Rikosoikeus**, **Pakkokeinot**, **Muut palvelut** (dropdown), **Yhteystiedot**. Idle `--color-neutral-300`, hover/current `--color-accent`.
- "Muut palvelut" is a `<details>` disclosure: the summary carries a 11 px chevron that rotates 180° when open (`transition: transform 180ms ease`) and the label turns accent. The panel is absolutely positioned (`top: 34px; left: -16px`), 330 px wide, `background: var(--color-surface)`, `border: 1px solid var(--color-divider)`, `border-radius: var(--radius-md)`, `box-shadow: var(--shadow-lg)`, `padding: 12px`, and animates in with `opacity 0→1` + `translateY(-6px→0)` over 140 ms. Two rows, each a label (14.5 px) over a description (12 px, `--color-neutral-500`), `padding: 12px 14px`, `border-radius: var(--radius-sm)`, hover `background: var(--color-accent-900)`:
  - Vahingonkorvaus — "Korvausvaatimukset ja niiden torjunta"
  - Riidanratkaisu ja oikeudenkäynnit — "Käräjä- ja hovioikeusprosessit, sovinnot"
- Right: `.btn .btn-primary` → `tel:` link, 13.5 px, `padding: 9px 16px`, label **Rikospäivystys 24/7**.

**Hero** — `margin-top: -76px` so the image runs **under** the transparent header; `min-height: 736px`; content bottom-aligned.
- Full-bleed background image (user-fillable slot in the prototype; in production a dark environmental photo — courtroom or night city).
- Two non-interactive scrims: `linear-gradient(100deg, rgba(22,24,38,.94) 0%, rgba(22,24,38,.86) 42%, rgba(22,24,38,.35) 100%)` and `linear-gradient(to top, var(--color-bg) 0%, rgba(22,24,38,0) 45%)`.
- Text block `padding: 150px 56px 84px`, `max-width: 1120px`, `pointer-events: none` (buttons re-enable it).
- Eyebrow (accent, uppercase): `Rikosoikeuteen erikoistunut asianajotoimisto`
- h1 (68 px, `max-width: 15ch`, `text-wrap: balance`): `Puolustus alkaa ensimmäisestä puhelusta.`
- Lead (19 px, `max-width: 54ch`, `--color-neutral-300`): `Avustan yksityishenkilöitä ja yhtiöitä rikosasioissa ja vakavissa pakkokeinokysymyksissä. Kokemus useista sadoista oikeudenkäynneistä ja olemme tavoitettavissa myös iltaisin ja viikonloppuisin.`
- Buttons: primary `Soita päivystykseen 24/7` (`tel:`), secondary `Jätä yhteydenottopyyntö` (`#yhteys`), 15 px, `padding: 13px 22px`.

**Emergency band** — the page's one saturated field. `background: var(--color-section)` with `radial-gradient(120% 140% at 12% 0%, var(--color-section-glow) 0%, var(--color-section) 58%)`, `padding: 64px 56px`, hairline borders `rgba(233,233,237,.08)` top and bottom. Two columns `1.1fr / 1fr`, `gap: 56px`, vertically centred.
- Left: a 9 px accent-300 dot with a pulsing ring (`@keyframes pulseRing`: box-shadow spread 0 → 18 px, `rgba(145,132,217,.45)` → transparent, 2.4 s ease-out infinite) beside the eyebrow `Rikospäivystys · päivystys auki`; h2 (40 px, `max-width: 22ch`) `Kiinniotto ei odota virka-aikaa. Eikä puolustus.`; paragraph (17 px, `--color-accent-200`) `Kuulustelu voidaan aloittaa tunneissa. Ensimmäiset lausumat kantavat läpi koko prosessin. Soita heti, kun sinä tai läheisesi on otettu kiinni, kutsuttu kuulusteluun tai saanut tiedon esitutkinnasta. Vastaan tarvittaessa myös yöllä.`
- Right: a card — `padding: 30px 32px`, `border: 1px solid rgba(233,233,237,.16)`, `border-radius: var(--radius-lg)`, `background: rgba(22,24,38,.4)` — containing the label `PÄIVYSTYSNUMERO`, the number as a 36 px heading-font `tel:` link (hover `--color-accent-300`), a fading hairline, and `Vastaan itse. Jos en pääse puhelimeen, soitan takaisin heti kun vapaudun oikeussalista.`

**Audience cards** — `padding: 104px 56px 96px`, `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`, `gap: 20px`. Each card: `border-radius: var(--radius-lg)`, `background: var(--color-surface)`, `box-shadow: var(--shadow-sm)`, `overflow: hidden`; a 260 px-tall image wrapped in `.lighten` at the top, then `padding: 34px 36px 40px` with a `.tag .tag-outline` label, a 26 px h3 and a 15 px body paragraph.
- `Yksityishenkilöille` → **Kun sinua epäillään rikoksesta** — "Epäillyn ja asianomistajan avustaminen esitutkinnassa, vangitsemisasioissa ja oikeudenkäynnissä. Selvitän aina, voiko valtion oikeusapu tai vakuutuksesi oikeusturva kattaa kulut."
- `Yhtiöille` → **Kun tutkinta koskee yritystäsi** — "Talousrikosepäilyt, kotietsinnät ja takavarikot yrityksen tiloissa, johdon ja työntekijöiden asema tutkinnassa sekä liiketoiminnan jatkuvuus prosessin aikana."

**Decorative backdrop** — one container wraps the Erikoisalat and Hinnasto sections (`position: relative; isolation: isolate`). Inside it, a `pointer-events: none; z-index: -1; opacity: .65` layer inset `-40px 0 0` containing:
- a 620 px accent glow, `top: 6%; left: -14%`, `radial-gradient(circle, rgba(145,132,217,.16), transparent 68%)`;
- a 720 px indigo glow, `bottom: 4%; right: -10%`, `radial-gradient(circle, rgba(53,59,128,.28), transparent 70%)`;
- an SVG (`viewBox 0 0 1400 1200`, `preserveAspectRatio: none`) with three cubic paths that start high on the right, sweep left and descend — stroke widths 1.25 / 1 / 0.75 — painted with a diagonal linear gradient that is transparent at both ends and `rgba(145,132,217,.34)` at 45 %. The sweep deliberately traces the reading path of the content beneath it.

**Erikoisalat** — `padding: 0 56px 100px`. Eyebrow and h2 are **right-aligned** here (`text-align: right`, h2 `margin-left: auto`, `max-width: 24ch`): `Erikoisalat` / `Painopiste on rikosasioissa ja pakkokeinoissa.`
- Two large panels in a `repeat(auto-fit, minmax(400px, 1fr))` grid with `gap: 1px` on a `--color-divider` background plus top/bottom dividers — the 1 px gaps read as hairlines between panels. Each panel is a link, `padding: 44px 40px 40px`, `background: var(--color-bg)`, hover `background: var(--color-neutral-900)`, containing a 34 px h3, a 16 px paragraph (`max-width: 44ch`, `--color-neutral-300`) and an accent "→" link line.
  1. **Rikosoikeus** — "Vakavat rikokset: väkivalta- ja henkirikokset, huume-, talous- ja seksuaalirikokset. Avustaminen esitutkinnasta hovioikeuteen, myös asianomistajan puolella." → `Rikosoikeus →`
  2. **Pakkokeinot** — "Vangitsemisvaatimukset, matkustuskielto, takavarikko ja vakuustakavarikko, kotietsintä sekä salaiset pakkokeinot ja niiden laillisuuden riitauttaminen." → `Pakkokeinot →`
- Below, a `Lisäksi` row: the label (11.5 px, `.2em`, `--color-neutral-500`) followed by two 17 px links (`--color-neutral-200`, hover accent) — **Vahingonkorvaus** and **Riidanratkaisu ja oikeudenkäynnit**.

**Hinnasto** (`id="palkkiot"`, `scroll-margin-top: 90px`) — the commercial argument that fees are often paid by someone else.
- Eyebrow `Hinnasto`; h2 (42 px, `max-width: 26ch`) `Usein palkkion maksaa joku muu kuin sinä.`; lead (18 px, `max-width: 62ch`) `Rikosasiassa kulut katetaan hyvin usein valtion varoista tai vakuutuksesta. Selvitän tämän aina ennen laskutusta, joten kysyminen ei maksa mitään.`
- Three cards, `repeat(auto-fit, minmax(300px, 1fr))`, `gap: 20px`, each `padding: 32px 30px 34px`, `border-radius: var(--radius-lg)`, `background: var(--color-surface)`, `box-shadow: var(--shadow-sm)`; a `.tag .tag-accent` with `align-self: flex-start` (it must hug its text, not stretch), a 23 px h4 and a 15 px paragraph:
  - `Valtion varoista` → **Oikeusapu** — "Valtion oikeusapu kattaa palkkion kokonaan tai osittain tulojesi perusteella. Selvitän oikeuden oikeusapuun ennen laskutusta."
  - `Tuloista riippumatta` → **Puolustaja** — "Vakavissa rikoksissa tuomioistuin voi määrätä minut puolustajaksesi valtion varoista riippumatta tuloistasi."
  - `Vakuutus korvaa` → **Oikeusturva** — "Kotivakuutuksen tai yrityksen vakuutuksen oikeusturva korvaa usein riita- ja korvausasioiden kulut."
- Then a two-column block (`repeat(auto-fit, minmax(320px, 1fr))`, `gap: 16px 64px`). Left: label `Jos maksat itse` and a rate list — rows of label + right-aligned figure separated by 1 px dividers, `padding: 16px 0`:
  - Ensimmäinen arvio puhelimessa — **0 €** (accent-300)
  - Tuntipalkkio — **000 €/h** *(placeholder)*
  - Päivystysaika (klo 18–08, viikonloput) — **000 €/h** *(placeholder)*
  - fine print: "Hinnat sisältävät arvonlisäveron 25,5 %. Matkakulut ja viranomaismaksut laskutetaan erikseen."
  Right, vertically centred: "Et tarvitse valmista käsitystä siitä, mikä näistä koskee sinua. Soita, niin kerron heti puhelimessa, kuka kulut todennäköisesti maksaa." + primary button `Soita ja kysy`.

**Asianajaja** — `padding: 0 56px 104px`, grid `minmax(0,380px) / 1fr`, `gap: 64px`, top-aligned. Left: a 460 px portrait in a `.lighten` wrapper, `border-radius: var(--radius-lg)`. Right: eyebrow `Asianajaja`, h2 `Adam Huhtamäki`, two 17 px paragraphs (`max-width: 62ch`) and a row of `.tag .tag-neutral` chips: Rikosoikeus · Pakkokeinot · Vahingonkorvaus · Riidanratkaisu · Suomen Asianajajaliitto.
- "Rikosoikeus on työni pääala. Avustan päämiehiä rikosasioissa ja vakavissa pakkokeinokysymyksissä, sekä epäillyn että asianomistajan puolella. Oikeudenkäyntejä on takana useita satoja käräjä- ja hovioikeuksissa."
- "Hoidan toimeksiannot itse. Tiedät koko ajan, kuka asiaasi ajaa ja missä vaiheessa se on — ja päivystysnumeroon vastaa asianajaja, ei vastaaja."

**UKK (FAQ)** — a full-bleed band, `padding: 104px 56px 112px`, hairline borders top and bottom, `overflow: hidden`.
- A background image is pinned to the **top 620 px only** (`position: absolute; top/left/right: 0; height: 620px`) so opening an answer does not stretch it. Over it: a `85deg` scrim from `rgba(22,24,38,.96)` to `rgba(22,24,38,.62)` on the same 620 px box, plus a fade strip (`top: 380px; height: 240px`) from transparent to `var(--color-bg)` that dissolves the image's bottom edge into the page.
- Content grid `0.8fr / 1.2fr`, `gap: 72px`. Left: eyebrow `Usein kysyttyä`, h2 (38 px, `max-width: 18ch`) `Neljä kysymystä, jotka tulevat aina ensin.`, paragraph `Jos oma tilanteesi ei ole listalla, soita. Vastaan nopeammin puhelimessa kuin verkkolomakkeella.`
- Right: four native `<details>` items, `padding: 22px 0`, separated by 1 px dividers (first has a top border, last also a bottom border). Summary: heading font, 19 px, `list-style: none`. Answer: 15.5 px / 1.7, `--color-neutral-300`.
  1. Poliisi kutsui kuulusteluun. Tarvitsenko avustajan? — "Kyllä. Kuulustelussa annetut lausumat kirjataan ja niihin vedotaan koko prosessin ajan. Sinulla on oikeus avustajaan jo ensimmäisessä kuulustelussa, ja se oikeus kannattaa käyttää."
  2. Läheiseni on otettu kiinni. Mitä teen nyt? — "Soita päivystysnumeroon. Kiinni otetulla on oikeus valita avustajansa, ja vangitsemisvaatimus käsitellään yleensä muutamassa vuorokaudessa. Nopealla toiminnalla on merkitystä."
  3. Voinko vaihtaa avustajaa kesken prosessin? — "Voit. Avustajan vaihtaminen on mahdollista prosessin kaikissa vaiheissa. Otan toimeksiantoja myös kesken esitutkinnan tai ennen hovioikeuskäsittelyä."
  4. Onko keskustelu luottamuksellista? — "On. Asianajajaa sitoo salassapitovelvollisuus myös silloin, kun toimeksianto ei synny. Älä kuitenkaan lähetä arkaluonteisia yksityiskohtia verkkolomakkeella — kerro ne puhelimessa."

**Yhteystiedot** (`id="yhteys"`, `scroll-margin-top: 74px`) — `padding: 84px 56px 96px`, `background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-neutral-900) 100%)`, top hairline. Grid `0.85fr / 1.15fr`, `gap: 72px`.
- Left: eyebrow `Yhteystiedot`, h2 `Ota yhteyttä.`, then three labelled blocks — `PÄIVYSTYS 24/7` + the number as a 27 px heading-font `tel:` link; `SÄHKÖPOSTI` + `mailto:`; `TOIMISTO` + address and "Tapaamiset myös etänä ja vankilassa".
- Right: the contact form — `padding: 38px 36px`, `border-radius: var(--radius-lg)`, `background: var(--color-bg)`, `box-shadow: var(--shadow-md)`, a two-column grid with `gap: 18px`. Fields use `.field` + `.input`:
  - Nimi (text, half width) · Puhelin (tel, half width)
  - Sähköposti (email, full width)
  - Asian laatu — `<select>`: Esitutkinta / Syyte / Oikeudenkäynti / Pakkokeino / Muu
  - Kiireellisyys — three `.radio` options: *Ei kiireellinen* (default) / *Kuulustelu tulossa* / *Kiinni otettu nyt*
  - Lyhyt kuvaus — `<textarea>` (`min-height: 90px`), placeholder "Mistä on kysymys ja missä vaiheessa asia on"
  - Fine print (12.5 px, `--color-neutral-500`): "Älä kirjoita lomakkeelle salassa pidettävää tai arkaluonteista tietoa. Kiireellisissä asioissa soita päivystysnumeroon."
  - Submit: `.btn .btn-primary`, full width, `Lähetä yhteydenottopyyntö`

**Footer** — `padding: 44px 56px`, `background: var(--color-neutral-900)`, top hairline, 13 px `--color-neutral-500`, space-between: `Asianajotoimisto Adam Huhtamäki · Y-tunnus 0000000-0` and links *Muut palvelut* · *Yhteystiedot* · *Tietosuoja*.

**Floating emergency button** — `position: fixed; right: 26px; bottom: 26px; z-index: 60`. Pill (`border-radius: 999px`), `padding: 15px 22px 15px 18px`, `background: var(--color-accent-900)`, `border: 1px solid var(--color-accent)`, `color: var(--color-accent-100)`, `box-shadow: 0 12px 34px rgba(0,0,0,.6)`, hover `--color-accent-800`. Contains the pulsing 10 px dot and two lines: `RIKOSPÄIVYSTYS` (10 px, `.18em`, accent-400) over `Soita 24/7` (heading font). Links to `tel:`.

### 2. Mobile front page (`Etusivu mobiili.dc.html`)

390 px wide (design width; fluid in production up to the desktop breakpoint). Same section order and same copy; the differences are structural:

- **Header**: `padding: 14px 20px`, solid `rgba(22,24,38,.9)` + `blur(14px)` with a bottom divider (no scroll reaction). Logo mark 26 px, wordmark 13.5 px over 8.5 px. Right side is a 44×44 icon button with a 1 px divider border and `--radius-md`.
- **Drawer**: full-width overlay panel anchored to the header (`position: absolute; top: 100%; left: 0; right: 0; z-index: 60`), `background: rgba(22,24,38,.97)`, `backdrop-filter: blur(18px)`, `box-shadow: 0 24px 60px rgba(0,0,0,.7)`. Five rows, `padding: 20px 22px`, divider between each: a 20 px heading-font label over a 12.5 px `--color-neutral-500` description, with an accent arrow icon on the right.
  - Rikosoikeus — "Vakavat rikokset, esitutkinta ja oikeudenkäynti"
  - Pakkokeinot — "Vangitseminen, takavarikko, salaiset pakkokeinot"
  - Vahingonkorvaus — "Korvausvaatimukset ja niiden torjunta"
  - Riidanratkaisu — "Käräjä- ja hovioikeusprosessit, sovinnot"
  - Yhteystiedot — "Yhteydenottopyyntö ja toimiston tiedot"
  Below the rows: label `RIKOSPÄIVYSTYS 24/7`, the number as a 24 px link, and a full-width primary button `Soita päivystykseen`.
  - Animation: the panel enters with `opacity 0→1` + `translateY(-14px→0)`, `220ms cubic-bezier(.2,.7,.2,1)`; rows stagger in with the same easing at 40/80/120/160/200 ms delays. The hamburger cross-fades to an X — the two icons swap `opacity` and rotate ±90° with `scale(.8)` over 180–260 ms — and the button's border and glyph turn accent while open.
- **Hero**: `min-height: 620px`, no negative top margin (the header is opaque), one bottom-up scrim `linear-gradient(to top, var(--color-bg) 4%, rgba(22,24,38,.9) 52%, rgba(22,24,38,.62) 100%)`, text block `padding: 90px 20px 44px`, h1 38 px, buttons stacked full width (`padding: 15px 20px`).
- **Emergency band**: `padding: 40px 20px`, single column, h2 27 px, number card `padding: 22px 20px` with a flat 1 px divider instead of the fading rule.
- **Audience cards**: stacked, `gap: 16px`, image height 190 px, body `padding: 24px 22px 28px`.
- **Erikoisalat**: heading left-aligned (right-alignment is desktop-only); the two panels become full-width rows separated by 1 px dividers, `padding: 26px 0`, h3 26 px; the `Lisäksi` links stack.
- **Backdrop**: same treatment scaled down — 340 px and 380 px glows, two paths in a `0 0 390 900` viewBox, `opacity: .65`.
- **Hinnasto**: single column; the three cards stack (tags keep `align-self: flex-start`); rate rows and fine print as desktop; primary button `Soita ja kysy` at the end.
- **Asianajaja**: portrait 320 px above the text.
- **UKK**: background image pinned to the top 420 px with a top-down scrim to `var(--color-bg)`; summaries 16.5 px.
- **Yhteystiedot**: single-column form, every control `min-height: 46px`, radios stacked.
- **Footer**: `padding: 32px 20px 88px` (the bottom padding clears the floating button), links wrap in a row.
- **Floating button**: bottom-right, compact — 172 px wide, `padding: 14px 16px`, pulsing dot + `Soita 24/7`.

## Interactions & behaviour

- **Scroll-reactive header (desktop)**: a passive `scroll` listener toggles a boolean at `scrollY > 24`; that flips background / blur / border as described. Debouncing is unnecessary — the handler only calls state when the boolean actually changes. Respect `prefers-reduced-motion` by dropping the transition, not the state change.
- **Nav dropdown / FAQ / mobile drawer** are all native `<details>`/`<summary>` in the prototype — no JS. Keep them keyboard-operable and add `aria-expanded` semantics if you reimplement them as buttons. Closing the menu when a link is clicked or on outside click is expected in production (the prototype does not implement it).
- **Anchors**: in-page links `#palkkiot` and `#yhteys` scroll with `scroll-margin-top` of 90 px (desktop) / 76 px (mobile) so the sticky header does not cover the heading.
- **Emergency CTAs**: every phone CTA is a `tel:` link — header button, hero primary, emergency band number, contact block, floating button, drawer. On desktop the floating button sits bottom-right at all times; keep it out of the way of any future cookie banner.
- **Hover states**: nav links and footer links → accent; panels → `--color-neutral-900`; dropdown rows → `--color-accent-900`; buttons use the design system's built-in `.btn` hover/active tints. Do not restyle them per component.
- **Focus**: the design system's `:focus-visible` accent ring must survive the port.
- **Pulse animation**: `pulseRing`, 2.4 s ease-out infinite, on the emergency dots. Suppress under `prefers-reduced-motion: reduce`.
- **Form**: the prototype does not submit. Production needs required-field validation on Nimi + (Puhelin or Sähköposti), a success state and spam protection. Because the fine print tells users not to send confidential detail, do **not** add file uploads.
- **Responsive**: build one page. Below ~900 px switch to the mobile specification: single column, stacked cards, drawer nav, compact floating pill, 20 px page padding. Between the two, the desktop grids already collapse on their own (`auto-fit` + `minmax`).

## State management

Minimal — this is a marketing page.
- `headerScrolled: boolean` (desktop header treatment).
- Disclosure state for the nav dropdown, the mobile drawer and each FAQ item (native `<details>` gives this for free).
- Contact-form field values + validation/submission status (`idle | submitting | sent | error`).
- No data fetching. If the phone number, address or rates come from a CMS, they should be a single source of truth — the number appears in six places.

## Placeholder content — must be replaced before launch

| Placeholder | Where |
| --- | --- |
| `+358 40 000 0000` | header CTA, hero, emergency band, contact block, floating button, mobile drawer |
| `adam@huhtamaki.fi` | contact block, footer area |
| `Osoite 1, 00100 Helsinki` | contact block |
| `Y-tunnus 0000000-0` | footer |
| `000 €/h` (×2) | Hinnasto rate list |
| `Tietosuoja` link target | footer (`#`) |

Also confirm the VAT figure (25.5 %) and the emergency-hours window (18–08, weekends) with the client.

## Assets

- **Raven logo** — the mark in the prototype is a rough hand-drawn SVG silhouette standing in for the client's real logo (a black raven). Replace it with the supplied asset; keep it monochrome `currentColor` so it works on both the transparent and the tinted header.
- **Photography** — five image positions (desktop hero, two audience cards, portrait, FAQ band) and their mobile counterparts. In the prototype these are drag-and-drop placeholder slots (`image-slot.js`, prototype-only — do not port). Supply real photos: dark or black-background shots, because they are composited with `mix-blend-mode: lighten` (`.lighten`) and light backgrounds will wash out. The FAQ and hero images sit under scrims, so pick low-detail frames.
- **Icons** — chevron, arrow, hamburger and close are inline stroked SVGs at `stroke-width: 1.8–2.2`, matching Phosphor. Use Phosphor in production.
- **Font** — Inter, weights 300/400/500/600. Self-host in production rather than loading from Google Fonts.

## Out of scope

The rest of the site is not designed yet. For every link that leads outside the front page — `Rikosoikeus`, `Pakkokeinot`, `Palvelut#vahingonkorvaus`, `Palvelut#riidanratkaisu`, `Tietosuoja` — render a placeholder page reading **"This page is under construction"**, styled with the same header, footer and tokens so the placeholder still looks like the site. Keep the URLs stable so they don't have to change when the real pages land.

## Files in this bundle

| File | What it is |
| --- | --- |
| `Etusivu.dc.html` | Desktop front page prototype — the source of truth for the desktop layout |
| `Etusivu mobiili.dc.html` | Mobile (390 px) front page prototype |
| `design-system/styles.css` | The Nocturne stylesheet — tokens + component layer. **Port this.** |
| `design-system/readme.md` | The written design-system guide (direction, color, type, do/don't) |
| `design-system/_ds_bundle.js` | Design-system bundle loaded by the prototypes; no components in it |
| `support.js` | Prototype runtime. **Do not port.** |
| `image-slot.js` | Prototype image-placeholder component. **Do not port.** |

To view a prototype, open the `.dc.html` file directly in a browser from a folder that also contains `support.js`, `image-slot.js` and `design-system/` — note the prototypes reference the stylesheet at `_ds/nocturne-c916e4a5-f3f6-4a97-928c-b65ba2c25ab9/styles.css`, so either recreate that path or repoint the two `<link>`/`<script>` tags at `design-system/`.
