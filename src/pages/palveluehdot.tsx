import SEO from '@/components/SEO';
import { SITE_URL } from '@/data/schema';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import CookieConsent from '@/components/CookieConsent';
import Terms from '@/components/Terms';

export default function Palveluehdot() {
  return (
    <>
      <SEO
        title="Palveluehdot – [brändi]"
        description="Palvelun käyttöä koskevat ehdot: sopijapuolet, hinnat ja maksuehdot, vastuut sekä sopimuksen voimassaolo."
        url={`${SITE_URL}/palveluehdot/`}
      />
      <Nav />
      <main>
        <Terms />
      </main>
      <SiteFooter />
      <CookieConsent />
    </>
  );
}
