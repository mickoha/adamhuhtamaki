import '@/styles/globals.css';
import { sans, mono } from '@/utils/fonts';
import { getCookie } from 'cookies-next';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import { CONSENT_CHANGED_EVENT } from '@/utils/analytics';

export default function App({ Component, pageProps }: AppProps) {
  const [consentAccepted, setConsentAccepted] = useState(false);

  /**
   * GA mounts only with analytics consent — this is the single gate, so no
   * Google script is ever requested before the visitor agrees. Synced once on
   * mount (cookies are client-only) and again whenever CookieConsent or the
   * /evastekaytannot toggle emits the consent-changed event. No polling.
   */
  useEffect(() => {
    const syncConsent = () => {
      setConsentAccepted(
        getCookie('LOCAL_CONSENT') === 'TRUE' && getCookie('ga_') === 'TRUE'
      );
    };
    syncConsent();
    window.addEventListener(CONSENT_CHANGED_EVENT, syncConsent);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, syncConsent);
  }, []);

  const gaId = process.env.NEXT_PUBLIC_GTAG_ID;

  return (
    <div className={`${sans.variable} ${mono.variable}`}>
      <Component {...pageProps} />
      <AnalyticsTracker />
      {consentAccepted && gaId && <GoogleAnalytics gaId={gaId} />}
    </div>
  );
}
