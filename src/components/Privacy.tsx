import Link from 'next/link';
import { LegalPage, H2, P, UL } from '@/components/LegalText';
import { SITE, CONTACT, COMPANY, LEGAL } from '@/data/site';

/**
 * Tietosuojaseloste — the client's own text, supplied 18.9.2026.
 *
 * The wording is theirs and is reproduced as given, with one exception: the
 * company details in section 2 are not typed out here but read from
 * src/data/site.ts, so the Y-tunnus, address, phone and email on this page
 * cannot drift away from the same details in the footer, the contact page and
 * the JSON-LD. Edit them in src/data/taydenna.ts, never here.
 *
 * Note for anyone rewriting this page: the rest of the site speaks in the first
 * person singular ("Avustan", "Vastaan"), but this text is a legal statement by
 * the company and says "käsittelemme". That is the client's deliberate wording,
 * not a slip to be "fixed" into line with the marketing copy.
 */
const Privacy = () => (
  <LegalPage
    title="Tietosuojaseloste"
    version={LEGAL.version}
    effective={LEGAL.effectiveFi}
  >
    <H2>1 Yleistä</H2>
    <P>
      Tässä tietosuojaselosteessa kerrotaan, mitä henkilötietoja{' '}
      {SITE.legalName} (jäljempänä myös ”rekisterinpitäjä”) kerää, miten se
      käsittelee näitä tietoja ja mille tahoille henkilötietoja mahdollisesti
      luovutetaan sekä millä perusteilla. Lisäksi selosteessa käsitellään
      rekisteröityjen oikeuksia liittyen henkilötietojen käsittelyyn.
    </P>
    <P>
      Rekisterinpitäjänä sitoudumme noudattamaan voimassa olevaa
      tietosuojalainsäädäntöä. Tietosuojalainsäädännöllä tarkoitetaan Euroopan
      unionin yleistä tietosuoja-asetusta (EU) 2016/679 (”tietosuoja-asetus”),
      tietosuojalakia (1050/2018) sekä muuta soveltuvaa henkilötietojen
      käsittelyä koskevaa sääntelyä.
    </P>
    <P>
      Henkilötiedolla tarkoitetaan kaikkia tunnistettuun tai tunnistettavissa
      olevaan luonnolliseen henkilöön (jäljempänä ”rekisteröity”) liittyviä
      tietoja, kuten tietosuoja-asetuksessa tarkemmin määritellään.
    </P>

    <H2>2 Rekisterinpitäjän yhteystiedot</H2>
    <P>
      {SITE.legalName}
      <br />
      Postiosoite: {COMPANY.postalAddress}, {COMPANY.postalCode} {COMPANY.city}
      <br />
      Y-tunnus: {COMPANY.businessId}
      <br />
      Puhelin: {CONTACT.phoneDisplay}
      <br />
      Verkkosivu: {SITE.url}
      <br />
      Tietosuojaa koskevat yhteydenotot: {CONTACT.privacyEmail}
    </P>

    <H2>3 Kerättävät henkilötiedot</H2>
    <P>
      Käsittelemme ja säilytämme asiakkailtamme ja heidän edustajiltaan
      seuraavia henkilötietoja:
    </P>
    <UL>
      <li>
        Perustiedot, kuten nimi, henkilötunnus sekä yhteystiedot (sähköposti,
        osoite ja puhelinnumero);
      </li>
      <li>
        Asiakassuhteeseen ja toimeksiannon hoitamiseen liittyvät tiedot, mukaan
        lukien toimeksiantomateriaalissa olevat tiedot ja toimeksiannon
        käsittelyn aikana saadut tiedot;
      </li>
      <li>
        Maksuihin ja laskutukseen liittyvät tiedot, kuten tilinumero,
        mahdolliset perintätiedot sekä luottotarkistuksiin liittyvät tiedot;
      </li>
      <li>
        Asiakkaan tuntemiseen liittyvät tiedot, kuten asuinmaa, kansalaisuus,
        asema yhtiössä, henkilöllisyystodistuksen kopio, sähköisen tunnistamisen
        yhteydessä saadut tiedot sekä muut asiakassuhteen yksilöivät tiedot lain
        edellyttämässä laajuudessa;
      </li>
      <li>
        Muut tiedot, joita asiakas tai tämän edustaja toimittaa esimerkiksi
        yhteydenottojen tai muun viestinnän yhteydessä, sekä tiedot, joita
        käsittelemme rekisteröidyn suostumuksella, esimerkiksi
        suoramarkkinointia varten;
      </li>
      <li>
        verkkosivumme käytön yhteydessä kerätyt tiedot mukaan lukien
        kävijäseuranta, ja muut{' '}
        <Link
          href="/evastekaytannot/"
          className="text-site-accent hover:underline"
        >
          evästeiden
        </Link>{' '}
        tai samankaltaisten teknologioiden avulla verkkosivulta kerätyt tiedot.
      </li>
    </UL>
    <P>
      Tiedot saadaan ensisijaisesti suoraan asiakkaalta toimeksiannon
      käynnistyessä tai sen käsittelyn aikana. Lisäksi voimme täydentää
      tietojamme hankkimalla niitä kolmansien osapuolien lähteistä, kuten eri
      verkkosivustoilta tai julkisista rekistereistä.
    </P>

    <H2>4 Käsittelyn tarkoitus ja oikeusperuste</H2>
    <P>
      Käsittelemme henkilötietoja eri tarkoituksiin seuraavien oikeusperusteiden
      nojalla:
    </P>
    <UL>
      <li>
        <strong>Toimeksiantojen hoitaminen ja sopimuksen täytäntöönpano:</strong>{' '}
        Käsittelemme henkilötietoja asiakkaidemme kanssa tehtyjen toimeksiantojen
        hoitamiseksi ja sovittujen palveluiden tuottamiseksi. Edellä mainitussa
        tilanteessa henkilötietojen käsittelyn oikeusperuste on rekisterinpitäjän
        ja rekisteröidyn välinen sopimus.
      </li>
      <li>
        <strong>Asiakassuhteen ylläpito ja kehittäminen:</strong> Henkilötietoja
        voidaan käsitellä asiakasviestintään, asiakassuhteen hallintaan,
        asiakastyytyväisyyskyselyihin, tutkimuksiin, analytiikkaan ja
        riskienhallintaan. Henkilötietojen käsittelyn oikeusperuste on
        rekisterinpitäjän oikeutettu etu.
      </li>
      <li>
        <strong>Lakisääteisten velvoitteiden noudattaminen:</strong> Käsittelemme
        henkilötietoja täyttääksemme lain asettamat velvoitteet, kuten
        asianajotoimintaan liittyvän toimeksiantomateriaalien säilytysvelvoitteet
        ja asiakkaan tuntemiseen liittyvät vaatimukset. Lisäksi kirjanpitoa ja
        verotusta koskevat säädökset saattavat edellyttää tiettyjen
        henkilötietojen käsittelyä ja säilyttämistä.
      </li>
      <li>
        <strong>
          Suoramarkkinointi ja muut erillistä suostumusta edellyttävät
          käsittelyt:
        </strong>{' '}
        Jos rekisteröity on antanut suostumuksensa, voimme käsitellä
        henkilötietoja myös suoramarkkinointiin tai muihin vastaaviin
        tarkoituksiin.
      </li>
    </UL>
    <P>
      Henkilötietojen käsittely voi joissain tapauksissa perustua useampaan kuin
      yhteen edellä mainituista oikeusperusteista.
    </P>

    <H2>5 Henkilötietojen säilyttämisaika</H2>
    <P>
      Toimeksiantoon liittyviä tietoja säilytetään kymmenen (10) vuotta
      toimeksiannon päättymisestä lukien.
    </P>
    <P>
      Muut henkilötiedot poistetaan, kun niiden säilyttämiselle ei ole enää
      lakisääteistä tai liiketoiminnallista perustetta.
    </P>
    <P>
      Jos henkilötietojen kerääminen ja säilyttäminen perustuu ainoastaan
      asiakkaan suostumukseen, ne poistetaan asiakkaan pyynnöstä.
    </P>

    <H2>6 Henkilötietojen siirrot</H2>
    <P>
      Voimme luovuttaa henkilötietoja yhteistyökumppaneillemme ja
      palveluntarjoajillemme, jotka tukevat toimintaamme, kuten IT-palveluiden
      tarjoajille, kirjanpidon ja taloushallinnon asiantuntijoille sekä
      perintätoimistoille. Varmistamme aina, että nämä tahot käsittelevät
      henkilötietoja asianmukaisesti ja tietosuojalainsäädännön vaatimusten
      mukaisesti.
    </P>
    <P>
      Henkilötietoja voidaan luovuttaa viranomaisille lainsäädännön
      velvoittamissa ja oikeuttamissa tilanteissa.
    </P>

    <H2>7 Henkilötietojen käsittely ja suojaaminen</H2>
    <P>
      Pyrimme kaikissa henkilötietojen käsittelytilanteissa varmistamaan
      asianmukaisen turvallisuuden ja tietosuojan, mukaan lukien henkilötietojen
      suojaamisen luvattomalta käsittelyltä, häviämiseltä, tuhoutumiselta tai
      vahingoittumiselta.
    </P>

    <H2>8 Rekisteröidyn oikeudet</H2>
    <P>
      Rekisteröidyllä on ainakin seuraavat tietosuojalainsäädännön mukaiset
      oikeudet, joiden hyödyntäminen yksittäisessä tilanteessa voi kuitenkin
      vaihdella mm. henkilötietojen käsittelytarkoitus huomioiden:
    </P>
    <UL>
      <li>
        Rekisteröidyllä on oikeus pyytää tietoa henkilötietojensa käsittelystä ja
        pyytää tarkastettavaksi itseään koskevat tiedot.
      </li>
      <li>
        Rekisteröidyllä on tietosuojalainsäädännön mukainen oikeus pyytää
        henkilötietojensa käsittelyn rajoittamista, henkilötietojensa poistamista
        ja epätarkan tai virheellisen tiedon oikaisemista.
      </li>
      <li>
        Rekisteröidyllä on oikeus tietosuojalainsäädännön edellytysten mukaisesti
        vastustaa rekisterinpitäjän oikeutettuihin etuihin perustuvaa
        henkilötietojensa käsittelyä.
      </li>
      <li>
        Jos henkilötietojen käsittely perustuu rekisteröidyn antamaan
        suostumukseen, rekisteröidyllä on oikeus peruuttaa antamansa suostumus,
        mukaan lukien mahdollinen suostumus suoramarkkinointiin.
      </li>
      <li>
        Rekisteröidyllä on tietosuojalainsäädännön mukainen oikeus pyytää
        henkilötietojensa siirtämistä toiselle rekisterinpitäjälle.
      </li>
    </UL>
    <P>
      Rekisteröity voi osoittaa edellä kuvatut pyyntönsä sähköpostitse{' '}
      {CONTACT.privacyEmail}. Rekisterinpitäjä sitoutuu vastaamaan pyyntöihin
      kahden viikon kuluessa viestin vastaanottamisesta lukien. Jos rekisteröidyn
      esittämään pyyntöön ei voida suostua, rekisteröidylle ilmoitetaan
      kieltäytymisestä ja kieltäytymisen perusteista kirjallisesti. Mikäli
      rekisteröity epäilee, että hänen henkilötietojaan on käsitelty
      lainvastaisesti, on tällä oikeus tehdä valitus tietosuojavaltuutetulle.
      Tietoa tietosuojavaltuutetusta ja tietosuojavaltuutetun yhteystiedot
      löytyvät tietosuojavaltuutetun verkkosivuilta:{' '}
      <a
        href="https://tietosuoja.fi"
        className="text-site-accent hover:underline"
      >
        www.tietosuoja.fi
      </a>
      .
    </P>

    <H2>9 Muutokset tietosuojaselosteeseen</H2>
    <P>
      Rekisterinpitäjä kehittää jatkuvasti toimintaansa ja voi tämän vuoksi
      päivittää ja muuttaa tietosuojakäytäntöjään tarpeen mukaan. Muutokset
      voivat johtua esimerkiksi toiminnan kehittämisestä tai
      tietosuojalainsäädännön muutoksista. Tietosuojaselosteen ajantasainen
      versio on kulloinkin saatavilla verkkosivuillamme.
    </P>
  </LegalPage>
);

export default Privacy;
