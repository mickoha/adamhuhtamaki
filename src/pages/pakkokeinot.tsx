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
  QUOTE,
  QUOTE_FOLLOW_UP,
  PAKKOKEINOT_CARDS,
  PAKKOKEINOT_FAQ,
  PAKKOKEINOT_MATTER_TYPES,
  PAKKOKEINOT_URGENCY_LEVELS,
} from '@/data/pakkokeinot';
import heroGround from '@images/pakkokeinot-hero.jpg';
import portti from '@images/pakkokeinot-istunto.jpg';
import ukkGround from '@images/pakkokeinot-ukk.jpg';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import CookieConsent from '@/components/CookieConsent';
import EmergencyFab from '@/components/EmergencyFab';
import ServiceHero from '@/sections/ServiceHero';
import QuoteBand from '@/sections/QuoteBand';
import EmergencyBand from '@/sections/EmergencyBand';
import CaseTypes from '@/sections/CaseTypes';
import FaqBand from '@/sections/FaqBand';
import Contact from '@/sections/Contact';

/**
 * The pakkokeinot service page (.claude/design/pakkokeinot/README.md).
 *
 * Shorter than the rikosasianajaja page by design: the reader is likely in an
 * acute situation, so the argument for acting fast (the quote band) comes
 * second, before the service detail.
 *
 * There is deliberately NO Rikospäivystys band here — the quote band already
 * occupies the one saturated field a page may carry.
 */
export default function Pakkokeinot() {
  const url = `${SITE_URL}/pakkokeinot/`;

  return (
    <>
      <SEO
        title="Pakkokeinot & Puolustus | Vangitseminen ja takavarikko"
        description="Uhattiinko sinua vangitsemisella tai takavarikolla? Kokenut asianajaja riitauttaa poliisin pakkokeinovaatimukset Helsingissä ja koko Suomessa. Soita heti!"
        url={url}
      >
        <JsonLd
          data={serviceSchema({
            name: 'Pakkokeinoasiat',
            serviceType: 'Pakkokeinoasioiden oikeudellinen edunvalvonta',
            description:
              'Asianajaja vangitsemisvaatimuksissa, matkustuskiellossa, takavarikossa ja vakuustakavarikossa sekä kotietsinnässä ja niiden laillisuuden riitauttamisessa.',
            url,
          })}
        />
        <JsonLd
          data={breadcrumbSchema([
            { name: 'Etusivu', path: '/' },
            { name: 'Pakkokeinot', path: '/pakkokeinot' },
          ])}
        />
        {/* Built from PAKKOKEINOT_FAQ, the same array the accordion renders. */}
        <JsonLd data={faqPageSchemaFrom(PAKKOKEINOT_FAQ)} />
      </SEO>
      <Nav />
      <main>
        <ServiceHero
          kicker="Pakkokeinoihin erikoistunut asianajaja"
          /* One size down from the rikosasianajaja H1: the sentence is longer
             and has to stay at three lines or fewer at 1400px. */
          titleClass="text-[52px] leading-[1.08] max-md:text-[33px] max-md:leading-[1.12]"
          title="Pakkokeinot: Asianajaja apunasi vangitsemis- ja takavarikkoasioissa"
          lede={[
            <>
              Pakkokeinot, kuten vangitseminen, matkustuskielto tai omaisuuden
              takavarikko, ovat vakavia puuttumisia yksilön perusoikeuksiin.
              Rikosasianajajana tehtäväni on puuttua perusteettomiin
              pakkokeinovaatimuksiin välittömästi ja turvata oikeutesi
              rikosprosessin jokaisessa vaiheessa. Hoidan pakkokeinoasioita{' '}
              {fill(TAYDENNA.toimialue, 'paikkakunta/alue')} alueella ja
              tarvittaessa koko Suomessa.
            </>,
          ]}
          ground={heroGround}
          portrait={portti}
          portraitAlt="Lukittu kaltereilla varustettu portti, takana valaistu käytävä"
          mobileGround={heroGround}
        />
        <QuoteBand quote={QUOTE} followUp={QUOTE_FOLLOW_UP} />
        <CaseTypes
          section="pakkokeinoasiat"
          title="Pakkokeinoasiat, joita hoidan"
          kicker="Kiinniotosta takavarikon kumoamiseen"
          items={PAKKOKEINOT_CARDS}
        />
        {/* The handoff left this page without a päivystys band — the quote
            band was meant to be the one saturated field. Added at the client's
            request, so the page carries two indigo fields deliberately. Its
            copy is this page's own; sharing the front page's paragraph would
            put the same text on two pages. */}
        {/* The handoff left this page without a päivystys band — the quote
            band was meant to be the one saturated field. Added at the client's
            request, so the page carries two indigo fields deliberately. */}
        <EmergencyBand
          title="Aika ratkaisee: Kiinniotosta vangitsemisistuntoon on vain päiviä"
          intro={[
            'Vangitsemisistunto on järjestettävä käräjäoikeudessa viimeistään neljäntenä vuorokautena kiinniottamisesta. Puolustuksen valmisteluun ja poliisin vaatimusten kyseenalaistamiseen on siis käytettävissä vain kymmeniä tunteja.',
            'Vangitsemisvaatimus siirtyy käräjäoikeuden käsiteltäväksi erittäin nopeasti. Myös omaisuuden takavarikko tai vakuustakavarikko pitkittyy helposti kuukausilla, ellei kokenut asianajaja riitauta sitä välittömästi.',
          ]}
        />
        <FaqBand
          title="Usein kysytyt kysymykset pakkokeinoista"
          items={PAKKOKEINOT_FAQ}
          photo={ukkGround}
        />
        <Contact
          matterTypes={PAKKOKEINOT_MATTER_TYPES}
          urgencyLevels={PAKKOKEINOT_URGENCY_LEVELS}
        />
      </main>
      <SiteFooter />
      <EmergencyFab />
      <CookieConsent />
    </>
  );
}
