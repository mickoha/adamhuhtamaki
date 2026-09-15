import { PROCESS_STEPS } from '@/data/rikosoikeus';

/**
 * The four-stage timeline.
 *
 * Each step carries its OWN border-top rather than sharing one rule across the
 * container — that is what lets the row wrap at narrow widths without
 * orphaning a step under a line that no longer reaches it. The rule lightens
 * along the sequence, and the dot's ring is a box-shadow in the page ground
 * colour, punching a gap so the dot reads as sitting on the line.
 */
export default function ProcessSteps() {
  return (
    <section
      data-track-section="prosessi"
      className="px-[56px] py-[104px] max-md:px-5 max-md:py-12"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        {/* The kicker used to read "Esitutkinnasta hovioikeuteen" beside the
            heading. The heading now says the same thing, so it went — two
            "esitutkinnasta"s in one row read as a stutter. */}
        <h2 className="max-w-[26ch] text-[36px] leading-[1.1] tracking-[-0.02em] max-md:text-[27px]">
          Asianajaja mukanasi esitutkinnasta oikeudenkäyntiin
        </h2>

        <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-x-10 gap-y-12 max-md:mt-10 max-md:grid-cols-1 max-md:gap-8">
          {PROCESS_STEPS.map((s) => (
            <div key={s.number} className={`relative border-t pt-8 ${s.rule}`}>
              <span
                aria-hidden="true"
                className={`absolute -top-[6px] left-0 block h-[11px] w-[11px] rounded-full shadow-[0_0_0_5px_var(--color-site-bg)] ${
                  s.filled
                    ? 'bg-site-accent'
                    : 'border border-site-accent-600 bg-site-bg'
                }`}
              />
              <span className="block text-[10.5px] uppercase tracking-[0.22em] text-site-neutral-500">
                Vaihe {s.number}
              </span>
              <h3 className="mt-2 text-[23px] leading-[1.2] tracking-[-0.01em] max-md:text-[21px]">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[32ch] text-[14.5px] leading-[1.7] text-site-neutral-300">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
