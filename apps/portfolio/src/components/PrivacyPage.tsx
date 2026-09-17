import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { SiteContent } from '@/types';
import { clearConsent } from '@/lib/consent';

interface PrivacyPageProps {
  readonly content: SiteContent;
  /** Locale for <html lang>; 'en' pages leave it alone. */
  readonly locale?: 'nl' | 'de';
  /** Path this page canonicalises to, e.g. '/nl/privacy/'. */
  readonly canonical: string;
}

/**
 * The privacy page for every locale. Copy lives in content.<lang>.ts, so this
 * file holds only layout.
 */
export function PrivacyPage({ content, locale, canonical }: PrivacyPageProps) {
  const { privacy, cookieBanner } = content;
  const [withdrawn, setWithdrawn] = useState(false);

  useEffect(() => {
    if (!locale) return;
    document.documentElement.lang = locale;
    return () => {
      document.documentElement.lang = 'en';
    };
  }, [locale]);

  // Paragraphs carry inline HTML and a {email} placeholder, so the address is
  // declared once in the profile rather than repeated in three languages.
  const render = (html: string) => ({
    __html: html.replaceAll('{email}', content.profile.email),
  });

  return (
    <>
      <Head>
        <title>{privacy.metaTitle}</title>
        <meta name="description" content={privacy.metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://vikum.dev${canonical}`} />
        <link rel="alternate" hrefLang="en" href="https://vikum.dev/privacy/" />
        <link rel="alternate" hrefLang="nl" href="https://vikum.dev/nl/privacy/" />
        <link rel="alternate" hrefLang="de" href="https://vikum.dev/de/privacy/" />
        <link rel="alternate" hrefLang="x-default" href="https://vikum.dev/privacy/" />
      </Head>

      <main className="min-h-screen bg-background-base px-6 py-16 lg:py-24">
        <article className="max-w-2xl mx-auto">
          <Link
            href={locale ? `/${locale}` : '/'}
            className="text-sm text-text-secondary hover:text-accent-primary transition-colors"
          >
            {privacy.backLabel}
          </Link>

          <h1 className="heading-lg mt-8">{privacy.heading}</h1>
          <p className="text-sm text-text-muted mt-2">
            {privacy.lastUpdatedLabel} {privacy.lastUpdated}
          </p>

          <div className="mt-10 space-y-6 text-text-secondary leading-relaxed [&_a]:text-accent-primary [&_a]:underline [&_code]:text-text-primary">
            {privacy.intro.map((para) => (
              <p key={para.slice(0, 40)} dangerouslySetInnerHTML={render(para)} />
            ))}

            {privacy.sections.map((section) => (
              <section key={section.heading} className="space-y-6">
                <h2 className="heading-md text-text-primary pt-4">
                  {section.heading}
                </h2>
                {section.paragraphs.map((para) => (
                  <p key={para.slice(0, 40)} dangerouslySetInnerHTML={render(para)} />
                ))}
              </section>
            ))}

            <p className="pt-4">
              <button
                type="button"
                onClick={() => {
                  clearConsent();
                  setWithdrawn(true);
                }}
                className="text-accent-primary underline hover:no-underline"
              >
                {cookieBanner.withdrawLabel}
              </button>
              {withdrawn && (
                <span className="ml-2 text-text-muted">
                  {cookieBanner.withdrawDoneLabel}
                </span>
              )}
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
