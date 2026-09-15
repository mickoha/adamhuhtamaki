import SEO from '@/components/SEO';
import JsonLd from '@/components/JsonLd';
import {
  serviceSchema,
  breadcrumbSchema,
  faqPageSchemaFrom,
  SITE_URL,
} from '@/data/schema';
import { TAYDENNA, fill } from '@/data/taydenna';
import {
  DISPUTE_BLOCKS,
  RIITA_FAQ,
  RIITA_MATTER_TYPES,
  RIITA_STAGES,
} from '@/data/riidanratkaisu';
import heroGround from '@images/riidanratkaisu-hero.jpg';
import neuvottelu from '@images/riidanratkaisu-portrait.jpg';
import ukkGround from '@images/riidanratkaisu-ukk.jpg';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import CookieConsent from '@/components/CookieConsent';
import EmergencyFab from '@/components/EmergencyFab';
import ServiceHero from '@/sections/ServiceHero';
import ServiceBlocks from '@/sections/ServiceBlocks';
import FaqBand from '@/sections/FaqBand';
import Contact from '@/sections/Contact';

/**
 * The riidanratkaisu service page (.claude/design/riidanratkaisu/).
 *
 * Keeps the shared service-page skeleton but reads as considered rather than
 * urgent: no Rikospäivystys band, no pulsing dot, an abstract CSS ground in
 * place of photography in the services section, and the hero's primary CTA is
 * the form rather than the phone.
 */
export default function Riidanratkaisu() {
  const url = `${SITE_URL}/riidanratkaisu/`;

  return (
    <>
      <SEO
        title="Riidanratkaisu ja oikeudenkäynnit | Asianajaja riita-asioissa"
        description="Työsuhderiita, sopimusriita tai kuluttajariita? Avustan yrityksiä ja yksityishenkilöitä neuvotteluissa ja oikeudenkäynneissä. Ota yhteyttä."
        url={url}
      >
        <JsonLd
          data={serviceSchema({
            name: 'Riidanratkaisu ja oikeudenkäynnit',
            serviceType: 'Riita-asioiden oikeudellinen edunvalvonta',
            description:
              'Asianajaja siviiliriidoissa: työsuhde- ja työoikeudelliset riidat, yritysten väliset sopimusriidat sekä kuluttajariidat. Neuvottelut tuomioistuimen ulkopuolella ja edustus käräjä- ja hovioikeudessa.',
            url,
          })}
        />
        <JsonLd
          data={breadcrumbSchema([
            { name: 'Etusivu', path: '/' },
            { name: 'Riidanratkaisu', path: '/riidanratkaisu' },
          ])}
        />
        {/* Built from RIITA_FAQ, the same array the accordion renders. */}
        <JsonLd data={faqPageSchemaFrom(RIITA_FAQ)} />
      </SEO>
      <Nav />
      <main>
        <ServiceHero
          kicker="Kokenut asianajaja riita-asioissa ja oikeudenkäynneissä"
          title="Riidanratkaisu ja oikeudenkäynnit"
          titleClass="text-[56px] leading-[1.05] max-md:text-[36px] max-md:leading-[1.1]"
          lede={[
            'Asiantunteva riidanratkaisu säästää aikaa, rahaa ja yrityksen mainetta. Avustan yrityksiä ja yksityishenkilöitä vaativissa siviiliriidoissa, kuten työsuhde- ja sopimusasioissa. Tavoitteeni on aina saavuttaa päämiehelleni paras mahdollinen lopputulos joko tehokkailla tuomioistuimen ulkopuolisilla neuvotteluilla tai periksiantamattomalla edustuksella oikeussalissa.',
            <>
              Hoidan riita-asioita ja oikeudenkäyntejä{' '}
              {fill(TAYDENNA.toimialue, 'paikkakunta/alue')} alueella sekä
              valtakunnallisesti.
            </>,
          ]}
          /* Inverted from the criminal pages: form first, phone second. */
          primaryCta="contact"
          ground={heroGround}
          portrait={neuvottelu}
          portraitAlt="Kaksi neuvottelijaa pöydän ääressä, edessä pino sopimusasiakirjoja"
          /* Mobile has no portrait column, so the neuvottelu frame becomes the
             ground there — as the handoff specifies for this page. */
          mobileGround={neuvottelu}
        />
        <ServiceBlocks
          section="riita_asiat"
          title="Riita-asiat, joita hoidan"
          kicker="Neuvottelusta pääkäsittelyyn"
          blocks={DISPUTE_BLOCKS}
          abstractGround
        />
        <FaqBand
          title="Usein kysytyt kysymykset riidanratkaisusta"
          items={RIITA_FAQ}
          photo={ukkGround}
        />
        <Contact
          phoneLabel="Puhelin"
          officeNote="Tapaamiset sovitusti, myös etänä."
          matterTypes={RIITA_MATTER_TYPES}
          matterLabel="Riidan laatu"
          urgencyLevels={RIITA_STAGES}
          urgencyLabel="Missä vaiheessa asia on"
          formNotice="Älä kirjoita lomakkeelle salassa pidettävää tai arkaluonteista tietoa."
        />
      </main>
      <SiteFooter />
      <EmergencyFab />
      <CookieConsent />
    </>
  );
}
