import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { enContent, deContent, nlContent } from '@/config';
import { Layout } from '@/components/layout';
import type { SiteContent } from '@/types';

export default function NotFoundPage() {
  const router = useRouter();
  const { locale } = router;

  // Select content based on locale
  const contentMap: Record<string, SiteContent> = {
    en: enContent,
    de: deContent,
    nl: nlContent,
  };
  
  const content = contentMap[locale || 'en'] || enContent;
  const { notFound } = content;

  return (
    <>
      <Head>
        <title>{`${notFound.title} | ${content.profile.name}`}</title>
        <meta name="description" content={notFound.description} />
      </Head>

      <Layout content={content}>
        <div className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-2xl w-full text-center">
            {/* 404 Number */}
            <div className="mb-8">
              <h1 className="text-[150px] md:text-[200px] font-bold leading-none text-accent-primary opacity-20">
                {notFound.heading}
              </h1>
            </div>

            {/* Description */}
            <div className="mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-semibold text-text-primary">
                {notFound.title}
              </h2>
              <p className="text-lg text-text-secondary max-w-md mx-auto">
                {notFound.description}
              </p>
            </div>

            {/* Back to Home Button */}
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-accent-primary hover:bg-accent-secondary text-text-inverted font-medium px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              {notFound.homeButtonText}
            </Link>

            {/* Decorative Elements */}
            <div className="mt-20 flex justify-center gap-4 opacity-30">
              <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
