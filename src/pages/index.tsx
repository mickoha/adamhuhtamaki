import SEO from '@/components/SEO';
import JsonLd from '@/components/JsonLd';
import {
  organizationSchema,
  webSiteSchema,
  faqPageSchema,
  SITE_URL,
} from '@/data/schema';
import { CONTACT } from '@/data/site';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import CookieConsent from '@/components/CookieConsent';
import EmergencyFab from '@/components/EmergencyFab';
import Hero from '@/sections/Hero';
import EmergencyBand from '@/sections/EmergencyBand';
import Audiences from '@/sections/Audiences';
import Backdrop from '@/sections/Backdrop';
import Specialities from '@/sections/Specialities';
import Pricing from '@/sections/Pricing';
import Attorney from '@/sections/Attorney';
import Faq from '@/sections/Faq';
import Contact from '@/sections/Contact';

export default function Home() {
  return (
    <>
      <SEO
        /* Leads with "rikospäivystys": the front page already ranks for it
           (pos. 11, W40). "Rikosasianajaja" stays with /rikosasianajaja/ so
           the two pages do not compete for the same query. */
        title="Rikospäivystys 24/7 – asianajaja vastaa itse | Helsinki"
        /* The number is in the description on purpose: these queries are made
           in a hurry, and a SERP listing that can be dialled without a click
           converts the visit that never becomes a session. Read from CONTACT
           so it cannot drift from the eight tel: links on the page. */
        description={`Rikospäivystys 24/7: vastaan puhelimeen itse, myös yöllä ja viikonloppuna. Ensimmäinen arvio puhelimessa 0 €. Helsinki ja koko Suomi. Soita ${CONTACT.phoneDisplay}.`}
        url={`${SITE_URL}/`}
      >
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
        <JsonLd data={faqPageSchema} />
      </SEO>
      <Nav />
      <main>
        <Hero />
        {/* Front-page copy passed as props: /rikosasianajaja/ and
            /pakkokeinot/ still render the component's default heading. */}
        <EmergencyBand
          title="Rikospäivystys 24/7 – vastaan puhelimeen itse"
          intro={[
            'Rikospäivystykseni palvelee ympäri vuorokauden, myös öisin, viikonloppuisin ja pyhinä. Vastaan päivystysnumeroon itse. Jos en pääse vastaamaan, soitan takaisin heti, kun vapaudun oikeussalista tai poliisiasemalta.',
            'Soita heti, kun sinut tai läheisesi on otettu kiinni, sinut on kutsuttu poliisikuulusteluun tai saat tiedon esitutkinnasta. Avustan sekä rikoksesta epäiltyjä että asianomistajia. Ensimmäinen arvio puhelimessa on 0 €, ja samalla selvitän, kattaako oikeusapu, määrätty puolustaja tai vakuutuksen oikeusturva asianajokulut. Se selvitetään aina ennen laskutusta.',
          ]}
          panelNote="Vastaan itse, 24/7."
        />
        <Audiences />
        {/* One decorative layer spans both sections — see Backdrop. */}
        <Backdrop>
          <Specialities />
          <Pricing />
        </Backdrop>
        <Attorney />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <EmergencyFab />
      <CookieConsent />
    </>
  );
}
