# Handoff: Yhteystiedot (desktop + mobile)

## Overview

The contact page. Two prototypes, same content, same tokens:

| File | Viewport |
| --- | --- |
| `Yhteystiedot.dc.html` | desktop, fluid, content capped at 1400px |
| `Yhteystiedot mobiili.dc.html` | 390px |

Design system: **Nocturne** (`_ds/nocturne-…/styles.css`). Every color, radius, shadow and font comes from its tokens. The header, mobile drawer and floating call pill are shared with the service pages (`design_handoff_frontpage/README.md`); the footer is the shared footer with **one page-specific change**, see below.

All body copy is client-supplied, final, and ships **verbatim** — the full text is in § Copy at the end, which is the authoritative version. First person singular throughout ("vastaan", "hoidan", "suosittelen").

## The one structural fact that drives this page

The office has **no fixed street address**. Everything follows from that: there is no map, no "Käyntiosoite", no opening hours. The address row is a **Postiosoite** (PO box), and the meeting arrangements are prose rather than a location. On this page the shared footer's "Käyntiosoite" line is therefore replaced with "Postiosoite" — the same change should be made on the other pages, which still carry the placeholder street address.

There is also **no working form** yet. The client will embed a secure third-party form, so the prototype shows a labelled dashed placeholder card in its exact position rather than a mock form. Do not build the fields; the embed replaces the card whole.

## Section order

1. Header (shared)
2. Hero — background photo + scrim, headline, lede, emphasised line, "Päivitetty" stamp
3. **Rikospäivystys 24/7** band — the urgent path, on the indigo `--color-section` ground
4. **Yhteystiedot ja tapaamiset** (`id="tapaamiset"`) — prose + contact rows + form placeholder
5. **Usein kysytyt kysymykset yhteydenotosta** — three accordions on a photo band
6. Footer (shared, Postiosoite variant) + floating "Soita 24/7" pill

The order is the page's argument: urgent callers are served before anyone reads about meeting logistics.

## 1. Hero

Desktop: `position: relative; overflow: hidden`, bottom hairline. Full-bleed `image-slot` (`yht-hero-bg`), scrim `linear-gradient(100deg, rgba(22,24,38,0.97) 0%, rgba(22,24,38,0.92) 46%, rgba(22,24,38,0.72) 100%)`, then content: `padding: 88px 56px 80px; max-width: 1400px`, grid `minmax(0,1.35fr) minmax(0,1fr)`, `gap: 72px`.

| Element | Spec |
| --- | --- |
| Kicker | 34px accent hairline + "Yhteystiedot", 11.5px, `.24em`, uppercase, `--color-accent` |
| H1 | 54px, weight 500, `line-height: 1.06`, `letter-spacing: -0.025em`, `max-width: 22ch` |
| Lede | 18px / 1.7, `--color-neutral-200`, `max-width: 58ch` |
| Emphasised line | `padding-left: 28px`, `border-left: 1px solid var(--color-accent-800)`, 16.5px / 1.75, `--color-neutral-100`, `max-width: 52ch` |
| Päivitetty stamp | 11.5px, `.18em`, uppercase, `--color-neutral-500` + dashed date chip |

The accent rule marks the page's single emphasised sentence, as on Rikosoikeus. Nothing else in the hero takes one.

Right column: 4:5 portrait in `.lighten` (`yht-hero`). A picture of the lawyer is the right subject here — the visitor is deciding whether to call a person.

Mobile: one column, `min-height: 560px`, content bottom-aligned, `padding: 80px 20px 40px`, background `m-yht-hero-bg`, vertical scrim (`to top, var(--color-bg) 4% → 0.9 at 52% → 0.62`). H1 34px, emphasised line in `--font-heading` at 17px. Two buttons: primary `tel:` (the call comes first on this page), secondary `#tapaamiset`.

## 2. Rikospäivystys band

The same shared band as the front page and Rikosoikeus: `background: var(--color-section)` + `radial-gradient(120% 140% at 12% 0%, var(--color-section-glow) 0%, var(--color-section) 58%)`, hairlines at `rgba(233,233,237,0.08)`, `padding: 64px 56px`, grid `1.1fr 1fr`, `gap: 56px`.

- Kicker: 9px pulsing dot (`pulseRing`, 2.4s) + "Kiireelliset tapaukset", 11.5px, `.24em`, uppercase, `--color-accent-300`
- H2 38px (one step down from the front page's 40px — the client's heading is longer), `max-width: 24ch`
- Paragraph 17px / 1.7, `--color-accent-200`, `max-width: 58ch`
- Number panel: `rgba(22,24,38,0.4)` fill, `rgba(233,233,237,0.16)` border, `--radius-lg`, label + 36px `tel:` link + fading hairline + the call-back promise at 14px

This band and the front page's stat band are the only saturated fields in the system. The heading repeats "Rikospäivystys 24/7 – Kiireelliset tapaukset" verbatim including the en dash; the kicker carries the second half so the eye gets the qualifier before the long heading.

Mobile: single column, H2 26px, panel below the text, number 28px.

## 3. Yhteystiedot ja tapaamiset

`padding: 96px 56px 104px; max-width: 1400px`, `scroll-margin-top: 74px` (68px mobile) so the sticky header never covers the heading. Grid `1fr 1fr`, `gap: 72px`, `align-items: start`: prose + contact rows left, form placeholder right.

Left column: H2 36px, then the two client paragraphs at 16.5px / 1.75 `--color-neutral-200`, `max-width: 60ch`. The first carries the region `[TÄYDENNÄ]` chip.

**Contact rows** — a three-row definition list, each `display: grid; grid-template-columns: 150px minmax(0,1fr); padding: 24px 0` with its own `border-top` (the last also `border-bottom`):

| Row | Value treatment |
| --- | --- |
| Puhelin | `tel:` link, `--font-heading`, 26px |
| Sähköposti | dashed `[TÄYDENNÄ]` chip at 15px + the client's encryption warning at 14px `--color-neutral-400` |
| Postiosoite | "PL" + two dashed chips, 16px |

The email warning is part of the client's copy and must stay attached to the email row — it is a professional-secrecy notice, not a caption.

**Form placeholder**: `padding: 40px 38px; border: 1px dashed var(--color-accent-700); border-radius: var(--radius-lg); background: var(--color-surface)`, holding an accent label ("Yhteydenottopyyntö"), the client's `[TÄYDENNÄ: Upota tähän tietoturvallinen yhteydenottolomake]` at 17px, a fading hairline, an implementation note, and a primary `tel:` button.

The dashed border is deliberate: it reads as unfinished, so nobody mistakes the card for a shipped component. When the embed lands, the card becomes an ordinary `--color-surface` card with a solid `--color-divider` hairline like the other forms in the system, and the "Lomake tulee tähän kohtaan sivua" note is deleted. The button may stay — an urgent caller should not have to scroll back.

Mobile: single column, rows stack as label-above-value (no 150px column), form placeholder full width at `padding: 26px 22px 28px`, button full width.

## 4. Usein kysytyt kysymykset yhteydenotosta

A photo band: `position: relative; overflow: hidden; padding: 96px 56px 104px`, top hairline, full-bleed `image-slot` (`yht-ukk-bg`) + 100° scrim (`0.97 → 0.93 at 52% → 0.74`). Content `max-width: 1080px`, H2 36px, `margin-bottom: 46px`.

Three `<details data-faq>`, each `border-top: 1px solid var(--color-divider)`, closed by default, plus a closing bordered `div`.

- Summary: `list-style: none`, flex row, `gap: 32px`, `padding: 24px 0`, 19px / 1.35, question capped at 62ch
- Icon: 16px plus glyph in `--color-accent`, `rotate(45deg)` when open (200ms)
- Answer: 15.5px / 1.75, `--color-neutral-300`, `max-width: 78ch`, `margin-bottom: 26px`
- Summary hover → `--color-accent-200`; `::-webkit-details-marker` hidden

Native `<details>`, no JavaScript. The "0 €" in answer 1 is the client's own wording; keep the figure and the euro sign.

Mobile: `padding: 48px 20px 52px`, background `m-yht-ukk-bg`, scrim at 120° and denser (`0.97 → 0.94 → 0.82`), summary 16.5px, answer 14.5px.

## 5. Footer — the Postiosoite variant

Identical to the shared footer except the right-hand column:

- "Käyntiosoite / Osoite 1, 00100 Helsinki" → **"Postiosoite / PL [TÄYDENNÄ], [TÄYDENNÄ]"**
- The email value is a dashed `[TÄYDENNÄ: sähköposti]` chip rather than a `mailto:` link, since the address is not yet known

Navigation state: "Yhteystiedot" is the current page in both the header nav and the footer's Toimisto column, so it renders in `--color-text` with no hover shift.

## Image slots

| Slot | Desktop id | Mobile id | Treatment |
| --- | --- | --- | --- |
| Hero background | `yht-hero-bg` | `m-yht-hero-bg` | under scrim, no `.lighten` |
| Hero portrait | `yht-hero` | — | `.lighten`, 4:5 |
| FAQ band | `yht-ukk-bg` | `m-yht-ukk-bg` | under scrim, no `.lighten` |
| Footer | `footer-bg-yht` | `footer-bg-yht-m` | under scrim, no `.lighten` |

Prototype-only drag-and-drop placeholders (`image-slot.js`) with stable ids; in production ordinary `<img>`/CMS fields. Desktop and mobile ids differ, so a drop on one does not appear on the other.

The rule: a photograph the reader is meant to look at goes through `.lighten`; a photograph that is only a ground goes under a scrim and never through `.lighten`. Prefer subjects shot on dark backgrounds. Existing project images (`assets/neuvottelu.jpeg`, `assets/piirustukset.jpeg`) can fill the FAQ and footer grounds if no new photography is commissioned; the hero portrait needs a real photograph of the lawyer or it should be dropped rather than filled with stock.

## Behaviour

- No page JavaScript. The nav dropdown, mobile drawer and FAQ are native `<details>`.
- The floating call pill is `position: fixed` and always visible. Mobile bottom padding clears it; do not reduce it.
- `:focus-visible` accent ring from the design system must survive on every link, summary and button.
- The phone number appears seven times on desktop (header, band, band panel, contact row, form-card button, footer button, footer column, pill) and eight on mobile (plus the hero button and the drawer). One CMS field feeds all of them.

## Open items

| Item | Where |
| --- | --- |
| `[TÄYDENNÄ: pp.kk.vvvv]` | hero "Päivitetty" stamp — wire to the CMS modified date |
| `[TÄYDENNÄ: paikkakunta/alue]` | Yhteystiedot ja tapaamiset, first paragraph |
| `[TÄYDENNÄ: etunimi.sukunimi@yritys.fi]` | email row + footer chip |
| `PL [TÄYDENNÄ: numero], [TÄYDENNÄ: postinumero ja toimipaikka]` | Postiosoite row + footer |
| Secure form embed | replaces the dashed placeholder card |
| `+358 40 000 0000` | throughout |
| `Y-tunnus 0000000-0`, Tietosuojaseloste target | footer |
| Four photographs (hero ground + portrait, FAQ band, footer ground) | see table above |
| Replace "Käyntiosoite" with "Postiosoite" on the other pages | Rikosoikeus, Pakkokeinot, Vahingonkorvaus, Riidanratkaisu footers |

Also confirm whether the Asianajajaliitto membership wording may stand as written.

---

# Copy

Verbatim, in page order. This is the text to build against; where a prototype and this section disagree, this section wins. `[TÄYDENNÄ: …]` marks a value the client still owes.

**Page stamp**

> Päivitetty: [TÄYDENNÄ: pp.kk.vvvv]

## Hero

**Kicker**

> Yhteystiedot

**H1**

> Yhteystiedot – Asianajotoimisto Adam Huhtamäki

**Lede**

> Voit olla minuun yhteydessä puhelimitse, sähköpostilla tai jättämällä yhteydenottopyynnön. Vakavissa rikosasioissa ja pakkokeinotilanteissa tavoitat minut 24/7 päivystysnumerosta. Ensimmäinen puhelu ja tilannearvio ovat aina maksuttomia, emmekä sido sinua toimeksiantoon.

**Emphasised line**

> Mitä aiemmin puolustus tai riidanratkaisu aloitetaan, sitä paremmin voin turvata oikeutesi.

**Buttons (mobile only)**

> Soita päivystykseen 24/7 · Yhteystiedot ja tapaamiset

## Rikospäivystys 24/7

**Kicker**

> Kiireelliset tapaukset

**H2**

> Rikospäivystys 24/7 – Kiireelliset tapaukset

**Paragraph**

> Jos sinä tai läheisesi on otettu kiinni, pidätetty tai kotiisi tehdään kotietsintä, soita välittömästi. Puolustuksen valmistelu on aloitettava heti.

**Number panel**

> Päivystysnumero: +358 40 000 0000

> Vastaan puhelimeen itse kaikkina vuorokauden aikoina. Jos en pääse vastaamaan oikeudenkäynnin tai poliisikuulustelun vuoksi, soitan takaisin heti vapauduttuani.

## Yhteystiedot ja tapaamiset

> Hoidan toimeksiantoja [TÄYDENNÄ: paikkakunta/alue] alueella sekä erikseen sovittaessa koko Suomessa. Koska työni tapahtuu pitkälti oikeussaleissa, poliisiasemilla ja asiakkaiden luona, toimistollani ei ole kiinteää käyntiosoitetta.

> Tapaamiset järjestyvät joustavasti ja luottamuksellisesti. Voimme neuvotella etäyhteydellä, oikeustalolla, yrityksesi tiloissa tai erikseen varattavassa yksityisessä neuvottelutilassa.

**Contact rows**

> Puhelin: +358 40 000 0000

> Sähköposti: [TÄYDENNÄ: etunimi.sukunimi@yritys.fi] (Suosittelen, ettet lähetä arkaluonteisia asiakirjoja tai yksityiskohtia salaamattomalla sähköpostilla.)

> Postiosoite: PL [TÄYDENNÄ: numero], [TÄYDENNÄ: postinumero ja toimipaikka]

**Form placeholder**

> [TÄYDENNÄ: Upota tähän tietoturvallinen yhteydenottolomake]

Prototype-only supporting text on the placeholder card (delete with the card when the embed lands):

> Yhteydenottopyyntö · Lomake tulee tähän kohtaan sivua. Kiireellisissä asioissa soita päivystysnumeroon. · Soita päivystykseen 24/7

## Usein kysytyt kysymykset yhteydenotosta

**Maksaako asianajajalle soittaminen?**

> Ensimmäinen yhteydenotto ja lyhyt tilannearvio puhelimessa on aina maksuton (0 €). Kartoitan puhelun aikana tilanteesi ja kerron, kuka asiasi kulut todennäköisesti maksaa (esim. oikeusapu tai vakuutus), ennen kuin laskutusta syntyy.

**Mitä tietoja minun pitää kertoa ensimmäisessä puhelussa?**

> Riittää, että kerrot lyhyesti mistä on kyse: oletko esimerkiksi saanut kutsun poliisikuulusteluun, onko läheisesi otettu kiinni tai uhkaako yritystäsi oikeudenkäynti. Tarkat yksityiskohdat ja todistusaineisto käydään läpi myöhemmin tietoturvallisesti.

**Missä tapaamme, jos toimistolla ei ole käyntiosoitetta?**

> Tapaamiset sovitaan aina tilanteen mukaan. Rikosasioissa tapaan asiakkaani usein poliisiasemalla, tutkintavankilassa tai oikeustalolla. Siviiliriidoissa ja neuvotteluissa voimme tavata etäyhteydellä (Teams/puhelin) tai järjestän käyttöömme yksityisen neuvotteluhuoneen.

## Header, drawer and footer (shared)

> Rikospäivystys 24/7 (header button) · Soita 24/7 (floating pill) · Rikospäivystys (pill label)

> Mobile drawer: Rikosoikeus / Vakavat rikokset, esitutkinta ja oikeudenkäynti · Pakkokeinot / Vangitseminen, takavarikko, salaiset pakkokeinot · Vahingonkorvaus / Korvausvaatimukset ja niiden torjunta · Riidanratkaisu / Käräjä- ja hovioikeusprosessit, sovinnot · Yhteystiedot / Päivystys, tapaamiset ja yhteydenotto · Rikospäivystys 24/7 — Soita päivystykseen

> Rikosasioiden puolustus ja pakkokeinoasiat. Päivystys vuorokauden ympäri koko Suomessa. (footer)

> Soita rikospäivystykseen (footer button) · Suomen Asianajajaliiton jäsen · © 2026 Asianajotoimisto Adam Huhtamäki Oy · Y-tunnus 0000000-0 · Palvelu suomeksi, ruotsiksi ja englanniksi
