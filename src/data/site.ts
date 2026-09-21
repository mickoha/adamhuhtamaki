import { TAYDENNA, fill } from '@/data/taydenna';

/**
 * Single source of truth for everything site-specific.
 *
 * This is the first file to edit when you clone the template. Nav, footer,
 * SEO tags, JSON-LD, the cookie banner and the legal pages all read from here,
 * so the rendered text and the structured data can never drift apart.
 *
 * Values the client still owes are NOT written here — they come from
 * src/data/taydenna.ts, which is the one file to fill in. An empty field there
 * renders as a visible [TÄYDENNÄ: …] marker.
 */

export const SITE = {
  /** Brand name as it appears in the UI, <title> suffix and og:site_name. */
  name: 'Asianajotoimisto Adam Huhtamäki',
  /** Registered company name — used in schema and the legal pages. */
  legalName: fill(TAYDENNA.legalName, 'rekisteröity toiminimi'),
  /** Canonical origin, no trailing slash. Must match SITE_URL in .env.local. */
  url: 'https://adamhuhtamaki.fi',
  /** One-sentence description (schema + og fallback). Answer-first, no fluff. */
  description:
    'Rikosoikeuteen erikoistunut asianajotoimisto, joka avustaa rikoksesta epäiltyjä, asianomistajia ja heidän läheisiään esitutkinnasta tuomioistuimeen pääkaupunkiseudulla ja koko Suomessa.',
  /** Short tagline under the footer logo. */
  tagline: 'Rikosoikeuden asianajaja esitutkinnasta tuomioon.',
  locale: 'fi_FI',
  lang: 'fi',
  /** Browser/PWA theme color — keep in sync with --color-site-primary. */
  themeColor: '#161826',
  /** Default social share image, relative to public/. 1200×630. */
  ogImage: '/og-image-adam-huhtamaki.jpg',
  /** Alt text for that share image. */
  ogImageAlt:
    'Asianajotoimisto Adam Huhtamäki – rikosoikeuteen erikoistunut asianajaja',
  /** The raven mark. Painted through a CSS mask by RavenMark, so this file is
   *  a silhouette whose colour comes from currentColor, not from the file. */
  logo: '/raven.svg',
} as const;

/**
 * Public contact details. `tel:` / `mailto:` links built from these are tracked
 * automatically as phone_click / email_click by AnalyticsTracker — no wiring.
 *
 * The päivystys number is the site's single most important asset: it appears in
 * six places (header, hero, päivystyspalkki, yhteystiedot, kelluva nappi,
 * mobiilivalikko) and every one of them reads it from here.
 */
export const CONTACT = {
  /** E.164, used in href="tel:" and schema. */
  phone: fill(TAYDENNA.phone, 'puhelinnumero'),
  /** Human-readable form shown to visitors. */
  phoneDisplay: fill(TAYDENNA.phoneDisplay, 'puhelinnumero'),
  /** General office inbox: every email slot except the /yhteystiedot/ hero. */
  email: fill(TAYDENNA.email, 'sähköpostiosoite'),
  /** The attorney's own address, shown only in the /yhteystiedot/ hero. */
  attorneyEmail: fill(TAYDENNA.attorneyEmail, 'asianajajan sähköposti'),
  /** Privacy contact for the tietosuojaseloste page. */
  privacyEmail: fill(TAYDENNA.privacyEmail, 'tietosuoja-sähköposti'),
  privacyContactName: 'Adam Huhtamäki',
} as const;

/** Company identifiers — footer, schema and legal pages. */
export const COMPANY = {
  businessId: fill(TAYDENNA.businessId, 'Y-tunnus'),
  vatId: fill(TAYDENNA.vatId, 'ALV-tunnus'),
  /** Postal address, without the postcode and city (those are separate).
   *  A POSTAL address, not a visiting one: the site never promises that a
   *  client can turn up here, and ContactDetails says so in as many words. */
  postalAddress: fill(TAYDENNA.postiosoite, 'postiosoite'),
  postalCode: fill(TAYDENNA.postalCode, 'postinumero'),
  city: 'Helsinki',
  country: 'FI',
  countryName: 'Suomi',
  /** Shown under the postal address in the contact block. */
  officeNoteFi: 'Tapaamiset sovitusti, myös etänä ja vankilassa.',
  /** Shown in the footer copyright line. */
  founded: fill(TAYDENNA.founded, 'perustamisvuosi'),
} as const;

/**
 * Feature switches.
 *
 * `cookieBanner: false` hides the consent banner (and, with it, the footer's
 * "Evästeasetukset" link). Because the banner is the only thing that sets the
 * `ah_ga` cookie, and `ah_ga` is the only gate on Google Analytics, switching
 * it off also means NO analytics load — which is the correct behaviour: no
 * tracking without consent.
 *
 * MUST be true in production, or the site ships with no consent banner and no
 * analytics.
 */
export const FEATURES = {
  cookieBanner: true,
} as const;

/** Version + effective date rendered at the top of the legal pages. */
export const LEGAL = {
  version: '1.0',
  effectiveFi: '18.9.2026',
} as const;

/**
 * Content-freshness signal (GEO): answer engines weigh a visible update date.
 *
 * ONE source — TAYDENNA.paivitetty. The ISO form is derived from it rather
 * than kept as a second field, so the visible stamp and the structured data
 * can never disagree because someone updated one and forgot the other.
 */
export const CONTENT_UPDATED_FI = TAYDENNA.paivitetty;

/** '2.9.2026' → '2026-09-02'. Falls back to the raw value if it is not p.k.vvvv. */
const toIso = (fi: string): string => {
  const parts = fi.split('.');
  if (parts.length !== 3) return fi;
  const [d, m, y] = parts.map((n) => n.trim());
  if (!d || !m || !y) return fi;
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
};

export const CONTENT_UPDATED_ISO = toIso(TAYDENNA.paivitetty);
