import SEO from '@/components/SEO';
import JsonLd from '@/components/JsonLd';
import {
  organizationSchema,
  breadcrumbSchema,
  faqPageSchemaFrom,
  SITE_URL,
} from '@/data/schema';
import { CONTACT } from '@/data/site';
import { YHTEYS_FAQ } from '@/data/yhteystiedot';
import heroGround from '@images/yhteystiedot-hero.jpg';
import ukkGround from '@images/yhteystiedot-ukk.jpg';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import CookieConsent from '@/components/CookieConsent';
import EmergencyFab from '@/components/EmergencyFab';
import ServiceHero from '@/sections/ServiceHero';
import HeroContactList from '@/components/HeroContactList';
import EmergencyBand from '@/sections/EmergencyBand';
import ContactDetails from '@/sections/ContactDetails';
import FaqBand from '@/sections/FaqBand';

/**
 * The contact page (.claude/design/yhteystiedot/).
 *
 * Section order is the page's argument: the urgent caller is served by the
 * Rikospäivystys band before anyone reads about meeting logistics.
 *
 * The office has no fixed street address, which drives the whole page — no
 * map, no opening hours, a PO box row, and meeting arrangements as prose.
 */
export default function Yhteystiedot() {
  const url = `${SITE_URL}/yhteystiedot/`;

  return (
    <>
      <SEO
        title="Yhteystiedot | Asianajotoimisto Adam Huhtamäki"
        description="Tavoitat minut 24/7 päivystysnumerosta. Ensimmäinen puhelu ja tilannearvio ovat maksuttomia. Tapaamiset etänä, oikeustalolla tai poliisiasemalla."
        url={url}
      >
        <JsonLd data={organizationSchema} />
        <JsonLd
          data={breadcrumbSchema([
            { name: 'Etusivu', path: '/' },
            { name: 'Yhteystiedot', path: '/yhteystiedot' },
          ])}
        />
        <JsonLd data={faqPageSchemaFrom(YHTEYS_FAQ)} />
      </SEO>
      <Nav />
      <main>
        <ServiceHero
          kicker="Yhteystiedot ja 24/7 rikospäivystys"
          title="Yhteystiedot – Asianajotoimisto Adam Huhtamäki"
          titleClass="text-[54px] leading-[1.06] max-md:text-[34px] max-md:leading-[1.1]"
          lede={[
            'Voit olla minuun yhteydessä puhelimitse, sähköpostilla tai jättämällä yhteydenottopyynnön. Vakavissa rikosasioissa ja pakkokeinotilanteissa tavoitat minut 24/7 päivystysnumerosta. Ensimmäinen puhelu ja tilannearvio ovat aina maksuttomia, emmekä sido sinua toimeksiantoon.',
          ]}
          pullQuote="Mitä aiemmin puolustus tai riidanratkaisu aloitetaan, sitä paremmin voin turvata oikeutesi."
          /* Yhteystiedot heti heroon: tälle sivulle tullaan hakemaan numeroa,
             eikä kiinniotetun omaisen pidä joutua vierittämään sitä esiin.
             Sitaatti siirtyy muotokuvan alle, jotta vasen palsta ei kasva
             kahdesta pystysuuntaisesta lohkosta liian pitkäksi. */
          details={<HeroContactList />}
          quoteUnderPortrait
          /* Päivitetty-leima on osa yllä olevaa listaa, joten oletusleima pois. */
          stamp=""
          /* The call comes first on this page. */
          primaryCta="call"
          secondaryHref="#tapaamiset"
          secondaryLabel="Yhteystiedot ja tapaamiset"
          ground={heroGround}
          /* Mobile has no portrait column, so the office frame carries the
             section there — as on every other service page. */
          mobileGround={heroGround}
          /* No `portrait` prop, so ServiceHero renders a <PhotoSlot>. The
             haastatteluvideo that used to sit here was Yle footage and was
             removed for copyright; the video branch in ServiceHero is intact
             and works, so a licensed clip can be dropped back in with
             portraitVideo={...}. Until then this is a labelled empty slot. */
          portraitAlt="Muotokuva: asianajaja Adam Huhtamäki"
        />
        <EmergencyBand
          kicker="Kiireelliset tapaukset"
          /* 38px, one step down from the front page's 40 — this heading runs
             longer. The en dash is the client's own. */
          titleClass="text-[38px] max-md:text-[26px]"
          title="Rikospäivystys 24/7 – Kiireelliset tapaukset"
          intro={[
            'Jos sinä tai läheisesi on otettu kiinni, pidätetty tai kotiisi tehdään kotietsintä, soita välittömästi. Puolustuksen valmistelu on aloitettava heti.',
          ]}
          panelNote={
            <>
              Vastaan puhelimeen itse. Jos en pääse
              vastaamaan oikeudenkäynnin tai poliisikuulustelun vuoksi, soitan
              takaisin heti vapauduttuani.
            </>
          }
        />
        <ContactDetails />
        {/* 02:47 on a phone lock screen, beside a pen on a desk — the
            päivystys argument stated as a photograph rather than a claim. */}
        <FaqBand
          title="Usein kysytyt kysymykset yhteydenotosta"
          items={YHTEYS_FAQ}
          photo={ukkGround}
        />
      </main>
      <SiteFooter />
      <EmergencyFab />
      <CookieConsent />
    </>
  );
}
