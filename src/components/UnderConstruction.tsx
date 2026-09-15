import Eyebrow from '@/components/Eyebrow';
import { CONTACT, CONTENT_UPDATED_FI } from '@/data/site';

interface UnderConstructionProps {
  eyebrow: string;
  title: string;
  /** One sentence on what this page will hold, so the stub still tells a visitor something. */
  lead: string;
  /** Anchors that already exist elsewhere on the site and must keep working. */
  anchors?: { id: string; label: string }[];
}

/**
 * Placeholder for a page that is linked from the front page but not designed
 * yet. Same header, footer and tokens as the rest of the site, and the URL is
 * final — when the real page lands, only this body is replaced.
 */
export default function UnderConstruction({
  eyebrow,
  title,
  lead,
  anchors = [],
}: UnderConstructionProps) {
  return (
    <section className="px-[56px] pb-[104px] pt-[120px] max-md:px-5 max-md:pb-16 max-md:pt-12">
      <div className="mx-auto w-full max-w-[1400px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-[20ch] text-[52px] leading-[1.05] tracking-[-0.025em] max-md:text-[32px]">
          {title}
        </h1>
        <p className="mt-6 max-w-[56ch] text-[18px] leading-[1.65] text-site-neutral-300 max-md:text-[15.5px]">
          {lead}
        </p>

        <p className="mt-8 text-[11.5px] uppercase tracking-[0.18em] text-site-neutral-500 max-md:mt-6 max-md:text-[10px]">
          Päivitetty: {CONTENT_UPDATED_FI}
        </p>

        <div className="mt-10 max-w-[560px] rounded-site-lg border border-site-divider bg-site-surface px-8 py-7 max-md:px-6 max-md:py-6">
          <p className="text-[15px] leading-[1.7] text-site-neutral-300">
            Sivu on työn alla. Sisältö julkaistaan lähiviikkoina – siihen asti
            saat vastauksen nopeimmin puhelimitse.
          </p>
          <a
            href={`tel:${CONTACT.phone}`}
            data-track-click="under_construction_soita"
            className="btn btn-primary mt-5 px-[22px] py-[13px] text-[15px] max-md:w-full"
          >
            Soita päivystykseen 24/7
          </a>
        </div>

        {anchors.length > 0 && (
          <div className="mt-14 border-t border-site-divider">
            {anchors.map((a) => (
              <div
                key={a.id}
                id={a.id}
                className="scroll-mt-[90px] border-b border-site-divider py-7"
              >
                <h2 className="text-[26px] leading-[1.15] tracking-[-0.02em] max-md:text-[21px]">
                  {a.label}
                </h2>
                <p className="mt-2 text-[15px] text-site-neutral-500">
                  Sivu on työn alla.
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
