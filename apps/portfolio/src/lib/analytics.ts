declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    gtag?: (..._args: unknown[]) => void;
  }
}

/**
 * Sends a GA4 event. No-ops when gtag has not loaded (ad blockers, the
 * lazyOnload script not having run yet), so callers never need to guard.
 */
export function trackEvent(name: string, params: Record<string, string> = {}) {
  window.gtag?.('event', name, params);
}

/**
 * CV download. `file_download` is a GA4 recommended event name, so it lines up
 * with the built-in reports.
 */
export function trackCvDownload(location: string) {
  trackEvent('file_download', {
    file_name: 'vikum-samaranayake-cv.pdf',
    file_extension: 'pdf',
    link_location: location,
  });
}

/**
 * The secondary call to action. `location` tells the three placements apart in
 * GA: sidebar (desktop), mobile_menu, mobile_profile.
 */
export function trackCtaClick(location: string) {
  trackEvent('cta_click', { cta_id: 'hire', cta_location: location });
}
