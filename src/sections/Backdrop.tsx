import { ReactNode } from 'react';

/**
 * The decorative layer behind Erikoisalat + Hinnasto: two soft glows and three
 * hairline sweeps that start high on the right and descend to the left. The
 * sweep deliberately traces the reading path of the content above it, so this
 * wraps both sections rather than sitting inside either one.
 */
export default function Backdrop({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -top-10 -z-10 overflow-hidden opacity-[0.65]"
      >
        <div className="absolute left-[-14%] top-[6%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(145,132,217,0.16)_0%,rgba(145,132,217,0)_68%)] max-md:h-[340px] max-md:w-[340px]" />
        <div className="absolute bottom-[4%] right-[-10%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(53,59,128,0.28)_0%,rgba(53,59,128,0)_70%)] max-md:h-[380px] max-md:w-[380px]" />

        <svg
          viewBox="0 0 1400 1200"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full max-md:hidden"
        >
          <defs>
            <linearGradient id="ah-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(145,132,217,0)" />
              <stop offset="45%" stopColor="rgba(145,132,217,0.34)" />
              <stop offset="100%" stopColor="rgba(145,132,217,0)" />
            </linearGradient>
          </defs>
          <path
            d="M1470 70 C 1160 78 920 120 700 250 C 470 385 300 640 -340 1000"
            fill="none"
            stroke="url(#ah-line)"
            strokeWidth="1.25"
          />
          <path
            d="M1470 150 C 1140 158 880 205 640 350 C 420 485 260 760 -340 1120"
            fill="none"
            stroke="url(#ah-line)"
            strokeWidth="1"
          />
          <path
            d="M1470 20 C 1190 26 990 55 790 165 C 560 290 380 540 -340 880"
            fill="none"
            stroke="url(#ah-line)"
            strokeWidth="0.75"
          />
        </svg>

        <svg
          viewBox="0 0 390 900"
          preserveAspectRatio="none"
          className="absolute inset-0 hidden h-full w-full max-md:block"
        >
          <defs>
            <linearGradient id="ah-line-m" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(145,132,217,0)" />
              <stop offset="45%" stopColor="rgba(145,132,217,0.3)" />
              <stop offset="100%" stopColor="rgba(145,132,217,0)" />
            </linearGradient>
          </defs>
          <path
            d="M420 40 C 330 60 270 130 210 260 C 150 400 90 620 -60 800"
            fill="none"
            stroke="url(#ah-line-m)"
            strokeWidth="1"
          />
          <path
            d="M420 130 C 320 150 250 220 190 350 C 130 490 70 700 -60 890"
            fill="none"
            stroke="url(#ah-line-m)"
            strokeWidth="0.75"
          />
        </svg>
      </div>
      {children}
    </div>
  );
}
