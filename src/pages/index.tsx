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
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import Faq from '@/sections/Faq';
import CTA from '@/sections/CTA';

export default function Home() {
  return (
    <>
      <SEO
        title="[TÄYDENNÄ: hakusana ensin – Brändi]"
        description="[TÄYDENNÄ: 150–160 merkkiä, jotka vastaavat suoraan siihen mitä hakija etsii, ja päättyvät toimintakehotukseen.]"
        url={`${SITE_URL}/`}
      >
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
        <JsonLd data={faqPageSchema} />
      </SEO>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Faq />
        <CTA />
      </main>
      <SiteFooter />
      <CookieConsent />
    </>
  );
}
