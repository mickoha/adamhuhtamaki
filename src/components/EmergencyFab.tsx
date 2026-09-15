import { CONTACT } from '@/data/site';

/**
 * The floating päivystys pill — the one CTA that follows the visitor down the
 * whole page. It sits bottom-right on every view; the cookie banner is placed
 * above it so the two never overlap.
 */
export default function EmergencyFab() {
  return (
    <a
      href={`tel:${CONTACT.phone}`}
      data-track-location="fab"
      data-track-click="fab_paivystys"
      className="fixed bottom-[26px] right-[26px] z-[60] inline-flex items-center gap-3 rounded-site-pill border border-site-accent bg-site-accent-900 py-[15px] pl-[18px] pr-[22px] text-site-accent-100 shadow-[0_12px_34px_rgba(0,0,0,0.6)] transition-colors hover:bg-site-accent-800 max-md:bottom-4 max-md:right-4 max-md:gap-[10px] max-md:px-4 max-md:py-[14px]"
    >
      <span className="site-pulse block h-[10px] w-[10px] flex-none rounded-full bg-site-accent-300" />
      <span className="flex flex-col leading-[1.2]">
        <span className="text-[10px] uppercase tracking-[0.18em] text-site-accent-400 max-md:hidden">
          Rikospäivystys
        </span>
        <span className="text-[15px] whitespace-nowrap">Soita 24/7</span>
      </span>
    </a>
  );
}
