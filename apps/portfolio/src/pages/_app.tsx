import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ConsentStatus, readConsent } from '@/lib/consent';
import { CookieBanner } from '@/components/CookieBanner';
import { enContent, nlContent, deContent } from '@/config';
import '@/styles/globals.css';

const GA_ID = 'G-Z4XVZ5T2GG';

/** undefined = not read yet (server, or first paint); null = no choice stored. */
type Decision = ConsentStatus | null | undefined;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [consent, setConsent] = useState<Decision>(undefined);

  // Read on the client only: the export is static, so the server cannot know.
  useEffect(() => setConsent(readConsent()), []);

  // Pages are per-locale, so the path is what tells us which language to
  // show the banner in.
  const locale = router.pathname.startsWith('/nl')
    ? 'nl'
    : router.pathname.startsWith('/de')
      ? 'de'
      : 'en';
  const content = { en: enContent, nl: nlContent, de: deContent }[locale];
  const privacyHref = locale === 'en' ? '/privacy' : `/${locale}/privacy`;

  return (
    <>
      {/* Analytics loads only once it has been allowed, so nothing is written
          to the visitor's browser before they choose. */}
      {consent === 'granted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="lazyOnload"
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      <Component {...pageProps} />

      {consent === null && (
        <CookieBanner
          content={content.cookieBanner}
          privacyHref={privacyHref}
          onDecide={setConsent}
        />
      )}
    </>
  );
}
