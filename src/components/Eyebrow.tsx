/** Kicker above a section heading: 11.5px, wide tracking, accent.
 *  `as="h1"` lets the front-page hero carry its keyword H1 in the kicker
 *  without changing how it looks — the base h1 weight and leading are reset. */
export default function Eyebrow({
  children,
  className = '',
  as: Tag = 'span',
}: {
  children: string;
  className?: string;
  as?: 'span' | 'h1';
}) {
  return (
    <Tag
      className={`block text-[11.5px] font-normal uppercase leading-[1.55] tracking-[0.24em] text-site-accent max-md:text-[10px] max-md:tracking-[0.2em] ${className}`}
    >
      {children}
    </Tag>
  );
}
