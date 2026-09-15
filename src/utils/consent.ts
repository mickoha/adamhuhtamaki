import { deleteCookie, getCookie, getCookies, setCookie } from 'cookies-next';
import { emitConsentChanged, trackEvent } from '@/utils/analytics';
import { ANALYTICS_COOKIE, CONSENT_COOKIE } from '@/data/cookies';

/**
 * The consent state, in one place. Two first-party cookies, both two years:
 *
 *   <prefix>_consent=TRUE  — the visitor answered (the banner stays down)
 *   <prefix>_ga=TRUE       — analytics allowed (the ONLY gate on GA loading)
 *
 * The names are defined in @/data/cookies and prefixed per site, so two sites
 * sharing a host (every one of them, in localhost development) cannot read
 * each other's consent. Every write goes through saveConsent(), so the banner,
 * the settings dialog and the /evastekaytannot toggle cannot drift into
 * writing different things.
 */
export { ANALYTICS_COOKIE, CONSENT_COOKIE };

/** Reopens the settings dialog from anywhere (the footer's legal row). */
export const OPEN_COOKIE_SETTINGS_EVENT = 'site:open-cookie-settings';

const twoYearsOut = () => {
  const d = new Date();
  return new Date(d.getFullYear() + 2, d.getMonth(), d.getDate());
};

const opts = () => ({
  expires: twoYearsOut(),
  path: '/',
  sameSite: 'lax' as const,
});

export const hasAnswered = (): boolean => getCookie(CONSENT_COOKIE) === 'TRUE';

export const analyticsAllowed = (): boolean =>
  getCookie(ANALYTICS_COOKIE) === 'TRUE';

/**
 * Withdrawing consent has to remove what Google already set, not just flip
 * our own flag — a policy page that leaves _ga in the browser has not
 * withdrawn anything.
 */
const clearGaCookies = () => {
  Object.keys(getCookies() ?? {}).forEach((name) => {
    if (name.startsWith('_ga')) deleteCookie(name, { path: '/' });
  });
};

/**
 * `choice` is the analytics label: 'ok' (banner), 'all' | 'necessary' |
 * 'custom' (dialog), 'policy_on' | 'policy_off' (/evastekaytannot).
 *
 * Order matters. The cookies are written first so trackEvent can see the
 * consent it is reporting; when analytics was refused trackEvent no-ops, and
 * the refusal is correctly never reported. emitConsentChanged is last so _app
 * mounts GA only once the queue has the event in it.
 */
export const saveConsent = (analytics: boolean, choice: string) => {
  setCookie(CONSENT_COOKIE, 'TRUE', opts());
  if (analytics) {
    setCookie(ANALYTICS_COOKIE, 'TRUE', opts());
  } else {
    deleteCookie(ANALYTICS_COOKIE, { path: '/' });
    clearGaCookies();
  }
  trackEvent('cookie_consent', { choice });
  emitConsentChanged();
};

export const openCookieSettings = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
};
