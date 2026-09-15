import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import CookieSettings from '@/components/CookieSettings';
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  hasAnswered,
  saveConsent,
} from '@/utils/consent';
import { FEATURES } from '@/data/site';

/**
 * Consent, in two layers (.claude/design/evasteet/):
 *
 *   Layer 1 — this banner. Two actions: `Katso asetukset` and `OK`.
 *   Layer 2 — <CookieSettings>, where the visitor sees what is actually
 *             stored and can refuse in one click.
 *
 * The banner sits ABOVE the floating "Soita 24/7" pill rather than moving it:
 * 118px = the pill's 26px offset + its ~62px height + a 30px gap. The pill is
 * the site's primary conversion and never gets displaced. If its height
 * changes, this offset changes with it.
 *
 * Once answered the banner never returns; the way back is the
 * "Evästeasetukset" link in the footer's legal row, which dispatches
 * OPEN_COOKIE_SETTINGS_EVENT and reopens layer 2.
 */
const CookieConsent = () => {
  // Gate on mount so SSR and the first client render match (cookies are
  // client-only — reading one during render is a hydration mismatch).
  const [mounted, setMounted] = useState(false);
  const [answered, setAnswered] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setAnswered(hasAnswered());
    setMounted(true);

    const open = () => setDialogOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open);
  }, []);

  const save = useCallback((analytics: boolean, choice: string) => {
    saveConsent(analytics, choice);
    setAnswered(true);
    setDialogOpen(false);
  }, []);

  // Closing without choosing saves nothing and leaves the banner up.
  const closeDialog = useCallback(() => setDialogOpen(false), []);

  // Checked after the hooks, not before, so hook order stays identical
  // whether the banner is switched on or off.
  if (!FEATURES.cookieBanner || !mounted) return null;

  return (
    <>
      {/* Dim, not a wall. The page stays fully readable and scrollable —
          pointer-events-none — so this is a focus device, not a gate; the
          brief forbids a cookie wall. It sits at z-55, below the pill's z-60,
          so the one CTA that matters at 3 a.m. stays at full strength while
          everything else recedes. Suppressed while the dialog is open, or its
          0.55 would stack with the dialog's own 0.72 backdrop. */}
      {!answered && !dialogOpen && (
        <div
          aria-hidden="true"
          className="site-fade pointer-events-none fixed inset-0 z-[55] bg-[rgba(22,24,38,0.55)]"
        />
      )}

      {!answered && (
        <div className="site-card-in fixed bottom-[118px] right-[26px] z-[70] w-[min(420px,calc(100vw-2rem))] rounded-site-lg border border-site-divider bg-site-surface px-6 pb-6 pt-[22px] shadow-site-modal max-md:bottom-[82px] max-md:left-4 max-md:right-4 max-md:w-auto">
          <h2 className="text-[15px] text-site-heading">
            Evästeiden käyttö tällä sivustolla
          </h2>
          <p className="mt-2 text-[13px] leading-[1.6] text-site-neutral-400">
            Tämä verkkosivusto käyttää evästeitä parantaakseen käyttökokemustasi
            ja analysoidakseen sivuston liikennettä. Käytän sekä välttämättömiä
            evästeitä, jotka ovat tarpeen sivuston perustoimintojen kannalta,
            että analytiikkaevästeitä.{' '}
            <Link
              href="/evastekaytannot/"
              className="text-site-accent-300 hover:underline"
            >
              Lue lisää evästeistä.
            </Link>
          </p>
          {/* Below 620px the two stack full width with OK first — hence
              flex-col-reverse rather than a second copy of the buttons. */}
          <div className="mt-4 flex flex-wrap justify-end gap-[10px] max-sm:flex-col-reverse">
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="btn btn-secondary px-[16px] py-[9px] text-[13.5px]"
            >
              Katso asetukset
            </button>
            <button
              type="button"
              onClick={() => save(true, 'ok')}
              className="btn btn-primary px-[16px] py-[9px] text-[13.5px]"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <CookieSettings open={dialogOpen} onClose={closeDialog} onSave={save} />
    </>
  );
};

export default CookieConsent;
