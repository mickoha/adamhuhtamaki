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
 * Sitewide identity. Carry every verifiable identifier you have (Y-tunnus,
 * registered address, language, area served) — that is what lets a search or
 * answer engine tell you apart from a same-named company elsewhere. Take the
 * business ID and address from the PRH/YTJ register, never from memory.
 */
export const organizationSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
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
      areaServed: COMPANY.country,
      availableLanguage: ['fi', 'en'],
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: COMPANY.streetAddress,
    postalCode: COMPANY.postalCode,
    addressLocality: COMPANY.city,
    addressCountry: COMPANY.country,
  },
  knowsLanguage: ['fi', 'fi-FI'],
  areaServed: { '@type': 'Country', name: COMPANY.countryName },
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
  trail: { name: string; path: string }[]
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
  items: FaqItem[]
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
  areaServed: { '@type': 'Country', name: COMPANY.countryName },
  availableLanguage: 'fi',
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
