/**
 * ============================================================================
 *  TÄYDENNÄ — yksi tiedosto, johon kaikki puuttuvat tiedot täytetään
 * ============================================================================
 *
 * Tämä on ainoa tiedosto, jota sinun tarvitsee muokata. Kaikki sivuston
 * kohdat, joista puuttuu tieto, lukevat arvonsa täältä.
 *
 * Täytä kenttä lainausmerkkien väliin. Tyhjäksi jätetty kenttä näkyy
 * sivustolla merkintänä [TÄYDENNÄ: …], joten mikään ei jää huomaamatta —
 * eikä mitään keksitä puolestasi.
 *
 *     businessId: '',            → sivulla lukee  [TÄYDENNÄ: Y-tunnus]
 *     businessId: '1234567-8',   → sivulla lukee  1234567-8
 *
 * Kuvat eivät ole tässä tiedostossa: ne pudotetaan kansioon src/images/
 * oikeilla tiedostonimillä. Katso src/images/README.md.
 *
 * Yksi tiedosto jää tämän ulkopuolelle: public/llms.txt on tavallista tekstiä
 * kielimalleille, ja sen Y-tunnus, puhelin ja sähköposti päivitetään käsin
 * samalla kun täytät alla olevat kentät.
 */

export const TAYDENNA = {
  // ==========================================================================
  //  1. Yritys
  // ==========================================================================

  /** Rekisteröity toiminimi kaupparekisterin mukaan, esim. 'Asianajotoimisto Adam Huhtamäki Oy'. */
  legalName: 'Asianajotoimisto Adam Huhtamäki Oy',
  /** Y-tunnus muodossa 1234567-8. Ota YTJ-rekisteristä, älä muistista. */
  businessId: '3651214-7',
  /** ALV-tunnus, esim. FI12345678. */
  vatId: 'FI36512147',
  /** Vuosi jona toimisto on perustettu, esim. '2019'. */
  founded: '2026',

  // ==========================================================================
  //  2. Yhteystiedot
  // ==========================================================================

  /** Päivystysnumero kansainvälisessä muodossa ILMAN välilyöntejä: '+358401234567'.
   *  Tästä muodostetaan tel:-linkit — numero esiintyy sivustolla kahdeksassa paikassa. */
  phone: '+358458736007',
  /** Sama numero luettavassa muodossa, esim. '+358 40 123 4567'. */
  phoneDisplay: '+358 45 873 6007',
  /** Toimiston yleissähköposti — näkyy kaikkialla paitsi yhteystietosivun
   *  herossa: lomakeosio, alatunniste, yhteystietosivun osio ja JSON-LD. */
  email: 'toimisto@adamhuhtamaki.fi',
  /** Asianajajan oma sähköposti — vain yhteystietosivun hero. */
  attorneyEmail: 'adam@adamhuhtamaki.fi',
  /** Tietosuoja-asioiden sähköposti. Voi olla sama kuin yllä. */
  privacyEmail: 'toimisto@adamhuhtamaki.fi',
  /** Postiosoite ilman postinumeroa ja -toimipaikkaa, esim.
   *  'Viipurinkatu 12 L 156' tai 'PL 123'. Tämä on POSTIN kulkuosoite, ei
   *  käyntiosoite: sivusto ei lupaa toimistolla käyntiä missään kohtaa, ja
   *  tapaamiset sovitaan erikseen. */
  postiosoite: 'Viipurinkatu 12 L 156',
  /** Postiosoitteen postinumero, esim. '00101'. */
  postalCode: '00510',

  // ==========================================================================
  //  3. Sivujen sisältö
  // ==========================================================================

  /** Päivitetty-leima. YKSI paikka: tämä päivittyy jokaisen sivun heroon ja
   *  JSON-LD:n dateModified-kenttään. Muoto p.k.vvvv, esim. '2.9.2026'.
   *  Päivitä aina kun sivujen tekstejä muutetaan — hakukoneet ja
   *  tekoälyhaut painottavat tuoretta sisältöä. */
  paivitetty: '19.9.2026',

  /** Toimialue ingresseihin, esim. 'pääkaupunkiseudun'. Sama arvo täyttää
   *  molemmat lauseet:
   *    "Hoidan pakkokeinoasioita ___ alueella ja tarvittaessa koko Suomessa."
   *    "Hoidan riita-asioita ja oikeudenkäyntejä ___ alueella sekä
   *     valtakunnallisesti." */
  toimialue: 'pääkaupunkiseudun',

  /** /pakkokeinot/ — UKK 1. Vangitsemisistunnon lakisääteinen määräaika,
   *  esim. 'neljäntenä päivänä'. TARKISTA pakkokeinolaista ennen julkaisua;
   *  tätä ei saa arvata. */
  vangitsemisistunnonMaaraaika: 'neljäntenä vuorokautena',
} as const;

/**
 * Palauttaa arvon, tai näkyvän [TÄYDENNÄ: …] -merkinnän jos kenttä on tyhjä.
 *
 * Näin puuttuva tieto näkyy sivulla sen sijaan että jättäisi tyhjän aukon —
 * tyhjä kohta jäisi huomaamatta, [TÄYDENNÄ] ei jää.
 */
export const fill = (value: string, label: string): string =>
  value.trim() || `[TÄYDENNÄ: ${label}]`;

/** True, jos kenttä on vielä täyttämättä. Käytetään esim. ehtojen luonnosvaroitukseen. */
export const isMissing = (value: string): boolean => !value.trim();
