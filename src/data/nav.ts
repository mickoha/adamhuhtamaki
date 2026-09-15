export interface NavLink {
  label: string;
  href: string;
  /** Second line shown in the "Muut palvelut" dropdown and the mobile drawer. */
  description?: string;
}

/**
 * Header links, left to right. `Muut palvelut` is a disclosure, not a link —
 * its children live in NAV_MORE. Trailing slashes match trailingSlash: true.
 */
export const NAV_LINKS: NavLink[] = [
  { label: 'Rikosoikeus', href: '/rikosasianajaja/' },
  { label: 'Pakkokeinot', href: '/pakkokeinot/' },
];

/** Rows of the "Muut palvelut" dropdown. */
export const NAV_MORE: NavLink[] = [
  {
    label: 'Vahingonkorvaus',
    href: '/vahingonkorvaus/',
    description: 'Korvausvaatimukset ja niiden torjunta',
  },
  {
    label: 'Riidanratkaisu ja oikeudenkäynnit',
    href: '/riidanratkaisu/',
    description: 'Käräjä- ja hovioikeusprosessit, sovinnot',
  },
];

/** Contact is the front page's own section, not a separate page. */
export const NAV_CONTACT: NavLink = {
  label: 'Yhteystiedot',
  href: '/yhteystiedot/',
};

/** Mobile drawer — one flat list, each row with its own description. */
export const DRAWER_LINKS: NavLink[] = [
  {
    label: 'Rikosoikeus',
    href: '/rikosasianajaja/',
    description: 'Vakavat rikokset, esitutkinta ja oikeudenkäynti',
  },
  {
    label: 'Pakkokeinot',
    href: '/pakkokeinot/',
    description: 'Vangitseminen, takavarikko, kotietsintä',
  },
  {
    label: 'Vahingonkorvaus',
    href: '/vahingonkorvaus/',
    description: 'Korvausvaatimukset ja niiden torjunta',
  },
  {
    label: 'Riidanratkaisu',
    href: '/riidanratkaisu/',
    description: 'Käräjä- ja hovioikeusprosessit, sovinnot',
  },
  {
    label: 'Yhteystiedot',
    href: '/yhteystiedot/',
    description: 'Päivystys, tapaamiset ja yhteydenotto',
  },
];

/**
 * Footer link columns. The three front-page anchors are written ABSOLUTE
 * (/#yhteys, not #yhteys) on purpose: the footer is global, and a bare
 * fragment would resolve against the subpage the visitor is standing on.
 */
export const FOOTER_SERVICES: NavLink[] = [
  { label: 'Rikosoikeus', href: '/rikosasianajaja/' },
  { label: 'Pakkokeinot', href: '/pakkokeinot/' },
  { label: 'Vahingonkorvaus', href: '/vahingonkorvaus/' },
  { label: 'Riidanratkaisu', href: '/riidanratkaisu/' },
];

export const FOOTER_OFFICE: NavLink[] = [
  { label: 'Yhteystiedot', href: '/yhteystiedot/' },
  { label: 'Palkkiot ja oikeusapu', href: '/#palkkiot' },
  { label: 'Usein kysytyt', href: '/#ukk' },
  { label: 'Tietosuojaseloste', href: '/tietosuojaseloste/' },
];

/** Fine print in the legal bar — the pages nothing else links to. */
export const FOOTER_LEGAL: NavLink[] = [
  { label: 'Evästekäytännöt', href: '/evastekaytannot/' },
];
