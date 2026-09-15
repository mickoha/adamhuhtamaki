import type { StaticImageData } from 'next/image';
import yksityishenkilot from '@images/yksityishenkilot.jpg';
import yritykset from '@images/yritykset.jpg';

/**
 * Front-page content as typed data. The copy comes from the approved design
 * handoff (.claude/design/design_handoff_frontpage/README.md) — the only
 * changes made in the port are Finnish typography (en dash, not em dash).
 *
 * Anything still marked [TÄYDENNÄ: …] is a figure the client must confirm.
 */

export interface AudienceCard {
  /** .tag .tag-outline label above the heading. */
  tag: string;
  title: string;
  body: string;
  /** Photo at the top of the card — composited with .lighten, so shot dark. */
  photo: StaticImageData;
  photoAlt: string;
}

/** Two entry points: the private client and the company under investigation. */
export const AUDIENCES: AudienceCard[] = [
  {
    tag: 'Yksityishenkilöille',
    title: 'Epäiltynä tai uhrina',
    body: 'Avustan rikoksesta epäiltyjä ja asianomistajia esitutkinnassa, vangitsemisasioissa ja käräjäoikeuden pääkäsittelyssä. Selvitän aina ensimmäiseksi, kattaako valtion oikeusapu tai vakuutuksesi oikeusturva asianajokulut.',
    photo: yksityishenkilot,
    photoAlt:
      'Kuulusteluhuoneessa yksin pöydän ääressä istuva henkilö selin kameraan',
  },
  {
    tag: 'Yhtiöille',
    title: 'Kun tutkinta koskee yritystäsi',
    body: 'Hoidan talousrikos- ja työturvallisuusrikosepäilyt, kotietsinnät ja takavarikot yrityksen tiloissa. Turvaan johdon ja työntekijöiden aseman rikostutkinnassa ja varmistan liiketoiminnan jatkuvuuden prosessin aikana.',
    photo: yritykset,
    photoAlt: 'Yrityksen neuvotteluhuone yöllä, ikkunan takana kaupungin valot',
  },
];

export interface Speciality {
  title: string;
  body: string;
  href: string;
  linkLabel: string;
}

/** The two panels under "Erikoisalat" — the practice's centre of gravity. */
export const SPECIALITIES: Speciality[] = [
  {
    title: 'Rikosoikeus ja vakavat rikokset',
    body: 'Väkivalta- ja henkirikokset, huume-, talous- ja seksuaalirikokset. Avustaminen esitutkinnasta hovioikeuteen, myös asianomistajan puolella.',
    href: '/rikosasianajaja/',
    linkLabel: 'Lue lisää rikosoikeudesta',
  },
  {
    title: 'Pakkokeinot',
    body: 'Vangitsemisvaatimukset, matkustuskielto, kotietsintä sekä omaisuuden takavarikko ja vakuustakavarikko — ja niiden laillisuuden riitauttaminen.',
    href: '/pakkokeinot/',
    linkLabel: 'Lue lisää pakkokeinoista',
  },
];

export interface FeeRoute {
  tag: string;
  title: string;
  body: string;
}

/**
 * The commercial argument: in a criminal matter the fee is very often paid by
 * someone other than the client. These three routes are stated the same way on
 * every page — see "Facts that must stay consistent" in CLAUDE.md.
 */
export const FEE_ROUTES: FeeRoute[] = [
  {
    tag: 'Valtion varoista',
    title: 'Valtion oikeusapu',
    body: 'Kattaa palkkion kokonaan tai osittain tulojesi perusteella. Selvitän oikeutesi oikeusapuun ennen laskutusta.',
  },
  {
    tag: 'Tuloista riippumatta',
    title: 'Määrätty puolustaja',
    body: 'Vakavissa rikoksissa tuomioistuin voi määrätä minut puolustajaksesi valtion varoista tuloistasi riippumatta.',
  },
  {
    tag: 'Vakuutus korvaa',
    title: 'Oikeusturvavakuutus',
    body: 'Kotivakuutuksen tai yrityksen vakuutuksen oikeusturva korvaa usein riita- ja korvausasioiden kulut.',
  },
];

export interface Rate {
  label: string;
  /** The headline figure, VAT-exclusive — that is how the client quotes. */
  value: string;
  /** Same rate with VAT, for the private clients who must see a gross price. */
  note?: string;
  /** Renders the figure in accent — used for the free first assessment. */
  highlight?: boolean;
}

/**
 * Rate list under "Jos maksat itse".
 *
 * Figures are VAT-EXCLUSIVE, which is how the firm quotes them, with the
 * gross figure alongside because private individuals are half the audience and
 * a consumer needs to see the price they actually pay. The note is the ONLY
 * place VAT is stated on the page, so it is not optional on a paid rate —
 * keep the two in step: the note is value × 1,255.
 */
export const RATES: Rate[] = [
  {
    label: 'Yksityishenkilöt',
    value: '270 €/h',
    note: '338,85 €/h sis. alv',
  },
  {
    label: 'Yritykset',
    value: '300 €/h',
    note: '376,50 €/h sis. alv',
  },
];

/** Chips under the attorney bio. */
export const ATTORNEY_TAGS = [
  'Rikosoikeus',
  'Pakkokeinot',
  'Vahingonkorvaus',
  'Riidanratkaisu',
  'Suomen Asianajajaliitto',
];

export const ATTORNEY_BIO = [
  'Rikosoikeus on työni ydin. Avustan päämiehiä vaativissa rikosasioissa ja vakavissa pakkokeinokysymyksissä, sekä epäillyn että asianomistajan puolella. Oikeussalikokemusta on kertynyt sadoista oikeudenkäynneistä käräjä- ja hovioikeuksissa.',
  'Minulle on tärkeää, että saat suoran yhteyden avustajaasi silloin kun hätä on suurin – siksi päivystysnumeroon vastaa aina asianajaja, ei vastaajapalvelu.',
];

/** Contact-form dropdown: what the matter is about. */
export const MATTER_TYPES = [
  'Esitutkinta',
  'Syyte',
  'Oikeudenkäynti',
  'Pakkokeino',
  'Muu',
];

/** Contact-form urgency options, least urgent first (the default). */
export const URGENCY_LEVELS = [
  'Ei kiireellinen',
  'Kuulustelu tulossa',
  'Kiinni otettu nyt',
];
