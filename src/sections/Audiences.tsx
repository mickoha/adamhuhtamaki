import ImageComponent from '@/components/ImageComponent';
import Eyebrow from '@/components/Eyebrow';
import { AUDIENCES } from '@/data/services';

/** Two doors into the practice: the private client and the company. */
export default function Audiences() {
  return (
    <section
      data-track-section="kohderyhmat"
      className="px-[56px] pb-24 pt-[104px] max-md:px-5 max-md:py-12"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <Eyebrow>Asianajopalvelut rikosasioissa</Eyebrow>
        <p className="mt-4 max-w-[62ch] text-[18px] leading-[1.65] text-site-neutral-300 max-md:text-[15.5px]">
          Hoidan toimeksiannot henkilökohtaisesti. Tiedät koko ajan, kuka
          asiaasi ajaa ja missä vaiheessa prosessi etenee.
        </p>
      </div>

      <div className="mt-12 grid mx-auto w-full max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5 max-md:mt-8 max-md:grid-cols-1 max-md:gap-4">
        {AUDIENCES.map((card) => (
          <article
            key={card.tag}
            className="overflow-hidden rounded-site-lg bg-site-surface shadow-site-sm"
          >
            {/* .lighten drops the photo's dark values into the card ground. */}
            <div className="lighten relative h-[260px] max-md:h-[190px]">
              <ImageComponent
                src={card.photo}
                alt={card.photoAlt}
                fill
                /* Two cards, 20px gap, 1400px cap inside px-[56px] → 690px
                   once capped. At DPR 2 this still resolves to the 1920w
                   variant, so it saves nothing today; it is written exactly so
                   the next person to change the layout gets a true number. */
                sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1512px) calc(50vw - 66px), 690px"
                className="object-cover"
              />
            </div>
            <div className="px-9 pb-10 pt-[34px] max-md:px-[22px] max-md:pb-7 max-md:pt-6">
              <span className="tag tag-outline">{card.tag}</span>
              <h3 className="mt-4 text-[26px] leading-[1.15] tracking-[-0.02em] max-md:text-[21px]">
                {card.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-site-neutral-300">
                {card.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
