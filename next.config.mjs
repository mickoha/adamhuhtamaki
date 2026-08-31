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

  // next-image-export-optimizer replaces the Next image server: images under
  // public/images are pre-converted to WebP at build time and served by the
  // custom loader below.
  images: {
    loader: 'custom',
    imageSizes: [10, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 1080, 1920],
  },
  transpilePackages: ['next-image-export-optimizer'],

  env: {
    nextImageExportOptimizer_imageFolderPath: 'public/images',
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
