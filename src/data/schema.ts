import { FAQ, type FaqItem } from '@/data/faq';
import { SITE, CONTACT, COMPANY, CONTENT_UPDATED_ISO } from '@/data/site';

export const SITE_URL = SITE.url;

/**
 * Absolute page URL with a trailing slash. The site is exported with
 * trailingSlash: true, so the non-slash variant is a 301 — canonicals and
 * structured data must point at the final URL, not the redirect.
 */
export const pageUrl = (path: string): string => {
  const p = path.endsWith('/') ? path : `${path}/`;
  return `${SITE_URL}${p}`;
};

/** Stable node ids so Organization / WebSite / Service resolve to one entity. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Where the firm actually works. The three cities are named explicitly and the
 * country after them: without a street address there is nothing else telling a
 * search or answer engine that "asianajaja Espoo" is a query this firm answers,
 * and a bare Country node loses every city-level query in the capital region.
 * Naming a city here is a claim that the firm serves it — do not add cities the
 * firm does not actually cover.
 */
export const AREA_SERVED: Record<string, unknown>[] = [
  { '@type': 'City', name: 'Helsinki' },
  { '@type': 'City', name: 'Espoo' },
  { '@type': 'City', name: 'Vantaa' },
  { '@type': 'Country', name: 'Finland' },
];

/**
 * Sitewide identity. Carry every verifiable identifier you have (Y-tunnus,
 * registered address, language, area served) — that is what lets a search or
 * answer engine tell you apart from a same-named company elsewhere. Take the
 * business ID and address from the PRH/YTJ register, never from memory.
 */
export const organizationSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  // LegalService alongside Organization: it is the type an answer engine
  // matches against "rikosasianajaja Helsinki" -style questions.
  '@type': ['Organization', 'LegalService'],
  '@id': ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/web-app-manifest-512x512.png`,
  image: `${SITE_URL}${SITE.ogImage}`,
  description: SITE.description,
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'Y-tunnus',
    value: COMPANY.businessId,
  },
  vatID: COMPANY.vatId,
  email: CONTACT.email,
  telephone: CONTACT.phone,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: CONTACT.email,
      telephone: CONTACT.phone,
      areaServed: AREA_SERVED,
      availableLanguage: ['fi', 'en'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    // streetAddress, not postOfficeBoxNumber: the address is street-shaped
    // ("Viipurinkatu 12 L 156"), and postOfficeBoxNumber is for an actual box
    // number. Putting one in the other would be wrong data in the one place a
    // search engine treats as authoritative. This asserts where post reaches
    // the firm, not that clients can walk in — schema.org has no field for
    // that distinction, and the visible copy carries it instead.
    streetAddress: COMPANY.postalAddress,
    postalCode: COMPANY.postalCode,
    addressLocality: COMPANY.city,
    addressCountry: COMPANY.country,
  },
  // Rates as published in the Hinnasto section, VAT-exclusive.
  priceRange: '270–300 €/h',
  // The firm is one named attorney; saying so is what lets an answer engine
  // connect the person and the practice.
  member: {
    '@type': 'Person',
    name: 'Adam Huhtamäki',
    jobTitle: 'Asianajaja',
  },
  knowsLanguage: ['fi', 'fi-FI'],
  areaServed: AREA_SERVED,
  /**
   * The päivystys is genuinely 24/7 and the attorney answers it himself, so
   * this is a statement of fact rather than an SEO flourish. If that ever
   * stops being true, this node comes out the same day — an opening-hours
   * claim is the one piece of structured data a visitor can disprove at 3 a.m.
   */
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
  // Add verified profile URLs (LinkedIn, Google Business, toimialarekisteri)
  // once you have them — sameAs is the strongest disambiguation signal there is.
  // sameAs: ['https://www.linkedin.com/company/…'],
};

/** WebSite node — ties the domain to the organization above. */
export const webSiteSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE.name,
  alternateName: SITE.legalName,
  url: `${SITE_URL}/`,
  inLanguage: 'fi-FI',
  description: SITE.description,
  publisher: { '@id': ORG_ID },
};

/** BreadcrumbList, e.g. breadcrumbSchema([{name:'Etusivu',path:'/'}, …]). */
export const breadcrumbSchema = (
  trail: { name: string; path: string }[],
): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: pageUrl(c.path),
  })),
});

/** Build a FAQPage from any FAQ list so JSON-LD never drifts from the text. */
export const faqPageSchemaFrom = (
  items: FaqItem[],
): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

/** FAQPage built from the homepage FAQ section. */
export const faqPageSchema = faqPageSchemaFrom(FAQ);

/**
 * Service node for a service page. This is the form answer engines match
 * against "miten X hoidetaan" -style questions — most competitors publish none.
 */
export const serviceSchema = ({
  name,
  serviceType,
  description,
  url,
}: {
  name: string;
  serviceType: string;
  description: string;
  url: string;
}): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  serviceType,
  description,
  url: url.endsWith('/') ? url : `${url}/`,
  provider: { '@id': ORG_ID },
  areaServed: AREA_SERVED,
  availableLanguage: 'fi',
  // The structured-data twin of the visible "Päivitetty" stamp. Both derive
  // from TAYDENNA.paivitetty, so they cannot disagree.
  dateModified: CONTENT_UPDATED_ISO,
});

/** SoftwareApplication — for SaaS products. Drop it if you sell services. */
export const softwareApplicationSchema = ({
  name,
  description,
  url,
  featureList,
}: {
  name: string;
  description: string;
  url: string;
  featureList: string[];
}): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: url.endsWith('/') ? url : `${url}/`,
  description,
  featureList,
  dateModified: CONTENT_UPDATED_ISO,
  publisher: { '@id': ORG_ID },
});
