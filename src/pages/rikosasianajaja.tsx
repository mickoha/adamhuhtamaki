import SEO from '@/components/SEO';
import JsonLd from '@/components/JsonLd';
import {
  serviceSchema,
  breadcrumbSchema,
  faqPageSchemaFrom,
  SITE_URL,
} from '@/data/schema';
import { CONTACT } from '@/data/site';
import { RIKOS_FAQ, CASE_TYPES } from '@/data/rikosoikeus';
import ukkGround from '@images/rikosasianajaja-ukk.jpg';
import heroGround from '@images/rikosasianajaja-hero.jpg';
import oikeussali from '@images/rikosasianajaja-oikeussali.jpg';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import CookieConsent from '@/components/CookieConsent';
import EmergencyFab from '@/components/EmergencyFab';
import ServiceHero from '@/sections/ServiceHero';
import CaseTypes from '@/sections/CaseTypes';
import EmergencyBand from '@/sections/EmergencyBand';
import ProcessSteps from '@/sections/ProcessSteps';
import FaqBand from '@/sections/FaqBand';
import Contact from '@/sections/Contact';

/**
 * The rikosasianajaja service page (.claude/design/rikosoikeus/README.md).
 *
 * Section order is deliberate: what the office does → the emergency number at
 * the moment the reader is most likely to act → the process → the objections →
 * the form.
 */
export default function Rikosasianajaja() {
  const url = `${SITE_URL}/rikosasianajaja/`;

  return (
    <>
      <SEO
        title="Kokenut rikosasianajaja | Helsinki, Espoo & Vantaa"
        /* Client copy, with one change: the supplied "Hoidamme" is plural and
           the site speaks in the first person singular everywhere. */
        description="Etsitkö kokenutta rikosasianajajaa? Hoidan vakavat rikosasiat, talousrikokset ja huumausainerikokset pääkaupunkiseudulla ja koko Suomessa. Ota yhteyttä."
        url={url}
      >
        <JsonLd
          data={serviceSchema({
            name: 'Rikosasianajajan palvelut',
            serviceType: 'Rikosoikeudellinen edunvalvonta',
            description:
              'Rikosasianajaja avustaa sekä rikoksesta epäiltyjä että asianomistajia esitutkinnassa, syyteharkinnassa, käräjäoikeudessa ja hovioikeudessa. Erikoisaloina väkivalta- ja henkirikokset, huumausainerikokset, talousrikokset, seksuaalirikokset, tietoverkkorikokset ja omaisuusrikokset. Lisäksi virkarikokset ja työturvallisuusrikokset, joissa avustetaan sekä työntekijää että yhtiötä.',
            url,
          })}
        />
        <JsonLd
          data={breadcrumbSchema([
            { name: 'Etusivu', path: '/' },
            { name: 'Rikosasianajaja', path: '/rikosasianajaja' },
          ])}
        />
        {/* Built from RIKOS_FAQ, the same array the accordion renders. */}
        <JsonLd data={faqPageSchemaFrom(RIKOS_FAQ)} />
      </SEO>
      <Nav />
      <main>
        <ServiceHero
          kicker="Kokenut rikosasianajaja"
          title="Vakavat rikokset ovat työni ydin"
          titleClass="text-[56px] leading-[1.05] max-md:text-[38px] max-md:leading-[1.08]"
          lede={[
            'Kokenut rikosasianajaja turvaa oikeutesi ja huolehtii edustuksestasi koko rikosprosessin ajan. Avustan sekä rikoksesta epäiltyjä että asianomistajia eli rikoksen uhreja prosessin jokaisessa vaiheessa: poliisin suorittamassa esitutkinnassa, syyteharkinnassa, käräjäoikeuden pääkäsittelyssä ja tarvittaessa muutoksenhaussa hovioikeuteen.',
            'Toimin pääasiassa pääkaupunkiseudun alueella, mutta hoidan laajoja toimeksiantoja valtakunnallisesti.',
          ]}
          pullQuote="Jokainen rikosasia vaatii yksilöllistä perehtymistä ja tarkkaa taktikointia."
          ground={heroGround}
          portrait={oikeussali}
          portraitAlt="Asianajaja ja päämies kuulusteluhuoneen pöydän ääressä, edessä asiakirjakansio"
          mobileGround={oikeussali}
        />
        <CaseTypes
          title="Erikoistumisalueeni rikosoikeudessa"
          items={CASE_TYPES}
          intro="Erityisosaamistani ovat vaativat ja vakavat rikosasiat, jotka edellyttävät puolustajalta tai asianomistajan avustajalta perusteellista lainsäädännön tuntemusta ja vankkaa oikeussalikokemusta. Hoidan säännöllisesti seuraaviin rikosnimikkeisiin liittyviä toimeksiantoja."
          /* Ruudukon ALLE aksenttiviivalle, ei seitsemänneksi kortiksi: kortti
             väittäisi samaa painoarvoa kuin kuusi muuta, ja tämän rivin pointti
             on "näitä myös". Sama kuvio kuin vahingonkorvauksella ja
             riidanratkaisulla etusivulla. */
          footnote="Näiden lisäksi hoidan virkarikosasioita sekä työturvallisuusrikoksia, joissa avustan sekä työntekijää että yhtiötä."
        />
        <EmergencyBand
          intro={[
            <>
              Oletko osallisena rikosasian esitutkinnassa tai onko asiasi
              siirtymässä tuomioistuimeen? Ota yhteyttä luottamuksellisesti
              numeroon{' '}
              <a
                href={`tel:${CONTACT.phone}`}
                data-track-click="paivystys_numero_teksti"
                className="underline underline-offset-4 transition-colors hover:text-site-accent-300"
              >
                {CONTACT.phoneDisplay}
              </a>{' '}
              tai lue lisää{' '}
              <a
                href="#yhteys"
                className="underline underline-offset-4 transition-colors hover:text-site-accent-300"
              >
                yhteystiedoista
              </a>
              .
            </>,
          ]}
        />
        <ProcessSteps />
        <FaqBand
          title="Usein kysytyt kysymykset rikosasioista"
          items={RIKOS_FAQ}
          photo={ukkGround}
        />
        <Contact />
      </main>
      <SiteFooter />
      <EmergencyFab />
      <CookieConsent />
    </>
  );
}
