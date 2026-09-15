import type { StaticImageData } from 'next/image';
import ImageComponent from '@/components/ImageComponent';
import PhotoSlot from '@/components/PhotoSlot';
import { FaqItem } from '@/data/faq';
import { trackEvent } from '@/utils/analytics';

interface FaqBandProps {
  title: string;
  items: FaqItem[];
  /** Photographic ground behind the band. Omit for a plain --color-bg band,
   *  which then opens with the design system's fading hairline instead. */
  photo?: StaticImageData;
  /** Render the photographic band before its image has been delivered — the
   *  scrim, the pinned height and the fade are all in place, and a labelled
   *  placeholder holds the ground until the file lands. */
  photoPending?: boolean;
}

/**
 * Full-bleed FAQ band over a photographic ground.
 *
 * Native <details>, no JavaScript. All items are closed by default and open
 * independently — deliberately NOT an accordion group, because these are
 * reference answers a reader dips into, not a wizard they step through.
 *
 * The marker is a plus that rotates 45° into a cross, never a chevron: a
 * chevron implies a sequence, a plus implies "there is more here".
 */
export default function FaqBand({
  title,
  items,
  photo,
  photoPending,
}: FaqBandProps) {
  const hasBand = Boolean(photo) || Boolean(photoPending);
  return (
    <section
      id="ukk"
      data-track-section="ukk"
      className="relative scroll-mt-[90px] overflow-hidden border-y border-site-divider px-[56px] pb-[104px] pt-24 max-md:scroll-mt-[76px] max-md:px-5 max-md:pb-[52px] max-md:pt-12"
    >
      {/* The ground is pinned to a FIXED height, not inset-0: the section grows
          every time an answer opens, and a full-height background would rescale
          with it — the photograph visibly zooming on each toggle. Pinned, it
          stays put, and the fade dissolves its bottom edge into the page.
          aria-hidden because this is a ground under a scrim, not a content
          photograph. */}
      {hasBand && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[620px] max-md:h-[420px]"
        >
          {photo ? (
            <ImageComponent
              src={photo}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <PhotoSlot alt="" className="absolute inset-0" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(22,24,38,0.97)_0%,rgba(22,24,38,0.92)_46%,rgba(22,24,38,0.72)_100%)] max-md:bg-[linear-gradient(120deg,rgba(22,24,38,0.97)_0%,rgba(22,24,38,0.9)_46%,rgba(22,24,38,0.78)_100%)]" />
          {/* Dissolves the pinned image's hard bottom edge into the ground. */}
          <div className="absolute inset-x-0 bottom-0 h-[240px] bg-[linear-gradient(to_bottom,rgba(22,24,38,0),#161826)] max-md:h-[160px]" />
        </div>
      )}

      <div className="relative mx-auto w-full max-w-[1080px]">
        {/* Without a photographic ground the band opens on the system's
            fading hairline instead, so it still reads as its own field. */}
        {!hasBand && <hr className="site-rule mb-[72px] max-md:mb-10" />}
        <h2 className="mb-[46px] text-[36px] leading-[1.1] tracking-[-0.02em] max-md:mb-7 max-md:text-[27px]">
          {title}
        </h2>

        {items.map((item) => (
          <details
            key={item.q}
            className="site-details group border-t border-site-divider"
            onToggle={(e) => {
              if (e.currentTarget.open) {
                trackEvent('faq_open', { faq_question: item.q });
              }
            }}
          >
            <summary className="flex items-start justify-between gap-8 py-6 text-[19px] leading-[1.35] transition-colors hover:text-site-accent-200 max-md:gap-[18px] max-md:text-[16.5px]">
              <span className="max-w-[62ch]">{item.q}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
                className="mt-[6px] flex-none text-site-accent transition-transform duration-200 group-open:rotate-45"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </summary>
            <p className="site-fade mb-[26px] max-w-[78ch] text-[15.5px] leading-[1.75] text-site-neutral-300 max-md:text-[14.5px]">
              {item.a}
            </p>
          </details>
        ))}

        {/* Closing rule so the last row is ruled on both sides. */}
        <div aria-hidden="true" className="border-t border-site-divider" />
      </div>
    </section>
  );
}
