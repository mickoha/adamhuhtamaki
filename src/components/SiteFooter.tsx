import Link from 'next/link';
import Wrap from '@/components/Wrap';
import { FOOTER_MAIN, FOOTER_LEGAL, NavLink } from '@/data/nav';
import { SITE, CONTACT, COMPANY } from '@/data/site';

const slug = (href: string) =>
  href.replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '').toLowerCase() || 'link';

function FooterCol({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-site-subtle">
        {title}
      </h2>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          data-track-click={`footer_${slug(l.href)}`}
          className="mb-[7px] block text-[12.5px] text-site-body transition-colors hover:text-site-accent"
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer
      data-track-location="footer"
      className="border-t border-site-line bg-white pb-8 pt-10"
    >
      <Wrap>
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="max-w-[300px]">
            <Link href="/" className="inline-flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SITE.logo}
                alt={SITE.name}
                width={400}
                height={69}
                loading="lazy"
                className="h-[26px] w-auto"
              />
            </Link>
            <p className="mt-3 text-[12.5px] leading-[1.6] text-site-subtle">
              {SITE.tagline}
            </p>
          </div>
          <div className="flex gap-14 max-sm:gap-10">
            <FooterCol title="Sivut" links={FOOTER_MAIN} />
            <FooterCol title="Juridiikka" links={FOOTER_LEGAL} />
            <div>
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-site-subtle">
                Yhteystiedot
              </h2>
              <a
                href={`tel:${CONTACT.phone}`}
                data-track-click="footer_puhelin"
                className="mb-[7px] block text-[12.5px] text-site-body transition-colors hover:text-site-accent"
              >
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                data-track-click="footer_sahkoposti"
                className="mb-[7px] block text-[12.5px] text-site-body transition-colors hover:text-site-accent"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-between gap-[14px] border-t border-site-line pt-5 text-[12px] text-site-subtle">
          <div>
            © {COMPANY.founded} {SITE.legalName} · {COMPANY.city},{' '}
            {COMPANY.countryName}
          </div>
          <div>Y-tunnus {COMPANY.businessId}</div>
        </div>
      </Wrap>
    </footer>
  );
}
