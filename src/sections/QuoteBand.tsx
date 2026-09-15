interface QuoteBandProps {
  quote: string;
  followUp: string;
}

/**
 * The one saturated field on the pakkokeinot page — the same indigo ground the
 * front page's Rikospäivystys band uses. That is why this page has no
 * päivystys band: a second saturated field would flatten both.
 *
 * The quote is carried by size, the accent rule and the ground — never by
 * italics or a heavier weight, which is not how this system emphasises. The
 * handoff shipped typographic quotation marks in the string; they were removed
 * at the client's request, so the rule and the ground do the work alone. Do not
 * add CSS quotes to put them back.
 */
export default function QuoteBand({ quote, followUp }: QuoteBandProps) {
  return (
    <section
      data-track-section="sitaatti"
      className="border-y border-[rgba(233,233,237,0.08)] bg-site-section bg-[radial-gradient(120%_140%_at_12%_0%,#353b80_0%,#262a60_58%)] px-[56px] py-[76px] max-md:px-5 max-md:py-11"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <blockquote className="max-w-[1100px] border-l border-site-accent-500 pl-[30px] text-[26px] font-normal leading-[1.5] text-site-text max-md:pl-[18px] max-md:text-[19px]">
          {quote}
        </blockquote>
        {/* pl is one pixel deeper than the quote so both hang off the same
            optical edge — the quote's rule occupies that first pixel. */}
        <p className="mt-6 max-w-[62ch] pl-[31px] text-[17px] leading-[1.7] text-site-accent-200 max-md:mt-4 max-md:pl-[18px] max-md:text-[15px]">
          {followUp}
        </p>
      </div>
    </section>
  );
}
