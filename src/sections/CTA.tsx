import Wrap from '@/components/Wrap';
import Eyebrow from '@/components/Eyebrow';
import ContactForm from '@/components/ContactForm';
import { CONTACT } from '@/data/site';

/** Reasons to get in touch — three at most, each one concrete. */
const PERKS = [
  '[TÄYDENNÄ: mitä asiakas saa yhteydenotosta]',
  '[TÄYDENNÄ: toinen konkreettinen lupaus]',
  '[TÄYDENNÄ: kolmas]',
];

/**
 * The conversion block: contact form plus the direct channels. Rendered at the
 * bottom of every page with the id #yhteys, which every CTA links to.
 */
export default function CTA({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
  const Heading = headingAs;
  return (
    <section id="yhteys" data-track-section="yhteys" className="bg-site-canvas py-24 max-md:py-16">
      <Wrap>
        <div className="relative grid grid-cols-2 gap-14 overflow-hidden rounded-[14px] border border-site-line bg-white p-12 shadow-site-card max-md:grid-cols-1 max-md:p-7">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[140px] -top-[180px] h-[420px] w-[420px] rounded-full"
            style={{
              background:
                'radial-gradient(circle,rgba(15,157,223,0.10),transparent 70%)',
            }}
          />
          <div className="relative z-[1]">
            <Eyebrow>Ota yhteyttä</Eyebrow>
            <Heading className="mb-3 mt-3 text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-site-primary">
              [TÄYDENNÄ: konkreettinen kehotus, ei &quot;Ota yhteyttä!&quot;]
            </Heading>
            <p className="text-[14.5px] leading-[1.6] text-site-muted">
              [TÄYDENNÄ: mitä seuraavaksi tapahtuu, kun asiakas jättää viestin —
              kuka vastaa ja kuinka nopeasti.]
            </p>
            <div className="mt-7 flex flex-col gap-[10px]">
              {PERKS.map((p) => (
                <div key={p} className="flex items-start gap-[10px] text-[13.5px] text-site-body">
                  <span className="mt-px grid h-[20px] w-[20px] flex-shrink-0 place-items-center rounded-full bg-site-ok-bg text-site-ok-fg">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                  </span>
                  {p}
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-site-line pt-6">
              <p className="text-[13.5px] leading-[1.6] text-site-muted">
                Puhutko mieluummin suoraan? Soita tai laita sähköpostia.
              </p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-[10px]">
                <a
                  href={`tel:${CONTACT.phone}`}
                  data-track-click="yhteys_puhelin"
                  className="inline-flex items-center gap-[8px] text-[14.5px] font-semibold text-site-primary transition-colors hover:text-site-accent"
                >
                  <span className="grid h-[20px] w-[20px] flex-shrink-0 place-items-center rounded-full bg-site-accent/10 text-site-accent">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                    </svg>
                  </span>
                  {CONTACT.phoneDisplay}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  data-track-click="yhteys_sahkoposti"
                  className="inline-flex items-center gap-[8px] text-[14.5px] font-semibold text-site-primary transition-colors hover:text-site-accent"
                >
                  <span className="grid h-[20px] w-[20px] flex-shrink-0 place-items-center rounded-full bg-site-accent/10 text-site-accent">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m2 7 10 6 10-6" />
                    </svg>
                  </span>
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </Wrap>
    </section>
  );
}
