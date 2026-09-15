import { CONTACT, COMPANY, CONTENT_UPDATED_FI } from '@/data/site';

/**
 * The contact rows that sit inside the /yhteystiedot/ hero, so the phone number
 * is on screen before the visitor scrolls. That is the whole point of the page:
 * someone whose relative was just detained should not have to scroll to find a
 * number.
 *
 * It deliberately repeats what <ContactDetails> shows further down. The
 * duplication is the feature — the hero answers "how do I reach him", the
 * section below answers "and where do we meet".
 */
/* Desktop only. On a phone the hero already ends in a full-width "Soita
   päivystykseen 24/7" button, so repeating the number as a list would push the
   heading off screen to say the same thing twice. The Päivitetty row below is
   NOT hidden — every hero on the site carries that stamp. */
const ROW = 'border-t border-site-divider pt-[14px] pb-[18px] max-md:hidden';
const LABEL =
  'block text-[11.5px] uppercase tracking-[0.2em] text-site-neutral-500';

export default function HeroContactList() {
  return (
    <dl className="mt-10 max-w-[400px] max-md:mt-7 max-md:max-w-none">
      <div className={ROW}>
        <dt className={LABEL}>Päivystys 24/7</dt>
        <dd className="mt-[6px]">
          <a
            href={`tel:${CONTACT.phone}`}
            data-track-click="hero_puhelin"
            className="text-[26px] leading-[1.2] transition-colors hover:text-site-accent-300 max-md:text-[22px]"
          >
            {CONTACT.phoneDisplay}
          </a>
        </dd>
      </div>

      <div className={ROW}>
        <dt className={LABEL}>Sähköposti</dt>
        <dd className="mt-[6px]">
          <a
            href={`mailto:${CONTACT.attorneyEmail}`}
            data-track-click="hero_sahkoposti"
            className="text-[15px] text-site-accent transition-colors hover:text-site-accent-300"
          >
            {CONTACT.attorneyEmail}
          </a>
        </dd>
      </div>

      <div className={ROW}>
        <dt className={LABEL}>Postiosoite</dt>
        <dd className="mt-[6px] text-[15px] leading-[1.6] text-site-neutral-300">
          {COMPANY.postalAddress}, {COMPANY.postalCode} {COMPANY.city}
        </dd>
      </div>

      {/* Last row, on the same rule as the others — the stamp every hero
          carries, folded into the list instead of floating under it. */}
      <div className="flex items-baseline gap-4 border-t border-site-divider pt-[14px]">
        <dt className={LABEL}>Päivitetty</dt>
        <dd className="text-[11.5px] uppercase tracking-[0.18em] text-site-neutral-500">
          {CONTENT_UPDATED_FI}
        </dd>
      </div>
    </dl>
  );
}
