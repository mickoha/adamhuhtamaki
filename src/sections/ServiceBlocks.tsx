import type { DisputeBlock } from '@/data/riidanratkaisu';

interface ServiceBlocksProps {
  title: string;
  kicker: string;
  blocks: DisputeBlock[];
  /** Riidanratkaisu's abstract CSS field. Specific to that page — the
   *  handoff is explicit that it must not be copied onto the others. */
  abstractGround?: boolean;
  section?: string;
}

/**
 * The two-block services section shared by the civil pages.
 *
 * No photographs and no equal-weight card grid: two wide numbered blocks, the
 * heading column left and the prose right. Civil disputes should read as
 * considered rather than urgent, which is why nothing here borrows the
 * criminal pages' imagery or the pulsing accent dot.
 *
 * The two blocks are deliberately unlike each other — 01's cards are bare
 * statements, 02's are labelled sub-services — because the client's own text
 * lists three bullets in one case and two named categories in the other.
 */
export default function ServiceBlocks({
  title,
  kicker,
  blocks,
  abstractGround = false,
  section = 'palvelut',
}: ServiceBlocksProps) {
  return (
    <section
      data-track-section={section}
      className="relative overflow-hidden px-[56px] pb-[104px] pt-24 max-md:px-5 max-md:pb-14 max-md:pt-12"
    >
      {/* Abstract ground — riidanratkaisu's only decorative field, drawn
          entirely from the accent ramp. Every layer fades out with a mask:
          nothing in this system ends on a hard edge. */}
      {abstractGround && (
        <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.75] [background:radial-gradient(90%_70%_at_88%_0%,var(--color-site-accent-900),transparent_62%),radial-gradient(60%_60%_at_4%_88%,var(--color-site-accent-900),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[180px] -right-[120px] h-[780px] w-[780px] rounded-full border border-site-accent-800 opacity-50 [mask-image:linear-gradient(200deg,#000_0%,transparent_62%)] max-md:-right-[180px] max-md:h-[460px] max-md:w-[460px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[60px] right-10 h-[560px] w-[560px] rounded-full border border-site-accent-800 opacity-[0.35] [mask-image:linear-gradient(200deg,#000_0%,transparent_62%)] max-md:-right-[120px] max-md:h-[310px] max-md:w-[310px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30 [background:repeating-linear-gradient(114deg,var(--color-site-accent-800)_0_1px,transparent_1px_46px)] [mask-image:radial-gradient(70%_60%_at_20%_30%,#000,transparent)] max-md:[background:repeating-linear-gradient(114deg,var(--color-site-accent-800)_0_1px,transparent_1px_34px)]"
      />
        </>
      )}

      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-16 gap-y-4 max-md:flex-col max-md:items-start">
          <h2 className="max-w-[24ch] text-[36px] leading-[1.1] tracking-[-0.02em] max-md:text-[27px]">
            {title}
          </h2>
          <span className="text-[11.5px] uppercase tracking-[0.24em] text-site-accent max-md:order-first max-md:text-[10px]">
            {kicker}
          </span>
        </div>

        <div className="mt-14 flex flex-col gap-16 max-md:mt-8 max-md:gap-12">
          {blocks.map((block) => (
            <div
              key={block.number}
              className={`grid grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-x-16 gap-y-10 border-t pt-8 max-md:grid-cols-1 max-md:gap-y-6 max-md:pt-6 ${block.rule}`}
            >
              <div>
                <span className="block text-[12px] uppercase tracking-[0.22em] text-site-accent">
                  {block.number}
                </span>
                <h3 className="mt-3 text-[28px] leading-[1.15] tracking-[-0.02em] max-md:text-[23px]">
                  {block.title}
                </h3>
              </div>

              <div>
                <p className="max-w-[68ch] text-[16.5px] leading-[1.75] text-site-neutral-200 max-md:text-[15px]">
                  {block.body}
                </p>
                {block.cardsIntro && (
                  <p className="mt-5 max-w-[68ch] text-[16.5px] leading-[1.75] text-site-neutral-200 max-md:text-[15px]">
                    {block.cardsIntro}
                  </p>
                )}

                {/* The block's one emphasised passage, on the accent rule.
                    Nothing else in these sections takes a rule. */}
                {block.emphasis && (
                  <p className="mt-6 max-w-[64ch] border-l border-site-accent-800 pl-7 text-[16.5px] leading-[1.75] text-site-neutral-100 max-md:pl-[18px] max-md:text-[15px]">
                    {block.emphasis}
                  </p>
                )}

                {block.cards.length > 0 && (
                <div
                  className="mt-7 grid gap-4 max-md:grid-cols-1 max-md:gap-[14px]"
                  style={{
                    gridTemplateColumns: `repeat(auto-fit, ${block.cardMin ?? 'minmax(280px,1fr)'})`,
                  }}
                >
                  {block.cards.map((card) => (
                    <div
                      key={card.body}
                      className="rounded-site-md border border-site-divider bg-site-surface px-6 py-[22px]"
                    >
                      {card.label ? (
                        <span className="block text-[10.5px] uppercase tracking-[0.2em] text-site-accent">
                          {card.label}
                        </span>
                      ) : (
                        /* Block 01's cards open on a short accent mark instead
                           of a label — they are statements, not sub-services. */
                        <span
                          aria-hidden="true"
                          className="block h-px w-5 bg-site-accent-600"
                        />
                      )}
                      {card.title && (
                        <h4 className="mt-2 text-[18px] leading-[1.25] tracking-[-0.01em]">
                          {card.title}
                        </h4>
                      )}
                      <p
                        className={`text-site-neutral-300 ${
                          card.title
                            ? 'mt-2 text-[15px] leading-[1.7]'
                            : 'mt-3 text-[15.5px] leading-[1.6]'
                        }`}
                      >
                        {card.body}
                      </p>
                    </div>
                  ))}
                </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
