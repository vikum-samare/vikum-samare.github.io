import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-background-card border border-border rounded-xl p-6',
        hover && 'transition-all duration-normal hover:border-accent-primary hover:-translate-y-0.5',
        className
      )}
    >
      {children}
    </div>
  );
}
