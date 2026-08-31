import { Inter, JetBrains_Mono } from 'next/font/google';

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

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-var',
});
