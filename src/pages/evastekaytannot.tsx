import SEO from '@/components/SEO';
import { SITE_URL } from '@/data/schema';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import EmergencyFab from '@/components/EmergencyFab';
import CookieConsent from '@/components/CookieConsent';
import CookiesInfo from '@/components/CookiesInfo';

export default function Evastekaytannot() {
  return (
    <>
      <SEO
        title="Evästekäytännöt – Asianajotoimisto Adam Huhtamäki"
        description="Miten sivusto käyttää evästeitä ja miten voit hallita suostumustasi analytiikkaevästeille."
        url={`${SITE_URL}/evastekaytannot/`}
      />
      <Nav />
      <main>
        <CookiesInfo />
      </main>
      <SiteFooter />
      <EmergencyFab />
      <CookieConsent />
    </>
  );
}
