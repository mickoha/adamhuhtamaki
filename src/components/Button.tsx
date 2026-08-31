import { ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'ghost-light';

const base =
  'group inline-flex items-center gap-[6px] font-semibold leading-none whitespace-nowrap transition-colors duration-150 active:translate-y-px';

const sizes = {
  md: 'px-[14px] py-[8px] text-[13px] rounded-site-md',
  lg: 'px-[18px] py-[11px] text-[14px] rounded-site-lg',
};

const variants: Record<Variant, string> = {
  primary: 'bg-site-accent text-white hover:bg-site-accent-2',
  ghost:
    'bg-white text-site-primary border border-site-line-strong hover:bg-site-hover',
  /* For use on dark backgrounds. */
  'ghost-light':
    'bg-white/[0.08] text-white border border-white/[0.14] hover:bg-white/[0.14]',
};

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: 'md' | 'lg';
  /** Renders an <a> instead of a <button> when set. */
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
  /** CTA label for analytics — rendered as data-track-click. */
  dataTrack?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled,
  arrow,
  className = '',
  onClick,
  dataTrack,
}: ButtonProps) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${
    disabled ? 'cursor-not-allowed opacity-70' : ''
  } ${className}`;
  const track = dataTrack ? { 'data-track-click': dataTrack } : {};

  const inner = (
    <>
      {children}
      {arrow && (
        <span className="ml-[2px] transition-transform duration-150 group-hover:translate-x-[2px]">
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} {...track}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls} {...track}>
      {inner}
    </button>
  );
}
