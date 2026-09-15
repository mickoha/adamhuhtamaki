import { ReactNode } from 'react';

interface WrapProps {
  children: ReactNode;
  className?: string;
}

/**
 * The page's content column: max 1400px, 56px side padding (20px on mobile),
 * LEFT-aligned rather than centred — the design puts its whitespace on the
 * right, and that asymmetry is intentional.
 */
export default function Wrap({ children, className = '' }: WrapProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1400px] px-[56px] max-md:px-5 ${className}`}
    >
      {children}
    </div>
  );
}
