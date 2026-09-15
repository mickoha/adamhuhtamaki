import SEO from '@/components/SEO';
import JsonLd from '@/components/JsonLd';
import {
  organizationSchema,
  webSiteSchema,
  faqPageSchema,
  SITE_URL,
} from '@/data/schema';
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
        description="Tarvitsetko apua rikosasiassa? Asianajotoimisto Adam Huhtamäki palvelee pääkaupunkiseudulla ja valtakunnallisesti. Rikospäivystys 24/7. Ensimmäinen puhelu 0 €."
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
