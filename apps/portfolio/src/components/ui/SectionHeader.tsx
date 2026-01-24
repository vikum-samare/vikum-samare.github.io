import { ReactNode } from 'react';
import clsx from 'clsx';

interface SectionHeaderProps {
  readonly label: string;
  readonly icon: ReactNode;
  readonly className?: string;
}

export function SectionHeader({ label, icon, className }: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        'inline-flex items-center gap-2 px-4 py-2',
        'border border-border rounded-full',
        'text-sm text-text-secondary',
        className
      )}
    >
      <span className="text-text-muted">{icon}</span>
      <span className="uppercase tracking-wider font-medium">{label}</span>
    </div>
  );
}
