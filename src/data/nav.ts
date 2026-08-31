export interface NavLink {
  label: string;
  href: string;
}

/** Header links. Keep to 4–5; trailing slashes match trailingSlash: true. */
export const NAV_LINKS: NavLink[] = [
  { label: 'Palvelut', href: '/palvelut/' },
  { label: 'Ota yhteyttä', href: '/yhteystiedot/' },
];

export const FOOTER_MAIN: NavLink[] = [
  { label: 'Palvelut', href: '/palvelut/' },
  { label: 'Ota yhteyttä', href: '/yhteystiedot/' },
];

export const FOOTER_LEGAL: NavLink[] = [
  { label: 'Evästekäytännöt', href: '/evastekaytannot/' },
  { label: 'Tietosuojaseloste', href: '/tietosuojaseloste/' },
  { label: 'Palveluehdot', href: '/palveluehdot/' },
];
