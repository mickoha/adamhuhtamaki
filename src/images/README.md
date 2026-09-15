# src/images — the site's photographs

Every photograph lives here, versioned with the code and never in `public/`.

Import one through the `@images/*` alias so Next reads its intrinsic
dimensions, then render it with `<ImageComponent>`:

```tsx
import hero from '@images/hero.jpg';
import ImageComponent from '@/components/ImageComponent';

<ImageComponent
  src={hero}
  alt="…"
  fill
  sizes="100vw"
  priority /* LCP image only — one per page, currently the hero */
/>;
```

`next-image-export-optimizer` converts each imported file to WebP in 11 widths
at build time and writes them to `out/nextImageExportOptimizer/`. It finds them
by scanning `.next/static/media`, which is where a static import lands — so the
files never have to sit under `public/` to be optimized. (`imageFolderPath` in
`next.config.mjs` points at `public/` only because the optimizer warns and
skips its folder scan when the path is outside `public/`; that scan finds no
photographs, and is not how these images get processed.)

Logos, favicons and SVGs do **not** belong here — those go straight into
`public/`, served as-is. This folder is for photographs.

## Naming

`<sivu>-<paikka>.jpg`, lowercase ASCII, hyphenated — no ä/ö, no spaces. The
five front-page files predate this convention and keep their short names.

## Photographs this site uses

### Etusivu

| File | Slot | Rendered | Treatment |
| --- | --- | --- | --- |
| `hero.jpg` | `sections/Hero.tsx` | full-bleed, 736 px tall | two scrims, `priority` |
| `yksityishenkilot.jpg` | `sections/Audiences.tsx`, card 1 | ~660×260 | `.lighten` |
| `yritykset.jpg` | `sections/Audiences.tsx`, card 2 | ~660×260 | `.lighten` |
| `ukk.jpg` | `sections/Faq.tsx` | full width × 620 px | scrim + bottom fade |
| `adam-huhtamaki.jpg` | `sections/Attorney.tsx` | 380×460, pysty | `.lighten` |
| `footer.jpg` | `components/SiteFooter.tsx` | full width, koko footer | scrim, **ei** `.lighten` |

### /vahingonkorvaus/

| File | Slot | Treatment |
| --- | --- | --- |
| `vahingonkorvaus-hero.jpg` | hero ground + mobiilin tausta | scrim, **ei** `.lighten` |
| `vahingonkorvaus-portrait.jpg` | hero-muotokuva | läpinäkymätön, tummennus 0,58 |
| `vahingonkorvaus-ukk.jpg` | UKK-palkin tausta | scrim, **ei** `.lighten` |

Palveluosio ei tarvitse kuvia eikä saa niitä: kaksipalkkinen taitto kantaa
itsensä, ja korttikuvat hämärtäisivät eron rikossivujen korttiruudukkoon.

### /riidanratkaisu/

| File | Slot | Treatment |
| --- | --- | --- |
| `riidanratkaisu-hero.jpg` | hero ground (desktop) | scrim, **ei** `.lighten` |
| `riidanratkaisu-portrait.jpg` | hero-muotokuva + mobiilin tausta | muotokuva läpinäkymätön, mobiilitausta scrimin alla |
| `riidanratkaisu-ukk.jpg` | UKK-palkin tausta | scrim, **ei** `.lighten` |

Palveluosio ei tarvitse kuvia — sillä on oma abstrakti CSS-tausta.

### /pakkokeinot/

| File | Slot | Supply at | Treatment |
| --- | --- | --- | --- |
| `pakkokeinot-hero.jpg` | hero ground, `sections/ServiceHero.tsx` | 2560×1440 (16:9) | scrim, **ei** `.lighten` |
| `pakkokeinot-istunto.jpg` | hero portrait | 1200×1500 (4:5) | opaque, tummennettu |
| `pakkokeinot-vangitseminen.jpg` | kortti 01 | 1600×1000 (16:10) | `.lighten` |
| `pakkokeinot-takavarikko.jpg` | kortti 02 | 1600×1000 (16:10) | `.lighten` |
| `pakkokeinot-kotietsinta.jpg` | kortti 03 | 1600×1000 (16:10) | `.lighten` |
| `pakkokeinot-ukk.jpg` | UKK-palkin tausta, `sections/FaqBand.tsx` | 2560×1440 (16:9) | scrim, **ei** `.lighten` |

Viisi kuudesta on toimitettu. Puuttuu vielä `pakkokeinot-ukk.jpg`: se on
palkin tausta 0,97→0,72 scrimin alla, joten se saa olla hyvin tumma ja
vähäeleinen — kirkas kohta keskellä jää tekstin alle eikä näy.

Sama sävyohje kuin muualla: kuvattu pimeässä tai mustaa vasten, ja
tunnistettavia ihmisiä ei tarvita.

### /rikosasianajaja/

| File | Slot | Supply at | Treatment |
| --- | --- | --- | --- |
| `rikosasianajaja-oikeussali.jpg` | hero portrait, `sections/ServiceHero.tsx` | 1200×1500 (4:5) | `.lighten` |
| `rikosasianajaja-hero.jpg` | hero ground, `sections/ServiceHero.tsx` | 2560×1440 (16:9) | scrim, **ei** `.lighten` |
| `rikosasianajaja-ukk.jpg` | UKK band ground, `sections/FaqBand.tsx` | 2560×1440 (16:9) | scrim, **ei** `.lighten` |
| `rikosasianajaja-vakivalta.jpg` | kortti 01, `sections/CaseTypes.tsx` | 1600×1000 (16:10) | `.lighten` |
| `rikosasianajaja-huumausaine.jpg` | kortti 02 | 1600×1000 (16:10) | `.lighten` |
| `rikosasianajaja-talous.jpg` | kortti 03 | 1600×1000 (16:10) | `.lighten` |
| `rikosasianajaja-seksuaali.jpg` | kortti 04 | 1600×1000 (16:10) | `.lighten` |
| `rikosasianajaja-tietoverkko.jpg` | kortti 05 | 1600×1000 (16:10) | `.lighten` |
| `rikosasianajaja-omaisuus.jpg` | kortti 06 | 1600×1000 (16:10) | `.lighten` |

Alt texts for the two content photographs are supplied by the client:

- `rikosasianajaja-oikeussali.jpg` — "Kokenut rikosasianajaja edustaa
  asiakastaan oikeussalissa."
`rikosasianajaja-ukk.jpg` is a ground under a 0.97→0.72 scrim, so it is
decorative and ships with `alt=""` — the delivered frame (a suited figure with
a briefcase in an institutional corridor) does not match the supplied alt text
about going through esitutkintamateriaalia at the office, and a background
behind body text should not be announced to a screen reader anyway.

`rikosasianajaja-hero.jpg` is decorative — near-abstract, sitting under a
0.97→0.72 scrim beside the type — so it ships with `alt=""`.

### Art direction for the six card images

These illustrate rikosnimikkeet, so the frames must be **environmental and
abstract — never depictions of violence, victims, or identifiable people in
distress.** An empty corridor, sealed evidence bags, a ledger, a dark server
room. The card is a signpost to a service, not a depiction of a crime, and a
literal frame here would be both distasteful and a liability for a firm that
represents victims as well as suspects. Card 04 (seksuaalirikokset) in
particular must carry no human subject at all.

The `photoAlt` values in `src/data/rikosoikeus.ts` describe the intended
subject. **Check each one against the frame that actually ships** — alt text
has to describe the delivered photograph, not the brief.

The handoff notes that if the commissioning budget is tight, these six are the
first images to cut; the cards read fine as type-only blocks.

## Rules that apply to all of them

- **Shot dark or on black.** Every content photograph is composited with
  `mix-blend-mode: lighten` (`.lighten`) and every ground sits under a scrim; a
  light background washes the section out.
- **Grounds want low detail.** Hero, UKK and footer backgrounds carry almost no
  information and must not compete with the text.
- A photograph the reader is meant to look at goes through `.lighten`; a
  photograph that is only a ground goes under a scrim and never through it.

## Still missing

- `adam-huhtamaki.jpg` — the front-page portrait, ~900×1100, dark background.
- `rikosasianajaja-hero.jpg` — the desktop hero ground. Mobile already uses
  the `-oikeussali` frame as its ground, so only the desktop hero is short.

Those four slots render `<PhotoSlot>` — a labelled dark placeholder holding the
right dimensions — until the files land. Under a scrim a placeholder reads as
intended dark ground, so only the two portrait-style slots look obviously empty.
