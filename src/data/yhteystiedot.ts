import type { FaqItem } from '@/data/faq';

/**
 * Content for the contact page (.claude/design/yhteystiedot/).
 *
 * Client-supplied and final, first person singular. The "0 €" in answer 1 is
 * the client's own wording — keep the figure and the euro sign.
 */
export const YHTEYS_FAQ: FaqItem[] = [
  {
    q: 'Maksaako asianajajalle soittaminen?',
    a: 'Ensimmäinen yhteydenotto ja lyhyt tilannearvio puhelimessa on aina maksuton (0 €). Kartoitan puhelun aikana tilanteesi ja kerron, kuka asiasi kulut todennäköisesti maksaa (esim. oikeusapu tai vakuutus), ennen kuin laskutusta syntyy.',
  },
  {
    q: 'Mitä tietoja minun pitää kertoa ensimmäisessä puhelussa?',
    a: 'Riittää, että kerrot lyhyesti mistä on kyse: oletko esimerkiksi saanut kutsun poliisikuulusteluun, onko läheisesi otettu kiinni tai uhkaako yritystäsi oikeudenkäynti. Tarkat yksityiskohdat ja todistusaineisto käydään läpi myöhemmin tietoturvallisesti.',
  },
  {
    q: 'Missä tapaamme, jos toimistolla ei ole käyntiosoitetta?',
    a: 'Tapaamiset sovitaan aina tilanteen mukaan. Rikosasioissa tapaan asiakkaani usein poliisiasemalla, tutkintavankilassa tai oikeustalolla. Siviiliriidoissa ja neuvotteluissa voimme tavata etäyhteydellä (Teams/puhelin) tai järjestän käyttöömme yksityisen neuvotteluhuoneen.',
  },
];

/**
 * The contact page is the site's one general entry point, so its options span
 * all four practice areas rather than the criminal-only defaults the service
 * pages use. Order matches the site's own hierarchy: rikosoikeus and
 * pakkokeinot first, the civil pair after.
 */
export const YHTEYS_MATTER_TYPES = [
  'Rikosasia',
  'Pakkokeino',
  'Vahingonkorvaus',
  'Riita-asia',
  'Muu',
];
