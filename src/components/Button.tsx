import { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

/**
 * The design system's button. Primary is an OUTLINE — 1px accent border on
 * transparent — never a filled accent block; the accent appears as a line, a
 * mark or a glow, never as a flood. The `.btn*` classes live in globals.css so
 * hover/active tints stay in one place.
 */
const variants: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

const sizes = {
  md: 'px-[16px] py-[9px] text-[13.5px]',
  lg: 'px-[22px] py-[13px] text-[15px]',
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
  const cls = `btn group ${variants[variant]} ${sizes[size]} ${className}`;
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
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cls}
      {...track}
    >
      {inner}
    </button>
  );
}
