import { deleteCookie, getCookie, getCookies, setCookie } from 'cookies-next';
import React, { useEffect } from 'react';
import Link from 'next/link';

/**
 * Cookie policy page body with a live analytics toggle. Turning it off deletes
 * the ga_ cookie *and* every _ga* cookie Google already set — a policy page
 * that only flips a flag is not a working withdrawal of consent.
 */
const CookiesInfo = () => {
  const [gaStatus, setGaStatus] = React.useState(false);

  useEffect(() => {
    setGaStatus(getCookie('ga_') === 'TRUE');
  }, []);

  const onClickSwitch = () => {
    if (gaStatus) {
      deleteCookie('ga_');
      setGaStatus(false);

      const cookies = getCookies();
      Object.keys(cookies).forEach((cookieName) => {
        if (cookieName.startsWith('_ga')) deleteCookie(cookieName);
      });
    } else {
      const d = new Date();
      d.setFullYear(d.getFullYear() + 2);
      setCookie('ga_', 'TRUE', { expires: d });
      setGaStatus(true);
    }
  };

  return (
    <div className="mx-auto max-w-[760px] px-6 py-16">
      <Link href="/">
        <span className="mb-6 inline-block text-[14px] font-semibold text-site-accent hover:underline">
          ← Takaisin etusivulle
        </span>
      </Link>

      <h1 className="text-[clamp(28px,3vw,40px)] font-bold leading-[1.1] tracking-[-0.02em] text-site-heading">
        Tietoa evästeistä
      </h1>
      <p className="mb-5 mt-3 text-[15px] leading-[1.7] text-site-muted">
        Tämä verkkosivusto käyttää evästeitä parantaakseen käyttökokemustasi ja
        analysoidakseen sivuston liikennettä. Käytämme sekä välttämättömiä
        evästeitä, jotka ovat tarpeen sivuston perustoimintojen kannalta, että
        analytiikkaevästeitä.
      </p>

      <h2 className="mb-3 mt-8 text-[20px] font-bold tracking-[-0.01em] text-site-primary">
        Välttämättömät evästeet
      </h2>
      <h3 className="mb-1 font-mono text-[14px] font-semibold text-site-body">
        LOCAL_CONSENT
      </h3>
      <p className="mb-5 text-[15px] leading-[1.7] text-site-muted">
        Pitää tiedon siitä, että olet vastannut evästeilmoitukseen, jotta
        ilmoitus ei näy uudelleen jokaisella käynnillä. Voimassa kaksi vuotta.
      </p>

      <h2 className="mb-3 mt-8 text-[20px] font-bold tracking-[-0.01em] text-site-primary">
        Analytiikkaevästeet
      </h2>
      <div className="mb-2 flex items-center gap-4">
        <h3 className="font-mono text-[14px] font-semibold text-site-body">ga_</h3>
        <button
          type="button"
          role="switch"
          aria-checked={gaStatus}
          aria-label="Analytiikkaevästeet"
          onClick={onClickSwitch}
          className={`relative inline-flex h-[24px] w-[44px] flex-shrink-0 items-center rounded-full transition-colors ${
            gaStatus ? 'bg-site-accent' : 'bg-site-line-strong'
          }`}
        >
          <span
            className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow transition-transform ${
              gaStatus ? 'translate-x-[23px]' : 'translate-x-[3px]'
            }`}
          />
        </button>
        <span className="text-[13px] font-medium text-site-muted">
          {gaStatus ? 'Päällä' : 'Pois'}
        </span>
      </div>
      <p className="mb-5 text-[15px] leading-[1.7] text-site-muted">
        Sallii Google Analyticsin keräämään tietoa sivuston käytöstä (mm.
        katsotut sivut ja klikatut painikkeet). Käytämme tietoa sivuston
        kehittämiseen. Kytkimen sulkeminen poistaa evästeet välittömästi.
      </p>
    </div>
  );
};

export default CookiesInfo;
