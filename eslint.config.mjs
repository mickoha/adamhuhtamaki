import next from 'eslint-config-next/core-web-vitals';

const config = [
  ...next,
  { ignores: ['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts'] },
  {
    rules: {
      /**
       * react-hooks v7 flags any setState in an effect body. Three places here
       * do it deliberately and cannot do otherwise: cookies are client-only, so
       * consent state MUST be read after mount or the first client render will
       * not match the statically exported HTML (hydration mismatch). Same for
       * the reduced-motion / no-IntersectionObserver fallbacks in useInView.
       * The rule is off repo-wide rather than disabled line by line so the
       * reason lives in one place.
       */
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];

export default config;
