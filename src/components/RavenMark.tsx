/** The logo's own proportions — 994 × 834, so it is wider than it is tall. */
const RATIO = 994 / 834;

/**
 * The raven mark, from the client's supplied SVG at public/raven.svg.
 *
 * Painted as a CSS mask over `currentColor` rather than inlined or dropped in
 * an <img>. Two reasons:
 *   - the handoff requires the mark be currentColor-driven so it works on both
 *     the transparent and the tinted header, and an <img> cannot inherit color
 *     (currentColor inside an external SVG resolves against that file, not the
 *     page);
 *   - the path data is ~20 kB, so inlining it would repeat that in every page's
 *     HTML twice over (header and footer). As a mask it is one cached file.
 *
 * `size` is the HEIGHT; the width follows from the logo's own ratio, so the
 * lockup's vertical rhythm stays put whatever the artwork's proportions are.
 */
export default function RavenMark({ size = 30 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{ height: size, width: Math.round(size * RATIO) }}
      className="block flex-none bg-current [-webkit-mask-image:url(/raven.svg)] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain] [mask-image:url(/raven.svg)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
    />
  );
}
