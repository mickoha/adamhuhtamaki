/** Kicker above a section heading: 11.5px, wide tracking, accent. */
export default function Eyebrow({
  children,
  className = '',
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={`block text-[11.5px] uppercase tracking-[0.24em] text-site-accent max-md:text-[10px] max-md:tracking-[0.2em] ${className}`}
    >
      {children}
    </span>
  );
}
