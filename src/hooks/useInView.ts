import { useEffect, useRef, useState } from 'react';

/**
 * One-shot scroll reveal. Pair with the `.site-reveal` / `.is-in` classes:
 *
 *   const { ref, inView } = useInView<HTMLDivElement>();
 *   <div ref={ref} className={`site-reveal ${inView ? 'is-in' : ''}`}>
 *
 * Reveals immediately when IntersectionObserver is unavailable or the visitor
 * prefers reduced motion, plus a 4s safety sweep for observer mis-fires (a
 * section that never reveals is far worse than one that reveals early).
 */
export function useInView<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!('IntersectionObserver' in window) || reduceMotion) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);

    const timer = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) setInView(true);
    }, 4000);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [inView]);

  return { ref, inView };
}
