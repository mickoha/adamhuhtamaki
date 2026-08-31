import SEO from '@/components/SEO';
import { SITE_URL } from '@/data/schema';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import Button from '@/components/Button';
import Wrap from '@/components/Wrap';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Sivua ei löytynyt – [brändi]"
        description="Etsimääsi sivua ei löytynyt."
        url={`${SITE_URL}/404/`}
      />
      <Nav />
      <main>
        <Wrap className="py-28 text-center max-md:py-16">
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-site-accent">
            404
          </p>
          <h1 className="mx-auto my-4 max-w-[600px] text-[clamp(28px,3vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-site-heading">
            Sivua ei löytynyt.
          </h1>
          <p className="mx-auto mb-8 max-w-[480px] text-[16px] leading-[1.6] text-site-muted">
            Osoite on saattanut muuttua tai sivu on poistettu.
          </p>
          <Button href="/" variant="primary" size="lg" arrow dataTrack="404_etusivu">
            Takaisin etusivulle
          </Button>
        </Wrap>
      </main>
      <SiteFooter />
    </>
  );
}
