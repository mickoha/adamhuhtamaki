import Link from 'next/link';
import { LegalPage, H2, P, UL } from '@/components/LegalText';
import { SITE, COMPANY, CONTACT, LEGAL } from '@/data/site';

/**
 * Palveluehdot skeleton. This is a structure to fill in, not legal advice —
 * every [TÄYDENNÄ] needs real terms, and the result should be reviewed before
 * it is published. Delete the sections that do not apply to your business.
 */
const Terms = () => (
  <LegalPage
    title="Palveluehdot"
    version={LEGAL.version}
    effective={LEGAL.effectiveFi}
  >
    <H2>1 Sopijapuolet ja soveltamisala</H2>
    <P>
      Näitä ehtoja sovelletaan {SITE.legalName}:n (Y-tunnus{' '}
      {COMPANY.businessId}, {COMPANY.city}, jäljempänä &quot;{SITE.name}&quot;)
      ja asiakkaan väliseen sopimukseen palvelun käytöstä. Ehdot muodostavat
      sopimuksen yhdessä tilaus- tai tarjousasiakirjan ja tietosuojaselosteen
      kanssa.
    </P>

    <H2>2 Palvelun kuvaus</H2>
    <P>[TÄYDENNÄ: mitä palvelu sisältää ja mitä se ei sisällä.]</P>

    <H2>3 Hinnat ja maksuehdot</H2>
    <P>
      [TÄYDENNÄ: hinnoittelun rakenne, laskutusjakso, maksuehto ja
      viivästyskorko.]
    </P>

    <H2>4 Asiakkaan velvollisuudet</H2>
    <UL>
      <li>[TÄYDENNÄ: mitä asiakkaan on toimitettava tai tehtävä.]</li>
      <li>[TÄYDENNÄ: käyttöoikeuksien ja tunnusten huolellinen säilytys.]</li>
    </UL>

    <H2>5 Immateriaalioikeudet</H2>
    <P>
      [TÄYDENNÄ: kenelle oikeudet kuuluvat ja mitä käyttöoikeuksia asiakkaalle
      annetaan.]
    </P>

    <H2>6 Vastuunrajoitus</H2>
    <P>
      [TÄYDENNÄ: vastuun enimmäismäärä ja välillisten vahinkojen rajaus.
      Tarkista muotoilu juristilla — pätemätön rajoitus ei suojaa miltään.]
    </P>

    <H2>7 Sopimuksen voimassaolo ja päättyminen</H2>
    <P>[TÄYDENNÄ: sopimuskausi, irtisanomisaika ja purkuperusteet.]</P>

    <H2>8 Henkilötiedot</H2>
    <P>
      Henkilötietojen käsittely on kuvattu{' '}
      <Link href="/tietosuojaseloste/" className="text-site-accent hover:underline">
        tietosuojaselosteessa
      </Link>
      .
    </P>

    <H2>9 Ehtojen muutokset</H2>
    <P>
      [TÄYDENNÄ: miten muutoksista ilmoitetaan ja milloin ne tulevat voimaan.]
    </P>

    <H2>10 Sovellettava laki ja riidanratkaisu</H2>
    <P>
      Sopimukseen sovelletaan Suomen lakia. Riidat ratkaistaan ensisijaisesti
      neuvottelemalla ja muutoin [TÄYDENNÄ: käräjäoikeus] käräjäoikeudessa.
      Kysymykset ehdoista: {CONTACT.email}.
    </P>
  </LegalPage>
);

export default Terms;
