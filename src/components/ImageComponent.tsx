import React from 'react';
import ExportedImage from 'next-image-export-optimizer';
import { StaticImageData } from 'next/image';

interface ImageComponentProps {
  /** Import the file from public/images (import hero from
   *  '../../public/images/hero.jpg') so Next gets its intrinsic size; the
   *  optimizer converts it to WebP at build time. */
  src: StaticImageData;
  alt: string;
  style?: React.CSSProperties;
  width?: number | `${number}`;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  /** Set on the LCP image only (usually one per page). */
  priority?: boolean;
}

/**
 * Optimized image for a static export. Source files must live under
 * public/images (see nextImageExportOptimizer_imageFolderPath) — anything
 * elsewhere is served unoptimized.
 */
const ImageComponent = ({
  src,
  alt,
  style,
  width,
  height,
  fill,
  className,
  sizes,
  priority = false,
}: ImageComponentProps) => (
  <ExportedImage
    src={src}
    alt={alt}
    style={style}
    width={width}
    height={height}
    fill={fill}
    className={className}
    sizes={sizes}
    priority={priority}
    placeholder="empty"
  />
);

export default ImageComponent;
