import Link from 'next/link';
import Eyebrow from '@/components/Eyebrow';
import { SPECIALITIES } from '@/data/services';
import { NAV_MORE } from '@/data/nav';

/** Stable ASCII analytics slug from a link href (labels are Finnish). */
const linkSlug = (href: string) =>
  href
    .replace(/[^a-z0-9]+/gi, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase() || 'link';

/**
 * The heading is right-aligned on desktop — the one place on the page where
 * the text leaves the left margin, which is what makes the section register as
 * a turn in the page rather than another block. Left-aligned on mobile.
 *
 * The panels sit on a divider-coloured grid with a 1px gap, so the gaps
 * themselves read as the hairlines between them.
 */
export default function Specialities() {
  return (
    <section
      data-track-section="erikoisalat"
      className="px-[56px] pb-[100px] max-md:px-5 max-md:pb-12"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <Eyebrow className="text-right max-md:text-left">Erikoisalat</Eyebrow>
        <h2 className="ml-auto mt-4 max-w-[24ch] text-right text-[42px] leading-[1.1] tracking-[-0.02em] max-md:ml-0 max-md:text-left max-md:text-[28px] max-md:leading-[1.12]">
          Painopiste on rikosasioissa ja pakkokeinoissa.
        </h2>

        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-px border-y border-site-divider bg-site-divider max-md:mt-8 max-md:grid-cols-1 max-md:gap-0 max-md:bg-transparent">
          {SPECIALITIES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              data-track-click={`erikoisala_${linkSlug(s.href)}`}
              className="group bg-site-bg px-10 pb-10 pt-11 transition-colors hover:bg-site-neutral-900 max-md:border-b max-md:border-site-divider max-md:px-0 max-md:py-[26px] max-md:last:border-b-0"
            >
              <h3 className="text-[34px] leading-[1.1] tracking-[-0.02em] max-md:text-[26px]">
                {s.title}
              </h3>
              <p className="mt-4 max-w-[44ch] text-[16px] leading-[1.7] text-site-neutral-300 max-md:text-[15px]">
                {s.body}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-[15px] text-site-accent">
                {s.linkLabel}
                <span className="transition-transform duration-150 group-hover:translate-x-[3px]">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 max-md:mt-7 max-md:flex-col max-md:items-start max-md:gap-y-2">
          <span className="text-[11.5px] uppercase tracking-[0.2em] text-site-neutral-500">
            Lisäpalvelut
          </span>
          {NAV_MORE.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-track-click={`lisaksi_${linkSlug(l.href)}`}
              className="text-[17px] text-site-neutral-200 transition-colors hover:text-site-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
