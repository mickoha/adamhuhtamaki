import Eyebrow from '@/components/Eyebrow';
import ImageComponent from '@/components/ImageComponent';
import { CONTACT, CONTENT_UPDATED_FI } from '@/data/site';
import hero from '@images/hero.jpg';

/**
 * The hero runs UNDER the transparent header (-76px) so the photograph starts
 * at the very top of the viewport. On mobile the header is opaque, so the pull
 * is dropped. Two scrims keep the text legible over any frame: one raking in
 * from the left, one lifting the page ground back up over the bottom edge.
 */
export default function Hero() {
  return (
    <section
      data-track-section="hero"
      className="relative -mt-[76px] flex min-h-[736px] items-end overflow-hidden max-md:mt-0 max-md:min-h-[620px]"
    >
      {/* No .lighten here — the two scrims below do the compositing, and this
          is the LCP image, so it is the one image on the page with priority. */}
      <ImageComponent
        src={hero}
        alt="Tyhjä kuulusteluhuone: metallipöytä, käsiraudat ja asiakirjakansio yksittäisen lampun valossa"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(22,24,38,0.94)_0%,rgba(22,24,38,0.86)_42%,rgba(22,24,38,0.35)_100%)] max-md:bg-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,#161826_0%,rgba(22,24,38,0)_45%)] max-md:bg-[linear-gradient(to_top,#161826_4%,rgba(22,24,38,0.9)_52%,rgba(22,24,38,0.62)_100%)]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-[56px] pb-[84px] pt-[150px] max-md:px-5 max-md:pb-11 max-md:pt-[90px]">
        <div className="pointer-events-none max-w-[1120px]">
          {/* The kicker is the page's only H1: it names what the page is
              ("asianajotoimisto"), while the title carries "rikospäivystys".
              The big line below is the slogan, so it is a <p> styled as the
              display heading it looks like. */}
          <Eyebrow as="h1">
            Rikosoikeuteen erikoistunut asianajotoimisto – Helsinki ja koko
            Suomi
          </Eyebrow>

          <p className="mt-5 max-w-[15ch] text-[68px] font-medium leading-[1.03] tracking-[-0.025em] text-balance max-md:mt-4 max-md:text-[38px] max-md:leading-[1.06]">
            Puolustus alkaa ensimmäisestä puhelusta.
          </p>

          <p className="mt-6 max-w-[54ch] text-[19px] leading-[1.6] text-site-neutral-300 max-md:mt-4 max-md:text-[15.5px]">
            Asianajotoimisto Adam Huhtamäki on rikosoikeuteen erikoistunut
            asianajotoimisto Helsingissä. Avustan rikoksesta epäiltyjä ja
            asianomistajia esitutkinnasta hovioikeuteen sekä
            pakkokeinoasioissa, kuten vangitsemisessa, kotietsinnässä ja
            takavarikossa. Takanani on useita satoja oikeudenkäyntejä.
          </p>

          <div className="pointer-events-auto mt-9 flex flex-wrap items-center gap-3 max-md:mt-7 max-md:flex-col max-md:items-stretch">
            <a
              href={`tel:${CONTACT.phone}`}
              data-track-click="hero_paivystys"
              className="btn btn-primary px-[22px] py-[13px] text-[15px] max-md:px-5 max-md:py-[15px]"
            >
              Soita päivystykseen 24/7
            </a>
            <a
              href="#yhteys"
              data-track-click="hero_yhteydenottopyynto"
              className="btn btn-secondary px-[22px] py-[13px] text-[15px] max-md:px-5 max-md:py-[15px]"
            >
              Jätä yhteydenottopyyntö
            </a>
          </div>

          {/* Freshness stamp — same sitewide date as every other hero. */}
          <p className="mt-8 text-[11.5px] uppercase tracking-[0.18em] text-site-neutral-500 max-md:mt-6 max-md:text-[10px]">
            Päivitetty: {CONTENT_UPDATED_FI}
          </p>
        </div>
      </div>
    </section>
  );
}
