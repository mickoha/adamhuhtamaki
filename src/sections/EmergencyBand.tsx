import { CONTACT } from '@/data/site';

interface EmergencyBandProps {
  /** Page-specific kicker beside the pulsing dot. */
  kicker?: string;
  /** Page-specific heading. Defaults to the front page's wording. */
  title?: string;
  /** Page-specific call-back promise in the number panel. */
  panelNote?: React.ReactNode;
  /** One step down from 40px where a page's heading runs long. */
  titleClass?: string;
  /** Page-specific body copy, one entry per paragraph. Nodes rather than
   *  strings so a page can inline a tel: or anchor link. Defaults to the front
   *  page's single paragraph. */
  intro?: React.ReactNode[];
}

/**
 * The page's one saturated field. Everything else is dark ground and hairlines,
 * which is exactly what makes this band read as the emergency it describes.
 */
export default function EmergencyBand({
  kicker = 'Rikospäivystys 24/7',
  title,
  intro,
  panelNote,
  titleClass = 'text-[40px] max-md:text-[27px]',
}: EmergencyBandProps) {
  return (
    <section
      data-track-section="paivystys"
      className="border-y border-[rgba(233,233,237,0.08)] bg-site-section bg-[radial-gradient(120%_140%_at_12%_0%,#353b80_0%,#262a60_58%)] px-[56px] py-16 max-md:px-5 max-md:py-10"
    >
      <div className="grid mx-auto w-full max-w-[1400px] grid-cols-[1.1fr_1fr] items-center gap-14 max-md:grid-cols-1 max-md:gap-7">
        <div>
          <span className="flex items-center gap-3">
            <span className="site-pulse block h-[9px] w-[9px] flex-none rounded-full bg-site-accent-300" />
            <span className="text-[11.5px] uppercase tracking-[0.24em] text-site-accent-200 max-md:text-[10px] max-md:tracking-[0.2em]">
              {kicker}
            </span>
          </span>

          <h2
            className={`mt-5 max-w-[24ch] leading-[1.1] tracking-[-0.02em] max-md:mt-4 max-md:leading-[1.12] ${titleClass}`}
          >
            {title ?? 'Kiinniotto ei odota virka-aikaa. Eikä puolustus.'}
          </h2>

          {(
            intro ?? [
              <>
                Kuulustelu voidaan aloittaa tunneissa, ja aivan ensimmäiset
                lausumat voivat olla merkittäviä läpi koko oikeusprosessin.
                Soita heti, kun sinä tai läheisesi on otettu kiinni, kutsuttu
                poliisin kuulusteluun tai saanut tiedon esitutkinnasta.
              </>,
            ]
          ).map((paragraph, i) => (
            <p
              key={i}
              className="mt-5 text-[17px] leading-[1.65] text-site-accent-200 max-md:text-[15px]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="rounded-site-lg border border-[rgba(233,233,237,0.16)] bg-[rgba(22,24,38,0.4)] px-8 py-[30px] max-md:px-5 max-md:py-[22px]">
          <span className="block text-[11.5px] uppercase tracking-[0.24em] text-site-accent-300 max-md:text-[10px]">
            Päivystysnumero
          </span>
          <a
            href={`tel:${CONTACT.phone}`}
            data-track-click="paivystys_numero"
            className="mt-3 block text-[36px] leading-[1.1] tracking-[-0.02em] transition-colors hover:text-site-accent-300 max-md:text-[28px]"
          >
            {CONTACT.phoneDisplay}
          </a>
          <div
            aria-hidden="true"
            className="site-rule my-5 max-md:bg-[rgba(233,233,237,0.16)]"
          />
          <p className="text-[15px] leading-[1.65] text-site-accent-200">
            {panelNote ?? (
              <>
                Vastaan puhelimeen itse, tarvittaessa myös yöllä. Jos en pääse
                vastaamaan, soitan takaisin heti, kun vapaudun oikeussalista tai
                poliisiasemalta.
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
