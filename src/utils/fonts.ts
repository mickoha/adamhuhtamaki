import { Inter } from 'next/font/google';

/**
 * Swap the families here to rebrand typography — the CSS variable names are
 * what globals.css binds to, so nothing else needs to change.
 *
 * No `weight` array: next/font then serves ONE variable font file per family
 * (covering 100–900) instead of one file per weight, which cuts font preloads
 * and is usually the cheapest LCP win on a text-led hero.
 */
export const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans-var',
});

/*
 * There is no webfont for --font-mono on purpose. JetBrains Mono cost 39.5 kB
 * on EVERY page and the site sets `font-mono` in exactly one place — the
 * cookie names in the consent table. A system monospace stack renders those
 * identically well for free. If a design ever leans on monospace properly,
 * add the family back here and bind it to --font-mono-var in globals.css.
 */
