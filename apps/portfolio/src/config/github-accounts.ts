/**
 * GitHub account configuration for contributions component.
 * Language-independent metadata — color palettes, account details, active periods.
 */

export interface GitHubAccount {
  readonly username: string;
  readonly company: string;
  readonly colors: readonly [string, string, string, string];
  readonly startYear: number;
  readonly endYear: number | null;
  readonly active: boolean;
}

export const githubAccounts: readonly GitHubAccount[] = [
  {
    username: 'vikum-samare',
    company: 'Personal',
    colors: ['#E0E7FF', '#A5B4FC', '#818CF8', '#6366F1'],
    startYear: 2018,
    endYear: null,
    active: true,
  },
  {
    username: 'vikum-pg',
    company: 'PropertyGuru',
    colors: ['#FECDD3', '#F87171', '#DC2626', '#CC1735'],
    startYear: 2022,
    endYear: null,
    active: true,
  },
  {
    username: 'vikum-aeturnum',
    company: 'Aeturnum',
    colors: ['#FED7AA', '#FDBA74', '#F59E0B', '#E8882F'],
    startYear: 2021,
    endYear: 2021,
    active: false,
  },
  {
    username: 'vikum-noetic',
    company: 'Noetic',
    colors: ['#CCFBF1', '#5EEAD4', '#14B8A6', '#2DD4BF'],
    startYear: 2018,
    endYear: 2021,
    active: false,
  },
] as const;
