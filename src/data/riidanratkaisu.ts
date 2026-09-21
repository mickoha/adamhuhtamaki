import type { FaqItem } from '@/data/faq';

/**
 * Content for the riidanratkaisu page (.claude/design/riidanratkaisu/).
 *
 * Client-supplied and final — ships verbatim, first person singular
 * ("avustan", "hoidan", "ratkon", "puutun").
 *
 * This page reads as considered rather than urgent: no Rikospäivystys band, no
 * pulsing dot, and the hero's primary CTA is the form rather than the phone.
 * That inversion is deliberate — a civil dispute is not a 3 a.m. arrest.
 */

export interface DisputeCard {
  /** Uppercase accent label above the title (block 02 only). */
  label?: string;
  title?: string;
  body: string;
}

export interface DisputeBlock {
  number: string;
  title: string;
  /** Lead prose in the right-hand column. */
  body: string;
  /** Optional line introducing the cards. */
  cardsIntro?: string;
  cards: DisputeCard[];
  /** A passage set on an accent rule — a page's one emphasised paragraph.
   *  Used instead of cards where the copy argues rather than enumerates. */
  emphasis?: string;
  /** The pair reads as a sequence: 01 lighter rule, 02 darker. */
  rule: string;
  /** Card column width. Ignored when a block has no cards. */
  cardMin?: string;
}

export const DISPUTE_BLOCKS: DisputeBlock[] = [
  {
    number: '01',
    title: 'Työoikeus ja työsuhderiidat',
    body: 'Työsuhteen päättymiseen liittyy usein voimakkaita juridisia ja taloudellisia erimielisyyksiä. Hoidan säännöllisesti työoikeudellisia riidanratkaisuprosesseja, joissa vaaditaan tarkkaa työlainsäädännön ja oikeuskäytännön tuntemusta.',
    cardsIntro:
      'Avustan sekä työnantajia että työntekijöitä riitatilanteissa, joissa on kyse:',
    rule: 'border-site-accent-700',
    cardMin: 'minmax(240px,1fr)',
    cards: [
      { body: 'Työsopimuksen irtisanomisesta tai purkamisesta.' },
      {
        body: 'Perusteettomista päättämistoimista ja niihin liittyvistä korvausvaatimuksista.',
      },
      { body: 'Kilpailukielto- tai salassapitosopimusten rikkomisesta.' },
    ],
  },
  {
    number: '02',
    title: 'Sopimusoikeus ja kuluttajariidat',
    body: 'Sopimusriidat syntyvät tyypillisesti silloin, kun osapuolet ovat eri mieltä sopimuksen tulkinnasta, toimituksen viivästymisestä tai työn laadusta. Puutun tilanteeseen nopeasti, jotta erimielisyydet eivät eskaloidu tarpeettomasti.',
    rule: 'border-site-accent-800',
    cardMin: 'minmax(280px,1fr)',
    cards: [
      {
        label: 'B2B',
        title: 'Yritysten väliset sopimusriidat',
        body: 'Ratkon yritysten välisiä sopimusrikkomuksia, reklamaatioita ja toimitusvaikeuksista seuraavia vastuukysymyksiä.',
      },
      {
        label: 'Kuluttaja',
        title: 'Kuluttajariidat',
        body: 'Avustan merkittävissä kuluttajansuojaan liittyvissä riita-asioissa. Näitä ovat tyypillisesti arvokkaiden hyödykkeiden, kuten ajoneuvojen tai asuntokauppojen virhetilanteet ja kaupan purkamiset.',
      },
    ],
  },
];

/**
 * Answer 3 carries a duration figure. It is read from taydenna.ts rather than
 * written here — the handoff requires it be verified against current
 * district-court statistics, not guessed.
 */
export const RIITA_FAQ: FaqItem[] = [
  {
    q: 'Miten riita-asian oikeudenkäyntikulut maksetaan?',
    a: 'Suurimmassa osassa siviiliriitoja (kuten sopimus- ja työsuhderiidat) yrityksen tai yksityishenkilön oikeusturvavakuutus kattaa merkittävän osan asianajokuluista. Selvitän vakuutusturvasi laajuuden ja teen vahinkoilmoituksen puolestasi aina toimeksiannon aluksi.',
  },
  {
    q: 'Kannattaako asia viedä oikeuteen vai sopia?',
    a: 'Useimmiten on asiakkaan edun mukaista pyrkiä ratkaisemaan riita neuvottelemalla tuomioistuimen ulkopuolella. Sovinto on nopeampi, riskittömämpi ja usein halvempi vaihtoehto. Jos vastapuolen vaatimukset ovat kuitenkin kohtuuttomia, vien asian oikeuden ratkaistavaksi vahvalla oikeussalikokemuksella.',
  },
  {
    q: 'Kuinka kauan siviilioikeudenkäynti kestää?',
    a: 'Riita-asian käsittely käräjäoikeudessa kestää tyypillisesti 7–11 kuukautta haastehakemuksen jättämisestä tuomion antamiseen. Riidattomat asiat, kuten selvät velkomusasiat, ratkeavat nopeammin, yleensä 2–3 kuukaudessa. Jos asia ratkaistaan neuvottelemalla ennen oikeudenkäyntiä, prosessi voi olla ohi muutamassa viikossa.',
  },
];

/** This page asks the stage of the dispute, not urgency. */
export const RIITA_MATTER_TYPES = [
  'Työsuhderiita',
  'Sopimusriita (B2B)',
  'Kuluttajariita',
  'Muu riita-asia',
];

export const RIITA_STAGES = [
  'Erimielisyys syntynyt',
  'Neuvottelut käynnissä',
  'Asia oikeudessa',
];
