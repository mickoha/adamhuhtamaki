import { getCookie } from 'cookies-next';

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
 * - email_click         { link_url, cta_location }  — any mailto: link (automatic)
 * - form_start          { method }                  — first contact-form field focused
 * - contact_form_submit {}                          — submit attempted
 * - generate_lead       { method }                  — form sent (GA4 recommended name)
 * - contact_form_error  { reason }                  — send failed
 * - faq_open            { faq_question }            — FAQ item opened
 * - cookie_consent      { choice }                  — consent given
 *
 * Register the params you want to report on as custom dimensions in GA4 Admin
 * → Custom definitions: section_name, cta_label, cta_type, cta_location,
 * method, reason, choice.
 */

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
  if (getCookie('ga_') !== 'TRUE') return;

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
    ...params,
  });
};

export { CONSENT_CHANGED_EVENT, emitConsentChanged, trackEvent };
