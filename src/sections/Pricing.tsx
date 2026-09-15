import Eyebrow from '@/components/Eyebrow';
import { FEE_ROUTES, RATES } from '@/data/services';
import { CONTACT } from '@/data/site';

/**
 * The commercial argument: in a criminal matter the fee is very often paid by
 * the state or an insurer, not by the client. The three routes come first and
 * the client's own rate list second, because that is the order in which the
 * question is actually worth answering.
 */
export default function Pricing() {
  return (
    <section
      id="palkkiot"
      data-track-section="hinnasto"
      className="scroll-mt-[90px] px-[56px] pb-[104px] max-md:scroll-mt-[76px] max-md:px-5 max-md:pb-12"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <Eyebrow>Hinnasto</Eyebrow>
        <h2 className="mt-4 max-w-[26ch] text-[42px] leading-[1.1] tracking-[-0.02em] max-md:text-[28px] max-md:leading-[1.12]">
          Mitä asianajaja maksaa rikosasiassa?
        </h2>
        <p className="mt-5 max-w-[62ch] text-[18px] leading-[1.65] text-site-neutral-300 max-md:text-[15.5px]">
          Usein asianajajan palkkion maksaa kokonaan tai osittain joku muu kuin
          sinä itse. Rikosasiassa kulut katetaan erittäin usein valtion varoista
          tai vakuutuksesta. Ensimmäinen puhelu ja tilannearvio ovat aina
          maksuttomia (0 €).
        </p>

        <p className="mt-6 text-[15px] text-site-neutral-400">
          Selvitän rahoitusvaihtoehdot puolestasi heti toimeksiannon alussa:
        </p>

        <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 max-md:mt-8 max-md:grid-cols-1 max-md:gap-4">
          {FEE_ROUTES.map((route) => (
            <article
              key={route.title}
              className="flex flex-col rounded-site-lg bg-site-surface px-[30px] pb-[34px] pt-8 shadow-site-sm max-md:px-6 max-md:pb-7 max-md:pt-6"
            >
              {/* self-start: the tag hugs its text instead of stretching. */}
              <span className="tag tag-accent self-start">{route.tag}</span>
              <h3 className="mt-4 text-[23px] leading-[1.15] tracking-[-0.02em] max-md:text-[20px]">
                {route.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-site-neutral-300">
                {route.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-x-16 gap-y-4 max-md:mt-10 max-md:grid-cols-1">
          <div>
            <span className="block text-[11.5px] uppercase tracking-[0.2em] text-site-neutral-500">
              Kun maksat itse
            </span>
            <dl className="mt-4">
              {RATES.map((rate) => (
                <div
                  key={rate.label}
                  className="flex items-baseline justify-between gap-6 border-b border-site-line-soft py-4"
                >
                  <dt className="text-[15px] text-site-neutral-300">
                    {rate.label}
                  </dt>
                  <dd className="text-right">
                    <span
                      className={`block whitespace-nowrap text-[17px] ${
                        rate.highlight
                          ? 'text-site-accent-300'
                          : 'text-site-text'
                      }`}
                    >
                      {rate.value}
                    </span>
                    {rate.note && (
                      <span className="mt-[2px] block whitespace-nowrap text-[12.5px] text-site-neutral-500">
                        {rate.note}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col justify-center max-md:mt-2">
            <p className="max-w-[46ch] text-[17px] leading-[1.65] text-site-neutral-300 max-md:text-[15.5px]">
              Et tarvitse valmista käsitystä siitä, mikä rahoitusmuoto koskee
              sinua. Soita, niin kerron heti, kuka kulut todennäköisesti
              maksaa.
            </p>
            <a
              href={`tel:${CONTACT.phone}`}
              data-track-click="hinnasto_soita"
              className="btn btn-primary mt-6 self-start px-[22px] py-[13px] text-[15px] max-md:w-full max-md:self-stretch"
            >
              Soita ja kysy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
