import SEO from '@/components/SEO';
import JsonLd from '@/components/JsonLd';
import {
  serviceSchema,
  breadcrumbSchema,
  faqPageSchemaFrom,
  SITE_URL,
} from '@/data/schema';
import { CONTENT_UPDATED_FI } from '@/data/site';
import { FAQ } from '@/data/faq';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import CookieConsent from '@/components/CookieConsent';
import PageHero from '@/sections/PageHero';
import Features from '@/sections/Features';
import Faq from '@/sections/Faq';
import CTA from '@/sections/CTA';

/**
 * Subpage template. Copy this file for each service page and change the SEO
 * strings, the hero, the sections and the FAQ list. One question per H2, and
 * the answer in the first two sentences under it.
 */
export default function Palvelut() {
  const url = `${SITE_URL}/palvelut/`;
  return (
    <>
      <SEO
        title="[TÄYDENNÄ: palvelun nimi hakusanana] – [brändi]"
        description="[TÄYDENNÄ: mitä palvelu tekee, kenelle, ja mikä on konkreettinen lopputulos.]"
        url={url}
      >
        <JsonLd
          data={serviceSchema({
            name: '[TÄYDENNÄ: palvelun nimi]',
            serviceType: '[TÄYDENNÄ: toimialan vakiintunut termi]',
            description: '[TÄYDENNÄ: sama kuvaus kuin sivun ingressissä.]',
            url,
          })}
        />
        <JsonLd
          data={breadcrumbSchema([
            { name: 'Etusivu', path: '/' },
            { name: 'Palvelut', path: '/palvelut' },
          ])}
        />
        <JsonLd data={faqPageSchemaFrom(FAQ)} />
      </SEO>
      <Nav />
      <main>
        <PageHero
          eyebrow="[TÄYDENNÄ]"
          title="[TÄYDENNÄ: sivun H1 vastaa yhteen kysymykseen]"
          lead="[TÄYDENNÄ: vastaa kysymykseen heti ensimmäisessä lauseessa — ei johdantoa.]"
          primary={{ label: 'Ota yhteyttä', href: '#yhteys', dataTrack: 'hero_cta' }}
          breadcrumb={[
            { label: 'Etusivu', href: '/' },
            { label: 'Palvelut', href: '/palvelut/' },
          ]}
          updated={CONTENT_UPDATED_FI}
        />
        <Features />
        <Faq />
        <CTA />
      </main>
      <SiteFooter />
      <CookieConsent />
    </>
  );
}
