import { ContributionsContent } from '@/types';
import { SectionHeader, Icons } from '@/components/ui';
import { ContributionGrid } from '@/components/ui/ContributionGrid';
import { ContributionRadar } from '@/components/ui/ContributionRadar';
import { ContributionLegend } from '@/components/ui/ContributionLegend';
import { useContributions } from '@/hooks/useContributions';
import clsx from 'clsx';

interface ContributionsSectionProps {
  readonly content: ContributionsContent;
}

export function ContributionsSection({ content }: ContributionsSectionProps) {
  const {
    mergedWeeks,
    totalContributions,
    contributionTypes,
    availableYears,
    selectedYear,
    setSelectedYear,
    enabledAccounts,
    toggleAccount,
    accounts,
    accountTotals,
    isLoading,
  } = useContributions();

  return (
    <section id="contributions" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl">
        <SectionHeader
          label={content.sectionLabel}
          icon={<Icons.GitHub width={16} height={16} />}
        />

        <h2 className="heading-lg mt-6 sm:mt-8">
          {content.heading}{' '}
          <span className="accent-text">{content.headingAccent}</span>
        </h2>

        {isLoading ? (
          <div className="mt-10 sm:mt-12 flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="mt-8 sm:mt-12">
            {/* Total count */}
            <div className="mb-4">
              <div className="text-text-secondary">
                <span className="text-xl sm:text-2xl font-semibold text-text-primary">
                  {totalContributions.toLocaleString()}
                </span>{' '}
                {content.contributionsLabel} in {selectedYear}
              </div>
            </div>

            {/* Legend — horizontal scroll on mobile */}
            <div className="mb-5 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              <ContributionLegend
                accounts={accounts}
                enabledAccounts={enabledAccounts}
                accountTotals={accountTotals}
                onToggle={toggleAccount}
              />
            </div>

            {/* Year filter — horizontal scroll on mobile, above the grid */}
            <div className="flex md:hidden gap-1.5 mb-4 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={clsx(
                    'px-2.5 py-1 text-xs rounded-full shrink-0 transition-all duration-normal',
                    'border',
                    year === selectedYear
                      ? 'bg-accent-primary text-text-inverted border-accent-primary font-medium'
                      : 'text-text-secondary border-border hover:text-text-primary hover:bg-state-hover'
                  )}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Grid + Year filter layout */}
            <div className="flex gap-6">
              {/* Heatmap grid */}
              <div className="flex-1 min-w-0">
                {mergedWeeks.length > 0 ? (
                  <ContributionGrid
                    weeks={mergedWeeks}
                    accounts={accounts}
                    enabledAccounts={enabledAccounts}
                    lessLabel={content.lessLabel}
                    moreLabel={content.moreLabel}
                  />
                ) : (
                  <div className="flex items-center justify-center py-16 text-text-muted">
                    {content.noDataLabel}
                  </div>
                )}
              </div>

              {/* Year filter — desktop only */}
              <div className="hidden md:flex flex-col gap-1 shrink-0">
                {availableYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={clsx(
                      'px-3 py-1 text-sm rounded-md transition-all duration-normal',
                      year === selectedYear
                        ? 'bg-accent-primary text-text-inverted font-medium'
                        : 'text-text-secondary hover:text-text-primary hover:bg-state-hover'
                    )}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Radar chart section */}
            {Object.keys(contributionTypes).length > 0 && (
              <div className="mt-8 sm:mt-10">
                <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
                  Activity Overview
                </h3>
                <div className="flex justify-center sm:justify-start">
                  <ContributionRadar
                    contributionTypes={contributionTypes}
                    accounts={accounts}
                    enabledAccounts={enabledAccounts}
                    labels={content.contributionTypes}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
