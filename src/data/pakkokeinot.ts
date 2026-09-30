import type { FaqItem } from '@/data/faq';
import type { CaseType } from '@/data/rikosoikeus';
import { TAYDENNA, fill } from '@/data/taydenna';
import vangitseminen from '@images/pakkokeinot-vangitseminen.jpg';
import takavarikko from '@images/pakkokeinot-takavarikko.jpg';
import kotietsinta from '@images/pakkokeinot-kotietsinta.jpg';

/**
 * Content for the pakkokeinot page (.claude/design/pakkokeinot/README.md).
 *
 * Client-supplied and final — it ships verbatim, first person singular
 * ("puutun", "hoidan", "riitautan"), and must not be rewritten for SEO or tone.
 * The two unknowns come from src/data/taydenna.ts.
 */

/** The one saturated field on this page. */
export const QUOTE =
  'Suomessa tuomioistuimet hyväksyvät poliisin pakkokeinovaatimukset lähes poikkeuksetta. Välittömällä puuttumisella ja oikealla taktiikalla on mahdollista riitauttaa huomattava osa päämiehiini kohdistuvista vaatimuksista.';

export const QUOTE_FOLLOW_UP =
  'Mitä aiemmin asianajaja on mukana, sitä tehokkaammin poliisin esittämät perusteet voidaan kyseenalaistaa tuomioistuimessa.';

/**
 * Three service cards. Bodies are deliberately uneven — the grid stretches the
 * cards to a shared height and the ragged text bottoms are accepted rather than
 * padded or trimmed.
 */
export const PAKKOKEINOT_CARDS: CaseType[] = [
  {
    number: '01',
    title: 'Vangitsemisvaatimukset ja matkustuskielto',
    body: 'Vangitseminen on pakkokeinoista ankarin. Kun poliisi esittää vangitsemisvaatimuksen, edustan sinua käräjäoikeuden pakkokeinoistunnossa ja selvitän kanssasi, olisiko asiassa edellytyksiä vapauttamiseksi tai lievemmän pakkokeinon soveltamiseksi. Vangitsemisen edellytykset on mahdollista riitauttaa. Vaadin myös pyynnöstäsi säännöllisesti vangitsemisasian uudelleenkäsittelyä. Useissa tapauksissa vastoin tilastoja pystyn korvaamaan vangitsemisen lievemmällä vaihtoehdolla, kuten matkustuskiellolla.',
    photo: vangitseminen,
    photoAlt:
      'Asianajaja asettaa asiakirjat käräjäoikeuden pöydälle istuntosalissa',
  },
  {
    number: '02',
    title: 'Takavarikko ja vakuustakavarikko',
    body: 'Omaisuuden takavarikointi tai yrityksen varojen asettaminen vakuustakavarikkoon voi halvaannuttaa liiketoiminnan tai vaikeuttaa arkea kohtuuttomasti. Riitautan laittomat ja tarpeettomasti pitkittyneet takavarikot. Vaadin niiden kumoamista käräjäoikeudessa heti, kun takavarikon jatkamiselle ei ole enää laillisia perusteita.',
    photo: takavarikko,
    photoAlt: 'Ketjulla ja riippulukolla suljettu arkistokaappi',
  },
  {
    number: '03',
    title: 'Kotietsintä',
    body: 'Poliisin suorittama kotietsintä tai yrityksen tiloihin kohdistuva etsintä on aina voimakas toimenpide. Varmistan ja tarkastan jälkikäteen, onko suoritettu kotietsintä ollut lainmukainen. Saatan laittomat menettelyt tuomioistuimen ratkaistavaksi.',
    photo: kotietsinta,
    photoAlt:
      'Kotietsinnän jäljiltä lattialle levinneitä asiakirjoja hämärässä huoneessa',
  },
];

/**
 * Answer 1 carries the statutory deadline for the vangitsemisistunto. It is a
 * legal figure, so it is read from taydenna.ts rather than written here — it
 * must be verified against pakkokeinolaki before launch, not guessed.
 */
export const PAKKOKEINOT_FAQ: FaqItem[] = [
  {
    q: 'Kuinka nopeasti asianajaja pitää kutsua pakkokeinoistuntoon?',
    a: `Asianajaja tulee kutsua paikalle välittömästi kiinnioton jälkeen tai heti, kun poliisi ilmoittaa tekevänsä vangitsemisvaatimuksen. Vangitsemisistunto on järjestettävä viimeistään ${fill(
      TAYDENNA.vangitsemisistunnonMaaraaika,
      'vangitsemisistunnon määräaika',
    )} kiinniotosta, joten puolustuksen valmistelulla on äärimmäinen kiire.`,
  },
  {
    q: 'Miten poliisin tekemän takavarikon saa kumottua?',
    a: 'Takavarikko saadaan kumottua saattamalla asia käräjäoikeuden käsiteltäväksi, mikäli takavarikolle ei ole laillisia perusteita tai se on kohtuuton. Asianajaja tekee oikeudelle virallisen vaatimuksen takavarikon kumoamisesta.',
  },
  {
    q: 'Voiko kotietsinnän laillisuuden riitauttaa jälkikäteen?',
    a: 'Kyllä voi. Kotietsinnän kohteeksi joutuneella on oikeus saattaa kotietsinnän laillisuus tuomioistuimen tutkittavaksi etsinnän jälkeen. Jos kotietsintä todetaan laittomaksi, sillä voi olla merkitystä esimerkiksi vahingonkorvausten kannalta.',
  },
  {
    q: 'Mitä tarkoittaa erityinen kotietsintä?',
    a: 'Erityinen kotietsintä tehdään silloin, kun etsinnän kohteena on aineistoa, josta ei saa todistaa oikeudessa, esimerkiksi asianajajan ja päämiehen välistä kirjeenvaihtoa tai potilastietoja. Tuomioistuin päättää erityisestä kotietsinnästä ja määrää paikalle etsintävaltuutetun, joka valvoo, ettei suojattua aineistoa oteta haltuun. Jos aineistoa on jo viety, saatan etsinnän laillisuuden käräjäoikeuden tutkittavaksi.',
  },
];

/** This page's form differs from the others in both option lists. */
export const PAKKOKEINOT_MATTER_TYPES = [
  'Vangitsemisvaatimus',
  'Matkustuskielto',
  'Takavarikko',
  'Kotietsintä',
  'Muu',
];

export const PAKKOKEINOT_URGENCY_LEVELS = [
  'Ei kiireellinen',
  'Istunto tulossa',
  'Kiinni otettu nyt',
];
