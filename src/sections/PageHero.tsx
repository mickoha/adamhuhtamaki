import { ReactNode } from 'react';
import Wrap from '@/components/Wrap';
import Eyebrow from '@/components/Eyebrow';
import Button from '@/components/Button';

interface Cta {
  label: string;
  href: string;
  dataTrack?: string;
}

interface PageHeroProps {
  eyebrow: string;
  /** H1 — pass JSX to highlight part of it. */
  title: ReactNode;
  /** Answer-first lead: the first two sentences must answer the page's question. */
  lead: string;
  primary?: Cta;
  secondary?: Cta;
  micro?: string;
  /** Visible breadcrumb trail — mirror it with breadcrumbSchema in the page. */
  breadcrumb?: { label: string; href: string }[];
  /** Freshness line, e.g. CONTENT_UPDATED_FI. */
  updated?: string;
}

/** Compact intro band for subpages. */
export default function PageHero({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  micro,
  breadcrumb,
  updated,
}: PageHeroProps) {
  return (
    <section
      data-track-section="hero"
      className="relative overflow-hidden border-b border-site-line bg-[linear-gradient(180deg,#FFFFFF_0%,var(--color-site-canvas)_100%)] py-[72px] max-md:py-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(700px 360px at 85% 6%, rgba(15,157,223,0.10), transparent 60%)',
        }}
      />
      <Wrap className="relative max-w-[760px]">
        {breadcrumb && (
          <nav
            aria-label="Murupolku"
            className="mb-3 flex flex-wrap items-center gap-[6px] text-[12px] text-site-subtle"
          >
            {breadcrumb.map((c, i) => (
              <span key={c.href} className="inline-flex items-center gap-[6px]">
                {i > 0 && <span aria-hidden>/</span>}
                <a href={c.href} className="transition-colors hover:text-site-accent">
                  {c.label}
                </a>
              </span>
            ))}
          </nav>
        )}
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="my-[16px] text-[clamp(32px,4.2vw,50px)] font-bold leading-[1.1] tracking-[-0.02em] text-site-heading">
          {title}
        </h1>
        <p className="max-w-[620px] text-[17px] leading-[1.6] text-site-muted">{lead}</p>
        {updated && (
          <p className="mt-4 text-[12px] text-site-subtle">{`Päivitetty ${updated}`}</p>
        )}
        {(primary || secondary) && (
          <div className="mt-8 flex flex-wrap items-center gap-[10px]">
            {primary && (
              <Button href={primary.href} variant="primary" size="lg" arrow dataTrack={primary.dataTrack}>
                {primary.label}
              </Button>
            )}
            {secondary && (
              <Button href={secondary.href} variant="ghost" size="lg" dataTrack={secondary.dataTrack}>
                {secondary.label}
              </Button>
            )}
            {micro && <span className="ml-[6px] text-[12px] text-site-subtle">{micro}</span>}
          </div>
        )}
      </Wrap>
    </section>
  );
}
