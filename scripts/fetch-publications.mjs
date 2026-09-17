#!/usr/bin/env node

/**
 * Medium Publications Fetcher
 *
 * Reads apps/portfolio/src/config/publications.json for a Medium handle and an
 * optional list of article URLs, then pulls title, cover image, excerpt and
 * publication date from the author's RSS feed and writes them to
 * apps/portfolio/src/data/publications.json.
 *
 * The data is imported at build time rather than fetched in the browser, so the
 * cards end up in the static HTML and stay crawlable. Medium answers 403 to
 * non-browser clients on article pages, which is why the RSS feed is the source
 * rather than scraping each URL.
 *
 * Usage:
 *   node scripts/fetch-publications.mjs
 *
 * On failure it keeps whatever was fetched last time, so a Medium outage never
 * breaks a deploy.
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_DIR = join(__dirname, '..', 'apps', 'portfolio');
const CONFIG_PATH = join(APP_DIR, 'src', 'config', 'publications.json');
const OUTPUT_PATH = join(APP_DIR, 'src', 'data', 'publications.json');

const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/** Strips the tracking query string so config URLs and feed URLs compare equal. */
function normaliseUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`.replace(/\/$/, '').toLowerCase();
  } catch {
    return url.trim().replace(/\/$/, '').toLowerCase();
  }
}

/** Drops Medium's ?source=rss-... tracking parameter. */
function canonicalUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return url;
  }
}

function decodeEntities(text) {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

function unwrapCdata(value = '') {
  const match = value.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return (match ? match[1] : value).trim();
}

function tagValue(itemXml, tag) {
  const match = itemXml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? unwrapCdata(match[1]) : '';
}

/** First image in the post body is Medium's cover image. */
function coverImage(html) {
  const match = html.match(/<img[^>]+src="([^"]+)"/i);
  if (!match) return '';
  // Medium serves resizable CDN urls; ask for a width that suits a card.
  return match[1].replace(/\/max\/\d+\//, '/max/1200/');
}

function excerpt(html, limit = 180) {
  // Medium opens most posts with a <figure> whose <figcaption> credits the
  // cover photo; that is not what the article is about.
  const body = html.replace(/<figure[\s\S]*?<\/figure>/gi, ' ');
  const text = decodeEntities(body.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= limit) return text;
  return `${text.slice(0, text.lastIndexOf(' ', limit))}…`;
}

function parseFeed(xml) {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

  return items.map((item) => {
    const body = tagValue(item, 'content:encoded');
    const published = tagValue(item, 'pubDate');
    const categories = [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)]
      .map((m) => unwrapCdata(m[1]))
      .filter(Boolean);

    return {
      title: decodeEntities(tagValue(item, 'title')),
      url: canonicalUrl(tagValue(item, 'link')),
      coverUrl: coverImage(body),
      excerpt: excerpt(body),
      publishedAt: published ? new Date(published).toISOString().slice(0, 10) : '',
      tags: categories.slice(0, 4),
    };
  });
}

async function main() {
  if (!existsSync(CONFIG_PATH)) {
    console.error(`No config at ${CONFIG_PATH}`);
    process.exit(1);
  }

  const config = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
  const handle = (config.handle ?? '').replace(/^@/, '').trim();
  const include = (config.include ?? []).map(normaliseUrl);

  if (!handle) {
    console.log('No Medium handle configured; writing an empty list.');
    write([]);
    return;
  }

  const feedUrl = `https://medium.com/feed/@${handle}`;
  console.log(`Fetching ${feedUrl}`);

  let articles;
  try {
    const response = await fetch(feedUrl, { headers: { 'User-Agent': USER_AGENT } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const xml = await response.text();
    if (!xml.trimStart().startsWith('<?xml')) {
      throw new Error('response was not RSS (check the handle)');
    }

    articles = parseFeed(xml);
    console.log(`Feed returned ${articles.length} article(s)`);

    // Medium's cdn-images host 301s to its final image host; resolve it now so
    // the browser makes one request instead of two.
    await Promise.all(
      articles.map(async (article) => {
        if (!article.coverUrl) return;
        try {
          const head = await fetch(article.coverUrl, {
            method: 'HEAD',
            headers: { 'User-Agent': USER_AGENT },
          });
          if (head.url) article.coverUrl = head.url;
        } catch {
          // Keep the original url; it still resolves in a browser.
        }
      })
    );
  } catch (error) {
    console.error(`Could not read the feed: ${error.message}`);
    if (existsSync(OUTPUT_PATH)) {
      console.error('Keeping the previously fetched data.');
      return;
    }
    write([]);
    return;
  }

  // An empty `include` means "publish everything in the feed".
  const selected = include.length
    ? include
        .map((wanted) => articles.find((a) => normaliseUrl(a.url) === wanted))
        .filter(Boolean)
    : articles;

  const missing = include.length - selected.length;
  if (missing > 0) {
    console.warn(
      `${missing} configured url(s) were not in the feed. Medium only serves ` +
        'the latest ~10 posts, so older articles need their details added by hand.'
    );
  }

  write(selected);
}

function write(articles) {
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, `${JSON.stringify({ articles }, null, 2)}\n`);
  console.log(`Wrote ${articles.length} article(s) to ${OUTPUT_PATH}`);
}

main();
