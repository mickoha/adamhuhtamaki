import SEO from '@/components/SEO';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, breadcrumbSchema, SITE_URL } from '@/data/schema';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import CookieConsent from '@/components/CookieConsent';
import CTA from '@/sections/CTA';

export default function Yhteystiedot() {
  return (
    <>
      <SEO
        title="Ota yhteyttä – [brändi]"
        description="[TÄYDENNÄ: kenelle yhteydenotto kannattaa ja mitä sen jälkeen tapahtuu. Puhelin ja sähköposti näkyvät sivulla.]"
        url={`${SITE_URL}/yhteystiedot/`}
      >
        <JsonLd data={organizationSchema} />
        <JsonLd
          data={breadcrumbSchema([
            { name: 'Etusivu', path: '/' },
            { name: 'Ota yhteyttä', path: '/yhteystiedot' },
          ])}
        />
      </SEO>
      <Nav />
      <main>
        {/* headingAs="h1": this is the page's main heading. */}
        <CTA headingAs="h1" />
      </main>
      <SiteFooter />
      <CookieConsent />
    </>
  );
}
