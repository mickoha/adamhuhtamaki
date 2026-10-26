# Handoff: Rikosoikeus (desktop + mobile)

## Overview

The Rikosoikeus service page. Two prototypes, same content, same tokens:

| File | Viewport |
| --- | --- |
| `Rikosoikeus.dc.html` | desktop, fluid, content capped at 1400px |
| `Rikosoikeus mobiili.dc.html` | 390px |

Design system: **Nocturne** (`_ds/nocturne-…/styles.css`). Every color, radius, shadow and font comes from its tokens — no hard-coded hex or font names. The global footer is specified separately in `design_handoff_frontpage/FOOTER.md`; the header, the floating call pill and the Rikospäivystys band are shared with the front page and specified in `design_handoff_frontpage/README.md`. This document covers only what is specific to this page.

All body copy on the page is client-supplied, final, and must ship **verbatim** — the full text is reproduced in § Copy at the end of this document, which is the authoritative version. Do not re-write it for SEO or tone. The page speaks in the **first person singular** throughout ("avustan", "hoidan", "minulla"); keep any new copy in that voice.

## Section order

Same on both viewports. The order is deliberate: the reader is told what the office does, is given the emergency number at the moment they are most likely to act, then the process, then objections, then the form.

1. Header (shared)
2. Hero — background photo + scrim, headline, three-part lede, pull quote
3. **Erikoistumisalueeni rikosoikeudessa** — six case-type cards
4. **Rikospäivystys** band (shared component, indigo `--color-section` ground)
5. **Missä vaiheessa olen tukenasi** — four-step timeline
6. **Usein kysytyt kysymykset rikosasioista** — six accordions on a photo band
7. **Ota yhteyttä** — contact details + enquiry form (`id="yhteys"`)
8. Footer (shared) + floating "Soita 24/7" pill

## 1. Hero

Desktop: `position: relative; overflow: hidden`, bottom hairline. Three layers — a full-bleed `image-slot` (`rikos-hero-bg`), a non-interactive scrim, then the content.

Scrim: `linear-gradient(100deg, rgba(22,24,38,0.97) 0%, rgba(22,24,38,0.92) 46%, rgba(22,24,38,0.72) 100%)` — the same 100° angle as the footer and the UKK band. Light comes from the right on every page; keep it.

Content wrapper: `padding: 88px 56px 80px; max-width: 1400px`, grid `minmax(0,1.35fr) minmax(0,1fr)`, `gap: 72px`, `align-items: center`.

Left column, in order:

| Element | Spec |
| --- | --- |
| Kicker | 34px accent hairline + "Kokenut rikosasianajaja", 11.5px, `.24em`, uppercase, `--color-accent` |
| H1 | 56px, weight 500, `line-height: 1.05`, `letter-spacing: -0.025em`, `max-width: 22ch` — "Vakavat rikokset ovat työni ydin" |
| Lede | 18px / 1.7, `--color-neutral-200`, `max-width: 56ch` |
| Region line | 16px / 1.7, `--color-neutral-300` |
| Pull quote | `padding-left: 28px`, `border-left: 1px solid var(--color-accent-800)`, 16.5px / 1.75, `--color-neutral-200`, `max-width: 52ch` — "Jokainen rikosasia vaatii yksilöllistä perehtymistä ja tarkkaa taktikointia." |

The pull quote is the page's one emphasised sentence. It earns the accent rule; nothing else in the hero does.

Right column: a 4:5 portrait in `.lighten` (`rikos-hero`), `border-radius: var(--radius-md)`. This is a *content* photograph (through `.lighten`), unlike the hero background (under a scrim, no `.lighten`). Two images in one hero only works if the portrait is clearly the subject and the background is near-abstract — brief the photographer accordingly, or drop the portrait.

Mobile: one column, `min-height: 560px`, content bottom-aligned, `padding: 80px 20px 40px`. The background is the delivered photograph `assets/kuulustelu.jeg` (interrogation-room frame), `object-fit: cover`, `object-position: 62% 50%` — the crop is weighted right so the table and lamp stay visible beside the type. Scrim is vertical here, not 100°: `linear-gradient(to top, var(--color-bg) 4%, rgba(22,24,38,0.9) 52%, rgba(22,24,38,0.62) 100%)`, so the copy sits on near-solid ground at the bottom. H1 38px. No portrait. Two buttons follow the pull quote: primary `tel:`, secondary `#yhteys`.

## 2. Erikoistumisalueeni rikosoikeudessa

Header row: `display: flex; flex-wrap: wrap; gap: 32px 64px; align-items: baseline; justify-content: space-between` — H2 36px (`max-width: 24ch`) on the left, the intro paragraph 16px / 1.7 `--color-neutral-300` (`max-width: 52ch`) on the right.

Cards: `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px` (three across at 1400px, two at tablet, one on mobile). Each card:

- `border: 1px solid var(--color-divider); border-radius: var(--radius-md); background: var(--color-surface); overflow: hidden`
- 16:10 `image-slot` at the top in `.lighten`, square corners (the card's `overflow: hidden` rounds it)
- `padding: 26px 26px 30px`, `gap: 12px`
- Number 01–06: `--font-heading`, 12px, `.1em`, `--color-accent`, baseline-aligned with the title
- Title 21px, weight 500; body 14.5px / 1.7, `--color-neutral-300`

Order is fixed: 01 Väkivalta- ja henkirikokset · 02 Huumausainerikokset · 03 Talousrikokset · 04 Seksuaalirikokset · 05 Tietoverkko- ja yrityssalaisuusrikokset · 06 Omaisuusrikokset.

Mobile: same cards stacked, `gap: 18px`, 16:9 images, title 19px, body 14px.

## 3. Rikospäivystys band

Lifted unchanged from the front page — indigo `--color-section` ground with the `--color-section-glow` radial, pulsing dot, 40px H2, and the `rgba(22,24,38,0.4)` number panel. This and the front page's stat band are the only saturated fields in the system; do not add a third.

One difference from the front page: the paragraph is the client's closing call-to-action text, which still carries two `[TÄYDENNÄ: …]` placeholders.

Mobile: single column, number panel below the text, H2 27px.

## 4. Missä vaiheessa olen tukenasi

Header row: H2 36px left, kicker "Esitutkinnasta hovioikeuteen" (11.5px, `.24em`, uppercase, accent) right.

Steps: `grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 48px 40px`. Each step carries **its own** `border-top`, not a shared line across the container — that is what lets the row wrap without orphaning a step. The rule lightens along the sequence:

| Step | Rule color | Dot |
| --- | --- | --- |
| 01 Esitutkinta | `--color-accent-600` | filled `--color-accent` |
| 02 Syyteharkinta | `--color-accent-700` | `--color-bg` fill, `--color-accent-600` ring |
| 03 Käräjäoikeus | `--color-accent-800` | same as 02 |
| 04 Hovioikeus | `--color-divider` | same as 02 |

Dot: 11px circle at `top: -6px; left: 0`, with `box-shadow: 0 0 0 5px var(--color-bg)` punching a gap in the rule so the dot reads as sitting *on* the line. On a tinted ground that halo color must change with the ground.

Label "Vaihe 0N" `--font-heading` 10.5px `.22em` uppercase `--color-neutral-500`; title 23px; body 14.5px / 1.7, `max-width: 32ch`.

Mobile: vertical stack, `gap: 32px`, same per-item rule and dot, title 21px.

## 5. Usein kysytyt kysymykset

A photo band: `padding: 96px 56px 104px`, full-bleed `image-slot` (`rikos-ukk-bg`) + 100° scrim, content `max-width: 1080px`. H2 36px, `margin-bottom: 46px`.

Six `<details data-faq>` accordions, each `border-top: 1px solid var(--color-divider)`; a closing empty `div` with the same border finishes the list so the last row is ruled on both sides.

- Summary: `list-style: none`, flex row, `gap: 32px`, `padding: 24px 0`, 19px / 1.35; question capped at 62ch
- Icon: 16px plus glyph in `--color-accent`, `rotate(45deg)` when open (200ms) — a plus becoming a cross, never a chevron
- Answer: 15.5px / 1.75, `--color-neutral-300`, `max-width: 78ch`, `margin-bottom: 26px`, fades in via the `menuIn` keyframe
- Hover on the summary lifts it to `--color-accent-200`; `::-webkit-details-marker` is hidden

Native `<details>`, no JavaScript. All six are closed by default and independently openable (no accordion group behaviour) — keep it that way; these are reference answers, not a wizard.

Mobile: same, `padding: 48px 20px 52px`, summary 16.5px, answer 14.5px, `gap: 18px`, and the scrim runs at 120°.

## 6. Ota yhteyttä

Identical to the front page's contact section, with `id="yhteys"` and `scroll-margin-top: 74px` (68px mobile) so the sticky header never covers the heading. `background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-neutral-900) 100%)`, grid `0.85fr 1.15fr`, `gap: 72px`: contact details left, form card right (`--color-bg` fill, `--radius-lg`, `--shadow-md`).

Form fields use the design system's `.field` / `.input` / `.radio` classes as-is. Every input id on this page is prefixed `r-` (desktop) or `rm-` (mobile) and the radio group is `r-kiire` / `rm-kiire` — the prefixes exist so the page can be embedded next to the front page without colliding ids. Keep a unique prefix per page.

The form is **not wired**. The submit button is `type="button"`. Needs: an endpoint, validation, spam protection, a success and an error state, and a privacy notice link. The standing warning above the button ("Älä kirjoita lomakkeelle salassa pidettävää…") must survive.

Mobile: single column throughout, fields full width, radios stacked.

## Image slots

Every slot is a prototype-only drag-and-drop placeholder (`image-slot.js`) with a stable id, so a dropped file survives reload. In production these are ordinary `<img>`/CMS fields. Desktop and mobile use **different ids**, so a drop on one does not appear on the other.

| Slot | Desktop id | Mobile id | Treatment |
| --- | --- | --- | --- |
| Hero background | `rikos-hero-bg` | (delivered image, no slot) | under scrim, no `.lighten` |
| Hero portrait | `rikos-hero` | — | `.lighten`, 4:5 |
| Case types 1–6 | `rikos-ala-1…6` | `m-rikos-ala-1…6` | `.lighten`, 16:10 / 16:9 |
| UKK band | `rikos-ukk-bg` | `m-rikos-ukk-bg` | under scrim, no `.lighten` |
| Footer | `footer-bg-rikos` | `footer-bg-rikos-m` | under scrim, no `.lighten` |

The rule: a photograph the reader is meant to look at goes through `.lighten`; a photograph that is only a ground goes under a scrim and never through `.lighten`.

Nine positions is a lot of commissioning. If the budget is smaller, cut the six card images first — the cards work as type-only blocks — and keep the hero, UKK and footer grounds.

## Behaviour

- No page JavaScript. The nav dropdown and the FAQ are native `<details>`; everything else is static markup and CSS transitions.
- The floating call pill is `position: fixed` and always visible. Mobile bottom padding is sized to clear it; do not reduce it.
- `:focus-visible` accent ring from the design system must survive on every link, input, summary and button.
- The phone number appears eight times on this page (header, hero button, band, band panel, contact block, footer button, footer column, pill). One CMS field feeds all of them.

## Open items

| Item | Where |
| --- | --- |
| `[TÄYDENNÄ: puhelinnumero]` | Rikospäivystys band paragraph |
| `[TÄYDENNÄ: linkki yhteystietoihin]` | same paragraph — should probably resolve to `#yhteys` on this page |
| `+358 40 000 0000`, `adam@huhtamaki.fi`, `Osoite 1, 00100 Helsinki` | throughout |
| `Y-tunnus 0000000-0`, Tietosuojaseloste target | footer |
| Eight photographs | see table above |
| Form endpoint and states | Ota yhteyttä |

Also confirm whether the Asianajajaliitto membership wording may stand as written.

---

# Copy

Verbatim, in page order. This is the text to build against; where a prototype and this section disagree, this section wins. `[TÄYDENNÄ: …]` marks a value the client still owes.

## Hero

**Kicker**

> Kokenut rikosasianajaja

**H1**

> Vakavat rikokset ovat työni ydin

**Lede**

> Kokenut rikosasianajaja turvaa oikeutesi ja huolehtii edustuksestasi koko rikosprosessin ajan. Avustan sekä rikoksesta epäiltyjä että asianomistajia eli rikoksen uhreja prosessin jokaisessa vaiheessa: poliisin suorittamassa esitutkinnassa, syyteharkinnassa, käräjäoikeuden pääkäsittelyssä ja tarvittaessa muutoksenhaussa hovioikeuteen.

> Toimin pääasiassa pääkaupunkiseudun alueella, mutta hoidan laajoja toimeksiantoja valtakunnallisesti.

**Pull quote**

> Jokainen rikosasia vaatii yksilöllistä perehtymistä ja tarkkaa taktikointia.

**Buttons (mobile only)**

> Soita päivystykseen 24/7 · Jätä yhteydenottopyyntö

## Erikoistumisalueeni rikosoikeudessa

**Intro**

> Erityisosaamistani ovat vaativat ja vakavat rikosasiat, jotka edellyttävät puolustajalta tai asianomistajan avustajalta perusteellista lainsäädännön tuntemusta ja vankkaa oikeussalikokemusta. Hoidan säännöllisesti seuraaviin rikosnimikkeisiin liittyviä toimeksiantoja.

**01 Väkivalta- ja henkirikokset**

> Väkivaltarikoksissa tilanteet ovat usein näyttökysymyksiltään monimutkaisia. Avustan asiakkaitani perusmuotoisissa ja törkeissä pahoinpitelyissä. Henkirikosten osalta hoidan vaativia tapon yrityksiin ja toteutuneisiin henkirikoksiin liittyviä puolustus- ja asianomistajatehtäviä, joissa panokset ja mahdolliset seuraamukset ovat poikkeuksellisen suuret.

**02 Huumausainerikokset**

> Huumausaineisiin liittyvä oikeuskäytäntö muuttuu jatkuvasti. Olen erikoistunut erityisesti törkeisiin huumausainerikoksiin, laajoihin monikansallisiin tutkintakokonaisuuksiin sekä useiden vastaajien oikeudenkäynteihin. Näissä jutuissa esitutkinta-aineiston laajuus ja telekuuntelutallenteiden läpikäynti vaativat avustajalta äärimmäistä huolellisuutta.

**03 Talousrikokset**

> Talousrikosasiat edellyttävät juridisen osaamisen lisäksi ymmärrystä yritystoiminnasta ja kirjanpidosta. Hoidan säännöllisesti kirjanpito- ja verorikoksia, petoksia ja kavalluksia. Avustan myös tilanteissa, joissa asiakasta uhkaa liiketoimintakielto, tai kun kieltoa pyritään kumoamaan.

**04 Seksuaalirikokset**

> Seksuaalirikosprosessit ovat inhimillisesti raskaita ja vaativat avustajalta ehdotonta hienotunteisuutta. Avustan näissä asioissa sekä epäiltyjä että asianomistajia. Käsittelyt toimitetaan oikeudessa lähes poikkeuksetta salassa pidettävinä, ja huolehdin asiakkaani yksityisyyden suojasta koko prosessin ajan.

**05 Tietoverkko- ja yrityssalaisuusrikokset**

> Digitalisoituva yhteiskunta on tuonut mukanaan uudet rikosmuodot. Hoidan tietoverkkoihin kohdistuvia rikoksia sekä monimutkaisia yrityssalaisuusrikoksia, joissa on usein kyse huomattavista taloudellisista intresseistä ja liiketoiminnan turvaamisesta.

**06 Omaisuusrikokset**

> Avustan asiakkaita myös perinteisissä omaisuusrikoksissa, kuten törkeissä varkauksissa, ryöstöissä ja vahingonteoissa, joissa korvausvaatimukset nousevat usein huomattaviksi.

## Rikospäivystys

**Kicker**

> Rikospäivystys · päivystys auki

**H2**

> Kiinniotto ei odota virka-aikaa. Eikä puolustus.

**Paragraph**

> Oletko osallisena rikosasian esitutkinnassa tai onko asiasi siirtymässä tuomioistuimeen? Ota yhteyttä luottamuksellisesti numeroon [TÄYDENNÄ: puhelinnumero] tai lue lisää [TÄYDENNÄ: linkki yhteystietoihin].

**Number panel**

> Päivystysnumero — +358 40 000 0000
>
> Vastaan itse. Jos en pääse puhelimeen, soitan takaisin heti kun vapaudun oikeussalista.

## Missä vaiheessa olen tukenasi

**Kicker**

> Esitutkinnasta hovioikeuteen

| Vaihe | Otsikko | Teksti |
| --- | --- | --- |
| 01 | Esitutkinta | Läsnäolo kuulusteluissa, tutkintapyynnöt ja tarpeettoman tutkinnan rajaaminen. |
| 02 | Syyteharkinta | Loppulausunto syyttäjälle ja neuvottelut syyteneuvottelusta silloin, kun se on eduksi. |
| 03 | Käräjäoikeus | Todistelun valmistelu, kuulustelut istunnossa ja loppulausunto pääkäsittelyssä. |
| 04 | Hovioikeus | Valitus, jatkokäsittelylupa ja pääkäsittely hovioikeudessa. |

## Usein kysytyt kysymykset rikosasioista

**Milloin rikosasianajajaan kannattaa ottaa yhteyttä?**

> Yhteyttä kannattaa ottaa välittömästi, kun olet saanut kutsun poliisikuulusteluun joko epäiltynä tai asianomistajana. Avustajan läsnäolo jo ensimmäisissä kuulusteluissa on ratkaisevan tärkeää koko loppuprosessin kannalta.

**Mitä rikosasianajajan palvelut maksavat?**

> Asianajokulut riippuvat jutun laajuudesta, mutta suuressa osassa tapauksia kulut katetaan joko kotivakuutuksen oikeusturvavakuutuksesta tai valtion varoista maksettavasta oikeusavusta. Selvitän aina toimeksiannon aluksi asiakkaan mahdollisuuden maksuttomaan oikeudenkäyntiin tai vakuutuskorvaukseen.

**Voiko sama asianajaja avustaa sekä epäiltyä että uhria?**

> Sama asianajaja ei voi koskaan avustaa samassa oikeudenkäynnissä sekä rikoksesta epäiltyä että asianomistajaa. Minulla on kuitenkin vankka kokemus kummastakin roolista eri toimeksiannoissa, mikä antaa syvällisen ymmärryksen rikosprosessin dynamiikasta ja vastapuolen taktiikasta.

**Kuinka kauan rikosprosessi tyypillisesti kestää?**

> Rikosprosessin kesto vaihtelee merkittävästi. Yksinkertaisissa asioissa esitutkinnasta käräjäoikeuden tuomioon voi kulua alle puoli vuotta, kun taas laajoissa talous- ja huumausainerikoksissa pelkkä esitutkinta voi kestää 1–2 vuotta ja koko oikeusprosessi hovioikeuksineen useita vuosia.

**Tarvitsenko asianajajan jo poliisikuulusteluun?**

> Kyllä, asianajajan läsnäolo jo ensimmäisessä poliisikuulusteluissa on erittäin suositeltavaa. Asiat, joita sanot (tai jätät sanomatta) ensimmäisissä kuulusteluissa, vaikuttavat merkittävästi koko myöhempään oikeusprosessiin.

**Mitä tarkoittaa syyteneuvottelu?**

> Syyteneuvottelussa rikoksesta epäilty tunnustaa rikoksen, ja vastineeksi syyttäjä sitoutuu vaatimaan lievennettyä rangaistusta. Asianajajana arvioin aina tapauskohtaisesti, onko syyteneuvotteluun suostuminen päämieheni edun mukaista.

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

Asian laatu options: Esitutkinta · Syyte · Oikeudenkäynti · Pakkokeino · Muu

Kiireellisyys options: Ei kiireellinen · Kuulustelu tulossa · Kiinni otettu nyt

Notice above the button:

> Älä kirjoita lomakkeelle salassa pidettävää tai arkaluonteista tietoa. Kiireellisissä asioissa soita päivystysnumeroon.

Button:

> Lähetä yhteydenottopyyntö

## Header and footer (shared)

> Rikospäivystys 24/7 (header button) · Soita 24/7 (floating pill) · Rikospäivystys (pill label)

> Rikosasioiden puolustus ja pakkokeinoasiat. Päivystys vuorokauden ympäri koko Suomessa. (footer)

> Soita rikospäivystykseen (footer button) · Suomen Asianajajaliiton jäsen · © 2026 Asianajotoimisto Adam Huhtamäki Oy · Y-tunnus 0000000-0 · Palvelu suomeksi, ruotsiksi ja englanniksi
