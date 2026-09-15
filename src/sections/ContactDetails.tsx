import ContactForm from '@/components/ContactForm';
import { YHTEYS_MATTER_TYPES } from '@/data/yhteystiedot';
import { CONTACT, COMPANY } from '@/data/site';

/**
 * "Yhteystiedot ja tapaamiset".
 *
 * The office has no fixed street address, and the whole section follows from
 * that: no map, no opening hours, no "Käyntiosoite" — a PO box row and meeting
 * arrangements written as prose rather than a location.
 *
 * The right-hand column carries the site's own <ContactForm>. Its option list
 * is the widest on the site — this is the one general entry point, so it spans
 * all four practice areas instead of the criminal-only defaults the service
 * pages use. It is also the target of the hero's secondary CTA (#tapaamiset).
 *
 * The form's own fine print sends urgent matters to the phone, and the number
 * sits at 26px in the column beside it, so there is deliberately no second
 * call button stacked under the submit.
 */
export default function ContactDetails() {
  const rowCls =
    'grid grid-cols-[150px_minmax(0,1fr)] gap-6 border-t border-site-divider py-6 max-md:grid-cols-1 max-md:gap-1';
  const labelCls =
    'text-[11.5px] uppercase tracking-[0.2em] text-site-neutral-500';

  return (
    <section
      id="tapaamiset"
      data-track-section="yhteystiedot"
      className="scroll-mt-[74px] px-[56px] pb-[104px] pt-24 max-md:scroll-mt-[68px] max-md:px-5 max-md:pb-14 max-md:pt-12"
    >
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-2 items-start gap-[72px] max-md:grid-cols-1 max-md:gap-10">
        <div>
          <h2 className="text-[36px] leading-[1.1] tracking-[-0.02em] max-md:text-[27px]">
            Yhteystiedot ja tapaamiset
          </h2>

          <p className="mt-6 max-w-[60ch] text-[16.5px] leading-[1.75] text-site-neutral-200 max-md:text-[15px]">
            {/* "Helsingin", not {COMPANY.city}: the slot needs the genitive
                and the field holds the nominative, so interpolating it
                rendered "Helsingin alueella" as "Helsinki alueella". Finnish
                cases are not something a template variable can carry — if the
                city ever changes, this line changes with it. */}
            Hoidan toimeksiantoja Helsingin alueella sekä erikseen sovittaessa
            koko Suomessa. Koska työni tapahtuu pitkälti oikeussaleissa,
            poliisiasemilla ja asiakkaiden luona, toimistollani ei ole kiinteää
            käyntiosoitetta.
          </p>
          <p className="mt-4 max-w-[60ch] text-[16.5px] leading-[1.75] text-site-neutral-200 max-md:text-[15px]">
            Tapaamiset järjestyvät joustavasti ja luottamuksellisesti. Voimme
            neuvotella etäyhteydellä, oikeustalolla, yrityksesi tiloissa tai
            erikseen varattavassa yksityisessä neuvottelutilassa.
          </p>

          <dl className="mt-10">
            <div className={rowCls}>
              <dt className={labelCls}>Puhelin</dt>
              <dd>
                <a
                  href={`tel:${CONTACT.phone}`}
                  data-track-click="yhteystiedot_puhelin"
                  className="text-[26px] leading-[1.2] transition-colors hover:text-site-accent-300 max-md:text-[22px]"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </dd>
            </div>

            <div className={rowCls}>
              <dt className={labelCls}>Sähköposti</dt>
              <dd>
                <a
                  href={`mailto:${CONTACT.email}`}
                  data-track-click="yhteystiedot_sahkoposti"
                  className="text-[15px] text-site-accent transition-colors hover:text-site-accent-300"
                >
                  {CONTACT.email}
                </a>
                {/* Professional-secrecy notice, not a caption — it belongs to
                    the email row and travels with it. */}
                <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.6] text-site-neutral-400">
                  Suosittelen, ettet lähetä arkaluonteisia asiakirjoja tai
                  yksityiskohtia salaamattomalla sähköpostilla.
                </p>
              </dd>
            </div>

            <div className={`${rowCls} border-b border-site-divider`}>
              <dt className={labelCls}>Postiosoite</dt>
              <dd className="text-[16px] leading-[1.6] text-site-neutral-300">
                {COMPANY.postalAddress}, {COMPANY.postalCode} {COMPANY.city}
              </dd>
            </div>
          </dl>
        </div>

        <ContactForm
          surface="bg-site-surface"
          matterTypes={YHTEYS_MATTER_TYPES}
        />
      </div>
    </section>
  );
}
