import Eyebrow from '@/components/Eyebrow';

interface SecHeadProps {
  eyebrow: string;
  /** One question or claim per heading — answer engines retrieve chunks. */
  title: string;
  text?: string;
  /** Use 'h1' when this is the page's main heading. */
  as?: 'h1' | 'h2';
}

/** Section header: eyebrow + display heading + intro paragraph. */
export default function SecHead({ eyebrow, title, text, as = 'h2' }: SecHeadProps) {
  const Heading = as;
  return (
    <div className="mb-12 max-w-[760px]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading className="my-3 text-[clamp(28px,3vw,40px)] font-bold leading-[1.1] tracking-[-0.02em] text-site-heading">
        {title}
      </Heading>
      {text && (
        <p className="text-[16px] leading-[1.6] text-site-muted">{text}</p>
      )}
    </div>
  );
}
