import { ReactNode } from 'react';

interface PhotoSlotProps {
  /** Described for the client — also becomes the alt text once a photo lands. */
  alt: string;
  className?: string;
  /** Rounded corners are the card's job in some slots, the slot's in others. */
  rounded?: boolean;
  children?: ReactNode;
}

/**
 * A photography position that has no photograph yet.
 *
 * The design uses five: hero, two audience cards, the portrait and the UKK
 * band. Real frames must be shot dark or on black — every one of them is
 * composited with `mix-blend-mode: lighten` (.lighten), so a light background
 * washes the section out.
 *
 * To fill a slot: drop the file in src/images (see the README there for the
 * five filenames and sizes this site expects), then replace <PhotoSlot> with
 *
 *   import ukk from '@images/ukk.jpg';
 *   <ImageComponent src={ukk} alt="…" fill sizes="100vw" />
 *
 * keeping the surrounding `<div className="lighten">` wrapper.
 * [TÄYDENNÄ: valokuvat asiakkaalta]
 */
export default function PhotoSlot({
  alt,
  className = '',
  rounded,
  children,
}: PhotoSlotProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden bg-[radial-gradient(120%_120%_at_20%_0%,#2b2f4a_0%,#1b1d2c_55%,#161826_100%)] ${
        rounded ? 'rounded-site-lg' : ''
      } ${className}`}
    >
      {/* A faint grid so an empty slot reads as "photo goes here", not as a bug. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(145,132,217,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(145,132,217,0.10)_1px,transparent_1px)] [background-size:44px_44px]"
      />
      <span className="pointer-events-none absolute bottom-3 left-4 right-4 text-[10.5px] uppercase leading-[1.5] tracking-[0.18em] text-site-neutral-600">
        Kuvapaikka
      </span>
      {children}
    </div>
  );
}
