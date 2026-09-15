import Link from 'next/link';
import { LegalPage, H2, P, UL } from '@/components/LegalText';
import { TAYDENNA, fill } from '@/data/taydenna';
import { SITE, CONTACT, COMPANY, LEGAL } from '@/data/site';

/**
 * Tietosuojaseloste skeleton — the sections and the GDPR articles referenced
 * here are the ones a Finnish marketing site actually needs, but the contents
 * are a starting point, not legal advice. Fill the tietosuoja* fields in
 * src/data/taydenna.ts and have the
 * result checked by whoever is responsible for data protection before launch.
 *
 * As written it covers the website only (contact form + analytics). If the
 * company also processes personal data on behalf of its customers, add the
 * processor-role section and a DPA.
 */
const Privacy = () => (
  <LegalPage
    title="Tietosuojaseloste"
    version={LEGAL.version}
    effective={LEGAL.effectiveFi}
  >
    <H2>1 Rekisterinpitäjä ja yhteystiedot</H2>
    <P>
      {SITE.legalName}
      <br />
      Y-tunnus: {COMPANY.businessId}
      <br />
      {COMPANY.postalAddress}, {COMPANY.postalCode} {COMPANY.city}
      <br />
      <br />
      Tietosuoja-asioiden yhteyshenkilö: {CONTACT.privacyContactName},{' '}
      {CONTACT.privacyEmail}
    </P>

    <H2>2 Mitä tietoja käsittelen</H2>
    <P>
      Käsittelen verkkosivustolla vain niitä henkilötietoja, jotka annat itse
      tai jotka syntyvät sivuston käytöstä:
    </P>
    <UL>
      <li>
        <strong>Yhteydenottolomake:</strong> nimi, sähköpostiosoite,
        puhelinnumero ja viestin sisältö.
      </li>
      <li>
        <strong>Analytiikka:</strong> sivuston käyttöä koskevat tiedot (mm.
        katsotut sivut, käytetty laite ja likimääräinen sijainti) — vain jos
        olet antanut suostumuksen analytiikkaevästeille.
      </li>
      <li>
        <strong>Tekniset lokitiedot:</strong>{' '}
        {fill(TAYDENNA.tietosuojaLokitiedot, 'tekniset lokitiedot')}
      </li>
    </UL>

    <H2>3 Käsittelyn tarkoitus ja oikeusperuste</H2>
    <UL>
      <li>
        <strong>Yhteydenottoihin vastaaminen ja tarjousten tekeminen</strong> —
        oikeusperusteena oikeutettu etu (GDPR 6 art. 1 f) tai sopimuksen
        tekemistä edeltävät toimet (6 art. 1 b).
      </li>
      <li>
        <strong>Sivuston kehittäminen ja käytön analysointi</strong> —
        oikeusperusteena suostumus (6 art. 1 a), jonka voit peruuttaa milloin
        tahansa evästeasetuksista.
      </li>
    </UL>

    <H2>4 Evästeet</H2>
    <P>
      Sivusto käyttää välttämättömiä evästeitä sekä suostumuksella
      analytiikkaevästeitä. Evästeet, niiden käyttötarkoitukset ja suostumuksen
      peruuttaminen on kuvattu erikseen sivulla{' '}
      <Link
        href="/evastekaytannot/"
        className="text-site-accent hover:underline"
      >
        Evästekäytännöt
      </Link>
      .
    </P>

    <H2>5 Tietojen vastaanottajat</H2>
    <P>
      En myy enkä vuokraa henkilötietoja. Tietoja käsittelevät puolestani
      seuraavat palveluntarjoajat:
    </P>
    <UL>
      <li>
        <strong>EmailJS</strong> — yhteydenottolomakkeen viestien välitys.
      </li>
      <li>
        <strong>Google (reCAPTCHA)</strong> — lomakkeen roskapostisuojaus.
      </li>
      <li>
        <strong>Google Analytics</strong> — kävijäanalytiikka, vain
        suostumuksella.
      </li>
      <li>{fill(TAYDENNA.tietosuojaHosting, 'hosting-palveluntarjoaja')}</li>
    </UL>

    <H2>6 Tietojen siirto EU:n ulkopuolelle</H2>
    <P>
      Osa yllä mainituista palveluntarjoajista käsittelee tietoja myös EU- ja
      ETA-alueen ulkopuolella. Siirrot perustuvat Euroopan komission
      vakiolausekkeisiin tai EU:n ja Yhdysvaltojen väliseen tietosuojakehykseen
      (Data Privacy Framework).{' '}
      {fill(TAYDENNA.tietosuojaSiirrot, 'siirrot EU:n ulkopuolelle')}
    </P>

    <H2>7 Säilytysaika</H2>
    <P>
      Yhteydenottolomakkeen tiedot säilytetään{' '}
      {fill(TAYDENNA.tietosuojaLomakeSailytys, 'lomakkeen säilytysaika')}
      viimeisestä yhteydenotosta, minkä jälkeen ne poistetaan. Analytiikkatiedot
      säilytetään{' '}
      {fill(TAYDENNA.tietosuojaAnalytiikkaSailytys, 'analytiikan säilytysaika')}
      .
    </P>

    <H2>8 Rekisteröidyn oikeudet</H2>
    <P>Sinulla on oikeus:</P>
    <UL>
      <li>saada pääsy sinua koskeviin tietoihin (15 art.)</li>
      <li>oikaista virheelliset tiedot (16 art.)</li>
      <li>poistaa tiedot (17 art.)</li>
      <li>rajoittaa käsittelyä (18 art.) ja vastustaa sitä (21 art.)</li>
      <li>siirtää tiedot järjestelmästä toiseen (20 art.)</li>
      <li>peruuttaa suostumus milloin tahansa</li>
    </UL>
    <P>
      Pyynnöt osoitetaan osoitteeseen {CONTACT.privacyEmail}. Vastaan kuukauden
      kuluessa. Sinulla on myös oikeus tehdä valitus tietosuojavaltuutetun
      toimistolle (tietosuoja.fi).
    </P>

    <H2>9 Tietoturva</H2>
    <P>{fill(TAYDENNA.tietosuojaSuojatoimet, 'suojatoimet')}</P>

    <H2>10 Muutokset tähän selosteeseen</H2>
    <P>
      Päivitän selostetta, jos käsittely muuttuu. Voimassa oleva versio on aina
      nähtävissä osoitteessa {SITE.url}/tietosuojaseloste/.
    </P>
  </LegalPage>
);

export default Privacy;
