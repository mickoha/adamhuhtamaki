import React from 'react';

/** Shared typography for the legal pages (tietosuojaseloste). */

export const LegalPage = ({
  title,
  version,
  effective,
  children,
}: {
  title: string;
  version: string;
  effective: string;
  children: React.ReactNode;
}) => (
  <div className="mx-auto max-w-[760px] px-6 py-16">
    <h1 className="text-[clamp(28px,3vw,40px)] leading-[1.1] tracking-[-0.02em] text-site-heading">
      {title}
    </h1>
    <P>
      Versio {version} – voimassa {effective} alkaen
    </P>
    {children}
  </div>
);

export const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-3 mt-8 text-[20px] tracking-[-0.01em] text-site-heading">
    {children}
  </h2>
);

export const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-5 text-[15px] leading-[1.7] text-site-muted">{children}</p>
);

export const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="mb-5 list-disc pl-8 text-[15px] leading-[1.7] text-site-muted">
    {children}
  </ul>
);
