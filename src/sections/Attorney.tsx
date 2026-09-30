import Eyebrow from '@/components/Eyebrow';
import ImageComponent from '@/components/ImageComponent';
import portrait from '@images/adam-huhtamaki.jpg';
import { ATTORNEY_BIO, ATTORNEY_TAGS } from '@/data/services';

/** Who answers the phone. The section exists to make that concrete. */
export default function Attorney() {
  return (
    <section
      data-track-section="asianajaja"
      className="px-[56px] pb-[104px] max-md:px-5 max-md:pb-12"
    >
      {/* Three grid children so mobile can read heading → photo → bio in DOM
          order, while desktop puts the photo in its own column spanning both
          text rows. The column is 560px because the photo is landscape. */}
      <div className="grid mx-auto w-full max-w-[1400px] grid-cols-[minmax(0,560px)_1fr] grid-rows-[auto_1fr] items-start gap-x-16 max-md:grid-cols-1 max-md:grid-rows-none max-md:gap-y-7">
        <div className="col-start-2 row-start-1 max-md:col-start-1">
          <Eyebrow>Asianajaja</Eyebrow>
          <h2 className="mt-4 text-[42px] leading-[1.1] tracking-[-0.02em] max-md:text-[28px]">
            Adam Huhtamäki
          </h2>
        </div>

        {/* The whole frame at its own aspect ratio, uncropped. Shot on
            near-black, so .lighten drops the backdrop into the page ground. */}
        <div className="lighten col-start-1 row-span-2 row-start-1 overflow-hidden rounded-site-lg max-md:row-auto">
          <ImageComponent
            src={portrait}
            alt="Asianajaja Adam Huhtamäki, rikosoikeuteen erikoistunut asianajotoimisto Helsingissä."
            sizes="(max-width: 900px) calc(100vw - 40px), 560px"
            className="h-auto w-full"
          />
        </div>

        <div className="col-start-2 row-start-2 mt-5 max-md:col-start-1 max-md:row-auto max-md:mt-0">
          {ATTORNEY_BIO.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="mt-5 max-w-[62ch] text-[17px] leading-[1.65] text-site-neutral-300 first:mt-0 max-md:text-[15.5px]"
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
