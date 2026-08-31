import { ReactNode, useState } from 'react';
import Wrap from '@/components/Wrap';
import Eyebrow from '@/components/Eyebrow';
import { FAQ, type FaqItem } from '@/data/faq';
import { trackEvent } from '@/utils/analytics';

interface FaqProps {
  /** Defaults to the shared FAQ; pass a page-specific list for subpages. */
  items?: FaqItem[];
  eyebrow?: string;
  title?: ReactNode;
  lead?: string;
  id?: string;
}

/**
 * FAQ accordion. Render the matching FAQPage JSON-LD from the SAME array
 * (faqPageSchemaFrom in @/data/schema) — schema that does not match the
 * visible text is ignored by search engines.
 */
export default function Faq({
  items = FAQ,
  eyebrow = 'Usein kysyttyä',
  title = 'Kysymyksiä? Tässä vastauksia.',
  lead = 'Et löytänyt etsimääsi? Kysy meiltä suoraan – vastaamme arkipäivän sisällä.',
  id = 'ukk',
}: FaqProps) {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpen((cur) => {
      const next = cur === i ? null : i;
      if (next === i) {
        trackEvent('faq_open', { faq_question: items[i].q.slice(0, 100) });
      }
      return next;
    });
  };

  return (
    <section
      id={id}
      data-track-section={id}
      className="border-y border-site-line bg-white py-24 max-md:py-16"
    >
      <Wrap>
        <div className="grid grid-cols-[0.8fr_1.1fr] items-start gap-16 max-md:grid-cols-1 max-md:gap-8">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3vw,40px)] font-bold leading-[1.1] tracking-[-0.02em] text-site-primary">
              {title}
            </h2>
            <p className="mt-3 max-w-[360px] text-[16px] leading-[1.65] text-site-muted">
              {lead}
            </p>
            <a
              href="#yhteys"
              data-track-click="faq_ota_yhteytta"
              className="group mt-6 inline-flex items-center gap-[8px] text-[13.5px] font-semibold text-site-accent"
            >
              Ota yhteyttä
              <span className="transition-transform duration-150 group-hover:translate-x-[2px]">
                →
              </span>
            </a>
          </div>

          <div className="flex flex-col border-t border-site-line">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q} className="border-b border-site-line">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 px-1 py-[22px] text-left text-[16px] font-semibold tracking-[-0.01em] text-site-primary transition-colors hover:text-site-accent"
                  >
                    {item.q}
                    <span
                      className={`grid h-[26px] w-[26px] flex-shrink-0 place-items-center rounded-full border transition-[transform,border-color,color] duration-[250ms] ${
                        isOpen
                          ? 'rotate-45 border-site-accent text-site-accent'
                          : 'border-site-line-strong text-site-subtle'
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  {/* Answers stay in the DOM when collapsed so crawlers and
                      answer engines can read them without a click. */}
                  <div
                    className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                      isOpen ? 'max-h-[500px]' : 'max-h-0'
                    }`}
                  >
                    <p className="max-w-[600px] px-1 pb-[22px] text-[14px] leading-[1.65] text-site-muted">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Wrap>
    </section>
  );
}
