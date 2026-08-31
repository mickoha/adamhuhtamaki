export type FeatureIcon = 'spark' | 'clock' | 'shield' | 'chart';

export interface Feature {
  icon: FeatureIcon;
  title: string;
  description: string;
  bullets: string[];
  href?: string;
  linkLabel?: string;
}

export const FEATURES: Feature[] = [
  {
    icon: 'spark',
    title: '[TÄYDENNÄ: hyöty, ei ominaisuus]',
    description: '[TÄYDENNÄ: mitä asiakas saa, yksi lause.]',
    bullets: ['[TÄYDENNÄ: konkreettinen yksityiskohta]', '[TÄYDENNÄ: toinen]'],
    href: '/palvelut/',
  },
  {
    icon: 'clock',
    title: '[TÄYDENNÄ]',
    description: '[TÄYDENNÄ]',
    bullets: ['[TÄYDENNÄ]', '[TÄYDENNÄ]'],
  },
  {
    icon: 'shield',
    title: '[TÄYDENNÄ]',
    description: '[TÄYDENNÄ]',
    bullets: ['[TÄYDENNÄ]', '[TÄYDENNÄ]'],
  },
  {
    icon: 'chart',
    title: '[TÄYDENNÄ]',
    description: '[TÄYDENNÄ]',
    bullets: ['[TÄYDENNÄ]', '[TÄYDENNÄ]'],
  },
];
