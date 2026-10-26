# Handoff: Vahingonkorvaus (desktop + mobile)

## Overview

The Vahingonkorvaus service page. Two prototypes, same content, same tokens:

| File | Viewport |
| --- | --- |
| `Vahingonkorvaus.dc.html` | desktop, fluid, content capped at 1400px |
| `Vahingonkorvaus mobiili.dc.html` | 390px |

Design system: **Nocturne** (`_ds/nocturne-…/styles.css`). Every color, radius, shadow and font comes from its tokens — no hard-coded hex or font names. The header, mobile drawer, floating call pill and footer are shared with the other service pages and specified in `design_handoff_frontpage/README.md` and `design_handoff_frontpage/FOOTER.md`.

All body copy is client-supplied, final, and must ship **verbatim** — the full text is in § Copy at the end, which is the authoritative version. The page speaks in the **first person singular** ("hoidan", "laadin", "torjun", "varmistan"); keep any new copy in that voice.

## Section order

Shared service-page skeleton, no Rikospäivystys band:

1. Header (shared)
2. Hero — background photo + scrim, headline, lede, "Päivitetty" stamp
3. **Korvausasiat, joita hoidan** — two numbered blocks
4. **Usein kysytyt kysymykset vahingonkorvauksista** — three accordions on a photo band
5. **Ota yhteyttä** — contact details + enquiry form (`id="yhteys"`)
6. Footer (shared) + floating "Soita 24/7" pill

The services section follows the same two-block pattern as Riidanratkaisu, but **without** that page's abstract CSS ground — the decorative field is specific to Riidanratkaisu and should not be copied here. This page's own signature is the paired-role treatment in block 01.

## 1. Hero

Desktop: `position: relative; overflow: hidden`, bottom hairline. Three layers — full-bleed `image-slot` (`vk-hero-bg`), scrim, content.

Scrim: `linear-gradient(100deg, rgba(22,24,38,0.97) 0%, rgba(22,24,38,0.92) 46%, rgba(22,24,38,0.72) 100%)`. Light comes from the right on every page; keep it.

Content wrapper: `padding: 88px 56px 80px; max-width: 1400px`, grid `minmax(0,1.35fr) minmax(0,1fr)`, `gap: 72px`, `align-items: center`.

| Element | Spec |
| --- | --- |
| Kicker | 34px accent hairline + "Erikoisala — Vahingonkorvaus", 11.5px, `.24em`, uppercase, `--color-accent` |
| H1 | 52px, weight 500, `line-height: 1.08`, `letter-spacing: -0.025em`, `max-width: 24ch` |
| Lede | 18px / 1.7, `--color-neutral-200`, `max-width: 58ch` |
| Päivitetty stamp | 11.5px, `.18em`, uppercase, `--color-neutral-500` + dashed date chip |

H1 is 52px rather than 56px because the client's title carries a colon and a long second clause; it must stay at three lines or fewer at 1400px. There is no region line on this page — the client's text does not claim one, so nothing was invented.

`[TÄYDENNÄ: …]` chips render as `padding: 2px 8px; border: 1px dashed var(--color-accent-700); border-radius: var(--radius-sm); color: var(--color-accent-300)`. Prototype scaffolding — the chip disappears with the value.

Right column: 4:5 portrait in `.lighten` (`vk-hero`), `border-radius: var(--radius-md)`. Content photograph, so `.lighten`; the background sits under the scrim and never does.

Mobile: one column, `min-height: 560px`, content bottom-aligned, `padding: 80px 20px 40px`, background from `image-slot` `m-vk-hero-bg`. Scrim is vertical: `linear-gradient(to top, var(--color-bg) 4%, rgba(22,24,38,0.9) 52%, rgba(22,24,38,0.62) 100%)`. H1 33px. No portrait. Two buttons after the stamp: primary `#yhteys`, secondary `tel:` — the civil-page order, form before phone, as on Riidanratkaisu.

## 2. Korvausasiat, joita hoidan

`padding: 96px 56px 104px; max-width: 1400px`. Header row: H2 36px (`max-width: 24ch`) left, kicker "Vaatimus tai vastanäyttö" (11.5px, `.24em`, uppercase, accent) right, `margin-bottom: 60px`.

Both blocks: `grid-template-columns: minmax(0,340px) minmax(0,1fr); gap: 40px 64px; padding-top: 32px`, each with its **own** `border-top` — `--color-accent-700` for 01, `--color-accent-800` for 02, so the pair reads as a sequence rather than a list. Left column: number (`--font-heading`, 12px, `.22em`, accent) + H3 28px. Right column: prose 16.5px / 1.75 `--color-neutral-200`, `max-width: 68ch`.

**Block 01 — the paired roles.** Two cards, `repeat(auto-fit, minmax(290px, 1fr))`, `gap: 24px`, `border: 1px solid var(--color-divider); border-radius: var(--radius-md); background: var(--color-surface); padding: 24px 26px 26px`. Each opens with an uppercase accent label (Asianomistaja / Vastaaja), then a 19px title and 15px body.

The two cards must stay **visually equal** — same fill, same border, same label treatment, side by side at the same width. The page's argument is that the office works both sides of the table; giving either card more weight would undercut the copy.

**Block 02 — the urgency line.** Two paragraphs: the first ordinary prose, the second set on `padding-left: 28px; border-left: 1px solid var(--color-accent-800)` at `--color-neutral-100`, `max-width: 64ch`. That rule is the page's one emphasised passage. Nothing else on the page takes an accent rule.

Mobile: kicker above H2, blocks stacked, `padding-top: 24px` per block, H3 23px, cards full width in a single column with `gap: 14px`, quoted paragraph rule inset 18px.

## 3. Usein kysytyt kysymykset vahingonkorvauksista

A photo band: `position: relative; overflow: hidden; padding: 96px 56px 104px`, top hairline, full-bleed `image-slot` (`vk-ukk-bg`) + 100° scrim `rgba(22,24,38,0.97) → 0.93 (52%) → 0.74`. Content `max-width: 1080px`, H2 36px, `margin-bottom: 46px`.

Three `<details data-faq>` accordions, each `border-top: 1px solid var(--color-divider)`; a closing empty `div` with the same border finishes the list so the last row is ruled on both sides.

- Summary: `list-style: none`, flex row, `gap: 32px`, `padding: 24px 0`, 19px / 1.35; question capped at 62ch
- Icon: 16px plus glyph in `--color-accent`, `rotate(45deg)` when open (200ms) — a plus becoming a cross, never a chevron
- Answer: 15.5px / 1.75, `--color-neutral-300`, `max-width: 78ch`, `margin-bottom: 26px`
- Hover on the summary lifts it to `--color-accent-200`; `::-webkit-details-marker` hidden

Native `<details>`, no JavaScript. All closed by default and independently openable. No `[TÄYDENNÄ]` chips in this FAQ — all three answers are complete as delivered.

Mobile: `padding: 48px 20px 52px`, background `m-vk-ukk-bg`, scrim at 120° and denser (`0.97 → 0.94 → 0.82`), summary 16.5px, answer 14.5px, `gap: 18px`.

## 4. Ota yhteyttä

`id="yhteys"`, `scroll-margin-top: 74px` (68px mobile). `background: var(--color-bg)`, top hairline, grid `0.85fr 1.15fr`, `gap: 72px`: contact details left, form card right (`--color-surface` fill, `--color-divider` hairline, `--radius-lg`, `--shadow-sm`).

As on Riidanratkaisu the phone label is **Puhelin**, not "Päivystys 24/7", and the office line reads "Tapaamiset myös etänä" without the prison reference.

Option lists specific to this page:

- **Asian laatu**: Korvausvaatimus rikosasiassa · Korvausvaatimuksen torjunta · Yrityssalaisuus tai taloudellinen vahinko · Muu vahingonkorvausasia
- **Roolisi asiassa**: Vahinkoa kärsinyt · Vaatimuksen kohde · Yritys

That second group mirrors block 01's premise: the visitor may be on either side. Keep all three options and keep them in this order.

Ids are prefixed `v-` (desktop) and `vm-` (mobile), radio group `v-rooli` / `vm-rooli` — unique per page so pages can sit side by side without id collisions.

The first radio of each group carries `defaultChecked="{{ true }}"` (JSX camelCase, uncontrolled). A bare `checked` attribute breaks the group in this runtime: the option renders unselected *and* becomes unselectable. If the markup is ported to plain HTML, `checked` is correct again — but in the prototype it must stay `defaultChecked`.

The form is **not wired**. Submit is `type="button"`. Needs an endpoint, validation, spam protection, success and error states, and a privacy notice link. The warning above the button must survive.

Mobile: single column throughout, fields full width, radios stacked.

## Image slots

Every slot is a prototype-only drag-and-drop placeholder (`image-slot.js`) with a stable id, so a dropped file survives reload. In production these are ordinary `<img>`/CMS fields. Desktop and mobile use **different ids**, so a drop on one does not appear on the other.

| Slot | Desktop id | Mobile id | Treatment |
| --- | --- | --- | --- |
| Hero background | `vk-hero-bg` | `m-vk-hero-bg` | under scrim, no `.lighten` |
| Hero portrait | `vk-hero` | — | `.lighten`, 4:5 |
| FAQ band | `vk-ukk-bg` | `m-vk-ukk-bg` | under scrim, no `.lighten` |
| Footer | `footer-bg-vk` | `footer-bg-vk-m` | under scrim, no `.lighten` |

The rule: a photograph the reader is meant to look at goes through `.lighten`; a photograph that is only a ground goes under a scrim and never through `.lighten`. Prefer subjects shot on dark or black backgrounds.

The services section needs no photography and should not get any — the two-block layout carries itself, and adding card images here would collapse the distinction between this page and the Rikosoikeus/Pakkokeinot card grids. Existing project images (`assets/neuvottelu.jpeg`, `assets/piirustukset.jpeg`) are candidates for the hero and FAQ grounds if no new photography is commissioned.

## Behaviour

- No page JavaScript. The nav dropdown, mobile drawer and FAQ are native `<details>`.
- The floating call pill is `position: fixed` and always visible. Mobile bottom padding clears it; do not reduce it.
- `:focus-visible` accent ring from the design system must survive on every link, input, summary and button.
- The phone number appears six times on desktop (header, contact block, footer button, footer column, pill) and seven on mobile (plus the hero secondary button and the drawer). One CMS field feeds all of them.

## Open items

| Item | Where |
| --- | --- |
| `[TÄYDENNÄ: pp.kk.vvvv]` | hero "Päivitetty" stamp — wire to the CMS modified date |
| `+358 40 000 0000`, `adam@huhtamaki.fi`, `Osoite 1, 00100 Helsinki` | throughout |
| `Y-tunnus 0000000-0`, Tietosuojaseloste target | footer |
| Six photographs (hero ground + portrait, FAQ band, footer ground, × two viewports where ids differ) | see table above |
| Form endpoint and states | Ota yhteyttä |

Also confirm whether the Asianajajaliitto membership wording may stand as written.

---

# Copy

Verbatim, in page order. This is the text to build against; where a prototype and this section disagree, this section wins. `[TÄYDENNÄ: …]` marks a value the client still owes.

**Page stamp**

> Päivitetty: [TÄYDENNÄ: pp.kk.vvvv]

## Hero

**Kicker**

> Erikoisala — Vahingonkorvaus

**H1**

> Vahingonkorvaus: Vaatimusten laatiminen ja torjuminen

**Lede**

> Vahingonkorvausoikeus vaatii tekijältään tarkkaa näyttötaakkojen hallintaa ja vahingon määrän oikeaa arviointia. Hoidan vaativia vahingonkorvausasioita sekä siviili- että rikosasioissa. Laadin perusteltuja korvausvaatimuksia vahinkoa kärsineille ja torjun päämiehiini kohdistettuja perusteettomia vaatimuksia oikeudessa.

**Buttons (mobile only)**

> Jätä yhteydenottopyyntö · Soita +358 40 000 0000

## Korvausasiat, joita hoidan

**Kicker**

> Vaatimus tai vastanäyttö

### 01 Vahingonkorvaukset rikosasioissa

> Rikosasiassa vahingonkorvausten käsittely on usein yhtä merkittävässä roolissa kuin itse rangaistusvaatimus. Toimin rikosprosesseissa molemmilla puolella pöytää:

**Asianomistaja — Asianomistajan (uhrin) avustaminen**

> Kun olet joutunut rikoksen uhriksi, laadin puolestasi yksilöidyn vahingonkorvausvaatimuksen ja ajan sitä käräjäoikeudessa. Varmistan, että saat täyden korvauksen aiheutuneista kuluista, kivusta ja särystä sekä henkisestä kärsimyksestä.

**Vastaaja — Vastaajan (epäillyn) avustaminen**

> Rikoksesta syytetylle esitetään usein rangaistuksen lisäksi mittavia korvausvaatimuksia. Pyrin aktiivisella vastanäytöllä torjumaan nämä vaatimukset joko kokonaan perusteettomina tai vaikuttamaan korvaussummien tuntuvaan alentamiseen.

### 02 Yrityssalaisuusrikokset ja taloudelliset vahingot

> Kun yrityksen liikesalaisuuksia on loukattu tai väärinkäytetty, seurauksena on poikkeuksetta huomattavia taloudellisia menetyksiä. Yrityssalaisuusjutuissa avainasemassa on nopeus.

> Kun yhtiö on joutunut rikoksen uhriksi, näytön kerääminen aiheutuneista vahingoista on aloitettava välittömästi. Varmistan heti toimeksiannon aluksi, että digitaalinen ja asiakirjanäyttö turvataan oikeaoppisesti, jotta täysimääräinen vahingonkorvaus voidaan myöhemmin menestyksekkäästi vaatia tuomioistuimessa.

## Usein kysytyt kysymykset vahingonkorvauksista

**Mitä kuluja rikoksen uhri voi vaatia korvattavaksi?**

> Rikosasiassa asianomistaja voi vaatia korvausta suorista esine- ja omaisuusvahingoista, sairaanhoito- ja terapiakuluista, ansionmenetyksestä sekä kivusta, särystä ja kärsimyksestä oikeuskäytännön mukaisten taulukoiden mukaisesti.

**Miten toimin, jos yritykseni liikesalaisuuksia on viety?**

> Ota välittömästi yhteyttä asianajajaan. Älä tee omia tutkintatoimenpiteitä, jotka voisivat vaarantaa todistusaineiston eheyden. Asianajaja huolehtii näytön turvaamisesta, tarvittavista poliisitoimista ja vahingonkorvausprosessin käynnistämisestä.

**Milloin vahingonkorvausvaatimus pitää esittää?**

> Rikosasiassa korvausvaatimus on suositeltavaa esittää pääpiirteissään jo poliisin esitutkinnassa, mutta se on yksilöitävä ja toimitettava tuomioistuimelle viimeistään ennen käräjäoikeuden pääkäsittelyä.

## Ota yhteyttä

**Kicker / H2**

> Yhteystiedot · Ota yhteyttä.

**Contact block**

> Puhelin — +358 40 000 0000
>
> Sähköposti — adam@huhtamaki.fi
>
> Toimisto — Osoite 1, 00100 Helsinki / Tapaamiset myös etänä

**Form**

Labels: Nimi · Puhelin · Sähköposti · Asian laatu · Roolisi asiassa · Lyhyt kuvaus

Placeholders: Etu- ja sukunimi · +358 · nimi@esimerkki.fi · Mistä on kysymys ja missä vaiheessa asia on

Asian laatu options: Korvausvaatimus rikosasiassa · Korvausvaatimuksen torjunta · Yrityssalaisuus tai taloudellinen vahinko · Muu vahingonkorvausasia

Rooli options: Vahinkoa kärsinyt · Vaatimuksen kohde · Yritys

Notice above the button:

> Älä kirjoita lomakkeelle salassa pidettävää tai arkaluonteista tietoa.

Button:

> Lähetä yhteydenottopyyntö

## Header, drawer and footer (shared)

> Rikospäivystys 24/7 (header button) · Soita 24/7 (floating pill) · Rikospäivystys (pill label)

> Mobile drawer: Rikosoikeus / Vakavat rikokset, esitutkinta ja oikeudenkäynti · Pakkokeinot / Vangitseminen, takavarikko, salaiset pakkokeinot · Vahingonkorvaus / Korvausvaatimukset ja niiden torjunta · Riidanratkaisu / Käräjä- ja hovioikeusprosessit, sovinnot · Yhteystiedot / Yhteydenottopyyntö ja toimiston tiedot · Rikospäivystys 24/7 — Soita päivystykseen

> Rikosasioiden puolustus ja pakkokeinoasiat. Päivystys vuorokauden ympäri koko Suomessa. (footer)

> Soita rikospäivystykseen (footer button) · Suomen Asianajajaliiton jäsen · © 2026 Asianajotoimisto Adam Huhtamäki Oy · Y-tunnus 0000000-0 · Palvelu suomeksi, ruotsiksi ja englanniksi
