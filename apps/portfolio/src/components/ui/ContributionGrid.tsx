import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { ContributionWeek } from '@/hooks/useContributions';
import { GitHubAccount } from '@/config';

interface ContributionGridProps {
  readonly weeks: ContributionWeek[];
  readonly accounts: GitHubAccount[];
  readonly enabledAccounts: Set<string>;
  readonly lessLabel: string;
  readonly moreLabel: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

function getIntensityLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function getCellColor(
  counts: Record<string, number>,
  accounts: GitHubAccount[],
  enabledAccounts: Set<string>
): string | null {
  const activeEntries = Object.entries(counts).filter(
    ([username, count]) => count > 0 && enabledAccounts.has(username)
  );

  if (activeEntries.length === 0) return null;

  if (activeEntries.length === 1) {
    const [username, count] = activeEntries[0];
    const account = accounts.find((a) => a.username === username);
    if (!account) return null;
    const level = getIntensityLevel(count);
    return level > 0 ? account.colors[level - 1] : null;
  }

  // Multiple accounts — use the dominant account's color at combined intensity
  // Sort by count descending
  activeEntries.sort((a, b) => b[1] - a[1]);
  const total = activeEntries.reduce((s, [, c]) => s + c, 0);
  const dominantUsername = activeEntries[0][0];
  const dominantAccount = accounts.find((a) => a.username === dominantUsername);
  if (!dominantAccount) return null;
  const level = getIntensityLevel(total);
  return level > 0 ? dominantAccount.colors[level - 1] : null;
}

function getCellGradient(
  counts: Record<string, number>,
  accounts: GitHubAccount[],
  enabledAccounts: Set<string>
): string | null {
  const activeEntries = Object.entries(counts).filter(
    ([username, count]) => count > 0 && enabledAccounts.has(username)
  );

  if (activeEntries.length <= 1) return null;

  // Multiple accounts: create a diagonal gradient
  const total = activeEntries.reduce((s, [, c]) => s + c, 0);
  const sorted = [...activeEntries].sort((a, b) => b[1] - a[1]);
  const stops: string[] = [];
  let position = 0;

  for (const [username, count] of sorted) {
    const account = accounts.find((a) => a.username === username);
    if (!account) continue;
    const level = getIntensityLevel(count);
    const color = account.colors[Math.max(level - 1, 0)];
    const pct = (count / total) * 100;
    stops.push(`${color} ${position}%`);
    position += pct;
    stops.push(`${color} ${position}%`);
  }

  return `linear-gradient(135deg, ${stops.join(', ')})`;
}

interface TooltipData {
  date: string;
  counts: Record<string, number>;
  total: number;
  x: number;
  y: number;
}

export function ContributionGrid({
  weeks,
  accounts,
  enabledAccounts,
  lessLabel,
  moreLabel,
}: ContributionGridProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  // Calculate month label positions
  const monthLabels = useMemo(() => {
    if (weeks.length === 0) return [];
    const labels: { month: string; col: number }[] = [];
    let lastMonth = -1;

    for (let w = 0; w < weeks.length; w++) {
      const firstDay = weeks[w].days[0];
      if (!firstDay) continue;
      const month = new Date(firstDay.date + 'T00:00:00').getMonth();
      if (month !== lastMonth) {
        labels.push({ month: MONTHS[month], col: w });
        lastMonth = month;
      }
    }
    return labels;
  }, [weeks]);

  if (weeks.length === 0) return null;

  return (
    <div className="relative">
      {/* Grid container with horizontal scroll on mobile */}
      <div className="overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="inline-block min-w-fit">
          {/* Month labels */}
          <div className="flex ml-7 sm:ml-8 mb-1">
            {monthLabels.map(({ month, col }, i) => {
              const nextCol = monthLabels[i + 1]?.col ?? weeks.length;
              const span = nextCol - col;
              return (
                <div
                  key={`${month}-${col}`}
                  className="text-[10px] sm:text-xs text-text-muted"
                  style={{ width: `${span * 13}px` }}
                >
                  {month}
                </div>
              );
            })}
          </div>

          {/* Grid: day labels + cells */}
          <div className="flex gap-0">
            {/* Day labels */}
            <div className="flex flex-col gap-[2px] sm:gap-[3px] mr-1 pt-0">
              {DAYS.map((day, i) => (
                <div
                  key={i}
                  className="text-[10px] sm:text-xs text-text-muted leading-none"
                  style={{ height: '10px', display: 'flex', alignItems: 'center' }}
                >
                  <span className="w-5 sm:w-6 text-right pr-1">{day}</span>
                </div>
              ))}
            </div>

            {/* Weeks grid */}
            <div className="flex gap-[2px] sm:gap-[3px]">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[2px] sm:gap-[3px]">
                  {week.days.map((day) => {
                    const gradient = getCellGradient(day.counts, accounts, enabledAccounts);
                    const solidColor = !gradient ? getCellColor(day.counts, accounts, enabledAccounts) : null;
                    const isEmpty = day.total === 0 || !Object.entries(day.counts).some(
                      ([u, c]) => c > 0 && enabledAccounts.has(u)
                    );

                    return (
                      <div
                        key={day.date}
                        className={clsx(
                          'rounded-sm cursor-pointer transition-all duration-fast',
                          isEmpty && 'bg-background-card border border-border/50'
                        )}
                        style={{
                          width: '10px',
                          height: '10px',
                          ...(gradient
                            ? { background: gradient }
                            : solidColor
                              ? { backgroundColor: solidColor }
                              : {}),
                        }}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({
                            date: day.date,
                            counts: day.counts,
                            total: day.total,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend scale */}
          <div className="flex items-center gap-1 mt-3 ml-7 sm:ml-8">
            <span className="text-[10px] sm:text-xs text-text-muted mr-1">{lessLabel}</span>
            <div
              className="rounded-sm bg-background-card border border-border/50"
              style={{ width: '10px', height: '10px' }}
            />
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="rounded-sm"
                style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#9CA3AF',
                  opacity: level * 0.25,
                }}
              />
            ))}
            <span className="text-[10px] sm:text-xs text-text-muted ml-1">{moreLabel}</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 8}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="bg-background-card border border-border rounded-lg px-3 py-2 shadow-lg">
            <div className="text-xs text-text-secondary mb-1">
              {new Date(tooltip.date + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            {tooltip.total === 0 ? (
              <div className="text-xs text-text-muted">No contributions</div>
            ) : (
              <>
                <div className="text-sm font-medium text-text-primary">
                  {tooltip.total} contribution{tooltip.total !== 1 ? 's' : ''}
                </div>
                <div className="mt-1 space-y-0.5">
                  {Object.entries(tooltip.counts)
                    .filter(([, c]) => c > 0)
                    .sort(([, a], [, b]) => b - a)
                    .map(([username, count]) => {
                      const account = accounts.find((a) => a.username === username);
                      if (!account) return null;
                      return (
                        <div key={username} className="flex items-center gap-1.5 text-xs">
                          <div
                            className="rounded-full shrink-0"
                            style={{
                              width: '8px',
                              height: '8px',
                              backgroundColor: account.colors[3],
                            }}
                          />
                          <span className="text-text-secondary">{account.company}</span>
                          <span className="text-text-primary font-medium">{count}</span>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
