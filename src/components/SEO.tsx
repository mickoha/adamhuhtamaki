import Head from 'next/head';
import { SITE } from '@/data/site';

/**
 * Origin the share image is fetched from. Defaults to SITE.url, like every other
 * absolute URL on the site. The one exception is a test deploy: scrapers
 * (WhatsApp, Facebook, LinkedIn) fetch og:image from whatever host it names, and
 * the production host does not have the file until launch — so a test build is
 * run with the override set on the command line:
 *
 *   NEXT_PUBLIC_OG_IMAGE_ORIGIN=https://test.adamhuhtamaki.fi npm run build
 *
 * NEXT_PUBLIC_ so the server-rendered HTML and the hydrated <Head> agree. Never
 * put it in .env.local: a plain `npm run build` must always produce the
 * production value, or the test host would leak into launch.
 */
const OG_IMAGE_ORIGIN = process.env.NEXT_PUBLIC_OG_IMAGE_ORIGIN || SITE.url;

type SEOProps = {
  /** ~55–60 chars. Put the keyword first, brand last. */
  title: string;
  /** ~150–160 chars. Answer-first; this is the snippet, not a slogan. */
  description: string;
  /** Absolute URL of this page, e.g. `${SITE_URL}/palvelut`. */
  url: string;
  /** Absolute URL of the share image (1200×630). Defaults to SITE.ogImage. */
  image?: string;
  keywords?: string;
  imageAlt?: string;
  /** JSON-LD blocks — pass <JsonLd data={…} /> children. */
  children?: React.ReactNode;
};

export default function SEO({
  title,
  description,
  url,
  image = `${OG_IMAGE_ORIGIN}${SITE.ogImage}`,
  keywords,
  imageAlt = SITE.ogImageAlt,
  children,
}: SEOProps) {
  // The site is exported with trailingSlash: true, so the non-slash variant is
  // a 301 — a canonical pointing at it makes Google chase a redirect.
  const canonicalUrl = url.endsWith('/') ? url : `${url}/`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      <link rel="canonical" href={canonicalUrl} />

      {/* OpenGraph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />
      <meta name="twitter:url" content={canonicalUrl} />

      {children}
    </Head>
  );
}
