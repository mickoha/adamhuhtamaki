/**
 * The real cookie inventory (.claude/design/evasteet/). Both mounts of the
 * analytics control read it: the settings dialog and the /evastekaytannot
 * page. Keeping it here is what stops the two from ever describing the same
 * cookie differently.
 *
 * Nothing here is invented. The site runs no advertising and no social
 * pixels, so there is no "Markkinointi" category — a toggle that controls
 * nothing is itself a dark pattern.
 */

/**
 * Cookie NAMES are prefixed per site. Browsers scope cookies by host, so two
 * production domains never share consent — but every site in development runs
 * on localhost, where the host IS shared, and a generic `LOCAL_CONSENT` set by
 * one dev server is then read as an answer by the next one you start. The
 * prefix also covers sites that end up on sibling subdomains of one domain.
 *
 * CHANGE THE PREFIX when starting a new site. This is the only place the two
 * names are written — consent.ts, analytics.ts and _app.tsx all import them
 * from here, and the visitor-facing table below is built from the same
 * constants, so it can never name a cookie the site does not set.
 */
export const COOKIE_PREFIX = 'ah';

/** The visitor answered the cookie question (the banner stays down). */
export const CONSENT_COOKIE = `${COOKIE_PREFIX}_consent`;

/** Analytics allowed — the ONLY gate on Google Analytics loading. */
export const ANALYTICS_COOKIE = `${COOKIE_PREFIX}_ga`;

export interface CookieRow {
  name: string;
  setter: string;
  lifetime: string;
  purpose: string;
}

export interface CookieCategory {
  id: 'necessary' | 'analytics';
  name: string;
  description: string;
  cookies: CookieRow[];
  /** Load-bearing prose under the table, not a caption. */
  note: string;
}

/**
 * GA4's session cookie is named after the measurement ID with the `G-`
 * dropped. Deriving it means the dialog names the cookie the visitor's
 * browser actually holds instead of a placeholder — and if the ID is not
 * configured yet, the placeholder is visibly a placeholder.
 */
const gaSessionCookie = (): string => {
  const id = process.env.NEXT_PUBLIC_GTAG_ID;
  return id ? `_ga_${id.replace(/^G-/, '')}` : '_ga_XXXXXXXX';
};

export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Välttämättömät',
    description:
      'Sivuston toiminta, evästevalintasi muistaminen ja yhteydenottolomakkeen roskapostisuojaus.',
    cookies: [
      {
        name: CONSENT_COOKIE,
        setter: 'tämä sivusto',
        lifetime: '2 vuotta',
        purpose:
          'Muistaa, että olet vastannut evästekysymykseen, jottei banneria näytetä uudelleen.',
      },
      {
        name: ANALYTICS_COOKIE,
        setter: 'tämä sivusto',
        lifetime: '2 vuotta',
        purpose:
          'Muistaa, sallitko analytiikan. Tämä on ainoa asia, joka päästää Google Analyticsin lataamaan.',
      },
      {
        name: '_GRECAPTCHA',
        setter: 'Google reCAPTCHA',
        lifetime: '6 kuukautta',
        purpose: 'Erottaa ihmisen roskapostirobotista yhteydenottolomakkeessa.',
      },
    ],
    note: 'reCAPTCHA latautuu vasta, kun kosket yhteydenottolomakkeeseen – ei sivun avautuessa eikä sivuilla, joita vain luet. Ilman sitä lomake olisi avoin väärinkäytölle, ja siksi se on välttämättömissä eikä valittavissa.',
  },
  {
    id: 'analytics',
    name: 'Analytiikka',
    description:
      'Kerää vain koostetietoa: mitkä sivut luetaan, mihin osioihin lukijat pääsevät ja käytetäänkö puhelinnumeroa vai lomaketta. Yksilöivää tietoa ei kerätä eikä kävijää voi tunnistaa.',
    cookies: [
      {
        name: '_ga',
        setter: 'Google Analytics 4',
        lifetime: '2 vuotta',
        purpose: 'Erottaa käyttäjät toisistaan.',
      },
      {
        name: gaSessionCookie(),
        setter: 'Google Analytics 4',
        lifetime: '2 vuotta',
        purpose: 'Ylläpitää istunnon tilaa.',
      },
    ],
    note: 'Yhteydenottolomake itsessään ei aseta evästeitä. Viesti lähtee suoraan EmailJS-palvelun kautta.',
  },
];

/** aria-label for the analytics switch — identical at both mounts. */
export const ANALYTICS_SWITCH_LABEL = 'Salli analytiikkaevästeet';
