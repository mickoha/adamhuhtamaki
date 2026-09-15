import ImageComponent from '@/components/ImageComponent';
import PhotoSlot from '@/components/PhotoSlot';
import type { CaseType } from '@/data/rikosoikeus';

interface CaseTypesProps {
  title: string;
  items: CaseType[];
  /** Paragraph beside the heading (rikosasianajaja) … */
  intro?: string;
  /** …or a kicker there instead (pakkokeinot). Use one, not both. */
  kicker?: string;
  /** Three-up by default; pakkokeinot has exactly three. */
  section?: string;
  /** A line UNDER the grid, on the accent rule — for practice areas that
   *  belong to this page but not among its headline cards. Deliberately not a
   *  seventh card: a card would claim equal weight with the six, and the point
   *  of this slot is "these too". */
  footnote?: React.ReactNode;
}

/**
 * The six case types.
 *
 * Each card carries a 16:10 photograph at the top, composited with .lighten so
 * its dark values fall away into the card ground. The image has square corners
 * of its own — the card's `overflow-hidden` is what rounds it, so the radius
 * never has to be kept in sync in two places.
 */
export default function CaseTypes({
  title,
  items,
  intro,
  kicker,
  section = 'erikoistumisalueet',
  footnote,
}: CaseTypesProps) {
  return (
    <section
      data-track-section={section}
      className="px-[56px] py-[104px] max-md:px-5 max-md:py-12"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-16 gap-y-8 max-md:flex-col max-md:items-start max-md:gap-y-4">
          <h2 className="max-w-[24ch] text-[36px] leading-[1.1] tracking-[-0.02em] max-md:text-[27px]">
            {title}
          </h2>
          {intro && (
            <p className="max-w-[52ch] text-[16px] leading-[1.7] text-site-neutral-300 max-md:text-[15px]">
              {intro}
            </p>
          )}
          {kicker && (
            <span className="text-[11.5px] uppercase tracking-[0.24em] text-site-accent max-md:order-first max-md:text-[10px]">
              {kicker}
            </span>
          )}
        </div>

        {/* Fixed three-up rather than auto-fit: auto-fit was fitting a fourth
            column on a wide screen, which broke the 2×3 reading rhythm. */}
        <div className="mt-14 grid grid-cols-3 gap-7 max-xl:grid-cols-2 max-md:mt-8 max-md:grid-cols-1 max-md:gap-[18px]">
          {items.map((c) => (
            <article
              key={c.number}
              className="overflow-hidden rounded-site-md border border-site-divider bg-site-surface"
            >
              <div className="lighten relative aspect-[16/10] max-md:aspect-[16/9]">
                {c.photo ? (
                  <ImageComponent
                    src={c.photo}
                    alt={c.photoAlt}
                    fill
                    /* Measured, not guessed. The grid is capped at 1400px
                       inside px-[56px], so above 1512px the card is a FIXED
                       448px — (1400 - 2*28px gap) / 3. Declaring "33vw" here
                       claimed 570px on a 1727px screen, which at DPR 2 asked
                       for 1140px and pushed the browser past the 1080w entry
                       onto the 1920w one. Six cards, ~170 kB, for 28% of
                       overstatement. Breakpoints: 900 = 1 column, xl 1280 = 2. */
                    sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1280px) calc(50vw - 70px), (max-width: 1512px) calc(33.33vw - 56px), 448px"
                    className="object-cover"
                  />
                ) : (
                  <PhotoSlot alt={c.photoAlt} className="absolute inset-0" />
                )}
              </div>

              <div className="flex flex-col gap-3 px-[26px] pb-[30px] pt-[26px] max-md:px-[22px] max-md:pb-6 max-md:pt-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-[12px] tracking-[0.1em] text-site-accent">
                    {c.number}
                  </span>
                  <h3 className="text-[21px] leading-[1.2] tracking-[-0.01em] max-md:text-[19px]">
                    {c.title}
                  </h3>
                </div>
                <p className="text-[14.5px] leading-[1.7] text-site-neutral-300 max-md:text-[14px]">
                  {c.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* The section's one emphasised passage. Louder than ServiceBlocks'
            `emphasis`: 19px against the cards' 14.5px, the full accent on a 2px
            rule rather than accent-800 on 1px. Weight stays 400 — in this
            system emphasis comes from size, colour and space, never from bold
            body copy. 50ch caps the line at ~600px on desktop so it wraps to
            three short lines instead of running the full column width; on
            mobile the column is narrower than the cap, so it never binds. */}
        {footnote && (
          <p className="mt-12 max-w-[50ch] border-l-2 border-site-accent pl-8 text-[19px] leading-[1.7] text-site-text max-md:mt-8 max-md:pl-5 max-md:text-[16.5px]">
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
}
