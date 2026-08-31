export interface FaqItem {
  q: string;
  a: string;
}

/**
 * FAQ copy lives here so the visible accordion and the FAQPage JSON-LD are
 * built from the same array (see faqPageSchemaFrom in @/data/schema).
 * Never hand-write a FAQPage node — schema that does not match the visible
 * text is ignored.
 *
 * Write answers answer-first: the first sentence is the answer, specifics
 * (figures, names, dates) beat adjectives.
 */
export const FAQ: FaqItem[] = [
  {
    q: '[TÄYDENNÄ: kysymys asiakkaan omilla sanoilla?]',
    a: '[TÄYDENNÄ: vastaus, joka alkaa suoraan vastauksella — ei johdantoa. 2–4 lausetta.]',
  },
  {
    q: '[TÄYDENNÄ: paljonko palvelu maksaa?]',
    a: '[TÄYDENNÄ: konkreettinen vastaus hinnoittelun rakenteesta.]',
  },
  {
    q: '[TÄYDENNÄ: kuinka nopeasti pääsee alkuun?]',
    a: '[TÄYDENNÄ: konkreettinen aikataulu ja mitä asiakkaalta vaaditaan.]',
  },
];
