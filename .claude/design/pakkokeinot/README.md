# Handoff: Pakkokeinot (desktop + mobile)

## Overview

The Pakkokeinot service page. Two prototypes, same content, same tokens:

| File | Viewport |
| --- | --- |
| `Pakkokeinot.dc.html` | desktop, fluid, content capped at 1400px |
| `Pakkokeinot mobiili.dc.html` | 390px |

Design system: **Nocturne** (`_ds/nocturne-…/styles.css`). Every color, radius, shadow and font comes from its tokens — no hard-coded hex or font names. The header, the floating call pill and the footer are shared with the front page and the Rikosoikeus page; they are specified in `design_handoff_frontpage/README.md` and `design_handoff_frontpage/FOOTER.md`. This document covers only what is specific to this page.

All body copy is client-supplied, final, and must ship **verbatim** — the full text is reproduced in § Copy at the end of this document, which is the authoritative version. Do not re-write it for SEO or tone. The page speaks in the **first person singular** throughout ("puutun", "hoidan", "riitautan"); keep any new copy in that voice.

## Section order

Same on both viewports. This page is shorter than Rikosoikeus by design: the reader is likely in an acute situation, so the argument for acting fast comes second, before the service detail.

1. Header (shared)
2. Hero — background photo + scrim, headline, lede
3. **Quote band** — the client's statement on Finnish court practice, on the indigo `--color-section` ground
4. **Pakkokeinoasiat, joita hoidan** — three service cards
5. **Usein kysytyt kysymykset pakkokeinoista** — three accordions
6. **Ota yhteyttä** — contact details + enquiry form (`id="yhteys"`)
7. Footer (shared) + floating "Soita 24/7" pill

There is no Rikospäivystys band on this page. The quote band already occupies the one saturated field a page may carry; a second one would flatten both.

## 1. Hero

Desktop: `position: relative; overflow: hidden`, bottom hairline. Three layers — a full-bleed `image-slot` (`pakko-hero-bg`), a non-interactive scrim, then the content.

Scrim: `linear-gradient(100deg, rgba(22,24,38,0.97) 0%, rgba(22,24,38,0.92) 46%, rgba(22,24,38,0.72) 100%)` — the same 100° angle as the footer. Light comes from the right on every page; keep it.

Content wrapper: `padding: 88px 56px 80px; max-width: 1400px`, grid `minmax(0,1.35fr) minmax(0,1fr)`, `gap: 72px`, `align-items: center`.

| Element | Spec |
| --- | --- |
| Kicker | 34px accent hairline + "Erikoisala — Pakkokeinot", 11.5px, `.24em`, uppercase, `--color-accent` |
| H1 | 52px, weight 500, `line-height: 1.08`, `letter-spacing: -0.025em`, `max-width: 26ch` |
| Lede | 18px / 1.7, `--color-neutral-200`, `max-width: 58ch`, contains one `[TÄYDENNÄ]` chip |

The H1 is one type size smaller than the Rikosoikeus H1 because the sentence is longer; it must stay at three lines or fewer at 1400px.

Right column: a 4:5 portrait in `.lighten` (`pakko-hero`), `border-radius: var(--radius-md)`. Content photograph, so it goes through `.lighten` — unlike the background, which sits under the scrim.

`[TÄYDENNÄ: …]` chips render as `padding: 1px 7px; border: 1px dashed var(--color-accent-700); border-radius: var(--radius-sm); font-size: 0.9em; color: var(--color-accent-300); white-space: nowrap`. They are prototype scaffolding — when the value arrives, the chip disappears with it.

Mobile: one column, `min-height: 560px`, content bottom-aligned, `padding: 80px 20px 40px`, background from `image-slot` `m-pakko-hero-bg`. Scrim is vertical, not 100°: `linear-gradient(to top, var(--color-bg) 4%, rgba(22,24,38,0.9) 52%, rgba(22,24,38,0.62) 100%)`, so the copy sits on near-solid ground. H1 33px. No portrait. Two buttons after the lede: primary `tel:`, secondary `#yhteys`.

## 2. Quote band

The one saturated field on the page: `background: var(--color-section)` with `radial-gradient(120% 140% at 12% 0%, var(--color-section-glow) 0%, var(--color-section) 58%)`, hairlines top and bottom at `rgba(233,233,237,0.08)`, `padding: 76px 56px`.

- Quote: `<blockquote>`, `padding-left: 30px`, `border-left: 1px solid var(--color-accent-500)`, 26px / 1.5, weight 400, `--color-text`, `max-width: 1100px`. The typographic quotation marks are part of the client's text; keep them rather than adding CSS quotes.
- Follow-up line: 17px / 1.7, `--color-accent-200`, `padding-left: 31px` so it hangs off the same optical edge as the quote, `max-width: 62ch`.

Do not set the quote in italics or bump it past weight 400 — in this system a quote is carried by size, the accent rule and the ground.

Mobile: `padding: 44px 20px`, quote 19px, rule inset 18px, follow-up 15px.

## 3. Pakkokeinoasiat, joita hoidan

Header row: `display: flex; flex-wrap: wrap; gap: 24px 64px; align-items: baseline; justify-content: space-between` — H2 36px (`max-width: 24ch`) left, kicker "Kiinniotosta takavarikon kumoamiseen" (11.5px, `.24em`, uppercase, accent) right.

Cards: `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px` — three across at 1400px, one on mobile. Each card:

- `border: 1px solid var(--color-divider); border-radius: var(--radius-md); background: var(--color-surface); overflow: hidden`
- 16:10 `image-slot` at the top in `.lighten`, square corners (the card's `overflow: hidden` rounds it)
- `padding: 26px 26px 30px`, `gap: 12px`
- Number 01–03: `--font-heading`, 12px, `.1em`, `--color-accent`, baseline-aligned with the title
- Title 21px, weight 500; body 14.5px / 1.7, `--color-neutral-300`

Card bodies are uneven in length (01 is roughly twice 02). Do not pad the short ones or trim the long one; the grid stretches the cards to a shared height and the ragged text bottoms are acceptable.

Order is fixed: 01 Vangitsemisvaatimukset ja matkustuskielto · 02 Takavarikko ja vakuustakavarikko · 03 Kotietsintä ja salaiset pakkokeinot.

Mobile: kicker above the H2, cards stacked, `gap: 18px`, 16:9 images, title 19px, body 14px.

## 4. Usein kysytyt kysymykset pakkokeinoista

Unlike the Rikosoikeus FAQ this one sits on plain `--color-bg` — no photo band. It opens with the fading hairline (`linear-gradient(to right, transparent, var(--color-divider) 48px, … , transparent)`, `margin-bottom: 72px`) and is capped at `max-width: 1080px`. H2 36px, `margin-bottom: 46px`.

Three `<details data-faq>` accordions, each `border-top: 1px solid var(--color-divider)`; a closing empty `div` with the same border finishes the list so the last row is ruled on both sides.

- Summary: `list-style: none`, flex row, `gap: 32px`, `padding: 24px 0`, 19px / 1.35; question capped at 62ch
- Icon: 16px plus glyph in `--color-accent`, `rotate(45deg)` when open (200ms) — a plus becoming a cross, never a chevron
- Answer: 15.5px / 1.75, `--color-neutral-300`, `max-width: 78ch`, `margin-bottom: 26px`, fades in
- Hover on the summary lifts it to `--color-accent-200`; `::-webkit-details-marker` is hidden

Native `<details>`, no JavaScript. All closed by default and independently openable — these are reference answers, not a wizard. Answer 1 carries a `[TÄYDENNÄ]` chip; the statutory deadline must be verified before launch, not guessed.

Mobile: `id="ukk"` sits on this section, `padding: 48px 20px 52px`, summary 16.5px, answer 14.5px, `gap: 18px`.

## 5. Ota yhteyttä

Same pattern as the other pages, with `id="yhteys"` and `scroll-margin-top: 74px` (68px mobile) so the sticky header never covers the heading. `background: var(--color-bg)`, top hairline, grid `0.85fr 1.15fr`, `gap: 72px`: contact details left, form card right (`--color-surface` fill, `--color-divider` hairline, `--radius-lg`, `--shadow-sm`).

Form fields use the design system's `.field` / `.input` / `.radio` classes as-is. Ids are prefixed `p-` (desktop) and `pm-` (mobile), radio group `p-kiire` / `pm-kiire` — unique per page so pages can be embedded side by side without id collisions.

Two option lists differ from the Rikosoikeus form:

- **Asian laatu**: Vangitsemisvaatimus · Matkustuskielto · Takavarikko · Kotietsintä · Salaiset pakkokeinot · Muu
- **Kiireellisyys**: Ei kiireellinen · **Istunto tulossa** · Kiinni otettu nyt

The form is **not wired**. The submit button is `type="button"`. Needs: an endpoint, validation, spam protection, a success and an error state, and a privacy notice link. The standing warning above the button ("Älä kirjoita lomakkeelle salassa pidettävää…") must survive.

Mobile: single column throughout, fields full width, radios stacked.

## Image slots

Every slot is a prototype-only drag-and-drop placeholder (`image-slot.js`) with a stable id, so a dropped file survives reload. In production these are ordinary `<img>`/CMS fields. Desktop and mobile use **different ids**, so a drop on one does not appear on the other.

| Slot | Desktop id | Mobile id | Treatment |
| --- | --- | --- | --- |
| Hero background | `pakko-hero-bg` | `m-pakko-hero-bg` | under scrim, no `.lighten` |
| Hero portrait | `pakko-hero` | — | `.lighten`, 4:5 |
| Service cards 1–3 | `pakko-ala-1…3` | `m-pakko-ala-1…3` | `.lighten`, 16:10 / 16:9 |
| Footer | `footer-bg-pakko` | `footer-bg-pakko-m` | under scrim, no `.lighten` |

The rule: a photograph the reader is meant to look at goes through `.lighten`; a photograph that is only a ground goes under a scrim and never through `.lighten`. Prefer subjects shot on dark or black backgrounds.

If the photography budget is tight, cut the three card images first — the cards work as type-only blocks — and keep the hero and footer grounds.

## Behaviour

- No page JavaScript. The nav dropdown, the mobile drawer and the FAQ are native `<details>`; everything else is static markup and CSS transitions.
- The floating call pill is `position: fixed` and always visible. Mobile bottom padding is sized to clear it; do not reduce it.
- `:focus-visible` accent ring from the design system must survive on every link, input, summary and button.
- The phone number appears seven times on this page (header, contact block, footer button, footer column, pill, and on mobile the hero button and the drawer). One CMS field feeds all of them.

## Open items

| Item | Where |
| --- | --- |
| `[TÄYDENNÄ: paikkakunta/alue]` | hero lede |
| `[TÄYDENNÄ: esim. neljäntenä päivänä]` | FAQ answer 1 — verify against the Coercive Measures Act before launch |
| `+358 40 000 0000`, `adam@huhtamaki.fi`, `Osoite 1, 00100 Helsinki` | throughout |
| `Y-tunnus 0000000-0`, Tietosuojaseloste target | footer |
| Five photographs (six with the mobile hero) | see table above |
| Form endpoint and states | Ota yhteyttä |

Also confirm whether the Asianajajaliitto membership wording may stand as written.

---

# Copy

Verbatim, in page order. This is the text to build against; where a prototype and this section disagree, this section wins. `[TÄYDENNÄ: …]` marks a value the client still owes.

## Hero

**Kicker**

> Erikoisala — Pakkokeinot

**H1**

> Pakkokeinot: Asianajaja apunasi vangitsemis- ja takavarikkoasioissa

**Lede**

> Pakkokeinot, kuten vangitseminen, matkustuskielto tai omaisuuden takavarikko, ovat vakavia puuttumisia yksilön perusoikeuksiin. Rikosasianajajana tehtäväni on puuttua perusteettomiin pakkokeinovaatimuksiin välittömästi ja turvata oikeutesi rikosprosessin jokaisessa vaiheessa. Hoidan pakkokeinoasioita [TÄYDENNÄ: paikkakunta/alue] alueella ja tarvittaessa koko Suomessa.

**Buttons (mobile only)**

> Soita päivystykseen 24/7 · Jätä yhteydenottopyyntö

## Quote band

**Quote**

> ”Suomessa tuomioistuimet hyväksyvät poliisin pakkokeinovaatimukset lähes poikkeuksetta. Välittömällä puuttumisella ja oikealla taktiikalla onnistun kuitenkin säännöllisesti kääntämään asetelman ja kaatamaan huomattavan osan päämiehiini kohdistuvista vaatimuksista.”

**Follow-up**

> Mitä aiemmin asianajaja on mukana, sitä tehokkaammin poliisin esittämät perusteet voidaan kyseenalaistaa tuomioistuimessa.

## Pakkokeinoasiat, joita hoidan

**Kicker**

> Kiinniotosta takavarikon kumoamiseen

**01 Vangitsemisvaatimukset ja matkustuskielto**

> Vangitseminen on pakkokeinoista ankarin. Kun poliisi esittää vangitsemisvaatimuksen, laadin siihen välittömästi vastineen ja edustan sinua käräjäoikeuden pakkokeinoistunnossa. Kyseenalaistan vangitsemisen edellytykset ja suhteellisuuden, ja vaadin säännöllisesti vangitsemisasian uudelleenkäsittelyä. Useissa tapauksissa pystymme korvaamaan vangitsemisen lievemmällä vaihtoehdolla, kuten matkustuskiellolla.

**02 Takavarikko ja vakuustakavarikko**

> Omaisuuden takavarikointi tai yrityksen varojen asettaminen vakuustakavarikkoon voi halvaannuttaa liiketoiminnan tai vaikeuttaa arkea kohtuuttomasti. Riitautan laittomat ja tarpeettomasti pitkittyneet takavarikot. Vaadin niiden kumoamista käräjäoikeudessa heti, kun takavarikon jatkamiselle ei ole enää laillisia perusteita.

**03 Kotietsintä ja salaiset pakkokeinot**

> Poliisin suorittama kotietsintä tai yrityksen tiloihin kohdistuva etsintä on aina voimakas toimenpide. Varmistan ja tarkastan jälkikäteen, onko suoritettu kotietsintä ollut lainmukainen. Puutun kovaotteisesti myös telekuuntelun, televalvonnan ja muiden salaisten pakkokeinojen laillisuuteen, ja saatan laittomat menettelyt tuomioistuimen ratkaistavaksi.

## Usein kysytyt kysymykset pakkokeinoista

**Kuinka nopeasti asianajaja pitää kutsua pakkokeinoistuntoon?**

> Asianajaja tulee kutsua paikalle välittömästi kiinnioton jälkeen tai heti, kun poliisi ilmoittaa tekevänsä vangitsemisvaatimuksen. Vangitsemisistunto on järjestettävä viimeistään [TÄYDENNÄ: esim. neljäntenä päivänä] kiinniotosta, joten puolustuksen valmistelulla on äärimmäinen kiire.

**Miten poliisin tekemän takavarikon saa kumottua?**

> Takavarikko saadaan kumottua saattamalla asia käräjäoikeuden käsiteltäväksi, mikäli takavarikolle ei ole laillisia perusteita tai se on kohtuuton. Asianajaja tekee oikeudelle virallisen vaatimuksen takavarikon kumoamisesta.

**Voiko kotietsinnän laillisuuden riitauttaa jälkikäteen?**

> Kyllä voi. Kotietsinnän kohteeksi joutuneella on oikeus saattaa kotietsinnän laillisuus tuomioistuimen tutkittavaksi etsinnän jälkeen. Jos kotietsintä todetaan laittomaksi, sillä voi olla merkitystä esimerkiksi vahingonkorvausten kannalta.

## Ota yhteyttä

**Kicker / H2**

> Yhteystiedot · Ota yhteyttä.

**Contact block**

> Päivystys 24/7 — +358 40 000 0000
>
> Sähköposti — adam@huhtamaki.fi
>
> Toimisto — Osoite 1, 00100 Helsinki / Tapaamiset myös etänä ja vankilassa

**Form**

Labels: Nimi · Puhelin · Sähköposti · Asian laatu · Kiireellisyys · Lyhyt kuvaus

Placeholders: Etu- ja sukunimi · +358 · nimi@esimerkki.fi · Mistä on kysymys ja missä vaiheessa asia on

Asian laatu options: Vangitsemisvaatimus · Matkustuskielto · Takavarikko · Kotietsintä · Salaiset pakkokeinot · Muu

Kiireellisyys options: Ei kiireellinen · Istunto tulossa · Kiinni otettu nyt

Notice above the button:

> Älä kirjoita lomakkeelle salassa pidettävää tai arkaluonteista tietoa. Kiireellisissä asioissa soita päivystysnumeroon.

Button:

> Lähetä yhteydenottopyyntö

## Header, drawer and footer (shared)

> Rikospäivystys 24/7 (header button) · Soita 24/7 (floating pill) · Rikospäivystys (pill label)

> Mobile drawer: Rikosoikeus / Vakavat rikokset, esitutkinta ja oikeudenkäynti · Pakkokeinot / Vangitseminen, takavarikko, salaiset pakkokeinot · Vahingonkorvaus / Korvausvaatimukset ja niiden torjunta · Riidanratkaisu / Käräjä- ja hovioikeusprosessit, sovinnot · Yhteystiedot / Yhteydenottopyyntö ja toimiston tiedot · Rikospäivystys 24/7 — Soita päivystykseen

> Rikosasioiden puolustus ja pakkokeinoasiat. Päivystys vuorokauden ympäri koko Suomessa. (footer)

> Soita rikospäivystykseen (footer button) · Suomen Asianajajaliiton jäsen · © 2026 Asianajotoimisto Adam Huhtamäki Oy · Y-tunnus 0000000-0 · Palvelu suomeksi, ruotsiksi ja englanniksi
