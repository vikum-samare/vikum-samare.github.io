export type ConsentStatus = 'granted' | 'denied';

/** Bump when the banner's terms change and everyone should be asked again. */
const STORAGE_KEY = 'cookie-consent-v1';

/** How long a decision stands before we ask again. */
const MAX_AGE_DAYS = 365;

interface StoredConsent {
  readonly status: ConsentStatus;
  /** When the choice was made, epoch ms. */
  readonly at: number;
}

/**
 * The visitor's stored decision, or null if they have not made one (or it has
 * expired). Kept in localStorage rather than a cookie: recording a consent
 * decision is strictly necessary, so it does not itself require consent.
 *
 * Returns null rather than throwing when storage is unavailable (private mode,
 * blocked site data), which means the banner shows and nothing is tracked.
 */
export function readConsent(): ConsentStatus | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const stored = JSON.parse(raw) as StoredConsent;
    if (stored.status !== 'granted' && stored.status !== 'denied') return null;

    const ageDays = (Date.now() - stored.at) / 86_400_000;
    if (ageDays > MAX_AGE_DAYS) return null;

    return stored.status;
  } catch {
    return null;
  }
}

/** Records a decision. Silently does nothing if storage is unavailable. */
export function writeConsent(status: ConsentStatus) {
  try {
    const value: StoredConsent = { status, at: Date.now() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Nothing stored means we ask again next visit, which is the safe default.
  }
}

/**
 * Forgets the decision so the banner reappears, and clears the GA cookies that
 * a previous "accept" left behind. Used by the withdraw link on the privacy
 * page, since withdrawing consent has to be as easy as giving it.
 */
export function clearConsent() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore: the cookie clearing below is the part that matters.
  }

  const domain = window.location.hostname;
  document.cookie.split(';').forEach((entry) => {
    const name = entry.split('=')[0]?.trim();
    if (!name?.startsWith('_ga')) return;
    // Expire on both the exact host and the dot-prefixed parent, since GA sets
    // cookies on the registrable domain.
    document.cookie = `${name}=; Max-Age=0; path=/`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
  });
}
