import { useEffect, useState } from 'react';
import Link from 'next/link';
import { COOKIE_CATEGORIES } from '@/data/cookies';
import CookieTable from '@/components/CookieTable';
import ConsentSwitch from '@/components/ConsentSwitch';
import { CONSENT_CHANGED_EVENT } from '@/utils/analytics';
import { analyticsAllowed, saveConsent } from '@/utils/consent';
import { CONTENT_UPDATED_FI } from '@/data/site';

/**
 * The cookie policy page. Its toggle and the settings dialog are the same
 * control at two mounts: both read `ga_`, both write through saveConsent(),
 * and this page re-syncs on CONSENT_CHANGED_EVENT so the two can never show
 * different states within one visit.
 *
 * Turning analytics off deletes `ga_` *and* every `_ga*` cookie Google
 * already set — a policy page that only flips a flag has withdrawn nothing.
 */
const CookiesInfo = () => {
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const sync = () => setAnalytics(analyticsAllowed());
    sync();
    window.addEventListener(CONSENT_CHANGED_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, sync);
  }, []);

  const toggle = (next: boolean) => {
    setAnalytics(next);
    // Writes LOCAL_CONSENT too: a visitor who allows analytics here without
    // ever having answered the banner would otherwise be left with ga_ set
    // and nothing loading.
    saveConsent(next, next ? 'policy_on' : 'policy_off');
  };

  return (
    <div className="mx-auto max-w-[860px] px-6 py-16 max-md:py-12">
      <Link href="/">
        <span className="mb-6 inline-block text-[14px] text-site-accent hover:underline">
          ← Takaisin etusivulle
        </span>
      </Link>

      <h1 className="text-[clamp(28px,3vw,40px)] leading-[1.1] tracking-[-0.02em] text-site-heading">
        Evästekäytännöt
      </h1>
      <p className="mt-2 text-[12.5px] text-site-neutral-500">
        Päivitetty: {CONTENT_UPDATED_FI}
      </p>
      <p className="mb-2 mt-5 max-w-[70ch] text-[15px] leading-[1.7] text-site-muted">
        Tällä sivulla on kaikki, mitä tämä sivusto tallentaa selaimeesi.
        Analytiikka on pois päältä, kunnes sallit sen itse, ja voit perua
        suostumuksen milloin tahansa alla olevasta kytkimestä.
      </p>

      {COOKIE_CATEGORIES.map((cat) => (
        <section
          key={cat.id}
          className="mt-12 border-t border-site-divider pt-8"
        >
          <div className="flex items-start justify-between gap-8">
            <div>
              <h2 className="text-[20px] tracking-[-0.01em] text-site-heading">
                {cat.name}
              </h2>
              <p className="mt-2 max-w-[62ch] text-[14.5px] leading-[1.7] text-site-neutral-400">
                {cat.description}
              </p>
            </div>
            <div className="flex-none pt-1">
              {cat.id === 'analytics' ? (
                <div className="flex items-center gap-3">
                  <ConsentSwitch checked={analytics} onChange={toggle} />
                  <span className="text-[13px] text-site-neutral-500">
                    {analytics ? 'Päällä' : 'Pois'}
                  </span>
                </div>
              ) : (
                /* Not a disabled switch — a greyed toggle reads as something
                   the visitor failed to turn on. */
                <span className="text-[13px] text-site-neutral-500">
                  Aina käytössä
                </span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <CookieTable cat={cat} />
          </div>
        </section>
      ))}

      <p className="mt-10 max-w-[70ch] text-[13.5px] leading-[1.7] text-site-neutral-500">
        Kytkimen sulkeminen poistaa Google Analyticsin evästeet välittömästi
        selaimestasi. Voit myös estää evästeet kokonaan selaimesi asetuksista;
        sivusto toimii silti normaalisti.
      </p>
    </div>
  );
};

export default CookiesInfo;
