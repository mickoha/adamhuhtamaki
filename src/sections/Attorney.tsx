import Eyebrow from '@/components/Eyebrow';
import PhotoSlot from '@/components/PhotoSlot';
import { ATTORNEY_BIO, ATTORNEY_TAGS } from '@/data/services';

/** Who answers the phone. The section exists to make that concrete. */
export default function Attorney() {
  return (
    <section
      data-track-section="asianajaja"
      className="px-[56px] pb-[104px] max-md:px-5 max-md:pb-12"
    >
      <div className="grid mx-auto w-full max-w-[1400px] grid-cols-[minmax(0,380px)_1fr] items-start gap-16 max-md:grid-cols-1 max-md:gap-7">
        <div className="lighten">
          <PhotoSlot
            alt="Asianajaja Adam Huhtamäki, rikosoikeuteen erikoistunut asianajotoimisto Helsingissä."
            rounded
            className="h-[460px] max-md:h-[320px]"
          />
        </div>

        <div>
          <Eyebrow>Asianajaja</Eyebrow>
          <h2 className="mt-4 text-[42px] leading-[1.1] tracking-[-0.02em] max-md:text-[28px]">
            Adam Huhtamäki
          </h2>
          {ATTORNEY_BIO.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mt-5 max-w-[62ch] text-[17px] leading-[1.65] text-site-neutral-300 max-md:text-[15.5px]"
            >
              {paragraph}
            </p>
          ))}
          <div className="mt-7 flex flex-wrap gap-2">
            {ATTORNEY_TAGS.map((t) => (
              <span key={t} className="tag tag-neutral">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
