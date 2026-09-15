import Eyebrow from '@/components/Eyebrow';
import ImageComponent from '@/components/ImageComponent';
import { FAQ } from '@/data/faq';
import ukk from '@images/ukk.jpg';
import { trackEvent } from '@/utils/analytics';

/**
 * The photograph is pinned to the top 620px of the band rather than filling
 * it, so opening an answer lengthens the section without stretching the image.
 * A fade strip dissolves its bottom edge into the page ground.
 *
 * The questions live in @/data/faq so the FAQPage JSON-LD is generated from
 * the same array this renders — schema that does not match the visible text is
 * ignored by search and answer engines alike.
 */
export default function Faq() {
  return (
    <section
      id="ukk"
      data-track-section="ukk"
      className="relative scroll-mt-[90px] overflow-hidden border-y border-site-divider max-md:scroll-mt-[76px] px-[56px] pb-28 pt-[104px] max-md:px-5 max-md:pb-12 max-md:pt-12"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[620px] max-md:h-[420px]"
      >
        <div className="relative h-full">
          <ImageComponent
            src={ukk}
            alt="Kaksi kättä vastakkain vankilan tapaamishuoneen lasin eri puolilla"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(85deg,rgba(22,24,38,0.96)_0%,rgba(22,24,38,0.62)_100%)] max-md:bg-[linear-gradient(to_bottom,rgba(22,24,38,0.82)_0%,#161826_100%)]" />
        <div className="absolute inset-x-0 top-[380px] h-[240px] bg-[linear-gradient(to_bottom,rgba(22,24,38,0),#161826)] max-md:top-[240px] max-md:h-[180px]" />
      </div>

      <div className="relative grid mx-auto w-full max-w-[1400px] grid-cols-[0.8fr_1.2fr] gap-[72px] max-md:grid-cols-1 max-md:gap-8">
        <div>
          <Eyebrow>UKK</Eyebrow>
          <h2 className="mt-4 max-w-[18ch] text-[38px] leading-[1.1] tracking-[-0.02em] max-md:text-[27px] max-md:leading-[1.12]">
            Usein kysytyt kysymykset rikosasioista.
          </h2>
          <p className="mt-5 max-w-[42ch] text-[17px] leading-[1.65] text-site-neutral-300 max-md:text-[15.5px]">
            Jos oma tilanteesi ei ole listalla, soita. Vastaan nopeammin
            puhelimessa kuin verkkolomakkeella.
          </p>
        </div>

        <div>
          {FAQ.map((item, i) => (
            <details
              key={item.q}
              className={`site-details border-b border-site-divider py-[22px] ${
                i === 0 ? 'border-t' : ''
              }`}
              onToggle={(e) => {
                if (e.currentTarget.open) {
                  trackEvent('faq_open', { faq_question: item.q });
                }
              }}
            >
              <summary className="flex items-start justify-between gap-6 text-[19px] leading-[1.3] max-md:text-[16.5px]">
                {item.q}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="chevron mt-[6px] flex-none text-site-accent"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="mt-3 max-w-[62ch] text-[15.5px] leading-[1.7] text-site-neutral-300">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
