import { getCookie } from 'cookies-next';
import { ANALYTICS_COOKIE } from '@/data/cookies';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GA4 events fired by this template (mark `generate_lead` as a key event in
 * GA4 Admin → Events):
 *
 * - section_view        { section_name }            — section scrolled into view (once per page view)
 * - cta_click           { cta_label, cta_type, cta_location, page_path }
 *                                                   — elements with data-track-click="<label>";
 *                                                     cta_type: phone | email | other (from href);
 *                                                     cta_location: nearest data-track-location /
 *                                                     data-track-section ancestor ("page" if none)
 * - phone_click         { link_url, cta_location }  — any tel: link (automatic)
 * - generate_lead       { method: 'phone' }         — ALSO fired on the first tel: click of a
 *                                                     page view. On this site the phone IS the
 *                                                     conversion, so it must count as one.
 * - email_click         { link_url, cta_location }  — any mailto: link (automatic)
 * - form_start          { method }                  — first contact-form field focused
 * - contact_form_submit {}                          — submit attempted
 * - generate_lead       { method }                  — form sent (GA4 recommended name)
 * - contact_form_error  { reason }                  — send failed
 * - faq_open            { faq_question }            — FAQ item opened
 * - cookie_consent      { choice }                  — consent given
 *
 * Every event also carries `content_group`, so the six content pages can be
 * compared as groups instead of read as a flat page list.
 *
 * Register the params you want to report on as custom dimensions in GA4 Admin
 * → Custom definitions: section_name, cta_label, cta_type, cta_location,
 * method, reason, choice. `content_group` is a GA4 built-in — do NOT register
 * it as a custom dimension; it already has its own reporting dimension.
 */

/**
 * Which group a path belongs to. Kept here rather than per page so the whole
 * mapping is visible in one place and a new page cannot quietly fall outside
 * it — anything unmapped lands in 'Muu', which is a visible signal that a
 * route was added without deciding where it belongs.
 */
const contentGroupFor = (path: string): string => {
  const p = path.split('?')[0].split('#')[0];
  if (p === '/' || p === '') return 'Etusivu';
  if (
    /^\/(rikosasianajaja|pakkokeinot|riidanratkaisu|vahingonkorvaus)\/?$/.test(
      p,
    )
  ) {
    return 'Palvelusivu';
  }
  if (/^\/yhteystiedot\/?$/.test(p)) return 'Yhteystiedot';
  if (/^\/(tietosuojaseloste|evastekaytannot)\/?$/.test(p)) {
    return 'Lakisaateinen';
  }
  return 'Muu';
};

/**
 * Cross-component signal that the consent cookies changed (banner buttons, the
 * /evastekaytannot toggle). _app listens and mounts/unmounts GA immediately
 * instead of polling.
 */
const CONSENT_CHANGED_EVENT = 'site:consent-changed';

const emitConsentChanged = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
};

const trackEvent = (name: string, params?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;
  // GDPR: never queue or send analytics events without analytics consent.
  if (getCookie(ANALYTICS_COOKIE) !== 'TRUE') return;

  // Standard gtag stub — queues events until GA loads (it mounts on the
  // consent-changed event), then GA flushes the queue.
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    };
  }
  window.gtag('event', name, {
    page_path: window.location.pathname,
    content_group: contentGroupFor(window.location.pathname),
    ...params,
  });
};

/**
 * Sets content_group as a gtag default so GA4's own automatic page_view — which
 * this code never fires itself — carries it too. Without this the group would
 * be attached to custom events only, and the page_view report, the one people
 * actually open, would still be a flat list.
 */
const setContentGroup = (path: string) => {
  if (typeof window === 'undefined') return;
  if (getCookie(ANALYTICS_COOKIE) !== 'TRUE') return;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    };
  }
  window.gtag('set', { content_group: contentGroupFor(path) });
};

export {
  CONSENT_CHANGED_EVENT,
  emitConsentChanged,
  trackEvent,
  setContentGroup,
  contentGroupFor,
};
