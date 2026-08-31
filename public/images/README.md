Put source images here — this is the folder next-image-export-optimizer scans
(`nextImageExportOptimizer_imageFolderPath` in next.config.mjs). At build time
each file is converted to WebP in several widths under
`out/images/nextImageExportOptimizer/`.

Use them through `<ImageComponent>`, importing the file by relative path so
Next knows its intrinsic dimensions:

```tsx
import hero from '../../public/images/hero.jpg';
import ImageComponent from '@/components/ImageComponent';

<ImageComponent src={hero} alt="…" width={960} height={540} priority />
```

Anything placed elsewhere in `public/` is served as-is, unoptimized — the right
choice for logos, favicons and SVGs, the wrong one for photos.

The build writes `next-image-export-optimizer-hashes.json` next to this file;
it is generated output and gitignored.
