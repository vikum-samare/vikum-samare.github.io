import Head from 'next/head';
import { enContent } from '@/config';
import { Layout } from '@/components/layout';
import {
  HeroSection,
  AboutSection,
  ResumeSection,
  ContributionsSection,
  ServicesSection,
  SkillsSection,
  PortfolioSection,
} from '@/components/sections';

export default function HomePage() {
  const content = enContent;

  return (
    <>
      <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
        <meta name="keywords" content="Vikum Samaranayake, Vikum, fullstack engineer, mobile developer, Singapore, React, Next.js, TypeScript, Node.js" />
        <link rel="canonical" href="https://vikum.dev/" />
        <link rel="alternate" hrefLang="en" href="https://vikum.dev/" />
        <link rel="alternate" hrefLang="de" href="https://vikum.dev/de/" />
        <link rel="alternate" hrefLang="nl" href="https://vikum.dev/nl/" />
        <link rel="alternate" hrefLang="x-default" href="https://vikum.dev/" />
        <meta property="og:title" content={content.meta.title} />
        <meta property="og:description" content={content.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vikum.dev/" />
        <meta property="og:image" content="https://vikum.dev/profile.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content.meta.title} />
        <meta name="twitter:description" content={content.meta.description} />
        <meta name="twitter:image" content="https://vikum.dev/profile.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Vikum Samaranayake',
            url: 'https://vikum.dev/',
            image: 'https://vikum.dev/profile.webp',
            jobTitle: 'Fullstack Engineer & Mobile Developer',
            worksFor: { '@type': 'Organization', name: 'Freelance' },
            address: { '@type': 'PostalAddress', addressLocality: 'Singapore' },
            sameAs: [
              'https://github.com/vikum-samare',
              'https://www.linkedin.com/in/vikum-samaranayake',
              'https://www.instagram.com/vikum_samare',
              'https://www.youtube.com/@vikumsamaranayake1723',
            ],
          }) }}
        />
      </Head>

      <Layout content={content}>
        <HeroSection content={content.hero} />
        <AboutSection content={content.about} />
        <ResumeSection content={content.resume} />
        <ContributionsSection content={content.contributions} />
        <ServicesSection content={content.services} />
        <SkillsSection content={content.skills} />
        <PortfolioSection content={content.portfolio} />
      </Layout>
    </>
  );
}
