import { useState, useEffect, useMemo, useCallback } from 'react';
import { GitHubAccount, githubAccounts } from '@/config';

export interface ContributionDay {
  date: string;
  counts: Record<string, number>; // username -> count
  total: number;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionTypeBreakdown {
  commits: number;
  pullRequests: number;
  reviews: number;
  issues: number;
}

export interface AccountYearData {
  year: number;
  totalContributions: number;
  contributionTypes: ContributionTypeBreakdown | null;
  weeks: { contributionDays: { date: string; count: number }[] }[];
}

interface ManifestAccount {
  username: string;
  company: string;
  colors: string[];
  startYear: number;
  endYear: number | null;
  active: boolean;
  availableYears: number[];
}

interface Manifest {
  accounts: ManifestAccount[];
  lastUpdated: string;
}

export interface UseContributionsResult {
  mergedWeeks: ContributionWeek[];
  totalContributions: number;
  contributionTypes: Record<string, ContributionTypeBreakdown>;
  availableYears: number[];
  selectedYear: number;
  // eslint-disable-next-line no-unused-vars
  setSelectedYear: (year: number) => void;
  enabledAccounts: Set<string>;
  // eslint-disable-next-line no-unused-vars
  toggleAccount: (username: string) => void;
  accounts: GitHubAccount[];
  accountTotals: Record<string, number>;
  isLoading: boolean;
  error: string | null;
}

const BASE_PATH = '/data/contributions';

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return res.json();
}

export function useContributions(): UseContributionsResult {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [accountData, setAccountData] = useState<Record<string, AccountYearData>>({});
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [enabledAccounts, setEnabledAccounts] = useState<Set<string>>(
    () => new Set(githubAccounts.map((a) => a.username))
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load manifest
  useEffect(() => {
    fetchJSON<Manifest>(`${BASE_PATH}/manifest.json`)
      .then((m) => {
        setManifest(m);
        // Set to the latest available year
        const allYears = m.accounts.flatMap((a) => a.availableYears);
        const maxYear = Math.max(...allYears);
        if (maxYear > 0) setSelectedYear(maxYear);
      })
      .catch((e) => setError(e.message));
  }, []);

  // Load data for selected year + enabled accounts
  useEffect(() => {
    if (!manifest) return;

    const accountsToFetch = manifest.accounts.filter(
      (a) => enabledAccounts.has(a.username) && a.availableYears.includes(selectedYear)
    );

    if (accountsToFetch.length === 0) {
      setAccountData({});
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    Promise.all(
      accountsToFetch.map((a) =>
        fetchJSON<AccountYearData>(`${BASE_PATH}/${a.username}/${selectedYear}.json`)
          .then((data) => ({ username: a.username, data }))
          .catch(() => null)
      )
    ).then((results) => {
      const newData: Record<string, AccountYearData> = {};
      for (const r of results) {
        if (r) newData[r.username] = r.data;
      }
      setAccountData(newData);
      setIsLoading(false);
    });
  }, [manifest, selectedYear, enabledAccounts]);

  const toggleAccount = useCallback((username: string) => {
    setEnabledAccounts((prev) => {
      const next = new Set(prev);
      if (next.has(username)) {
        next.delete(username);
      } else {
        next.add(username);
      }
      return next;
    });
  }, []);

  // Available years across all accounts
  const availableYears = useMemo(() => {
    if (!manifest) return [];
    const years = new Set<number>();
    for (const a of manifest.accounts) {
      for (const y of a.availableYears) {
        years.add(y);
      }
    }
    return [...years].sort((a, b) => b - a);
  }, [manifest]);

  // Merge contribution data from all accounts
  const { mergedWeeks, totalContributions, accountTotals, contributionTypes } = useMemo(() => {
    const usernames = Object.keys(accountData);
    if (usernames.length === 0) {
      return { mergedWeeks: [], totalContributions: 0, accountTotals: {}, contributionTypes: {} };
    }

    // Build a date -> counts map
    const dateMap: Record<string, Record<string, number>> = {};
    const totals: Record<string, number> = {};
    const types: Record<string, ContributionTypeBreakdown> = {};

    for (const username of usernames) {
      const data = accountData[username];
      totals[username] = data.totalContributions;
      if (data.contributionTypes) {
        types[username] = data.contributionTypes;
      }

      for (const week of data.weeks) {
        for (const day of week.contributionDays) {
          if (!dateMap[day.date]) dateMap[day.date] = {};
          dateMap[day.date][username] = (dateMap[day.date][username] || 0) + day.count;
        }
      }
    }

    // Use the first account's week structure as the base
    const baseData = accountData[usernames[0]];
    const weeks: ContributionWeek[] = baseData.weeks.map((week) => ({
      days: week.contributionDays.map((day) => {
        const counts = dateMap[day.date] || {};
        return {
          date: day.date,
          counts,
          total: Object.values(counts).reduce((s, c) => s + c, 0),
        };
      }),
    }));

    const total = Object.values(totals).reduce((s, t) => s + t, 0);

    return { mergedWeeks: weeks, totalContributions: total, accountTotals: totals, contributionTypes: types };
  }, [accountData]);

  return {
    mergedWeeks,
    totalContributions,
    contributionTypes,
    availableYears,
    selectedYear,
    setSelectedYear,
    enabledAccounts,
    toggleAccount,
    accounts: githubAccounts as unknown as GitHubAccount[],
    accountTotals,
    isLoading,
    error,
  };
}
