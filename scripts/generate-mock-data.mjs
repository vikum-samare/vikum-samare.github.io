#!/usr/bin/env node

/**
 * Generate mock contribution data for development/demo purposes.
 * Run: node scripts/generate-mock-data.mjs
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'apps', 'portfolio', 'public', 'data', 'contributions');

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateYearData(year, avgDaily, seed) {
  const rand = seededRandom(seed);
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  // Adjust start to the beginning of the week (Sunday)
  const startDay = startDate.getDay();
  const calendarStart = new Date(startDate);
  calendarStart.setDate(calendarStart.getDate() - startDay);

  const weeks = [];
  let totalContributions = 0;
  let totalCommits = 0;
  let totalPRs = 0;
  let totalReviews = 0;
  let totalIssues = 0;
  const current = new Date(calendarStart);

  while (current <= endDate || current.getDay() !== 0) {
    const week = { contributionDays: [] };

    for (let d = 0; d < 7; d++) {
      const dateStr = current.toISOString().split('T')[0];
      const isInYear = current.getFullYear() === year;
      const isWeekday = current.getDay() > 0 && current.getDay() < 6;

      let count = 0;
      if (isInYear) {
        // Higher activity on weekdays
        const base = isWeekday ? avgDaily * 1.5 : avgDaily * 0.3;
        // Some random bursts
        const burst = rand() > 0.85 ? rand() * 8 : 0;
        count = Math.max(0, Math.round(base * rand() + burst));
      }

      week.contributionDays.push({ date: dateStr, count });
      totalContributions += count;

      // Distribute among types roughly
      if (count > 0) {
        const commits = Math.round(count * (0.4 + rand() * 0.2));
        const prs = Math.round(count * (0.15 + rand() * 0.15));
        const reviews = Math.round(count * (0.15 + rand() * 0.15));
        const issues = Math.max(0, count - commits - prs - reviews);
        totalCommits += commits;
        totalPRs += prs;
        totalReviews += reviews;
        totalIssues += issues;
      }

      current.setDate(current.getDate() + 1);

      if (current > endDate && current.getDay() === 0) break;
    }

    if (week.contributionDays.length > 0) {
      weeks.push(week);
    }

    if (current > endDate && current.getDay() === 0) break;
  }

  return {
    year,
    totalContributions,
    contributionTypes: {
      commits: totalCommits,
      pullRequests: totalPRs,
      reviews: totalReviews,
      issues: totalIssues,
    },
    weeks,
  };
}

const accountConfigs = [
  { username: 'vikum-samare', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], avgDaily: 1.2, seedBase: 100 },
  { username: 'vikum-pg', years: [2022, 2023, 2024, 2025], avgDaily: 2.5, seedBase: 200 },
  { username: 'vikum-aeturnum', years: [2021], avgDaily: 1.8, seedBase: 300 },
  { username: 'vikum-noetic', years: [2018, 2019, 2020, 2021], avgDaily: 2.0, seedBase: 400 },
];

for (const config of accountConfigs) {
  const dir = join(DATA_DIR, config.username);
  mkdirSync(dir, { recursive: true });

  for (const year of config.years) {
    const data = generateYearData(year, config.avgDaily, config.seedBase + year);
    const filePath = join(dir, `${year}.json`);
    writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    console.log(`Generated: ${config.username}/${year}.json (${data.totalContributions} contributions)`);
  }
}

// Update manifest with all available years
const manifest = {
  accounts: [
    {
      username: 'vikum-samare',
      company: 'Personal',
      colors: ['#E0E7FF', '#A5B4FC', '#818CF8', '#6366F1'],
      startYear: 2018,
      endYear: null,
      active: true,
      availableYears: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
    },
    {
      username: 'vikum-pg',
      company: 'PropertyGuru',
      colors: ['#FECDD3', '#F87171', '#DC2626', '#CC1735'],
      startYear: 2022,
      endYear: null,
      active: true,
      availableYears: [2022, 2023, 2024, 2025],
    },
    {
      username: 'vikum-aeturnum',
      company: 'Aeturnum',
      colors: ['#FED7AA', '#FDBA74', '#F59E0B', '#E8882F'],
      startYear: 2021,
      endYear: 2021,
      active: false,
      availableYears: [2021],
    },
    {
      username: 'vikum-noetic',
      company: 'Noetic',
      colors: ['#CCFBF1', '#5EEAD4', '#14B8A6', '#2DD4BF'],
      startYear: 2018,
      endYear: 2021,
      active: false,
      availableYears: [2018, 2019, 2020, 2021],
    },
  ],
  lastUpdated: new Date().toISOString(),
};

writeFileSync(join(DATA_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log('\nManifest updated');
console.log('Done!');
