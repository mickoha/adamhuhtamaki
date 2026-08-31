import { Html, Head, Main, NextScript } from 'next/document';
import { SITE } from '@/data/site';

/**
 * Favicons: public/favicon.svg is a placeholder. Generate the full set at
 * realfavicongenerator.net, drop the files into public/ with the names below,
 * and uncomment the three PNG/ICO links — a link to a file that does not exist
 * is a 404 on every page load.
 */
export default function Document() {
  return (
    <Html lang={SITE.lang}>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {/* <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" /> */}
        {/* <link rel="shortcut icon" href="/favicon.ico" /> */}
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" /> */}
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
