import SEO from '@/components/SEO';
import { SITE_URL } from '@/data/schema';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import EmergencyFab from '@/components/EmergencyFab';
import Button from '@/components/Button';
import Wrap from '@/components/Wrap';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Sivua ei löytynyt – Asianajotoimisto Adam Huhtamäki"
        description="Etsimääsi sivua ei löytynyt."
        url={`${SITE_URL}/404/`}
      />
      <Nav />
      <main>
        <Wrap className="pb-28 pt-32 max-md:py-16">
          <p className="text-[11.5px] uppercase tracking-[0.24em] text-site-accent">
            404
          </p>
          <h1 className="mb-5 mt-4 max-w-[16ch] text-[52px] leading-[1.05] tracking-[-0.025em] max-md:text-[32px]">
            Sivua ei löytynyt.
          </h1>
          <p className="mb-8 max-w-[52ch] text-[18px] leading-[1.65] text-site-neutral-300 max-md:text-[15.5px]">
            Osoite on saattanut muuttua tai sivu on poistettu.
          </p>
          <Button
            href="/"
            variant="primary"
            size="lg"
            arrow
            dataTrack="404_etusivu"
          >
            Takaisin etusivulle
          </Button>
        </Wrap>
      </main>
      <SiteFooter />
      <EmergencyFab />
    </>
  );
}
