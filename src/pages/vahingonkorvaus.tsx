import SEO from '@/components/SEO';
import JsonLd from '@/components/JsonLd';
import {
  serviceSchema,
  breadcrumbSchema,
  faqPageSchemaFrom,
  SITE_URL,
} from '@/data/schema';
import {
  KORVAUS_BLOCKS,
  KORVAUS_FAQ,
  KORVAUS_MATTER_TYPES,
  KORVAUS_ROLES,
} from '@/data/vahingonkorvaus';
import heroGround from '@images/vahingonkorvaus-hero.jpg';
import portrait from '@images/vahingonkorvaus-portrait.jpg';
import ukkGround from '@images/vahingonkorvaus-ukk.jpg';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import CookieConsent from '@/components/CookieConsent';
import EmergencyFab from '@/components/EmergencyFab';
import ServiceHero from '@/sections/ServiceHero';
import ServiceBlocks from '@/sections/ServiceBlocks';
import FaqBand from '@/sections/FaqBand';
import Contact from '@/sections/Contact';

/**
 * The vahingonkorvaus service page (.claude/design/vahingonkorvaus/).
 *
 * Shares the civil-page skeleton with riidanratkaisu — no Rikospäivystys band,
 * form before phone — but deliberately NOT its abstract CSS ground: that field
 * belongs to riidanratkaisu alone. This page's own signature is block 01's
 * paired roles, where the two cards stay visually equal because the argument is
 * that the office works both sides of the table.
 */
export default function Vahingonkorvaus() {
  const url = `${SITE_URL}/vahingonkorvaus/`;

  return (
    <>
      <SEO
        title="Vahingonkorvaus | Vaatimusten laatiminen ja torjuminen"
        description="Vahingonkorvaus rikos- tai siviiliasiassa? Laadin perusteltuja korvausvaatimuksia ja torjun perusteettomia vaatimuksia oikeudessa. Ota yhteyttä."
        url={url}
      >
        <JsonLd
          data={serviceSchema({
            name: 'Vahingonkorvausasiat',
            serviceType: 'Vahingonkorvausoikeudellinen edunvalvonta',
            description:
              'Asianajaja vahingonkorvausasioissa: korvausvaatimusten laatiminen asianomistajalle, perusteettomien vaatimusten torjunta vastaajan puolella sekä yrityssalaisuusrikoksista ja taloudellisista vahingoista aiheutuvat korvaukset.',
            url,
          })}
        />
        <JsonLd
          data={breadcrumbSchema([
            { name: 'Etusivu', path: '/' },
            { name: 'Vahingonkorvaus', path: '/vahingonkorvaus' },
          ])}
        />
        {/* Built from KORVAUS_FAQ, the same array the accordion renders. */}
        <JsonLd data={faqPageSchemaFrom(KORVAUS_FAQ)} />
      </SEO>
      <Nav />
      <main>
        <ServiceHero
          kicker="Asiantunteva asianajaja vahingonkorvausasioissa"
          /* 52px, not 56: the title carries a colon and a long second clause
             and has to stay at three lines or fewer at 1400px. */
          titleClass="text-[52px] leading-[1.08] max-md:text-[33px] max-md:leading-[1.12]"
          title="Vahingonkorvaus: Vaatimusten laatiminen ja torjuminen"
          /* No region line — the client's text does not claim one, so none
             was invented. */
          lede={[
            'Vahingonkorvausoikeus vaatii tekijältään tarkkaa näyttötaakkojen hallintaa ja vahingon määrän oikeaa arviointia. Hoidan vaativia vahingonkorvausasioita sekä siviili- että rikosasioissa. Laadin perusteltuja korvausvaatimuksia vahinkoa kärsineille ja torjun päämiehiini kohdistettuja perusteettomia vaatimuksia oikeudessa.',
          ]}
          /* Civil-page order: form before phone, as on riidanratkaisu. */
          primaryCta="contact"
          ground={heroGround}
          portrait={portrait}
          portraitAlt="Suurennuslasi asiakirjan päällä, taustalla yrityssalaisuuksia koskevia mappeja"
          mobileGround={heroGround}
          /* This frame is lit by a window and is far brighter than the other
             portraits (luma 97 vs 40); a heavier tint keeps it from sitting
             forward of them. */
          portraitTint={0.58}
        />
        <ServiceBlocks
          section="korvausasiat"
          title="Korvausasiat, joita hoidan"
          kicker="Vaatimus tai vastanäyttö"
          blocks={KORVAUS_BLOCKS}
        />
        <FaqBand
          title="Usein kysytyt kysymykset vahingonkorvauksista"
          items={KORVAUS_FAQ}
          photo={ukkGround}
        />
        <Contact
          phoneLabel="Puhelin"
          officeNote="Tapaamiset sovitusti, myös etänä."
          matterTypes={KORVAUS_MATTER_TYPES}
          matterLabel="Asian laatu"
          urgencyLevels={KORVAUS_ROLES}
          urgencyLabel="Roolisi asiassa"
          formNotice="Älä kirjoita lomakkeelle salassa pidettävää tai arkaluonteista tietoa."
        />
      </main>
      <SiteFooter />
      <EmergencyFab />
      <CookieConsent />
    </>
  );
}
