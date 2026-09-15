import Eyebrow from '@/components/Eyebrow';
import ContactForm from '@/components/ContactForm';
import { CONTACT, COMPANY } from '@/data/site';

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-9 first:mt-7">
      <span className="block text-[11.5px] uppercase tracking-[0.2em] text-site-neutral-500">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </div>
  );
}

/**
 * The form is the secondary route on purpose — the fine print inside it tells
 * visitors to call when the matter is urgent, and the päivystys number sits
 * directly above it at 27px.
 */
interface ContactProps {
  matterTypes?: string[];
  urgencyLevels?: string[];
  /** Criminal pages say "Päivystys 24/7"; the civil page just says Puhelin. */
  phoneLabel?: string;
  /** The civil page's office line drops "ja vankilassa". */
  officeNote?: string;
  matterLabel?: string;
  urgencyLabel?: string;
  formNotice?: string;
}

export default function Contact({
  matterTypes,
  urgencyLevels,
  phoneLabel = 'Päivystys 24/7',
  officeNote,
  matterLabel,
  urgencyLabel,
  formNotice,
}: ContactProps) {
  return (
    <section
      id="yhteys"
      data-track-section="yhteystiedot"
      data-track-location="contact"
      className="scroll-mt-[74px] border-t border-site-divider bg-[linear-gradient(180deg,#161826_0%,#292b31_100%)] px-[56px] pb-24 pt-[84px] max-md:scroll-mt-[76px] max-md:px-5 max-md:py-12"
    >
      <div className="grid mx-auto w-full max-w-[1400px] grid-cols-[0.85fr_1.15fr] gap-[72px] max-md:grid-cols-1 max-md:gap-8">
        <div>
          <Eyebrow>Yhteystiedot</Eyebrow>
          <h2 className="mt-4 text-[42px] leading-[1.1] tracking-[-0.02em] max-md:text-[28px]">
            Ota yhteyttä.
          </h2>

          <Block label={phoneLabel}>
            <a
              href={`tel:${CONTACT.phone}`}
              data-track-click="yhteystiedot_puhelin"
              className="text-[27px] leading-[1.2] transition-colors hover:text-site-accent-300 max-md:text-[24px]"
            >
              {CONTACT.phoneDisplay}
            </a>
          </Block>

          <Block label="Sähköposti">
            <a
              href={`mailto:${CONTACT.email}`}
              data-track-click="yhteystiedot_sahkoposti"
              className="text-[17px] text-site-neutral-200 transition-colors hover:text-site-accent"
            >
              {CONTACT.email}
            </a>
          </Block>

          <Block label="Postiosoite">
            <p className="text-[15px] leading-[1.7] text-site-neutral-300">
              {COMPANY.postalAddress}
              <br />
              {COMPANY.postalCode} {COMPANY.city}
              <br />
              {officeNote ?? COMPANY.officeNoteFi}
            </p>
          </Block>
        </div>

        <ContactForm
          matterTypes={matterTypes}
          urgencyLevels={urgencyLevels}
          matterLabel={matterLabel}
          urgencyLabel={urgencyLabel}
          notice={formNotice}
        />
      </div>
    </section>
  );
}
