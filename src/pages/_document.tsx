import { Html, Head, Main, NextScript } from 'next/document';
import { SITE } from '@/data/site';

/**
 * Favicons: the full realfavicongenerator set lives at the root of public/.
 * The paths must stay flat — site.webmanifest references its two icons as
 * /web-app-manifest-*.png, and browsers ask for /favicon.ico at the root
 * whether it is linked or not.
 */
export default function Document() {
  return (
    <Html lang={SITE.lang}>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content={SITE.name} />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content={SITE.themeColor} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
