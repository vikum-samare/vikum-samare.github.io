import { useEffect } from 'react';
import Head from 'next/head';
import { nlContent } from '@/config';
import { Layout } from '@/components/layout';
import {
  HeroSection,
  AboutSection,
  ResumeSection,
  ContributionsSection,
  ServicesSection,
  SkillsSection,
  PortfolioSection,
  TestimonialsSection,
  ClientsSection,
  ContactSection,
} from '@/components/sections';

export default function NlHomePage() {
  const content = nlContent;

  useEffect(() => {
    document.documentElement.lang = 'nl';
    return () => {
      document.documentElement.lang = 'en';
    };
  }, []);

  return (
    <>
      <Head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
        <meta property="og:title" content={content.meta.title} />
        <meta property="og:description" content={content.meta.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content.meta.title} />
        <meta name="twitter:description" content={content.meta.description} />
      </Head>

      <Layout content={content}>
        <HeroSection content={content.hero} />
        <AboutSection content={content.about} />
        <ResumeSection content={content.resume} />
        <ContributionsSection content={content.contributions} />
        <ServicesSection content={content.services} />
        <SkillsSection content={content.skills} />
        <PortfolioSection content={content.portfolio} />
        <TestimonialsSection content={content.testimonials} />
        <ClientsSection content={content.clients} />
        <ContactSection content={content.contact} />
      </Layout>
    </>
  );
}
