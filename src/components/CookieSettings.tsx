import { ReactNode, useEffect, useRef, useState } from 'react';
import { COOKIE_CATEGORIES, type CookieCategory } from '@/data/cookies';
import { analyticsAllowed } from '@/utils/consent';
import ConsentSwitch from '@/components/ConsentSwitch';
import CookieTable from '@/components/CookieTable';

/**
 * The settings dialog (.claude/design/evasteet/) — the one modal on this site.
 *
 * The banner's two buttons are asymmetric by the client's decision; this layer
 * is what makes the choice real, so nothing in it is buried, pre-ticked or
 * styled to recede. `Vain välttämättömät` and `Hyväksy kaikki` are the same
 * variant at the same size, and the accent outline goes to `Tallenna
 * valinnat` — the neutral confirmation of whatever the visitor chose —
 * precisely so neither refusing nor accepting is the visually favoured act.
 */
interface Props {
  open: boolean;
  /** Close without saving. */
  onClose: () => void;
  onSave: (analytics: boolean, choice: string) => void;
}

/** Built to repeat: two categories ship, the row does not assume two. */
function CategoryRow({
  cat,
  control,
}: {
  cat: CookieCategory;
  control: ReactNode;
}) {
  return (
    <div className="border-b border-site-divider py-[22px] last:border-b-0">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-[15px] text-site-heading">{cat.name}</h3>
          <p className="mt-[6px] max-w-[46ch] text-[13px] leading-[1.6] text-site-neutral-500">
            {cat.description}
          </p>
        </div>
        <div className="flex-none pt-[2px]">{control}</div>
      </div>

      <details className="site-details group mt-[14px]">
        <summary className="inline-flex items-center gap-2 text-[13px] text-site-accent transition-colors hover:text-site-accent-300">
          {/* The site's FAQ marker: a plus rotating into a cross, never a
              chevron. */}
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            className="flex-none transition-transform duration-200 group-open:rotate-45"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Näytä evästeet
        </summary>
        <div className="site-fade mt-3">
          <CookieTable cat={cat} />
        </div>
      </details>
    </div>
  );
}

export default function CookieSettings({ open, onClose, onSave }: Props) {
  const [analytics, setAnalytics] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  // Read through a ref so the open-effect depends on `open` alone; taking
  // onClose as a dependency would re-run it on every parent render and quietly
  // reset the toggle mid-interaction.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    // Re-read the stored value on every open: closing without choosing must
    // discard the toggle, never remember it.
    setAnalytics(analyticsAllowed());
    openerRef.current = document.activeElement as HTMLElement | null;
    const focus = window.setTimeout(() => closeRef.current?.focus(), 0);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      window.clearTimeout(focus);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      openerRef.current?.focus?.();
    };
  }, [open]);

  /** Visible elements only, so a collapsed <details> never traps focus. */
  const trapFocus = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const nodes = Array.from(
      cardRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, summary, [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
    if (nodes.length === 0) return;

    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!open) return null;

  const action = 'btn flex-[1_1_160px] px-[18px] py-[12px] text-[14px]';

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      {/* The ground colour every scrim on this site uses. Clicking it closes
          without saving. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(22,24,38,0.72)] backdrop-blur-[3px]"
      />

      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        onKeyDown={trapFocus}
        className="site-card-in relative flex max-h-[85vh] w-[min(600px,calc(100vw-2rem))] flex-col rounded-site-lg border border-site-divider bg-site-surface shadow-site-modal"
      >
        <div className="flex items-start justify-between gap-6 px-[30px] pb-[18px] pt-[26px] max-md:px-5">
          <div>
            <h2
              id="cookie-settings-title"
              className="text-[20px] text-site-heading"
            >
              Evästeasetukset
            </h2>
            <p className="mt-[10px] max-w-[52ch] text-[13.5px] leading-[1.6] text-site-neutral-400">
              Alla on kaikki, mitä tämä sivusto tallentaa selaimeesi.
              Analytiikka on pois päältä, kunnes sallit sen itse.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Sulje tallentamatta"
            className="-mr-[6px] -mt-[6px] flex-none rounded-site-md p-[6px] text-site-neutral-400 transition-colors hover:text-site-text"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Only the middle band scrolls — on a short phone the actions are
            never something you have to scroll to find. */}
        <div className="min-h-0 flex-1 overflow-y-auto border-t border-site-divider px-[30px] max-md:px-5">
          {COOKIE_CATEGORIES.map((cat) => (
            <CategoryRow
              key={cat.id}
              cat={cat}
              control={
                cat.id === 'analytics' ? (
                  <ConsentSwitch checked={analytics} onChange={setAnalytics} />
                ) : (
                  /* Deliberately not a disabled switch: a greyed toggle reads
                     as something the visitor failed to turn on. */
                  <span className="text-[13px] text-site-neutral-500">
                    Aina käytössä
                  </span>
                )
              }
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-[10px] border-t border-site-divider px-[30px] pb-6 pt-5 max-md:px-5">
          <button
            type="button"
            className={`${action} btn-secondary`}
            onClick={() => onSave(false, 'necessary')}
          >
            Vain välttämättömät
          </button>
          <button
            type="button"
            className={`${action} btn-primary`}
            onClick={() => onSave(analytics, 'custom')}
          >
            Tallenna valinnat
          </button>
          <button
            type="button"
            className={`${action} btn-secondary`}
            onClick={() => onSave(true, 'all')}
          >
            Hyväksy kaikki
          </button>
        </div>
      </div>
    </div>
  );
}
