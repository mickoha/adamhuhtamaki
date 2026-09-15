import Link from 'next/link';
import RavenMark from '@/components/RavenMark';
import MembershipMark from '@/components/MembershipMark';
import ImageComponent from '@/components/ImageComponent';
import {
  FOOTER_SERVICES,
  FOOTER_OFFICE,
  FOOTER_LEGAL,
  NavLink,
} from '@/data/nav';
import { SITE, CONTACT, COMPANY, FEATURES } from '@/data/site';
import { openCookieSettings } from '@/utils/consent';
import footer from '@images/footer.jpg';

const slug = (href: string) =>
  href
    .replace(/[^a-z0-9]+/gi, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase() || 'link';

/** List heading — accent, unlike the quiet labels in the contact column. */
function LinkList({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div className="flex flex-col gap-[14px]">
      <h2 className="text-[10.5px] uppercase tracking-[0.2em] text-site-accent">
        {title}
      </h2>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          data-track-click={`footer_${slug(l.href)}`}
          className="text-[14.5px] text-site-neutral-300 transition-colors hover:text-site-text"
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}

/** A quiet neutral label over the value that actually carries the weight. */
function ContactBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-end gap-[6px] max-md:items-start">
      <span className="text-[10.5px] uppercase tracking-[0.2em] text-site-neutral-500">
        {label}
      </span>
      {children}
    </div>
  );
}

/**
 * Global footer — identical on every page.
 *
 * Two columns: identity and navigation on the left, everything a visitor acts
 * on right-aligned against the page's open right edge. `items-center` is
 * deliberate — the shorter right column sits centred against the taller left
 * one, and the right column spans both left-hand rows.
 *
 * The background photograph is NOT wrapped in .lighten: it is a ground under a
 * scrim, not a content photograph. The scrim runs at the same 100° as the
 * hero's, so the two bookend the page with one light direction — dense on the
 * left where the type sits, opening up on the right.
 *
 * On mobile the grid becomes a flex column, so DOM order is the mobile order:
 * brand → Palvelut → Toimisto → contact → membership → legal.
 *
 * The year is generated rather than hard-coded, so January needs a rebuild
 * rather than an edit.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-track-location="footer"
      className="relative overflow-hidden border-t border-site-divider bg-site-neutral-900"
    >
      <ImageComponent
        src={footer}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(22,24,38,0.97)_0%,rgba(22,24,38,0.93)_46%,rgba(22,24,38,0.78)_100%)]"
      />

      {/* pb-26 (104px) on mobile is load-bearing: it keeps the fixed
          "Soita 24/7" pill off the legal text. Never take it below 88px. */}
      <div className="relative mx-auto w-full max-w-[1400px] px-[56px] pb-[30px] pt-[76px] max-md:px-5 max-md:pb-26 max-md:pt-12">
        {/* items-center centres the shorter right column against the taller
            left one in the desktop grid. In the mobile flex column that
            same property would centre every block horizontally, so it is
            reset to items-start there — everything sits flush left. */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-20 gap-y-14 max-md:flex max-md:flex-col max-md:items-start max-md:gap-10">
          {/* Left column, row 1 — brand */}
          <div className="col-start-1 row-start-1">
            <Link
              href="/"
              data-track-click="footer_logo"
              className="inline-flex items-center gap-[14px] text-site-text"
            >
              <RavenMark size={30} />
              <span className="flex flex-col leading-[1.15]">
                <span className="whitespace-nowrap text-[16px] tracking-[0.06em]">
                  ADAM HUHTAMÄKI
                </span>
                <span className="whitespace-nowrap text-[10.5px] uppercase tracking-[0.2em] text-site-neutral-500">
                  Asianajotoimisto
                </span>
              </span>
            </Link>

            <p className="mt-[22px] max-w-[320px] text-[14px] leading-[1.75] text-site-neutral-400 max-md:max-w-none">
              Rikosasioiden puolustus ja pakkokeinoasiat. Päivystys vuorokauden
              ympäri koko Suomessa.
            </p>

            <a
              href={`tel:${CONTACT.phone}`}
              data-track-click="footer_paivystys_cta"
              className="btn btn-primary mt-[26px] px-[18px] py-[10px] text-[13.5px]"
            >
              Soita rikospäivystykseen
            </a>
          </div>

          {/* Left column, row 2 — the two lists, stacked */}
          <div className="col-start-1 row-start-2 flex flex-col gap-[34px]">
            <LinkList title="Palvelut" links={FOOTER_SERVICES} />
            <LinkList title="Toimisto" links={FOOTER_OFFICE} />
          </div>

          {/* Right column — contact and membership, sharing one right edge */}
          <div className="col-start-2 row-start-1 row-span-2 flex flex-col items-end gap-[26px] text-right max-md:w-full max-md:items-start max-md:text-left">
            <ContactBlock label="Päivystys 24/7">
              <a
                href={`tel:${CONTACT.phone}`}
                data-track-click="footer_puhelin"
                className="text-[19px] leading-[1.2] text-site-text transition-colors hover:text-site-accent-300"
              >
                {CONTACT.phoneDisplay}
              </a>
            </ContactBlock>

            <ContactBlock label="Sähköposti">
              <a
                href={`mailto:${CONTACT.email}`}
                data-track-click="footer_sahkoposti"
                className="text-[14.5px] text-site-accent transition-colors hover:text-site-accent-300"
              >
                {CONTACT.email}
              </a>
            </ContactBlock>

            <ContactBlock label="Postiosoite">
              <p className="text-[14.5px] leading-[1.6] text-site-neutral-300">
                {COMPANY.postalAddress}, {COMPANY.postalCode} {COMPANY.city}
              </p>
            </ContactBlock>

            {/* Membership: caption first, mark last, so the mark holds the
                outer right edge. Mobile flips it — mark first, caption beside
                it on one line. */}
            <div className="mt-2 flex items-center justify-end gap-[18px] self-stretch border-t border-site-divider pt-[26px] max-md:flex-row-reverse max-md:justify-end">
              {/* Two lines on desktop, one on mobile — a ch-based max-width
                  cannot land this reliably, so the break is explicit. */}
              <p className="text-[13px] leading-[1.6] text-site-neutral-300">
                Suomen Asianajajaliiton <br className="max-md:hidden" />
                jäsen
              </p>
              <span className="max-md:hidden">
                <MembershipMark size={88} />
              </span>
              <span className="hidden max-md:block">
                <MembershipMark size={72} />
              </span>
            </div>
          </div>
        </div>

        {/* Legal bar. The membership statement is not repeated here — it sits
            with the mark in the right column. */}
        <div className="mt-[60px] flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t border-site-divider pt-[26px] text-[12.5px] text-site-neutral-500 max-md:mt-10 max-md:flex-col max-md:items-start max-md:gap-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>
              © {year} {SITE.legalName} · Y-tunnus {COMPANY.businessId}
            </p>
            {/* Not in the handoff's legal bar, but nothing else links to these
                two pages and a cookie banner has to reach its own policy. */}
            {FOOTER_LEGAL.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-track-click={`footer_${slug(l.href)}`}
                className="transition-colors hover:text-site-text"
              >
                {l.label}
              </Link>
            ))}
            {/* Once answered, the banner never comes back — this is the only
                way back to the settings dialog, so it belongs on every page.
                Hidden while the banner is switched off, since there is then
                no consent flow for it to reopen. */}
            {FEATURES.cookieBanner && (
              <button
                type="button"
                onClick={openCookieSettings}
                data-track-click="footer_evasteasetukset"
                className="transition-colors hover:text-site-text"
              >
                Evästeasetukset
              </button>
            )}
          </div>

          {/* [TÄYDENNÄ: vahvista palvelukielet] */}
          <p>Palvelu suomeksi, ruotsiksi ja englanniksi</p>
        </div>
      </div>
    </footer>
  );
}
