# Avainsanat ja hakuintentio — adamhuhtamaki.fi

Lähde: Google Keyword Planner (FI), haettu 2026-09-18 sites.json:n
`seedKeywords`-listalle. Käsin tallennettu referenssi, **ei** viikkoajon
tuottama tiedosto — `analytics-review`-työkalussa ei ole Keyword Planner
-integraatiota, joten tämä ei päivity itsestään.

## Lukuohje (tärkeä)

- Volyymit ovat **haarukoita**, eivät tarkkoja lukuja: tili on ilman
  mainosbudjettia, joten Google antaa vain bucketit (10–100, 100–1 t., …).
- **Muutosprosentit ovat roskaa.** `+900 %` ja `+∞` syntyvät siitä, että termi
  ylittää bucketin rajan. Ne eivät kerro todellisesta kasvusta mitään.
- `—` ei tarkoita nollaa. Se tarkoittaa mainosraportoinnin kynnyksen alle
  jäävää kysyntää. Suomen oikeusalalla se kattaa paljon aitoa, korkean
  intention kysyntää.
- Volyymi mittaa **mainostajien kysyntää**, ei GEO-mahdollisuutta. Pitkät,
  luonnollisella kielellä kirjoitetut kysymykset eivät näy tässä taulukossa
  lainkaan, mutta ne ovat juuri sitä, mitä tekoälyhakukoneilta kysytään.

## Data

| Avainsana | Volyymi/kk | Kilpailu | Huippusijoituksen tarjous (ala–ylä) |
|---|---|---|---|
| oikeusturvavakuutus | 1 t. – 10 t. | Keskitaso | 1,16 € – 7,06 € |
| takavarikko | 1 t. – 10 t. | Pieni | — |
| kotietsintä | 100 – 1 t. | Pieni | — |
| rikosasianajaja | 100 – 1 t. | Keskitaso | 0,87 € – 3,01 € |
| rikosasianajaja helsinki | 100 – 1 t. | Keskitaso | 0,96 € – 2,94 € |
| talousrikos asianajaja | 10 – 100 | **Suuri** | **1,84 € – 5,99 €** |
| oikeusapu rikosasiassa | 10 – 100 | Keskitaso | 0,53 € – 1,57 € |
| huumerikos asianajaja | 10 – 100 | Keskitaso | — |
| asianomistajan avustaja | 10 – 100 | Pieni | — |
| pahoinpitely oikeudenkäynti | 10 – 100 | Pieni | — |
| vangitsemisvaatimus | 10 – 100 | Pieni | — |
| asianajaja rikosasiaan | — | — | — |
| esitutkinta kuulustelu oikeudet | — | — | — |
| puolustaja rikosasiassa | — | — | — |
| vahingonkorvaus rikoksesta | — | — | — |

## Tulkinta: mihin kukin termi kuuluu

### Kaupallinen intentio — nämä tuovat toimeksiantoja

- **`rikosasianajaja helsinki` / `rikosasianajaja`** (100–1 t., ~3 € tarjous).
  Sivuston tärkein kaupallinen termi. Kohdesivu: `/rikosasianajaja/`.
  Helsingin on oltava sivulla yksiselitteisesti esillä.
- **`talousrikos asianajaja`** (10–100, Suuri kilpailu, 5,99 € tarjous).
  Pieni volyymi, listan **korkein arvo per kävijä** — mainostajat maksavat
  tuplasti muihin nähden, koska toimeksiannon arvo on iso. Tällä hetkellä
  talousrikokset on vain yksi luetelmakohta `llms.txt`:ssä, ei omaa sivua.
  **Selkein sisältöaukko.**
- **`huumerikos asianajaja`**, **`puolustaja rikosasiassa`**,
  **`asianajaja rikosasiaan`**, **`asianomistajan avustaja`**. Matala tai
  mittaamaton volyymi, mutta suora toimeksiantointentio.

### Informatiivinen intentio — liikennettä, ei suoria liidejä

- **`kotietsintä`**, **`takavarikko`**, **`vangitsemisvaatimus`**,
  **`esitutkinta kuulustelu oikeudet`**, **`pahoinpitely oikeudenkäynti`**.
  Kohdesivu: `/pakkokeinot/`. Näiden onnistumisen mittari on
  **`phone_click` / `generate_lead`, ei istuntomäärä**. Jokaisen osion on
  johdettava päivystysnumeroon.
- Huom. `takavarikko` on suomeksi monimerkityksinen: mukana on ulosottoa ja
  yleistä uteliaisuutta, ei pelkkää rikosprosessia. Älä tulkitse volyymia
  rikosasioiden kysynnäksi.

### Varoitus: älä rakenna sivua näille

- **`oikeusturvavakuutus`** (1 t.–10 t.). Listan suurin volyymi ja huonoin
  intentiosopivuus: hakijat vertailevat vakuutuksia, eivät etsi puolustajaa.
  Oikea paikka on **UKK-vastaus "kuka maksaa"**, ei oma palvelusivu.
  Sama koskee termiä `oikeusapu rikosasiassa`.
  `llms.txt` muotoilee tämän jo oikein: maksuton ensiarvio selvittää samalla
  puhelulla, kattaako valtion oikeusapu, tuomioistuimen määräämä puolustajan
  tehtävä vai vakuutuksen oikeusturva palkkion.
- Jos näille rakennetaan sivu, viikkoraportti näyttää sen aikanaan
  laskeutumissivuna, jolla on paljon näyttökertoja ja **nolla
  `generate_lead`-tapahtumaa**.

## Sivuprioriteetti julkaisun jälkeen

1. `/rikosasianajaja/` — kantaa termin `rikosasianajaja helsinki`. On jo olemassa.
2. **Talousrikossivu tai laaja osio** — paras arvo per klikkaus, puuttuu nyt.
3. `/pakkokeinot/` — imee informatiivisen volyymin, mitataan puheluina.
4. Oikeusturvavakuutus + oikeusapu — UKK-vastaus, ei sivu.

## Miksi `seedKeywords`-listaa ei karsittu

Kaikki 15 siementä jätettiin sites.json:iin. `keyword_research.py` käyttää
niitä autocomplete-laajennuksen kantoina (siemen + a–ö + päätteet kuten
`hinta` + kysymysalut) ja ristiinajaa tuloksen 90 päivän GSC-kyselyihin.
Nollavolyyminen siemen on edelleen tuottava kanta, ja laajennus paljastaa sen
pitkän hännän, jota tämä taulukko ei näe.
