# Handoff: Riidanratkaisu ja oikeudenkäynnit (desktop + mobile)

## Overview

The Riidanratkaisu service page. Two prototypes, same content, same tokens:

| File | Viewport |
| --- | --- |
| `Riidanratkaisu.dc.html` | desktop, fluid, content capped at 1400px |
| `Riidanratkaisu mobiili.dc.html` | 390px |

Design system: **Nocturne** (`_ds/nocturne-…/styles.css`). Every color, radius, shadow and font comes from its tokens — no hard-coded hex or font names. The header, mobile drawer, floating call pill and footer are shared with the other service pages and specified in `design_handoff_frontpage/README.md` and `design_handoff_frontpage/FOOTER.md`.

All body copy is client-supplied, final, and must ship **verbatim** — the full text is reproduced in § Copy at the end, which is the authoritative version. The page speaks in the **first person singular** ("avustan", "hoidan", "ratkon", "puutun"); keep any new copy in that voice.

## What is different about this page

The page keeps the shared service-page skeleton (header → hero → services → FAQ → contact → footer) but the **services section is styled its own way**: no photographs, no equal-weight card grid. Instead two wide numbered blocks — heading column left, prose right — and the client's sub-points as small surface cards. This is the page for civil disputes; it should read as considered rather than urgent, which is why nothing here uses the Rikospäivystys band or the pulsing accent dot.

The services section also carries an **abstract CSS background** (no image): two soft `--color-accent-900` glows, two broken arcs top-right, and a masked diagonal hairline field. It is the only decorative field on the page and it is drawn from the accent ramp only. Do not add color to it.

## Section order

1. Header (shared)
2. Hero — background photo + scrim, headline, two-part lede, "Päivitetty" stamp
3. **Riita-asiat, joita hoidan** — two numbered blocks on the abstract ground
4. **Usein kysytyt kysymykset riidanratkaisusta** — three accordions on a photo band
5. **Ota yhteyttä** — contact details + enquiry form (`id="yhteys"`)
6. Footer (shared) + floating "Soita 24/7" pill

## 1. Hero

Desktop: `position: relative; overflow: hidden`, bottom hairline. Three layers — full-bleed `image-slot` (`riita-hero-bg`), scrim, content.

Scrim: `linear-gradient(100deg, rgba(22,24,38,0.97) 0%, rgba(22,24,38,0.92) 46%, rgba(22,24,38,0.72) 100%)`. Light comes from the right on every page; keep it.

Content wrapper: `padding: 88px 56px 80px; max-width: 1400px`, grid `minmax(0,1.35fr) minmax(0,1fr)`, `gap: 72px`, `align-items: center`.

| Element | Spec |
| --- | --- |
| Kicker | 34px accent hairline + "Erikoisala — Riita-asiat", 11.5px, `.24em`, uppercase, `--color-accent` |
| H1 | 56px, weight 500, `line-height: 1.05`, `letter-spacing: -0.025em`, `max-width: 22ch` |
| Lede | 18px / 1.7, `--color-neutral-200`, `max-width: 58ch` |
| Region line | 16px / 1.7, `--color-neutral-300`, one `[TÄYDENNÄ]` chip |
| Päivitetty stamp | 11.5px, `.18em`, uppercase, `--color-neutral-500` + dashed date chip |

The "Päivitetty" line is the client's freshness stamp, not decoration — it belongs at the end of the hero, small, and should be driven by the CMS modified date once the page is live.

`[TÄYDENNÄ: …]` chips render as `padding: 1px 7px; border: 1px dashed var(--color-accent-700); border-radius: var(--radius-sm); font-size: 0.9em; color: var(--color-accent-300)`. Prototype scaffolding — the chip disappears with the value.

Right column: 4:5 portrait in `.lighten` (`riita-hero`), `border-radius: var(--radius-md)`.

Mobile: one column, `min-height: 560px`, content bottom-aligned, `padding: 80px 20px 40px`. Background is the delivered photograph `assets/neuvottelu.jpeg` (two men in suits across a table of contract papers), `object-fit: cover`, `object-position: 66% 40%` — weighted right so the document stack stays visible beside the type. Scrim is vertical: `linear-gradient(to top, var(--color-bg) 4%, rgba(22,24,38,0.9) 52%, rgba(22,24,38,0.62) 100%)`. H1 36px. No portrait. Two buttons after the stamp: primary `#yhteys`, secondary `tel:` — note the order is **inverted** from the criminal pages, where the call comes first.

## 2. Riita-asiat, joita hoidan

`position: relative; overflow: hidden; padding: 96px 56px 104px`, content in a `position: relative; max-width: 1400px` wrapper above the decorative layers.

**Abstract ground** — four `aria-hidden` layers, all `pointer-events: none`:

| Layer | Spec |
| --- | --- |
| Glows | `radial-gradient(90% 70% at 88% 0%, var(--color-accent-900), transparent 62%)` + `radial-gradient(60% 60% at 4% 88%, …, transparent 58%)`, `opacity: 0.75` |
| Outer arc | 780px circle, `top: -180px; right: -120px`, 1px `--color-accent-800` border, `opacity: 0.5`, masked with `linear-gradient(200deg, …)` so it fades out mid-curve |
| Inner arc | 560px circle, `top: -60px; right: 40px`, same border, `opacity: 0.35`, same mask |
| Diagonals | `repeating-linear-gradient(114deg, var(--color-accent-800) 0 1px, transparent 1px 46px)`, `opacity: 0.3`, masked by `radial-gradient(70% 60% at 20% 30%, …)` |

The masks are the point: nothing in this system ends with a hard edge. If the layers are reimplemented, keep the fades and keep every value on the accent ramp.

Header row: H2 36px (`max-width: 24ch`) left, kicker "Neuvottelusta pääkäsittelyyn" right.

**Block 01 / 02**: `grid-template-columns: minmax(0,320px) minmax(0,1fr); gap: 40px 64px; padding-top: 32px`, each with its own `border-top` — `--color-accent-700` for 01, `--color-accent-800` for 02, so the pair reads as a sequence. Left column: number (`--font-heading`, 12px, `.22em`, accent) + H3 28px. Right column: prose 16.5px / 1.75 `--color-neutral-200`, `max-width: 68ch`, then the sub-cards.

Sub-cards: `border: 1px solid var(--color-divider); border-radius: var(--radius-md); background: var(--color-surface)`.

- Block 01 — three cards, `minmax(240px, 1fr)`, each opening with a 20px `--color-accent-600` hairline mark, then the client's bullet at 15.5px / 1.6.
- Block 02 — two cards, `minmax(280px, 1fr)`, each with an uppercase accent label (B2B / Kuluttaja), an 18px title and 15px body.

The two blocks are deliberately unlike each other: 01's cards are bare statements, 02's are labelled sub-services. That asymmetry follows the client's own text, which lists three bullets in one case and two named categories in the other.

Mobile: kicker above H2, blocks stacked, `padding-top: 24px` per block, H3 23px, cards full width in a single column with `gap: 14px`. Abstract ground repeats with smaller arcs (460px / 310px, pulled off the right edge) and a 34px diagonal pitch.

## 3. Usein kysytyt kysymykset riidanratkaisusta

A photo band. `position: relative; overflow: hidden; padding: 96px 56px 104px`, top hairline, the delivered photograph `assets/piirustukset.jpeg` (reading glasses on a drawing) full-bleed at `object-position: 60% 50%`, then a 100° scrim `rgba(22,24,38,0.97) → 0.93 (52%) → 0.74`. Content `max-width: 1080px`, H2 36px, `margin-bottom: 46px`.

Three `<details data-faq>` accordions, each `border-top: 1px solid var(--color-divider)`; a closing empty `div` with the same border finishes the list.

- Summary: `list-style: none`, flex row, `gap: 32px`, `padding: 24px 0`, 19px / 1.35; question capped at 62ch
- Icon: 16px plus glyph in `--color-accent`, `rotate(45deg)` when open (200ms) — a plus becoming a cross, never a chevron
- Answer: 15.5px / 1.75, `--color-neutral-300`, `max-width: 78ch`, `margin-bottom: 26px`
- Hover on the summary lifts it to `--color-accent-200`; `::-webkit-details-marker` hidden

Native `<details>`, no JavaScript. All closed by default, independently openable. Answer 3 carries a `[TÄYDENNÄ]` chip; the duration figure must be verified, not guessed.

Mobile: same, `padding: 48px 20px 52px`, scrim at 120° and slightly denser (`0.97 → 0.94 → 0.82`) because the type sits over the busier part of the frame, `object-position: 58% 50%`, summary 16.5px, answer 14.5px.

## 4. Ota yhteyttä

`id="yhteys"`, `scroll-margin-top: 74px` (68px mobile). `background: var(--color-bg)`, top hairline, grid `0.85fr 1.15fr`, `gap: 72px`: contact details left, form card right (`--color-surface` fill, `--color-divider` hairline, `--radius-lg`, `--shadow-sm`).

Differences from the criminal-page forms: the phone label is **Puhelin**, not "Päivystys 24/7"; the office line drops "ja vankilassa"; and the radio group asks the stage of the dispute rather than urgency.

- **Riidan laatu**: Työsuhderiita · Sopimusriita (B2B) · Kuluttajariita · Muu riita-asia
- **Missä vaiheessa asia on**: Erimielisyys syntynyt · Neuvottelut käynnissä · Asia oikeudessa

Ids are prefixed `d-` (desktop) and `dm-` (mobile), radio group `d-vaihe` / `dm-vaihe` — unique per page so pages can sit side by side without id collisions.

The form is **not wired**. Submit is `type="button"`. Needs an endpoint, validation, spam protection, success and error states, and a privacy notice link. The warning above the button must survive.

Mobile: single column, fields full width, radios stacked.

## Images

| Position | Desktop | Mobile | Treatment |
| --- | --- | --- | --- |
| Hero background | `image-slot` `riita-hero-bg` | `assets/neuvottelu.jpeg` | under scrim, no `.lighten` |
| Hero portrait | `image-slot` `riita-hero` | — | `.lighten`, 4:5 |
| FAQ band | `assets/piirustukset.jpeg` | `assets/piirustukset.jpeg` | under scrim, no `.lighten` |
| Footer | `image-slot` `footer-bg-riita` | `image-slot` `footer-bg-riita-m` | under scrim, no `.lighten` |

Slots are prototype-only drag-and-drop placeholders (`image-slot.js`) with stable ids; in production they are ordinary `<img>`/CMS fields. Desktop and mobile use different ids, so a drop on one does not appear on the other.

The rule: a photograph the reader is meant to look at goes through `.lighten`; a photograph that is only a ground goes under a scrim and never through `.lighten`. Prefer subjects shot on dark backgrounds.

The services section needs **no** photography — that is what the abstract ground is for. If the budget is tight, the desktop hero can take `assets/neuvottelu.jpeg` too and the portrait can be dropped.

## Behaviour

- No page JavaScript. The nav dropdown, mobile drawer and FAQ are native `<details>`.
- The floating call pill is `position: fixed` and always visible. Mobile bottom padding clears it; do not reduce it.
- `:focus-visible` accent ring from the design system must survive on every link, input, summary and button.
- The decorative layers are `aria-hidden` and `pointer-events: none`; they must never intercept a click or reach the accessibility tree.

## Open items

| Item | Where |
| --- | --- |
| `[TÄYDENNÄ: pp.kk.vvvv]` | hero "Päivitetty" stamp — wire to the CMS modified date |
| `[TÄYDENNÄ: paikkakunta/alue]` | hero region line |
| `[TÄYDENNÄ: esim. 9–15 kuukautta]` | FAQ answer 3 — verify against current district-court statistics |
| `+358 40 000 0000`, `adam@huhtamaki.fi`, `Osoite 1, 00100 Helsinki` | throughout |
| `Y-tunnus 0000000-0`, Tietosuojaseloste target | footer |
| Desktop hero background + portrait, footer grounds | see table above |
| Form endpoint and states | Ota yhteyttä |

Also confirm whether the Asianajajaliitto membership wording may stand as written.

---

# Copy

Verbatim, in page order. This is the text to build against; where a prototype and this section disagree, this section wins. `[TÄYDENNÄ: …]` marks a value the client still owes.

**Page stamp**

> Päivitetty: [TÄYDENNÄ: pp.kk.vvvv]

## Hero

**Kicker**

> Erikoisala — Riita-asiat

**H1**

> Riidanratkaisu ja oikeudenkäynnit

**Lede**

> Asiantunteva riidanratkaisu säästää aikaa, rahaa ja yrityksen mainetta. Avustan yrityksiä ja yksityishenkilöitä vaativissa siviiliriidoissa, kuten työsuhde- ja sopimusasioissa. Tavoitteeni on aina saavuttaa päämiehelleni paras mahdollinen lopputulos joko tehokkailla tuomioistuimen ulkopuolisilla neuvotteluilla tai periksiantamattomalla edustuksella oikeussalissa.

> Hoidan riita-asioita ja oikeudenkäyntejä [TÄYDENNÄ: paikkakunta/alue] alueella sekä valtakunnallisesti.

**Buttons (mobile only)**

> Jätä yhteydenottopyyntö · Soita +358 40 000 0000

## Riita-asiat, joita hoidan

**Kicker**

> Neuvottelusta pääkäsittelyyn

### 01 Työoikeus ja työsuhderiidat

> Työsuhteen päättymiseen liittyy usein voimakkaita juridisia ja taloudellisia erimielisyyksiä. Hoidan säännöllisesti työoikeudellisia riidanratkaisuprosesseja, joissa vaaditaan tarkkaa työlainsäädännön ja oikeuskäytännön tuntemusta.

> Avustan sekä työnantajia että työntekijöitä riitatilanteissa, joissa on kyse:

> Työsopimuksen irtisanomisesta tai purkamisesta.

> Perusteettomista päättämistoimista ja niihin liittyvistä korvausvaatimuksista.

> Kilpailukielto- tai salassapitosopimusten rikkomisesta.

### 02 Sopimusoikeus ja kuluttajariidat

> Sopimusriidat syntyvät tyypillisesti silloin, kun osapuolet ovat eri mieltä sopimuksen tulkinnasta, toimituksen viivästymisestä tai työn laadusta. Puutun tilanteeseen nopeasti, jotta erimielisyydet eivät eskaloidu tarpeettomasti.

**B2B — Yritysten väliset sopimusriidat**

> Ratkon yritysten välisiä sopimusrikkomuksia, reklamaatioita ja toimitusvaikeuksista seuraavia vastuukysymyksiä.

**Kuluttaja — Kuluttajariidat**

> Avustan merkittävissä kuluttajansuojaan liittyvissä riita-asioissa. Näitä ovat tyypillisesti arvokkaiden hyödykkeiden, kuten ajoneuvojen tai asuntokauppojen virhetilanteet ja kaupan purkamiset.

## Usein kysytyt kysymykset riidanratkaisusta

**Miten riita-asian oikeudenkäyntikulut maksetaan?**

> Suurimmassa osassa siviiliriitoja (kuten sopimus- ja työsuhderiidat) yrityksen tai yksityishenkilön oikeusturvavakuutus kattaa merkittävän osan asianajokuluista. Selvitän vakuutusturvasi laajuuden ja teen vahinkoilmoituksen puolestasi aina toimeksiannon aluksi.

**Kannattaako asia viedä oikeuteen vai sopia?**

> Useimmiten on asiakkaan edun mukaista pyrkiä ratkaisemaan riita neuvottelemalla tuomioistuimen ulkopuolella. Sovinto on nopeampi, riskittömämpi ja usein halvempi vaihtoehto. Jos vastapuolen vaatimukset ovat kuitenkin kohtuuttomia, vien asian oikeuden ratkaistavaksi vahvalla oikeussalikokemuksella.

**Kuinka kauan siviilioikeudenkäynti kestää?**

> Riita-asian käsittely käräjäoikeudessa kestää tyypillisesti [TÄYDENNÄ: esim. 9–15 kuukautta] haastehakemuksen jättämisestä tuomion antamiseen. Jos asia ratkaistaan neuvottelemalla ennen oikeudenkäyntiä, prosessi voi olla ohi muutamassa viikossa.

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

Labels: Nimi · Puhelin · Sähköposti · Riidan laatu · Missä vaiheessa asia on · Lyhyt kuvaus

Placeholders: Etu- ja sukunimi · +358 · nimi@esimerkki.fi · Mistä on kysymys ja missä vaiheessa asia on

Riidan laatu options: Työsuhderiita · Sopimusriita (B2B) · Kuluttajariita · Muu riita-asia

Vaihe options: Erimielisyys syntynyt · Neuvottelut käynnissä · Asia oikeudessa

Notice above the button:

> Älä kirjoita lomakkeelle salassa pidettävää tai arkaluonteista tietoa.

Button:

> Lähetä yhteydenottopyyntö

## Header, drawer and footer (shared)

> Rikospäivystys 24/7 (header button) · Soita 24/7 (floating pill) · Rikospäivystys (pill label)

> Mobile drawer: Rikosoikeus / Vakavat rikokset, esitutkinta ja oikeudenkäynti · Pakkokeinot / Vangitseminen, takavarikko, salaiset pakkokeinot · Vahingonkorvaus / Korvausvaatimukset ja niiden torjunta · Riidanratkaisu / Käräjä- ja hovioikeusprosessit, sovinnot · Yhteystiedot / Yhteydenottopyyntö ja toimiston tiedot · Rikospäivystys 24/7 — Soita päivystykseen

> Rikosasioiden puolustus ja pakkokeinoasiat. Päivystys vuorokauden ympäri koko Suomessa. (footer)

> Soita rikospäivystykseen (footer button) · Suomen Asianajajaliiton jäsen · © 2026 Asianajotoimisto Adam Huhtamäki Oy · Y-tunnus 0000000-0 · Palvelu suomeksi, ruotsiksi ja englanniksi
