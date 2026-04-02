import { useMemo } from 'react';
import { ContributionTypeBreakdown } from '@/hooks/useContributions';
import { GitHubAccount } from '@/config';

interface ContributionRadarProps {
  readonly contributionTypes: Record<string, ContributionTypeBreakdown>;
  readonly accounts: GitHubAccount[];
  readonly enabledAccounts: Set<string>;
  readonly labels: {
    commits: string;
    pullRequests: string;
    reviews: string;
    issues: string;
  };
}

const SIZE = 220;
const CENTER = SIZE / 2;
const RADIUS = 75;
const AXES = ['commits', 'reviews', 'pullRequests', 'issues'] as const;
// Angles: top, right, bottom, left (clockwise from top)
const ANGLES = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];

function polarToCartesian(angle: number, distance: number): [number, number] {
  return [CENTER + distance * Math.cos(angle), CENTER + distance * Math.sin(angle)];
}

export function ContributionRadar({
  contributionTypes,
  accounts,
  enabledAccounts,
  labels,
}: ContributionRadarProps) {
  const { aggregated, maxValue, percentages } = useMemo(() => {
    const agg: ContributionTypeBreakdown = { commits: 0, pullRequests: 0, reviews: 0, issues: 0 };

    for (const [username, types] of Object.entries(contributionTypes)) {
      if (!enabledAccounts.has(username)) continue;
      agg.commits += types.commits;
      agg.pullRequests += types.pullRequests;
      agg.reviews += types.reviews;
      agg.issues += types.issues;
    }

    const total = agg.commits + agg.pullRequests + agg.reviews + agg.issues;
    const max = Math.max(agg.commits, agg.pullRequests, agg.reviews, agg.issues, 1);

    const pct = {
      commits: total > 0 ? Math.round((agg.commits / total) * 100) : 0,
      pullRequests: total > 0 ? Math.round((agg.pullRequests / total) * 100) : 0,
      reviews: total > 0 ? Math.round((agg.reviews / total) * 100) : 0,
      issues: total > 0 ? Math.round((agg.issues / total) * 100) : 0,
    };

    return { aggregated: agg, maxValue: max, percentages: pct };
  }, [contributionTypes, enabledAccounts]);

  // Build polygon points
  const polygonPoints = useMemo(() => {
    return AXES.map((axis, i) => {
      const value = aggregated[axis];
      const normalized = maxValue > 0 ? value / maxValue : 0;
      const distance = normalized * RADIUS;
      return polarToCartesian(ANGLES[i], distance);
    });
  }, [aggregated, maxValue]);

  // Determine fill color — blend enabled accounts or use accent
  const fillColor = useMemo(() => {
    const enabled = accounts.filter((a) => enabledAccounts.has(a.username));
    if (enabled.length === 1) return enabled[0].colors[2];
    return 'var(--accent-primary)';
  }, [accounts, enabledAccounts]);

  const labelMap: Record<string, string> = {
    commits: labels.commits,
    reviews: labels.reviews,
    pullRequests: labels.pullRequests,
    issues: labels.issues,
  };

  // Axis grid rings
  const rings = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[200px]"
        role="img"
        aria-label="Contribution type breakdown"
      >
        {/* Grid rings */}
        {rings.map((scale) => (
          <polygon
            key={scale}
            points={ANGLES.map((angle) => polarToCartesian(angle, RADIUS * scale).join(',')).join(' ')}
            fill="none"
            stroke="var(--border-color)"
            strokeWidth="1"
            opacity="0.6"
          />
        ))}

        {/* Axis lines */}
        {ANGLES.map((angle, i) => {
          const [x, y] = polarToCartesian(angle, RADIUS);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="var(--border-color)"
              strokeWidth="1"
              opacity="0.6"
            />
          );
        })}

        {/* Data polygon */}
        {polygonPoints.length > 0 && (
          <>
            <polygon
              points={polygonPoints.map((p) => p.join(',')).join(' ')}
              fill={fillColor}
              fillOpacity="0.4"
              stroke={fillColor}
              strokeWidth="2"
            />
            {/* Data points */}
            {polygonPoints.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill={fillColor} stroke="white" strokeWidth="1" />
            ))}
          </>
        )}

        {/* Axis labels on chart */}
        {AXES.map((axis, i) => {
          const [x, y] = polarToCartesian(ANGLES[i], RADIUS + 14);
          return (
            <text
              key={axis}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-text-secondary"
              fontSize="8"
              fontWeight="500"
            >
              {labelMap[axis]}
            </text>
          );
        })}

        {/* Center dot */}
        <circle cx={CENTER} cy={CENTER} r="2" fill="var(--border-color)" />
      </svg>

      {/* Labels with percentages */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4">
        {AXES.map((axis) => (
          <div key={axis} className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text-primary">{percentages[axis]}%</span>
            <span className="text-xs text-text-secondary">{labelMap[axis]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
