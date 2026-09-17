import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CookieBannerContent } from '@/types';
import { ConsentStatus, writeConsent } from '@/lib/consent';
import { trackSheen } from '@/components/ui';
import clsx from 'clsx';

interface CookieBannerProps {
  readonly content: CookieBannerContent;
  /** Locale-prefixed path to the privacy page. */
  readonly privacyHref: string;
  // eslint-disable-next-line no-unused-vars
  readonly onDecide: (status: ConsentStatus) => void;
}

export function CookieBanner({ content, privacyHref, onDecide }: CookieBannerProps) {
  // Mount hidden, then reveal, so the banner slides in rather than flashing
  // into place on first paint.
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setShown(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const decide = (status: ConsentStatus) => {
    writeConsent(status);
    setShown(false);
    onDecide(status);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={content.privacyLinkLabel}
      className={clsx(
        'fixed z-[60] left-4 right-4 bottom-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm',
        'transition-all duration-500 ease-out motion-reduce:transition-none',
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <div
        onMouseMove={trackSheen}
        className="liquid-glass rounded-2xl p-5 shadow-lg"
      >
        <p className="text-sm leading-relaxed text-text-secondary">
          {content.message}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => decide('granted')}
            onMouseMove={trackSheen}
            className="liquid-glass liquid-glass-interactive liquid-glass-accent rounded-full px-4 py-2 text-sm font-medium"
          >
            {content.acceptLabel}
          </button>

          <button
            type="button"
            onClick={() => decide('denied')}
            onMouseMove={trackSheen}
            className="liquid-glass liquid-glass-interactive rounded-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
          >
            {content.declineLabel}
          </button>

          <Link
            href={privacyHref}
            className="ml-auto text-xs text-text-muted underline hover:text-accent-primary transition-colors"
          >
            {content.privacyLinkLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
