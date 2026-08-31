import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import { NAV_LINKS } from '@/data/nav';
import { SITE, CONTACT } from '@/data/site';

/** Stable ASCII analytics slug from a link href (labels may be Finnish). */
const linkSlug = (href: string) =>
  href.replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '').toLowerCase() || 'link';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-track-location="nav"
      className="sticky top-0 z-50 flex h-[56px] items-center border-b border-white/[0.06] bg-site-primary"
    >
      <div className="mx-auto flex h-full w-full max-w-[1240px] items-center px-6">
        <Link href="/" data-track-click="nav_logo" className="mr-10 flex items-center">
          {/* Plain <img>: the logo is a fixed-size asset in public/, so the
              image optimizer would add work without adding value. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SITE.logoOnDark}
            alt={SITE.name}
            width={400}
            height={69}
            className="h-[20px] w-auto"
          />
        </Link>

        {/* Desktop links */}
        <nav className="flex h-full flex-1 items-stretch gap-[2px] max-md:hidden">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-track-click={`nav_${linkSlug(l.href)}`}
              className="inline-flex items-center border-b-2 border-transparent px-[14px] text-[13.5px] font-medium text-white/[0.72] transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs — tel: is auto-tracked as phone_click. */}
        <div className="ml-auto flex items-center gap-[10px] max-md:hidden">
          <a
            href={`tel:${CONTACT.phone}`}
            data-track-click="nav_puhelin"
            className="px-[6px] text-[13.5px] font-medium text-white/[0.72] transition-colors hover:text-white max-lg:hidden"
          >
            {CONTACT.phoneDisplay}
          </a>
          <Button href="/#yhteys" variant="primary" arrow dataTrack="nav_cta">
            Ota yhteyttä
          </Button>
        </div>

        {/* Hamburger (≤980px) */}
        <button
          type="button"
          aria-label="Valikko"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto hidden h-9 w-9 flex-col items-center justify-center gap-[5px] max-md:flex"
        >
          <span
            className={`block h-[2px] w-[18px] bg-white transition-transform ${
              open ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-[18px] bg-white transition-opacity ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-[18px] bg-white transition-transform ${
              open ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div
          data-track-location="drawer"
          className="absolute left-0 right-0 top-[56px] hidden border-b border-white/[0.06] bg-site-primary px-6 py-4 max-md:block"
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                data-track-click={`drawer_${linkSlug(l.href)}`}
                className="rounded-site py-2 text-[14px] font-medium text-white/[0.72] transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-wrap items-center gap-[10px]">
            <a
              href={`tel:${CONTACT.phone}`}
              onClick={() => setOpen(false)}
              data-track-click="drawer_puhelin"
              className="rounded-site py-2 text-[14px] font-semibold text-white transition-colors hover:text-site-accent"
            >
              Soita {CONTACT.phoneDisplay}
            </a>
            <Button
              href="/#yhteys"
              variant="primary"
              arrow
              onClick={() => setOpen(false)}
              dataTrack="drawer_cta"
            >
              Ota yhteyttä
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
