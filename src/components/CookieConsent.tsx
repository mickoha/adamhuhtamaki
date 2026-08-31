import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import { emitConsentChanged, trackEvent } from '@/utils/analytics';

/**
 * GDPR consent banner. Two cookies, both first-party and two years long:
 *   LOCAL_CONSENT=TRUE  — the visitor answered (banner stays hidden)
 *   ga_=TRUE            — analytics accepted (the ONLY gate on GA loading)
 *
 * "Vain välttämättömät" sets LOCAL_CONSENT and not ga_, so Google Analytics
 * is never mounted and trackEvent no-ops. The visitor can flip ga_ later on
 * the /evastekaytannot page.
 */
const twoYearsOut = () => {
  const d = new Date();
  return new Date(d.getFullYear() + 2, d.getMonth(), d.getDate());
};

const CookieConsent = () => {
  // Gate on mount so SSR and the first client render match (cookies are
  // client-only — reading one during render is a hydration mismatch).
  const [mounted, setMounted] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(true);

  useEffect(() => {
    setConsentAccepted(getCookie('LOCAL_CONSENT') === 'TRUE');
    setMounted(true);
  }, []);

  const necessaryOnly = () => {
    setConsentAccepted(true);
    setCookie('LOCAL_CONSENT', 'TRUE', { expires: twoYearsOut() });
    // No ga_ cookie → GA never mounts. Still signal, so _app re-syncs (and
    // unmounts GA if analytics had been accepted earlier).
    emitConsentChanged();
  };

  const acceptAll = () => {
    setConsentAccepted(true);
    setCookie('LOCAL_CONSENT', 'TRUE', { expires: twoYearsOut() });
    setCookie('ga_', 'TRUE', { expires: twoYearsOut() });
    // Queued before GA mounts; _app picks up the same signal, mounts GA, and
    // GA flushes the queued hit.
    trackEvent('cookie_consent', { choice: 'all' });
    emitConsentChanged();
  };

  if (!mounted || consentAccepted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] w-[420px] max-w-[calc(100vw-2rem)] rounded-[10px] border border-site-line bg-site-surface p-5 shadow-site-modal max-md:bottom-3 max-md:right-3">
      <h2 className="text-[15px] font-semibold text-site-primary">
        Evästeiden käyttö tällä sivustolla
      </h2>
      <p className="mt-2 text-[13px] leading-[1.6] text-site-muted">
        Tämä verkkosivusto käyttää evästeitä parantaakseen käyttökokemustasi ja
        analysoidakseen sivuston liikennettä. Käytämme sekä välttämättömiä
        evästeitä, jotka ovat tarpeen sivuston perustoimintojen kannalta, että
        analytiikkaevästeitä.{' '}
        <Link
          href="/evastekaytannot/"
          className="font-semibold text-site-accent hover:underline"
        >
          Lue lisää evästeistä.
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap justify-end gap-[10px]">
        <Button variant="ghost" onClick={necessaryOnly}>
          Vain välttämättömät
        </Button>
        <Button variant="primary" onClick={acceptAll}>
          Hyväksy kaikki
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
