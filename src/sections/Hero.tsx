import Wrap from '@/components/Wrap';
import Button from '@/components/Button';
import Eyebrow from '@/components/Eyebrow';

/**
 * Homepage hero. The H1 and the lead paragraph are the two lines that decide
 * both the search snippet and whether the visitor stays — say what the company
 * does and for whom, in plain words, before any adjective.
 */
export default function Hero() {
  return (
    <section
      data-track-section="hero"
      className="relative overflow-hidden border-b border-site-line bg-[linear-gradient(180deg,#FFFFFF_0%,var(--color-site-canvas)_100%)] pb-[88px] pt-[72px] max-md:py-14"
    >
      {/* Soft brand glow. Decorative only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(700px 360px at 85% 8%, rgba(15,157,223,0.10), transparent 60%), radial-gradient(640px 460px at -8% 90%, rgba(17,20,99,0.05), transparent 65%)',
        }}
      />
      <Wrap className="relative grid grid-cols-[1.05fr_1fr] items-center gap-[56px] max-md:grid-cols-1">
        <div>
          <Eyebrow>[TÄYDENNÄ: lyhyt yläotsikko]</Eyebrow>
          <h1 className="my-[18px] text-[clamp(36px,4.6vw,56px)] font-bold leading-[1.1] tracking-[-0.02em] text-site-heading">
            [TÄYDENNÄ: mitä teette]{' '}
            <span className="text-site-accent">[TÄYDENNÄ: ja mitä asiakas saa]</span>
          </h1>
          <p className="max-w-[560px] text-[17px] leading-[1.6] text-site-muted">
            [TÄYDENNÄ: 2–3 lausetta, jotka kertovat konkreettisesti mitä
            palvelu tekee, kenelle se on ja mikä siinä on erilaista. Ei
            adjektiiveja ilman katetta.]
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-[10px]">
            <Button href="#yhteys" variant="primary" size="lg" arrow dataTrack="hero_cta">
              Ota yhteyttä
            </Button>
            <Button href="/palvelut/" variant="ghost" size="lg" dataTrack="hero_palvelut">
              Katso palvelut
            </Button>
          </div>
        </div>

        {/* Visual slot: an <ImageComponent>, an illustration, or a CSS mock. */}
        <div className="grid min-h-[280px] place-items-center rounded-site-lg border border-site-line bg-white p-8 text-[13px] text-site-faint shadow-site-card">
          [TÄYDENNÄ: kuva tai visuaali]
        </div>
      </Wrap>
    </section>
  );
}
