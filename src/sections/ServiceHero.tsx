import type { ReactNode } from 'react';
import type { StaticImageData } from 'next/image';
import ImageComponent from '@/components/ImageComponent';
import PhotoSlot from '@/components/PhotoSlot';
import { CONTACT, CONTENT_UPDATED_FI } from '@/data/site';

interface ServiceHeroProps {
  kicker: string;
  /** Draw the 34px accent hairline before the kicker. */
  kickerRule?: boolean;
  title: string;
  /** Tailwind size classes for the h1 — the two service pages differ. */
  titleClass?: string;
  /** Lede paragraphs. Nodes, so a page can inline a link or a filled value. */
  lede: ReactNode[];
  /** The page's one emphasised sentence, on the accent rule. Optional. */
  pullQuote?: string;
  /** Freshness stamp, last in the column. Defaults to the sitewide date from
   *  TAYDENNA.paivitetty; pass a string to override, or false to omit. */
  stamp?: string | false;
  /** Criminal pages lead with the phone; a civil dispute is not a 3 a.m.
   *  arrest, so that page leads with the form instead. */
  primaryCta?: 'call' | 'contact';
  /** Near-abstract ground, under the scrim. Never through .lighten.
   *  Omit any of these three and a labelled placeholder holds the box. */
  ground?: StaticImageData;
  /** Content photograph beside the type, 4:5. */
  portrait?: StaticImageData;
  portraitAlt: string;
  /** Mobile has no portrait column, so one frame becomes the ground there. */
  mobileGround?: StaticImageData;
  /** A looping clip in the portrait slot instead of a still. Muted and
   *  autoplaying, with the poster shown under prefers-reduced-motion. */
  portraitVideo?: {
    /** WebM first — Chrome and Firefox take it and it is the smaller file;
     *  Safari falls through to the MP4. */
    webm?: string;
    src: string;
    poster: string;
    /** CSS object-position for the 4:5 crop. The still and the clip must
     *  carry the SAME value or the poster jumps when the video starts. */
    position?: string;
  };
  /** Reuse the portrait clip as the mobile ground. Mobile has no portrait
   *  column, so the same footage carries the section there. */
  mobileVideo?: boolean;
  /** Mobile secondary CTA target. Defaults to the contact section. */
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Ground-coloured tint over the portrait, 0–1. Raise it for a brightly
   *  exposed frame so the portraits read at a consistent weight page to page. */
  /** Extra block in the left column, under the lede — /yhteystiedot/ puts its
   *  contact rows here so the phone number is above the fold. */
  details?: React.ReactNode;
  /** Moves the pull quote out of the left column to under the portrait. Used
   *  where the left column is already carrying the contact list. */
  quoteUnderPortrait?: boolean;
  portraitTint?: number;
}

/**
 * Shared hero for the service pages: a near-abstract background photograph
 * under a scrim, with a content portrait beside the type.
 *
 * The two photographs do different jobs and are treated differently — the
 * background sits under the scrim and never goes through `.lighten`, while the
 * portrait sits opaque on top. That distinction is what keeps two images in one
 * hero from fighting each other.
 *
 * The scrim runs at the same 100° as the footer: light comes from the right on
 * every page in this system.
 */
export default function ServiceHero({
  kicker,
  kickerRule = false,
  title,
  titleClass = 'text-[56px] leading-[1.05] max-md:text-[38px] max-md:leading-[1.08]',
  lede,
  pullQuote,
  stamp = `Päivitetty: ${CONTENT_UPDATED_FI}`,
  primaryCta = 'call',
  ground,
  portrait,
  portraitAlt,
  mobileGround,
  portraitVideo,
  mobileVideo = false,
  secondaryHref = '#yhteys',
  secondaryLabel = 'Jätä yhteydenottopyyntö',
  portraitTint = 0.46,
  details,
  quoteUnderPortrait,
}: ServiceHeroProps) {
  return (
    <section
      data-track-section="hero"
      className="relative overflow-hidden border-b border-site-divider"
    >
      {/* Desktop ground. Deliberately barely there: under the scrim it should
          register as depth behind the type, not as a picture competing with it.
          priority — it is this page's LCP image. */}
      <div className="absolute inset-0 max-md:hidden">
        {ground ? (
          <ImageComponent
            src={ground}
            alt=""
            fill
            /* The 0px branch is load-bearing: this <div> is max-md:hidden, but
               display:none does NOT stop a browser fetching the image. Without
               it a phone downloads the 1920px desktop ground on top of the
               mobile one — the wrong bytes on the connection that can least
               afford them. */
            sizes="(max-width: 900px) 0px, 100vw"
            priority
            className="object-cover"
          />
        ) : (
          <PhotoSlot alt="" className="absolute inset-0" />
        )}
      </div>
      {/* Mobile has no portrait column, so a single frame carries the section.
          No .lighten — under a scrim it is a ground, not a content photograph. */}
      <div className="absolute inset-0 hidden max-md:block">
        {portraitVideo && mobileVideo ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portraitVideo.poster}
              alt=""
              style={{ objectPosition: portraitVideo.position ?? 'center' }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={portraitVideo.poster}
              aria-hidden="true"
              style={{ objectPosition: portraitVideo.position ?? 'center' }}
              className="site-motion-only absolute inset-0 h-full w-full object-cover"
            >
              {portraitVideo.webm && (
                <source src={portraitVideo.webm} type="video/webm" />
              )}
              <source src={portraitVideo.src} type="video/mp4" />
            </video>
          </>
        ) : mobileGround ? (
          <ImageComponent
            src={mobileGround}
            alt=""
            fill
            /* Mirror of the desktop ground above. This matters more than it
               looks: when mobileGround is the same file as the portrait, a
               bare 100vw here quietly forces the 1920 variant and the portrait
               inherits it. */
            sizes="(min-width: 901px) 0px, 100vw"
            /* On mobile there is no portrait column and the desktop ground is
               suppressed, so THIS is the hero image and the LCP candidate.
               Without priority it inherits loading="lazy" and the phone waits
               for layout before it even asks for it — the one viewport where
               that round trip costs the most. On desktop the 0px branch above
               means this preload resolves to the smallest variant. */
            priority
            className="object-cover object-center"
          />
        ) : (
          <PhotoSlot alt="" className="absolute inset-0" />
        )}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(22,24,38,0.99)_0%,rgba(22,24,38,0.965)_40%,rgba(22,24,38,0.89)_100%)] max-md:bg-[linear-gradient(to_top,#161826_4%,rgba(22,24,38,0.9)_52%,rgba(22,24,38,0.62)_100%)]"
      />

      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-center gap-[72px] px-[56px] pb-20 pt-[88px] max-md:min-h-[560px] max-md:grid-cols-1 max-md:content-end max-md:gap-8 max-md:px-5 max-md:pb-10 max-md:pt-20">
        <div>
          <span className={kickerRule ? 'flex items-center gap-4' : 'block'}>
            {kickerRule && (
              <span
                aria-hidden="true"
                className="block h-px w-[34px] flex-none bg-site-accent"
              />
            )}
            <span className="text-[11.5px] uppercase tracking-[0.24em] text-site-accent max-md:text-[10px] max-md:tracking-[0.2em]">
              {kicker}
            </span>
          </span>

          <h1
            className={`mt-5 max-w-[26ch] tracking-[-0.025em] max-md:mt-4 ${titleClass}`}
          >
            {title}
          </h1>

          {lede.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'mt-6 max-w-[58ch] text-[18px] leading-[1.7] text-site-neutral-200 max-md:mt-4 max-md:text-[15.5px]'
                  : 'mt-4 max-w-[58ch] text-[16px] leading-[1.7] text-site-neutral-300 max-md:text-[15px]'
              }
            >
              {paragraph}
            </p>
          ))}

          {details}

          {/* The page's one emphasised sentence — it earns the accent rule,
              and nothing else in the hero does. */}
          {pullQuote && !quoteUnderPortrait && (
            <p className="mt-8 max-w-[52ch] border-l border-site-accent-800 pl-7 text-[16.5px] leading-[1.75] text-site-neutral-200 max-md:mt-6 max-md:pl-5 max-md:text-[15.5px]">
              {pullQuote}
            </p>
          )}

          {stamp && (
            <p className="mt-8 text-[11.5px] uppercase tracking-[0.18em] text-site-neutral-500 max-md:mt-6 max-md:text-[10px]">
              {stamp}
            </p>
          )}

          {/* Mobile only: the desktop hero leans on the sticky header CTA. */}
          <div className="mt-7 hidden flex-col gap-3 max-md:flex">
            {primaryCta === 'call' ? (
              <>
                <a
                  href={`tel:${CONTACT.phone}`}
                  data-track-click="hero_paivystys"
                  className="btn btn-primary px-5 py-[15px] text-[15px]"
                >
                  Soita päivystykseen 24/7
                </a>
                <a
                  href={secondaryHref}
                  data-track-click="hero_toissijainen"
                  className="btn btn-secondary px-5 py-[15px] text-[15px]"
                >
                  {secondaryLabel}
                </a>
              </>
            ) : (
              <>
                <a
                  href="#yhteys"
                  data-track-click="hero_yhteydenottopyynto"
                  className="btn btn-primary px-5 py-[15px] text-[15px]"
                >
                  Jätä yhteydenottopyyntö
                </a>
                <a
                  href={`tel:${CONTACT.phone}`}
                  data-track-click="hero_puhelin"
                  className="btn btn-secondary px-5 py-[15px] text-[15px]"
                >
                  Soita {CONTACT.phoneDisplay}
                </a>
              </>
            )}
          </div>
        </div>

        {/* Portrait sits ON TOP of the hero, opaque.
            No .lighten here, on purpose: that rule assumes a near-black
            backdrop, and with the ground photograph visible behind it a lighten
            blend would read as a double exposure of two rooms rather than as a
            photograph on the page. z-10 puts it above the ground and the scrim
            explicitly rather than relying on paint order. */}
        <div className="max-md:hidden">
          <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-site-md shadow-site-sm">
            {portraitVideo ? (
              <>
                {/* The still sits underneath and is what shows when the clip is
                hidden — hiding the <video> alone would hide its poster too. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={portraitVideo.poster}
                  alt={portraitAlt}
                  style={{ objectPosition: portraitVideo.position ?? 'center' }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Muted + playsInline are not optional: iOS refuses to autoplay
                without them. aria-hidden because the <img> above already
                carries the description. */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={portraitVideo.poster}
                  aria-hidden="true"
                  style={{ objectPosition: portraitVideo.position ?? 'center' }}
                  className="site-motion-only absolute inset-0 h-full w-full object-cover"
                >
                  {portraitVideo.webm && (
                    <source src={portraitVideo.webm} type="video/webm" />
                  )}
                  <source src={portraitVideo.src} type="video/mp4" />
                </video>
              </>
            ) : portrait ? (
              <ImageComponent
                src={portrait}
                alt={portraitAlt}
                fill
                /* 1.35fr : 1fr either side of a 72px gap, inside the 1400px
                 container's px-[56px] — the portrait is (1400-112-72)/2.35 =
                 517px once the container caps. "40vw" claimed 691px and cost
                 the same jump to the 1920w variant as the cards did. The 0px
                 branch is what keeps mobile from downloading it at all. */
                sizes="(max-width: 900px) 0px, (max-width: 1400px) calc(42.55vw - 78px), 517px"
                priority
                className="object-cover object-center"
              />
            ) : (
              <PhotoSlot alt={portraitAlt} className="absolute inset-0" />
            )}
            {/* Seats the portrait back into the page. Tinted with the ground
              colour rather than a brightness filter, so it darkens the same way
              every other scrim on the site does instead of going grey. */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: `rgba(22,24,38,${portraitTint})` }}
            />
          </div>

          {pullQuote && quoteUnderPortrait && (
            <p className="mt-7 border-l border-site-accent-800 pl-7 text-[16.5px] leading-[1.75] text-site-neutral-200">
              {pullQuote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
