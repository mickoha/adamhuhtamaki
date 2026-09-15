import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import RavenMark from '@/components/RavenMark';
import {
  NAV_LINKS,
  NAV_MORE,
  NAV_CONTACT,
  DRAWER_LINKS,
  NavLink,
} from '@/data/nav';
import { CONTACT } from '@/data/site';

/** Stable ASCII analytics slug from a link href (labels are Finnish). */
const linkSlug = (href: string) =>
  href
    .replace(/[^a-z0-9]+/gi, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase() || 'link';

function Chevron() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-[180ms]"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-none text-site-accent"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Two-line wordmark. Neither line may ever wrap. */
function Wordmark({ compact }: { compact?: boolean }) {
  return (
    <span className="flex flex-none flex-col leading-[1.15]">
      <span
        className={`whitespace-nowrap tracking-[0.06em] ${
          compact ? 'text-[13.5px]' : 'text-[17px]'
        }`}
      >
        ADAM HUHTAMÄKI
      </span>
      <span
        className={`whitespace-nowrap text-site-neutral-500 ${
          compact
            ? 'text-[8.5px] tracking-[0.22em]'
            : 'text-[10.5px] tracking-[0.22em]'
        }`}
      >
        ASIANAJOTOIMISTO
      </span>
    </span>
  );
}

function DropdownRow({
  link,
  onClick,
}: {
  link: NavLink;
  onClick: () => void;
}) {
  return (
    <Link
      href={link.href}
      onClick={onClick}
      data-track-click={`nav_${linkSlug(link.href)}`}
      className="block rounded-site-sm px-[14px] py-3 transition-colors hover:bg-site-accent-900"
    >
      <span className="block text-[14.5px] text-site-neutral-200">
        {link.label}
      </span>
      <span className="mt-[2px] block text-[12px] text-site-neutral-500">
        {link.description}
      </span>
    </Link>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement | null>(null);

  /**
   * Scroll-reactive header: transparent over the hero image, tinted and
   * hairlined once the page moves. The listener is passive and only calls
   * setState when the boolean actually flips, so no debounce is needed.
   */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /** The prototype leaves these open; production closes them. */
  useEffect(() => {
    if (!moreOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [moreOpen]);

  const navLinkCls =
    'whitespace-nowrap text-[14px] text-site-neutral-300 transition-colors hover:text-site-accent';

  return (
    <header
      data-track-location="nav"
      className={`sticky top-0 z-40 px-[56px] py-[18px] transition-[background-color,border-color,backdrop-filter] duration-[220ms] max-md:px-5 max-md:py-[14px] ${
        scrolled
          ? 'border-b border-site-divider bg-[rgba(22,24,38,0.86)] backdrop-blur-[14px]'
          : 'border-b border-transparent bg-[rgba(22,24,38,0.28)] backdrop-blur-[4px]'
      } max-md:border-b max-md:border-site-divider max-md:bg-[rgba(22,24,38,0.9)] max-md:backdrop-blur-[14px]`}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-8 max-md:gap-4">
        <Link
          href="/"
          data-track-click="nav_logo"
          className="mr-auto flex flex-none items-center gap-[14px] text-site-text max-md:gap-[10px]"
        >
          <span className="max-md:hidden">
            <RavenMark size={30} />
          </span>
          <span className="hidden max-md:block">
            <RavenMark size={26} />
          </span>
          <span className="max-md:hidden">
            <Wordmark />
          </span>
          <span className="hidden max-md:block">
            <Wordmark compact />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="flex items-center gap-6 max-md:hidden">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-track-click={`nav_${linkSlug(l.href)}`}
              className={navLinkCls}
            >
              {l.label}
            </Link>
          ))}

          <div className="relative" ref={moreRef}>
            <button
              type="button"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((v) => !v)}
              className={`inline-flex items-center gap-[7px] ${navLinkCls} ${
                moreOpen ? 'text-site-accent' : ''
              }`}
            >
              Muut palvelut
              <span className={moreOpen ? 'rotate-180' : ''}>
                <Chevron />
              </span>
            </button>
            {moreOpen && (
              <div className="site-pop absolute left-[-16px] top-[34px] w-[330px] rounded-site-md border border-site-divider bg-site-surface p-3 shadow-site-lg">
                {NAV_MORE.map((l) => (
                  <DropdownRow
                    key={l.href}
                    link={l}
                    onClick={() => setMoreOpen(false)}
                  />
                ))}
              </div>
            )}
          </div>

          <Link
            href={NAV_CONTACT.href}
            data-track-click="nav_yhteystiedot"
            className={navLinkCls}
          >
            {NAV_CONTACT.label}
          </Link>
        </nav>

        {/* Desktop päivystys CTA — tel: is auto-tracked as phone_click. */}
        <a
          href={`tel:${CONTACT.phone}`}
          data-track-click="nav_paivystys"
          className="btn btn-primary flex-none px-[16px] py-[9px] text-[13.5px] max-md:hidden"
        >
          Rikospäivystys 24/7
        </a>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={drawerOpen ? 'Sulje valikko' : 'Avaa valikko'}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((v) => !v)}
          className={`hidden h-11 w-11 flex-none items-center justify-center rounded-site-md border transition-colors max-md:inline-flex ${
            drawerOpen
              ? 'border-site-accent text-site-accent'
              : 'border-site-divider text-site-text'
          }`}
        >
          <span className="relative block h-5 w-5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className={`absolute inset-0 transition-all duration-[260ms] ${
                drawerOpen ? 'rotate-90 scale-[0.8] opacity-0' : 'opacity-100'
              }`}
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className={`absolute inset-0 transition-all duration-[180ms] ${
                drawerOpen ? 'opacity-100' : '-rotate-90 scale-[0.8] opacity-0'
              }`}
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </span>
        </button>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div
            data-track-location="drawer"
            className="site-drawer absolute left-0 right-0 top-full z-[60] hidden bg-[rgba(22,24,38,0.97)] shadow-[0_24px_60px_rgba(0,0,0,0.7)] backdrop-blur-[18px] max-md:block"
          >
            {DRAWER_LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setDrawerOpen(false)}
                data-track-click={`drawer_${linkSlug(l.href)}`}
                style={{ animationDelay: `${40 * (i + 1)}ms` }}
                className="site-drawer-row flex items-center justify-between gap-4 border-b border-site-divider px-[22px] py-5"
              >
                <span>
                  <span className="block text-[20px] leading-[1.15]">
                    {l.label}
                  </span>
                  <span className="mt-1 block text-[12.5px] text-site-neutral-500">
                    {l.description}
                  </span>
                </span>
                <ArrowRight />
              </Link>
            ))}

            <div className="px-[22px] py-6">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-site-neutral-500">
                Rikospäivystys 24/7
              </span>
              <a
                href={`tel:${CONTACT.phone}`}
                onClick={() => setDrawerOpen(false)}
                data-track-click="drawer_paivystys_numero"
                className="mt-2 block text-[24px] text-site-text transition-colors hover:text-site-accent-300"
              >
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={`tel:${CONTACT.phone}`}
                onClick={() => setDrawerOpen(false)}
                data-track-click="drawer_paivystys_cta"
                className="btn btn-primary mt-4 w-full px-[20px] py-[13px] text-[15px]"
              >
                Soita päivystykseen
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
