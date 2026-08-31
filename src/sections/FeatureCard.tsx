import { ReactNode } from 'react';
import type { Feature, FeatureIcon } from '@/data/features';

/** Inline stroke icons — no icon library, no extra request. */
const ICONS: Record<FeatureIcon, ReactNode> = {
  spark: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M7.8 7.8l2.4 2.4M13.8 13.8l2.4 2.4M16.2 7.8l-2.4 2.4M10.2 13.8l-2.4 2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4-3 7.5-7 9-4-1.5-7-5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
};

export default function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="rounded-site-lg border border-site-line bg-white p-[28px] transition-all duration-200 hover:-translate-y-[2px] hover:border-site-accent hover:shadow-site-pop">
      <div className="mb-[18px] grid h-[42px] w-[42px] place-items-center rounded-site-lg bg-site-accent-soft text-site-accent">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          {ICONS[feature.icon]}
        </svg>
      </div>
      <h3 className="mb-[8px] text-[17px] font-semibold tracking-[-0.01em] text-site-primary">
        {feature.title}
      </h3>
      <p className="text-[13px] leading-[1.6] text-site-muted">
        {feature.description}
      </p>
      <ul className="mt-[16px] flex flex-col gap-[7px] border-t border-site-divider pt-[14px]">
        {feature.bullets.map((b) => (
          <li key={b} className="flex items-start gap-[8px] text-[12.5px] text-site-muted">
            <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-site-accent" />
            {b}
          </li>
        ))}
      </ul>
      {feature.href && (
        <a
          href={feature.href}
          data-track-click={`feature_${feature.icon}`}
          className="group mt-[18px] inline-flex items-center gap-[6px] text-[12.5px] font-semibold text-site-accent"
        >
          {feature.linkLabel ?? 'Lue lisää'}
          <span className="transition-transform duration-150 group-hover:translate-x-[2px]">
            →
          </span>
        </a>
      )}
    </div>
  );
}
