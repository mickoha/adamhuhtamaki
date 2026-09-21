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
 * Answer-first: the first sentence is the answer, the rest is why. These are
 * phrased the way the question actually arrives on the phone, which is also
 * how it gets typed into a search box.
 */
export const FAQ: FaqItem[] = [
  {
    q: 'Milloin asianajajaan kannattaa ottaa yhteyttä?',
    a: 'Yhteyttä kannattaa ottaa heti, kun saat tietää esitutkinnasta, saat kutsun poliisikuulusteluun tai läheisesi otetaan kiinni. Mitä aiemmin asianajaja on mukana, sitä paremmin oikeutesi turvataan jo ensimmäisissä kuulusteluissa.',
  },
  {
    q: 'Voiko asianajaja tulla mukaan kesken esitutkinnan?',
    a: 'Kyllä voi. Avustajan voi hankkia missä tahansa rikosprosessin vaiheessa, mutta suositeltavaa on olla yhteydessä jo ennen ensimmäistäkään kuulustelua poliisin kanssa.',
  },
  {
    q: 'Avustatko myös rikoksen uhria eli asianomistajaa?',
    a: 'Avustan. Hoidan sekä rikoksesta epäiltyjä että asianomistajia esitutkinnasta hovioikeuteen. Vakavissa rikoksissa tuomioistuin voi määrätä asianomistajalle oikeudenkäyntiavustajan, jolloin palkkio maksetaan valtion varoista. Tarkistan tilanteesi puhelimessa ennen kuin mitään laskutetaan, ja ensimmäinen arvio on 0 €.',
  },
  {
    q: 'Miten asianajajan kulut maksetaan, jos minulla ei ole tuloja?',
    a: 'Jos tulosi ovat pienet, olet todennäköisesti oikeutettu valtion kustantamaan oikeusapuun. Vakavissa rikoksissa, joista voi seurata vankeutta, sinulle voidaan myös määrätä puolustaja valtion varoista tuloista riippumatta.',
  },
];
