import type { StaticImageData } from 'next/image';
import type { FaqItem } from '@/data/faq';
import vakivalta from '@images/rikosasianajaja-vakivalta.jpg';
import huumausaine from '@images/rikosasianajaja-huumausaine.jpg';
import talous from '@images/rikosasianajaja-talous.jpg';
import seksuaali from '@images/rikosasianajaja-seksuaali.jpg';
import tietoverkko from '@images/rikosasianajaja-tietoverkko.jpg';
import omaisuus from '@images/rikosasianajaja-omaisuus.jpg';

/**
 * Content for the rikosasianajaja page (.claude/design/rikosoikeus/README.md).
 *
 * The copy is client-supplied and final — it ships verbatim and must not be
 * rewritten for SEO or tone. First person singular throughout, like the rest
 * of the site.
 */

export interface CaseType {
  /** 01–06, rendered in the accent beside the title. Order is fixed. */
  number: string;
  title: string;
  body: string;
  /** Card photograph, 16:10, composited with .lighten. Omit and the card
   *  renders a labelled placeholder holding the same box. */
  photo?: StaticImageData;
  /** Describes the delivered frame, not the rikosnimike in the abstract. */
  photoAlt: string;
}

export const CASE_TYPES: CaseType[] = [
  {
    number: '01',
    title: 'Väkivalta- ja henkirikokset',
    body: 'Väkivaltarikoksissa tilanteet ovat usein näyttökysymyksiltään monimutkaisia. Avustan asiakkaitani perusmuotoisissa ja törkeissä pahoinpitelyissä sekä ryöstörikoksissa. Henkirikosten osalta hoidan vaativia tapon yrityksiin ja toteutuneisiin henkirikoksiin liittyviä puolustus- ja asianomistajatehtäviä, joissa panokset ja mahdolliset seuraamukset ovat poikkeuksellisen suuret.',
    photo: vakivalta,
    photoAlt: 'Käsiraudat naarmuisella metallipöydällä hämärässä huoneessa',
  },
  {
    number: '02',
    title: 'Huumausainerikokset',
    body: 'Huumausaineisiin liittyvä oikeuskäytäntö muuttuu jatkuvasti. Olen erikoistunut erityisesti törkeisiin huumausainerikoksiin, laajoihin monikansallisiin tutkintakokonaisuuksiin sekä useiden vastaajien oikeudenkäynteihin. Näissä jutuissa esitutkinta-aineiston laajuus ja telekuuntelutallenteiden läpikäynti vaativat avustajalta äärimmäistä huolellisuutta.',
    photo: huumausaine,
    photoAlt: 'Tyhjä oikeussali hämärässä, edessä asianajajan pöytä',
  },
  {
    number: '03',
    title: 'Talousrikokset',
    body: 'Talousrikosasiat edellyttävät juridisen osaamisen lisäksi ymmärrystä yritystoiminnasta ja kirjanpidosta. Hoidan säännöllisesti kirjanpito- ja verorikoksia, petoksia ja kavalluksia. Avustan myös tilanteissa, joissa asiakasta uhkaa liiketoimintakielto, tai kun kieltoa pyritään kumoamaan.',
    photo: talous,
    photoAlt: 'Toimistohuone, jossa vanha teräksinen kassakaappi ja työpöytä',
  },
  {
    number: '04',
    title: 'Seksuaalirikokset',
    body: 'Seksuaalirikosprosessit ovat inhimillisesti raskaita ja vaativat avustajalta ehdotonta hienotunteisuutta. Avustan näissä asioissa sekä epäiltyjä että asianomistajia. Käsittelyt toimitetaan oikeudessa lähes poikkeuksetta salassa pidettävinä, ja huolehdin asiakkaani yksityisyyden suojasta koko prosessin ajan.',
    photo: seksuaali,
    photoAlt: 'Murrettu riippulukko betonipinnalla',
  },
  {
    number: '05',
    title: 'Tietoverkko- ja yrityssalaisuusrikokset',
    body: 'Digitalisoituva yhteiskunta on tuonut mukanaan uudet rikosmuodot. Hoidan tietoverkkoihin kohdistuvia rikoksia sekä monimutkaisia yrityssalaisuusrikoksia, joissa on usein kyse huomattavista taloudellisista intresseistä ja liiketoiminnan turvaamisesta.',
    photo: tietoverkko,
    photoAlt: 'Palvelinsalin käytävä, laitekaappien merkkivalot pimeässä',
  },
  {
    number: '06',
    title: 'Omaisuusrikokset',
    body: 'Avustan asiakkaita myös perinteisissä omaisuusrikoksissa, kuten törkeissä varkauksissa, vahingonteoissa ja kotirauhan rikkomista koskevissa asioissa. Näissä korvausvaatimukset nousevat usein huomattaviksi.',
    photo: omaisuus,
    photoAlt: 'Salkkua kantava henkilö kävelee oikeustalon ohi',
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  body: string;
  /** The rule above each step lightens along the sequence. */
  rule: string;
  /** Step 01 is the filled dot; the rest are ringed. */
  filled?: boolean;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Esitutkinta',
    body: 'Läsnäolo kuulusteluissa, tutkintapyynnöt ja tarpeettoman tutkinnan rajaaminen.',
    rule: 'border-site-accent-600',
    filled: true,
  },
  {
    number: '02',
    title: 'Syyteharkinta',
    body: 'Loppulausunto syyttäjälle ja neuvottelut syyteneuvottelusta silloin, kun se on eduksi.',
    rule: 'border-site-accent-700',
  },
  {
    number: '03',
    title: 'Käräjäoikeus',
    body: 'Todistelun valmistelu, kuulustelut istunnossa ja loppulausunto pääkäsittelyssä.',
    rule: 'border-site-accent-800',
  },
  {
    number: '04',
    title: 'Hovioikeus',
    body: 'Valitus, jatkokäsittelylupa ja pääkäsittely hovioikeudessa.',
    rule: 'border-site-divider',
  },
];

/** Six reference answers. Feeds both the accordion and this page's FAQPage. */
export const RIKOS_FAQ: FaqItem[] = [
  {
    q: 'Milloin rikosasianajajaan kannattaa ottaa yhteyttä?',
    a: 'Yhteyttä kannattaa ottaa välittömästi, kun olet saanut kutsun poliisikuulusteluun joko epäiltynä tai asianomistajana. Avustajan läsnäolo jo ensimmäisissä kuulusteluissa on ratkaisevan tärkeää koko loppuprosessin kannalta.',
  },
  {
    q: 'Mitä rikosasianajajan palvelut maksavat?',
    a: 'Asianajokulut riippuvat jutun laajuudesta, mutta suuressa osassa tapauksia kulut katetaan joko kotivakuutuksen oikeusturvavakuutuksesta tai valtion varoista maksettavasta oikeusavusta. Selvitän aina toimeksiannon aluksi asiakkaan mahdollisuuden maksuttomaan oikeudenkäyntiin tai vakuutuskorvaukseen.',
  },
  {
    q: 'Voiko sama asianajaja avustaa sekä epäiltyä että uhria?',
    a: 'Sama asianajaja ei voi koskaan avustaa samassa oikeudenkäynnissä sekä rikoksesta epäiltyä että asianomistajaa. Minulla on kuitenkin vankka kokemus kummastakin roolista eri toimeksiannoissa, mikä antaa syvällisen ymmärryksen rikosprosessin dynamiikasta ja vastapuolen taktiikasta.',
  },
  {
    q: 'Kuinka kauan rikosprosessi tyypillisesti kestää?',
    a: 'Rikosprosessin kesto vaihtelee merkittävästi. Yksinkertaisissa asioissa esitutkinnasta käräjäoikeuden tuomioon voi kulua alle puoli vuotta, kun taas laajoissa talous- ja huumausainerikoksissa pelkkä esitutkinta voi kestää 1–2 vuotta ja koko oikeusprosessi hovioikeuksineen useita vuosia.',
  },
  {
    q: 'Tarvitsenko asianajajan jo poliisikuulusteluun?',
    a: 'Kyllä, asianajajan läsnäolo jo ensimmäisessä poliisikuulusteluissa on erittäin suositeltavaa. Asiat, joita sanot (tai jätät sanomatta) ensimmäisissä kuulusteluissa, vaikuttavat merkittävästi koko myöhempään oikeusprosessiin.',
  },
  {
    q: 'Hoidatko virka- ja työturvallisuusrikoksia?',
    a: 'Kyllä. Avustan virkarikosasioissa ja työturvallisuusrikoksissa. Työturvallisuusasioissa voin toimia joko työntekijän tai yhtiön avustajana sen mukaan, kummassa asemassa olet.',
  },
  {
    q: 'Mitä tarkoittaa syyteneuvottelu?',
    a: 'Syyteneuvottelussa rikoksesta epäilty tunnustaa rikoksen, ja vastineeksi syyttäjä sitoutuu vaatimaan lievennettyä rangaistusta. Asianajajana arvioin aina tapauskohtaisesti, onko syyteneuvotteluun suostuminen päämieheni edun mukaista.',
  },
];
