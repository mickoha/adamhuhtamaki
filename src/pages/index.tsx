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
        title="Rikosoikeuteen erikoistunut asianajotoimisto | Helsinki"
        /* The number is in the description on purpose: these queries are made
           in a hurry, and a SERP listing that can be dialled without a click
           converts the visit that never becomes a session. Read from CONTACT
           so it cannot drift from the eight tel: links on the page. */
        description={`Tarvitsetko apua rikosasiassa? Rikospäivystys 24/7 pääkaupunkiseudulla ja koko Suomessa, vastaan itse. Ensimmäinen puhelu 0 €. Soita ${CONTACT.phoneDisplay}.`}
        url={`${SITE_URL}/`}
      >
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
        <JsonLd data={faqPageSchema} />
      </SEO>
      <Nav />
      <main>
        <Hero />
        <EmergencyBand />
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
