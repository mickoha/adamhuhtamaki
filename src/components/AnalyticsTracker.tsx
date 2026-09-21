import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { trackEvent, setContentGroup, CONSENT_CHANGED_EVENT } from '@/utils/analytics';
import { detectAiReferral, persistAiReferral } from '@/utils/aiReferral';
import { analyticsAllowed } from '@/utils/consent';

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
 * 3. Leads — a tel: click also fires `generate_lead` with method 'phone'.
 *    On this site the phone is the conversion the whole page argues for; the
 *    form is the secondary route. Counting only form submits would report the
 *    smaller number as if it were the result.
 * 4. Content grouping — content_group is set per route so the six content
 *    pages can be compared as groups rather than read as a flat page list.
 * 5. AI attribution — a visit arriving from ChatGPT, Perplexity, Claude or a
 *    Gemini answer fires `ai_referral` once, and every later event in that
 *    visit carries `ai_source` (see utils/aiReferral.ts).
 *
 * All events are consent-gated inside trackEvent — no ga_ cookie, no events.
 */
/** Clicks held while the banner is unanswered. Well past any real session. */
const PENDING_LIMIT = 20;

const AnalyticsTracker = () => {
  const router = useRouter();
  // One lead per page view. A visitor who taps the number twice, or taps it in
  // the header and again in the footer, is still one lead — without this the
  // conversion count inflates on exactly the pages that work best.
  // Now means "counted OR queued": a lead waiting on consent is still a lead,
  // so a second tap must not add another one.
  const leadFired = useRef(false);
  // Clicks made before the banner is answered. trackEvent drops them, so they
  // are held here — in memory, never stored, never sent — until consent says
  // whether they may be reported. Same shape as the AI-referral deferral below.
  const pending = useRef<Array<{ name: string; params: Record<string, unknown> }>>([]);

  // Content group first: it must be set before GA's automatic page_view fires.
  useEffect(() => {
    setContentGroup(router.asPath);
    leadFired.current = false;
    // A click held from the previous page would replay against this page's
    // context in GA, so the queue does not cross a route change. tel: is the
    // case that matters and it never navigates, so nothing real is lost.
    pending.current = [];
  }, [router.asPath]);

  // AI attribution. Checked on every route change rather than on mount alone:
  // an AI answer links to the page that answers the question, and a visitor can
  // land on one mid-visit. detectAiReferral() reports a source only the first
  // time it identifies one, so this stays one event per visit.
  useEffect(() => {
    const referral = detectAiReferral();
    if (!referral) return;

    // The referrer is readable the moment the page loads, but the visitor
    // usually answers the cookie banner a beat later — and the banner is most
    // likely to be answered on exactly this first page. Reporting on consent
    // instead of on load is what stops every AI arrival from being dropped for
    // having come a second too early.
    const report = () => {
      if (!analyticsAllowed()) return false;
      trackEvent('ai_referral', {
        ai_source: referral.source,
        ai_landing_page: referral.landingPage,
        ai_raw_referrer: referral.rawReferrer,
      });
      // Only now, with consent established, may the source be stored.
      persistAiReferral();
      return true;
    };

    if (report()) return;
    window.addEventListener(CONSENT_CHANGED_EVENT, report);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, report);
  }, [router.asPath]);

  // Section views — re-armed on every route change, and again on consent.
  useEffect(() => {
    const sections = document.querySelectorAll('[data-track-section]');
    if (sections.length === 0) return;

    const seen = new Set<string>();
    let observer: IntersectionObserver | null = null;

    const arm = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
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
            if (entry.intersectionRect.height < requiredHeight) return;
            // The hero clears this threshold while the banner is still up.
            // Marking it seen here would retire it for a page view that never
            // reported it — which is why hero engagement reads as zero. Leave
            // it observed instead and let the re-arm below collect it.
            if (!analyticsAllowed()) return;
            seen.add(name);
            trackEvent('section_view', { section_name: name });
            observer?.unobserve(entry.target);
          });
        },
        { threshold: [0, 0.15, 0.3, 0.45, 0.6] }
      );
      sections.forEach((section) => observer!.observe(section));
    };

    arm();

    // observe() delivers a fresh callback for whatever is on screen right now,
    // so a visitor sitting on the hero when they press OK still counts. An
    // IntersectionObserver alone would not: it reports crossings, and consent
    // is not a crossing.
    const rearm = () => {
      if (analyticsAllowed()) arm();
    };
    window.addEventListener(CONSENT_CHANGED_EVENT, rearm);
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, rearm);
      observer?.disconnect();
    };
  }, [router.asPath]);

  // CTA + phone + email clicks.
  useEffect(() => {
    /** Report now if consent allows it, otherwise queue it for the flush. */
    const hold = (name: string, params: Record<string, unknown>) => {
      if (analyticsAllowed()) {
        trackEvent(name, params);
        return;
      }
      // A bounded queue: a visitor who taps around for a while before
      // answering the banner must not grow this without limit.
      if (pending.current.length >= PENDING_LIMIT) return;
      pending.current.push({ name, params });
    };

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
        hold('cta_click', {
          cta_label: label,
          cta_type: type,
          cta_location: location,
        });
      }

      if (type === 'phone') {
        hold('phone_click', { link_url: href, cta_location: location });
        // The urgent visitor taps the number before answering the banner.
        // Setting this flag on a tap that was never reported silenced both it
        // and every tap after it: the call happened, the lead count did not
        // move. Now the flag and the event travel together — either both go
        // out, or both wait.
        if (!leadFired.current) {
          leadFired.current = true;
          hold('generate_lead', { method: 'phone', cta_location: location });
        }
      } else if (type === 'email') {
        hold('email_click', { link_url: href, cta_location: location });
      }
    };

    // Capture phase, so the event registers before the link navigates away.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // Clicks held from before consent. tel: opens the dialer without navigating,
  // so the page — and this queue — are still alive when the visitor comes back
  // and answers the banner.
  useEffect(() => {
    const flush = () => {
      const queued = pending.current;
      pending.current = [];
      // Answering "no" discards them. Replaying a minutes-old tap if the
      // visitor later opens the settings and says yes would date the event
      // wrong, and they have in the meantime refused it once.
      if (!analyticsAllowed()) return;
      queued.forEach(({ name, params }) => trackEvent(name, params));
    };
    window.addEventListener(CONSENT_CHANGED_EVENT, flush);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, flush);
  }, []);

  return null;
};

export default AnalyticsTracker;
