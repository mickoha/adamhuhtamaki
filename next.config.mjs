import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this folder — without it Next picks up a
  // lockfile from a parent directory when several sites live side by side.
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),

  // Fully static site: `next build` writes plain HTML to out/.
  // No getServerSideProps, no API routes, no dynamic routes, no middleware.
  output: 'export',
  reactStrictMode: true,
  // Every URL ends in a slash (/about/). The SEO component and the schema
  // helpers assume this — keep them in sync if you turn it off.
  trailingSlash: true,

  // next-image-export-optimizer replaces the Next image server. Photographs
  // live in src/images and are pulled in with a static import (@images/*);
  // the optimizer always scans .next/static/media for those, so it converts
  // them to WebP at build time without them ever sitting in public/.
  // imageFolderPath below therefore points at public/ itself, which holds no
  // photographs — it only has to be a path under public/ or the optimizer
  // prints a warning and skips its folder scan.
  images: {
    loader: 'custom',
    imageSizes: [10, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 1080, 1920],
  },
  transpilePackages: ['next-image-export-optimizer'],

  env: {
    nextImageExportOptimizer_imageFolderPath: 'public',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '75',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',
    // Blur placeholders cost an extra tiny image per source file. Off by
    // default — pass placeholder="empty" to <ExportedImage> when off.
    nextImageExportOptimizer_generateAndUseBlurImages: 'false',
    nextImageExportOptimizer_remoteImageCacheTTL: '0',
  },
};

export default nextConfig;
