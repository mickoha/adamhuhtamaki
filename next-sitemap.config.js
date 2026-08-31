/** @type {import('next-sitemap').IConfig} */
// Runs as `postbuild`, i.e. after `next build` has written out/.
module.exports = {
  // Override per site with SITE_URL in .env.local (must match SITE.url).
  siteUrl: process.env.SITE_URL || 'https://example.fi',
  generateRobotsTxt: true,
  // Write straight into the export folder — generating into public/ would
  // leave out/ one build behind.
  outDir: 'out',
  // Thin/legal pages that should not compete in search.
  exclude: ['/evastekaytannot', '/tietosuojaseloste'],
  // If a page is missing from sitemap.xml after a build, add it here:
  // additionalPaths: async (config) => [await config.transform(config, '/some-page')],
};
