/**
 * Suomen Asianajajaliitto's yhteisömerkki — a certification mark, not a brand
 * element of this site.
 *
 * Served straight from public/ as a plain <img>, deliberately NOT through
 * ImageComponent: the optimizer would re-encode it to lossy WebP, and this is
 * a certification mark whose wordmark must not acquire artifacts.
 *
 * The file IS optimized, losslessly: the client's 500x500 original was 27 kB
 * and shipped on every page to be drawn at 88. It is now 176x176 (DPR 2 of
 * that 88) with a 16-colour palette — the mark is two flat colours plus
 * anti-aliasing, so nothing is lost and the supplied blue rgb(8,88,152) is
 * byte-identical. 27 kB -> 5.4 kB. The original is kept at
 * .claude/design/logot/asianajajaliitto-original-500.png.
 *
 * Do NOT scale this above 88px without re-exporting from that original.
 *
 * The handoff's rules for the mark, which this markup must not break:
 *   - never recolored, tinted, outlined, cropped or rotated, and never wrapped
 *     in .lighten — it stays the supplied blue on the dark ground, and that
 *     color break is intentional;
 *   - clear space of at least its own cap-height on every side (the 18px gap
 *     and the 26px rule offset satisfy this at 88px);
 *   - never scaled below 64px wide, or the wordmark inside stops being legible;
 *   - only the current official file, and only while the membership holds.
 *
 * [TÄYDENNÄ: vaihda vektoriversioon (SVG/EPS), kun asiakas toimittaa sen]
 */
export default function MembershipMark({ size = 88 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/asianajajaliitto.png"
      alt="Suomen Asianajajaliitto"
      width={size}
      height={size}
      loading="lazy"
      className="flex-none"
    />
  );
}
