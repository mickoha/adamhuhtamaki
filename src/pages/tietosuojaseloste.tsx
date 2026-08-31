import SEO from '@/components/SEO';
import { SITE_URL } from '@/data/schema';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import CookieConsent from '@/components/CookieConsent';
import Privacy from '@/components/Privacy';

export default function Tietosuojaseloste() {
  return (
    <>
      <SEO
        title="Tietosuojaseloste – [brändi]"
        description="Miten käsittelemme henkilötietoja: mitä tietoja kerätään, millä perusteella, kuinka kauan niitä säilytetään ja mitkä ovat oikeutesi."
        url={`${SITE_URL}/tietosuojaseloste/`}
      />
      <Nav />
      <main>
        <Privacy />
      </main>
      <SiteFooter />
      <CookieConsent />
    </>
  );
}
