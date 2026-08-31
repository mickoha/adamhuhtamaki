/**
 * Single source of truth for everything site-specific.
 *
 * This is the first file to edit when you clone the template. Nav, footer,
 * SEO tags, JSON-LD, the cookie banner and the legal pages all read from here,
 * so the rendered text and the structured data can never drift apart.
 *
 * Anything still marked [TÄYDENNÄ: …] must be filled in before launch —
 * never invent a business ID, address or phone number.
 */

export const SITE = {
  /** Brand name as it appears in the UI, <title> suffix and og:site_name. */
  name: 'Esimerkki',
  /** Registered company name — used in schema and the legal pages. */
  legalName: 'Esimerkki Oy',
  /** Canonical origin, no trailing slash. Must match SITE_URL in .env.local. */
  url: 'https://example.fi',
  /** One-sentence description (schema + og fallback). Answer-first, no fluff. */
  description:
    '[TÄYDENNÄ: yhden lauseen kuvaus siitä, mitä yritys tekee ja kenelle.]',
  /** Short tagline under the footer logo. */
  tagline: '[TÄYDENNÄ: lyhyt tagline.]',
  locale: 'fi_FI',
  lang: 'fi',
  /** Browser/PWA theme color — keep in sync with --color-site-primary. */
  themeColor: '#111463',
  /** Default social share image, relative to public/. 1200×630. */
  ogImage: '/og-cover.jpg',
  /** Alt text for that share image. */
  ogImageAlt: '[TÄYDENNÄ: kuvaus jakokuvasta.]',
  /** Logo files in public/ (for light background / for dark background). */
  logo: '/logo.svg',
  logoOnDark: '/logo-white.svg',
} as const;

/**
 * Public contact details. `tel:` / `mailto:` links built from these are tracked
 * automatically as phone_click / email_click by AnalyticsTracker — no wiring.
 */
export const CONTACT = {
  /** E.164, used in href="tel:" and schema. */
  phone: '+358000000000',
  /** Human-readable form shown to visitors. */
  phoneDisplay: '+358 00 000 0000',
  email: 'info@example.fi',
  /** Privacy contact for the tietosuojaseloste page. */
  privacyEmail: 'tietosuoja@example.fi',
  privacyContactName: '[TÄYDENNÄ: nimi]',
} as const;

/** Company identifiers — footer, schema and legal pages. */
export const COMPANY = {
  businessId: '[TÄYDENNÄ: Y-tunnus]',
  vatId: '[TÄYDENNÄ: ALV-tunnus]',
  streetAddress: '[TÄYDENNÄ: katuosoite]',
  postalCode: '[TÄYDENNÄ: postinumero]',
  city: 'Helsinki',
  country: 'FI',
  countryName: 'Suomi',
  /** Shown in the footer copyright line. */
  founded: '2026',
} as const;

/** Version + effective date rendered at the top of the legal pages. */
export const LEGAL = {
  version: '1.0',
  effectiveFi: '[TÄYDENNÄ: 1.1.2026]',
} as const;

/**
 * Content-freshness signal (GEO): answer engines weigh a visible update date.
 * Bump both when page copy changes.
 */
export const CONTENT_UPDATED_FI = '[TÄYDENNÄ: 1.1.2026]';
export const CONTENT_UPDATED_ISO = '2026-01-01';
