const fs = require('fs');
const path = require('path');

/**
 * Single source of truth: SITE.url in src/data/site.ts. next-sitemap runs in
 * plain node and cannot import the TS module, so the value is read out of it.
 * That is still better than a second copy in an env var, which drifts in
 * silence — it did: the sitemap and robots.txt shipped example.fi while every
 * canonical on the site said adamhuhtamaki.fi.
 */
const siteUrl = (() => {
  const src = fs.readFileSync(
    path.join(__dirname, 'src', 'data', 'site.ts'),
    'utf8',
  );
  const match = src.match(/^\s*url:\s*'(https?:\/\/[^']+)',/m);
  if (!match) {
    throw new Error(
      'next-sitemap: could not read SITE.url from src/data/site.ts',
    );
  }
  return match[1];
})();

/** @type {import('next-sitemap').IConfig} */
// Runs as `postbuild`, i.e. after `next build` has written out/.
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  /**
   * AI crawlers, named explicitly. `User-agent: *` already allows them, but an
   * explicit Allow is the only way to state the intent — otherwise the first
   * person to add a blanket Disallow silently removes the site from AI answers,
   * which is half of what this site is optimised for.
   *
   * GPTBot trains; OAI-SearchBot is the one that actually fetches pages for
   * ChatGPT's cited answers, so allowing GPTBot alone would not get the site
   * quoted. Google-Extended is not a crawler at all — it is the token that
   * decides whether Google may use the content to ground Gemini and AI
   * Overviews.
   */
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
  },
  // Write straight into the export folder — generating into public/ would
  // leave out/ one build behind.
  outDir: 'out',
  // Thin/legal pages that should not compete in search.
  exclude: ['/evastekaytannot', '/tietosuojaseloste'],
  // If a page is missing from sitemap.xml after a build, add it here:
  // additionalPaths: async (config) => [await config.transform(config, '/some-page')],
};
