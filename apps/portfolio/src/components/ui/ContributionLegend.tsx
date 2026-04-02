import clsx from 'clsx';
import { GitHubAccount } from '@/config';

interface ContributionLegendProps {
  readonly accounts: GitHubAccount[];
  readonly enabledAccounts: Set<string>;
  readonly accountTotals: Record<string, number>;
  // eslint-disable-next-line no-unused-vars
  readonly onToggle: (username: string) => void;
}

export function ContributionLegend({
  accounts,
  enabledAccounts,
  accountTotals,
  onToggle,
}: ContributionLegendProps) {
  return (
    <div className="flex flex-nowrap sm:flex-wrap gap-1.5 sm:gap-2">
      {accounts.map((account) => {
        const isEnabled = enabledAccounts.has(account.username);
        const total = accountTotals[account.username] || 0;

        return (
          <button
            key={account.username}
            onClick={() => onToggle(account.username)}
            className={clsx(
              'inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0',
              'text-xs sm:text-sm transition-all duration-normal',
              'border',
              isEnabled
                ? 'border-border bg-background-card text-text-primary'
                : 'border-border/50 bg-transparent text-text-muted opacity-50'
            )}
          >
            <span
              className={clsx('rounded-full shrink-0 transition-opacity duration-normal')}
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: account.colors[3],
                opacity: isEnabled ? 1 : 0.3,
              }}
            />
            <span className={clsx(!isEnabled && 'line-through')}>{account.company}</span>
            {total > 0 && (
              <span className="text-xs text-text-muted">{total.toLocaleString()}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
