import { useEffect } from 'react';
import Head from 'next/head';
import { deContent } from '@/config';
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

export default function DeHomePage() {
  const content = deContent;

  useEffect(() => {
    document.documentElement.lang = 'de';
    return () => {
      document.documentElement.lang = 'en';
    };
  }, []);

  return (
    <>
      <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
        <meta name="keywords" content="Vikum Samaranayake, Vikum, Fullstack-Ingenieur, Mobile-Entwickler, Singapur" />
        <link rel="canonical" href="https://vikum.dev/de/" />
        <link rel="alternate" hrefLang="en" href="https://vikum.dev/" />
        <link rel="alternate" hrefLang="de" href="https://vikum.dev/de/" />
        <link rel="alternate" hrefLang="nl" href="https://vikum.dev/nl/" />
        <link rel="alternate" hrefLang="x-default" href="https://vikum.dev/" />
        <meta property="og:title" content={content.meta.title} />
        <meta property="og:description" content={content.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vikum.dev/de/" />
        <meta property="og:image" content="https://vikum.dev/profile.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content.meta.title} />
        <meta name="twitter:description" content={content.meta.description} />
        <meta name="twitter:image" content="https://vikum.dev/profile.jpg" />
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
