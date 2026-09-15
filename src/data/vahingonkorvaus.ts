import type { FaqItem } from '@/data/faq';
import type { DisputeBlock } from '@/data/riidanratkaisu';

/**
 * Content for the vahingonkorvaus page (.claude/design/vahingonkorvaus/).
 *
 * Client-supplied and final — ships verbatim, first person singular
 * ("hoidan", "laadin", "torjun", "varmistan").
 *
 * The page's signature is block 01's paired roles: the office works both sides
 * of the table, so those two cards must stay visually equal.
 */
export const KORVAUS_BLOCKS: DisputeBlock[] = [
  {
    number: '01',
    title: 'Vahingonkorvaukset rikosasioissa',
    body: 'Rikosasiassa vahingonkorvausten käsittely on usein yhtä merkittävässä roolissa kuin itse rangaistusvaatimus. Toimin rikosprosesseissa molemmilla puolella pöytää:',
    rule: 'border-site-accent-700',
    cardMin: 'minmax(290px,1fr)',
    cards: [
      {
        label: 'Asianomistaja',
        title: 'Asianomistajan (uhrin) avustaminen',
        body: 'Kun olet joutunut rikoksen uhriksi, laadin puolestasi yksilöidyn vahingonkorvausvaatimuksen ja ajan sitä käräjäoikeudessa. Varmistan, että saat täyden korvauksen aiheutuneista kuluista, kivusta ja särystä sekä henkisestä kärsimyksestä.',
      },
      {
        label: 'Vastaaja',
        title: 'Vastaajan (epäillyn) avustaminen',
        body: 'Rikoksesta syytetylle esitetään usein rangaistuksen lisäksi mittavia korvausvaatimuksia. Pyrin aktiivisella vastanäytöllä torjumaan nämä vaatimukset joko kokonaan perusteettomina tai vaikuttamaan korvaussummien tuntuvaan alentamiseen.',
      },
    ],
  },
  {
    number: '02',
    title: 'Yrityssalaisuusrikokset ja taloudelliset vahingot',
    body: 'Kun yrityksen liikesalaisuuksia on loukattu tai väärinkäytetty, seurauksena on poikkeuksetta huomattavia taloudellisia menetyksiä. Yrityssalaisuusjutuissa avainasemassa on nopeus.',
    /* The page's one emphasised passage. No cards in this block. */
    emphasis:
      'Kun yhtiö on joutunut rikoksen uhriksi, näytön kerääminen aiheutuneista vahingoista on aloitettava välittömästi. Varmistan heti toimeksiannon aluksi, että digitaalinen ja asiakirjanäyttö turvataan oikeaoppisesti, jotta täysimääräinen vahingonkorvaus voidaan myöhemmin menestyksekkäästi vaatia tuomioistuimessa.',
    rule: 'border-site-accent-800',
    cards: [],
  },
];

/** All three answers are complete as delivered — no placeholders here. */
export const KORVAUS_FAQ: FaqItem[] = [
  {
    q: 'Mitä kuluja rikoksen uhri voi vaatia korvattavaksi?',
    a: 'Rikosasiassa asianomistaja voi vaatia korvausta suorista esine- ja omaisuusvahingoista, sairaanhoito- ja terapiakuluista, ansionmenetyksestä sekä kivusta, särystä ja kärsimyksestä oikeuskäytännön mukaisten taulukoiden mukaisesti.',
  },
  {
    q: 'Miten toimin, jos yritykseni liikesalaisuuksia on viety?',
    a: 'Ota välittömästi yhteyttä asianajajaan. Älä tee omia tutkintatoimenpiteitä, jotka voisivat vaarantaa todistusaineiston eheyden. Asianajaja huolehtii näytön turvaamisesta, tarvittavista poliisitoimista ja vahingonkorvausprosessin käynnistämisestä.',
  },
  {
    q: 'Milloin vahingonkorvausvaatimus pitää esittää?',
    a: 'Rikosasiassa korvausvaatimus on suositeltavaa esittää pääpiirteissään jo poliisin esitutkinnassa, mutta se on yksilöitävä ja toimitettava tuomioistuimelle viimeistään ennen käräjäoikeuden pääkäsittelyä.',
  },
];

export const KORVAUS_MATTER_TYPES = [
  'Korvausvaatimus rikosasiassa',
  'Korvausvaatimuksen torjunta',
  'Yrityssalaisuus tai taloudellinen vahinko',
  'Muu vahingonkorvausasia',
];

/** Mirrors block 01's premise: the visitor may be on either side. */
export const KORVAUS_ROLES = [
  'Vahinkoa kärsinyt',
  'Vaatimuksen kohde',
  'Yritys',
];
