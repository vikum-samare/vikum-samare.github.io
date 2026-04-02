#!/usr/bin/env node

/**
 * GitHub Contributions Data Fetcher
 *
 * Fetches contribution data from GitHub for multiple accounts.
 * Uses GraphQL API (with PAT) when available, otherwise falls back to
 * scraping the public contributions page (no auth needed).
 *
 * Usage:
 *   node scripts/fetch-contributions.mjs              # Fetch active accounts, current year
 *   node scripts/fetch-contributions.mjs --full       # Backfill all accounts, all years
 *   node scripts/fetch-contributions.mjs --year 2023  # Fetch specific year for active accounts
 *
 * Environment variables (optional per-account PATs for richer data):
 *   GH_PAT_PERSONAL    - PAT for vikum-samare
 *   GH_PAT_PG          - PAT for vikum-pg
 *   GH_PAT_AETURNUM    - PAT for vikum-aeturnum
 *   GH_PAT_NOETIC      - PAT for vikum-noetic
 *
 * Accounts without PATs will use the public profile page (levels 0-4 only,
 * no contribution type breakdown).
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'apps', 'portfolio', 'public', 'data', 'contributions');

const ACCOUNTS = [
  {
    username: 'vikum-samare',
    company: 'Personal',
    colors: ['#E0E7FF', '#A5B4FC', '#818CF8', '#6366F1'],
    startYear: 2018,
    endYear: null,
    active: true,
    patEnvVar: 'GH_PAT_PERSONAL',
  },
  {
    username: 'vikum-pg',
    company: 'PropertyGuru',
    colors: ['#FECDD3', '#F87171', '#DC2626', '#CC1735'],
    startYear: 2022,
    endYear: null,
    active: true,
    patEnvVar: 'GH_PAT_PG',
  },
  {
    username: 'vikum-aeturnum',
    company: 'Aeturnum',
    colors: ['#FED7AA', '#FDBA74', '#F59E0B', '#E8882F'],
    startYear: 2021,
    endYear: 2021,
    active: false,
    patEnvVar: 'GH_PAT_AETURNUM',
  },
  {
    username: 'vikum-noetic',
    company: 'Noetic',
    colors: ['#CCFBF1', '#5EEAD4', '#14B8A6', '#2DD4BF'],
    startYear: 2018,
    endYear: 2021,
    active: false,
    patEnvVar: 'GH_PAT_NOETIC',
  },
];

/* ---------- GraphQL (authenticated) ---------- */

const CONTRIBUTIONS_QUERY = `
query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
`;

async function fetchContributionsGraphQL(username, token, year) {
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'vikum-portfolio-contributions-fetcher',
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { username, from, to },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error for ${username}/${year}: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL errors for ${username}/${year}: ${JSON.stringify(data.errors)}`);
  }

  const collection = data.data?.user?.contributionsCollection;
  if (!collection) {
    throw new Error(`No contribution data found for ${username}/${year}`);
  }

  return {
    year,
    totalContributions: collection.contributionCalendar.totalContributions,
    contributionTypes: {
      commits: collection.totalCommitContributions,
      pullRequests: collection.totalPullRequestContributions,
      reviews: collection.totalPullRequestReviewContributions,
      issues: collection.totalIssueContributions,
    },
    weeks: collection.contributionCalendar.weeks.map((week) => ({
      contributionDays: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
      })),
    })),
    source: 'graphql',
  };
}

/* ---------- Public HTML scraper (no auth) ---------- */

// Approximate contribution counts per level (used to estimate daily counts)
const LEVEL_COUNTS = [0, 1, 4, 8, 14];

async function fetchContributionsPublic(username, year) {
  const url = `https://github.com/users/${encodeURIComponent(username)}/contributions?from=${year}-01-01&to=${year}-12-31`;
  const response = await fetch(url, {
    headers: { 'User-Agent': 'vikum-portfolio-contributions-fetcher' },
  });

  if (!response.ok) {
    throw new Error(`Public fetch failed for ${username}/${year}: ${response.status}`);
  }

  const html = await response.text();

  // Extract total contributions from the <h2> header (e.g. "  944\n contributions")
  const totalMatch = html.match(/(\d[\d,]*)\s*\n\s*contributions/);
  const totalContributions = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 0;

  // Parse all contribution cells: <td ... data-date="YYYY-MM-DD" ... data-level="N" ...>
  // The cells appear in the HTML grouped by day-of-week rows, each row has 53 cells (one per week).
  // Row 0 = Sunday, Row 1 = Monday, ... Row 6 = Saturday
  const cellRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
  const dayMap = new Map(); // date -> level
  let match;
  while ((match = cellRegex.exec(html)) !== null) {
    dayMap.set(match[1], parseInt(match[2], 10));
  }

  if (dayMap.size === 0) {
    throw new Error(`No contribution cells found for ${username}/${year}`);
  }

  // Calculate raw estimated counts from levels
  const entries = [...dayMap.entries()].sort(([a], [b]) => a.localeCompare(b));
  const rawSum = entries.reduce((sum, [, level]) => sum + LEVEL_COUNTS[level], 0);

  // Scale factor to match the real total
  const scale = rawSum > 0 ? totalContributions / rawSum : 1;

  // Build weeks structure (Sun-based weeks matching GitHub's calendar)
  const weeks = [];
  let currentWeek = { contributionDays: [] };

  for (const [date, level] of entries) {
    const dow = new Date(date + 'T00:00:00').getDay(); // 0 = Sun
    if (dow === 0 && currentWeek.contributionDays.length > 0) {
      weeks.push(currentWeek);
      currentWeek = { contributionDays: [] };
    }
    currentWeek.contributionDays.push({
      date,
      count: Math.round(LEVEL_COUNTS[level] * scale),
    });
  }
  if (currentWeek.contributionDays.length > 0) {
    weeks.push(currentWeek);
  }

  return {
    year,
    totalContributions,
    contributionTypes: null, // Not available from public page
    weeks,
    source: 'public',
  };
}

/* ---------- Shared helpers ---------- */

async function fetchContributions(username, token, year) {
  if (token) {
    return fetchContributionsGraphQL(username, token, year);
  }
  return fetchContributionsPublic(username, year);
}

function writeContributionData(username, year, data) {
  const dir = join(DATA_DIR, username);
  mkdirSync(dir, { recursive: true });
  const filePath = join(dir, `${year}.json`);
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  const sourceTag = data.source === 'public' ? ' [public]' : '';
  console.log(`  Written: ${username}/${year}.json (${data.totalContributions} contributions${sourceTag})`);
}

function updateManifest(results) {
  const manifestPath = join(DATA_DIR, 'manifest.json');
  let manifest = { accounts: [], lastUpdated: '' };

  if (existsSync(manifestPath)) {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  }

  for (const { account, years } of results) {
    const existing = manifest.accounts.find((a) => a.username === account.username);
    const availableYears = [...new Set([...(existing?.availableYears || []), ...years])].sort();

    if (existing) {
      existing.availableYears = availableYears;
    } else {
      manifest.accounts.push({
        username: account.username,
        company: account.company,
        colors: account.colors,
        startYear: account.startYear,
        endYear: account.endYear,
        active: account.active,
        availableYears,
      });
    }
  }

  manifest.lastUpdated = new Date().toISOString();
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\nManifest updated: ${manifestPath}`);
}

async function main() {
  const args = process.argv.slice(2);
  const isFull = args.includes('--full');
  const yearIdx = args.indexOf('--year');
  const specificYear = yearIdx !== -1 ? parseInt(args[yearIdx + 1], 10) : null;
  const currentYear = new Date().getFullYear();

  console.log(`GitHub Contributions Fetcher`);
  console.log(`Mode: ${isFull ? 'Full backfill' : specificYear ? `Year ${specificYear}` : 'Active accounts only'}\n`);

  const results = [];

  for (const account of ACCOUNTS) {
    const token = process.env[account.patEnvVar] || null;

    // Determine which years to fetch
    let yearsToFetch;
    if (isFull) {
      const end = account.endYear || currentYear;
      yearsToFetch = [];
      for (let y = account.startYear; y <= end; y++) {
        yearsToFetch.push(y);
      }
    } else if (specificYear) {
      yearsToFetch = [specificYear];
    } else {
      // Default: only current year for active accounts
      if (!account.active) {
        console.log(`⏭ Skipping ${account.username} (inactive)`);
        continue;
      }
      yearsToFetch = [currentYear];
    }

    const method = token ? 'GraphQL' : 'public profile';
    console.log(`\n📥 Fetching ${account.username} (${account.company}) via ${method}:`);
    const fetchedYears = [];

    for (const year of yearsToFetch) {
      try {
        const data = await fetchContributions(account.username, token, year);
        writeContributionData(account.username, year, data);
        fetchedYears.push(year);
      } catch (error) {
        console.error(`  ✗ Error for ${year}: ${error.message}`);
      }
    }

    if (fetchedYears.length > 0) {
      results.push({ account, years: fetchedYears });
    }
  }

  if (results.length > 0) {
    updateManifest(results);
  }

  console.log('\n✓ Done');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
