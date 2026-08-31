import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { trackEvent } from '@/utils/analytics';

/**
 * Site-wide behavioral tracking, mounted once in _app. Everything works by
 * delegation, so you never wire an onClick for analytics:
 *
 * 1. Section views — add `data-track-section="hero"` to a <section> and it
 *    fires `section_view` once per page view when ~45% of it is visible.
 * 2. Clicks — add `data-track-click="hero_cta"` to any element and clicks
 *    inside it fire `cta_click`; every tel:/mailto: link fires
 *    `phone_click`/`email_click` automatically. Each event carries:
 *    - cta_type:     phone | email | other (from the href)
 *    - cta_location: nearest `data-track-location` or `data-track-section`
 *                    ancestor (nav, drawer, footer, hero, …)
 *    - cta_label:    the element's own label (finest grain)
 *
 * All events are consent-gated inside trackEvent — no ga_ cookie, no events.
 */
const AnalyticsTracker = () => {
  const router = useRouter();

  // Section views — re-armed on every route change.
  useEffect(() => {
    const sections = document.querySelectorAll('[data-track-section]');
    if (sections.length === 0) return;

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const name = entry.target.getAttribute('data-track-section');
          if (!name || seen.has(name) || !entry.isIntersecting) return;
          // Tall sections can never hit a 45% threshold on a short viewport,
          // so cap the requirement at half the viewport height.
          const requiredHeight = Math.min(
            window.innerHeight * 0.5,
            entry.boundingClientRect.height * 0.45
          );
          if (entry.intersectionRect.height >= requiredHeight) {
            seen.add(name);
            trackEvent('section_view', { section_name: name });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: [0, 0.15, 0.3, 0.45, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [router.asPath]);

  // CTA + phone + email clicks.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest('a, button');
      if (!target) return;

      const location =
        target.closest('[data-track-location]')?.getAttribute('data-track-location') ??
        target.closest('[data-track-section]')?.getAttribute('data-track-section') ??
        'page';

      const href = target.getAttribute('href') ?? '';
      const type = href.startsWith('tel:')
        ? 'phone'
        : href.startsWith('mailto:')
          ? 'email'
          : 'other';

      const label = target
        .closest('[data-track-click]')
        ?.getAttribute('data-track-click');
      if (label) {
        trackEvent('cta_click', {
          cta_label: label,
          cta_type: type,
          cta_location: location,
        });
      }

      if (type === 'phone') {
        trackEvent('phone_click', { link_url: href, cta_location: location });
      } else if (type === 'email') {
        trackEvent('email_click', { link_url: href, cta_location: location });
      }
    };

    // Capture phase, so the event registers before the link navigates away.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
};

export default AnalyticsTracker;
