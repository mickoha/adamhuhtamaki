import type { CookieCategory } from '@/data/cookies';

/**
 * One category's cookie table plus its note. Shared by the settings dialog
 * and the /evastekaytannot page so the two can never describe the same cookie
 * differently.
 */
const CELL = 'px-[14px] py-[10px]';

export default function CookieTable({ cat }: { cat: CookieCategory }) {
  return (
    <>
      {/* The table scrolls inside its own container rather than forcing the
          dialog — or the page — sideways on a phone. */}
      <div className="overflow-x-auto rounded-site-md border border-site-divider">
        <table className="w-full min-w-[520px] border-collapse text-left text-[12.5px]">
          <thead>
            <tr className="border-b border-site-divider text-site-neutral-500">
              <th className={`${CELL} font-medium`}>Eväste</th>
              <th className={`${CELL} font-medium`}>Asettaja</th>
              <th className={`${CELL} font-medium`}>Kesto</th>
              <th className={`${CELL} font-medium`}>Tarkoitus</th>
            </tr>
          </thead>
          <tbody>
            {cat.cookies.map((c) => (
              <tr
                key={c.name}
                className="border-b border-site-line-soft align-top last:border-b-0"
              >
                <td
                  className={`${CELL} whitespace-nowrap font-mono text-site-body`}
                >
                  {c.name}
                </td>
                <td
                  className={`${CELL} whitespace-nowrap text-site-neutral-400`}
                >
                  {c.setter}
                </td>
                <td
                  className={`${CELL} whitespace-nowrap text-site-neutral-400`}
                >
                  {c.lifetime}
                </td>
                <td className={`${CELL} text-site-neutral-400`}>{c.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Load-bearing content, not a caption. */}
      <p className="mt-[14px] border-l-2 border-site-accent-800 pl-[14px] text-[12.5px] leading-[1.65] text-site-neutral-400">
        {cat.note}
      </p>
    </>
  );
}
