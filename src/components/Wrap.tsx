import { ReactNode } from 'react';

interface WrapProps {
  children: ReactNode;
  className?: string;
}

/** Centered content column — max 1240px with 24px side padding. */
export default function Wrap({ children, className = '' }: WrapProps) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-6 ${className}`}>
      {children}
    </div>
  );
}
