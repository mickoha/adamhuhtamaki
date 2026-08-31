export default function Eyebrow({ children }: { children: string }) {
  return (
    <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-site-accent">
      {children}
    </span>
  );
}
