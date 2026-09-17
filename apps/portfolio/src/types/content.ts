/**
 * Supported locales for the portfolio
 */
export type Locale = 'en' | 'de' | 'nl';

/**
 * Social link configuration
 */
export interface SocialLink {
  readonly platform: 'twitter' | 'dribbble' | 'instagram' | 'github' | 'linkedin' | 'youtube' | 'stackoverflow';
  readonly url: string;
  readonly label: string;
}

/**
 * Profile/Sidebar content
 */
export interface ProfileContent {
  readonly name: string;
  readonly title: string;
  readonly subtitle: string;
  readonly email: string;
  readonly location: string;
  readonly avatarUrl: string;
  readonly copyright: string;
  readonly hireButtonText: string;
  /**
   * Public CV, served from /public so the path is root-relative. Set to an
   * empty string to hide the download button everywhere.
   */
  readonly cvUrl: string;
  readonly cvButtonText: string;
  readonly socialLinks: readonly SocialLink[];
}

/**
 * Hero section content
 */
export interface HeroContent {
  readonly sectionLabel: string;
  readonly greeting: string;
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly scrollCta: string;
}

/**
 * About section content
 */
export interface AboutContent {
  readonly sectionLabel: string;
  readonly heading: string;
  readonly headingAccent: string;
  readonly paragraphs: readonly string[];
}

/**
 * Resume item (education or experience)
 */
export interface ResumeItem {
  readonly id: string;
  readonly period: string;
  readonly title: string;
  readonly organization: string;
  readonly description?: string;
}

/**
 * Resume timeline section (collapsible group)
 */
export interface ResumeTimelineSection {
  readonly id: string;
  readonly label: string;
  readonly items: readonly ResumeItem[];
}

/**
 * Resume section content
 */
export interface ResumeContent {
  readonly sectionLabel: string;
  readonly heading: string;
  readonly headingAccent: string;
  readonly sections: readonly ResumeTimelineSection[];
}

/**
 * Service item
 */
export interface ServiceItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly projectLabel: string;
  readonly icon: 'design' | 'code' | 'seo' | 'mobile' | 'consulting';
}

/**
 * Services section content
 */
export interface ServicesContent {
  readonly sectionLabel: string;
  readonly heading: string;
  readonly headingAccent: string;
  readonly services: readonly ServiceItem[];
}

/**
 * Skill item
 */
export interface SkillItem {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly icon: string;
}

/**
 * Skills section content
 */
export interface SkillsContent {
  readonly sectionLabel: string;
  readonly heading: string;
  readonly headingAccent: string;
  readonly skills: readonly SkillItem[];
}

/**
 * A heading plus its body copy on the privacy page.
 */
export interface PrivacySection {
  readonly heading: string;
  /** One entry per paragraph; inline HTML allowed, `{email}` is substituted. */
  readonly paragraphs: readonly string[];
}

/**
 * Privacy page content.
 */
export interface PrivacyContent {
  readonly metaTitle: string;
  readonly metaDescription: string;
  readonly backLabel: string;
  readonly heading: string;
  readonly lastUpdatedLabel: string;
  readonly lastUpdated: string;
  readonly intro: readonly string[];
  readonly sections: readonly PrivacySection[];
}

/**
 * Cookie consent banner.
 */
export interface CookieBannerContent {
  readonly message: string;
  readonly acceptLabel: string;
  readonly declineLabel: string;
  readonly privacyLinkLabel: string;
  /** Link on the privacy page that reopens the choice. */
  readonly withdrawLabel: string;
  readonly withdrawDoneLabel: string;
}

/**
 * One Medium article, fetched at build time by scripts/fetch-publications.mjs.
 */
export interface Publication {
  readonly title: string;
  readonly url: string;
  readonly coverUrl: string;
  readonly excerpt: string;
  /** ISO date, e.g. 2026-09-14. */
  readonly publishedAt: string;
  readonly tags: readonly string[];
}

/**
 * Publications section content. The articles themselves come from the fetched
 * data file, not from here, so only the labels are translated.
 */
export interface PublicationsContent {
  readonly sectionLabel: string;
  readonly heading: string;
  readonly headingAccent: string;
  readonly readMoreLabel: string;
  /** Link to the Medium profile, shown under the cards. */
  readonly viewAllLabel: string;
  readonly viewAllUrl: string;
}

/**
 * Portfolio project
 */
export interface PortfolioProject {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly imageUrl: string;
  readonly tags: readonly string[];
  readonly link?: string;
  /** Optional expanded view content. Omit to keep the card non-clickable. */
  readonly details?: PortfolioProjectDetails;
}

/**
 * Expanded ("read more") content for a portfolio project.
 */
export interface PortfolioProjectDetails {
  /** Cover image for the modal. Falls back to the card image. */
  readonly coverUrl?: string;
  /**
   * How the cover fills its box. Use 'contain' for artwork with transparency
   * or margins that must not be cropped; defaults to 'cover' for photos.
   */
  readonly coverFit?: 'cover' | 'contain';
  readonly subtitle?: string;
  /**
   * One entry per paragraph. Inline HTML is allowed (<strong>, <em>, <a href>);
   * this is authored config, so it is rendered without sanitising.
   */
  readonly description: readonly string[];
  /** CDN urls (jpg/png/gif). */
  readonly screenshots?: readonly PortfolioScreenshot[];
  readonly linkLabel?: string;
}

export interface PortfolioScreenshot {
  readonly url: string;
  readonly caption?: string;
}

/**
 * Portfolio section content
 */
export interface PortfolioContent {
  readonly sectionLabel: string;
  readonly heading: string;
  readonly headingAccent: string;
  readonly projects: readonly PortfolioProject[];
}

/**
 * Testimonial item
 */
export interface TestimonialItem {
  readonly id: string;
  readonly quote: string;
  readonly authorName: string;
  readonly authorTitle: string;
  readonly authorCompany: string;
  readonly authorImageUrl: string;
  readonly projectLink?: string;
  readonly projectLabel?: string;
}

/**
 * Testimonials section content
 */
export interface TestimonialsContent {
  readonly sectionLabel: string;
  readonly heading: string;
  readonly headingAccent: string;
  readonly testimonials: readonly TestimonialItem[];
}

/**
 * Client/Brand logo
 */
export interface ClientLogo {
  readonly id: string;
  readonly name: string;
  readonly logoUrl: string;
  readonly link?: string;
}

/**
 * Clients section content
 */
export interface ClientsContent {
  readonly heading: string;
  readonly clients: readonly ClientLogo[];
}

/**
 * Contact form field
 */
export interface ContactFormField {
  readonly id: string;
  readonly label: string;
  readonly placeholder: string;
  readonly type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  readonly required: boolean;
  readonly options?: readonly string[];
}

/**
 * Contact section content
 */
export interface ContactContent {
  readonly sectionLabel: string;
  readonly heading: string;
  readonly headingAccent: string;
  readonly email: string;
  readonly fields: readonly ContactFormField[];
  readonly attachmentLabel: string;
  readonly submitButtonText: string;
}

/**
 * GitHub contributions section content
 */
export interface ContributionsContent {
  readonly sectionLabel: string;
  readonly heading: string;
  readonly headingAccent: string;
  readonly totalLabel: string;
  readonly contributionsLabel: string;
  readonly lessLabel: string;
  readonly moreLabel: string;
  readonly noDataLabel: string;
  readonly contributionTypes: {
    readonly commits: string;
    readonly pullRequests: string;
    readonly reviews: string;
    readonly issues: string;
  };
}

/**
 * Navigation item
 */
export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly icon: 'home' | 'about' | 'resume' | 'contributions' | 'services' | 'skills' | 'portfolio' | 'publications' | 'testimonials' | 'contact';
  readonly sectionId: string;
}

/**
 * Navigation content
 */
export interface NavigationContent {
  readonly items: readonly NavItem[];
}

/**
 * Theme settings labels
 */
export interface ThemeLabels {
  readonly toggleTheme: string;
  readonly lightMode: string;
  readonly darkMode: string;
}

/**
 * 404 page content
 */
export interface NotFoundContent {
  readonly title: string;
  readonly heading: string;
  readonly description: string;
  readonly homeButtonText: string;
}

/**
 * Complete site content configuration
 */
export interface SiteContent {
  readonly locale: Locale;
  readonly meta: {
    readonly title: string;
    readonly description: string;
    readonly ogImage?: string;
  };
  readonly profile: ProfileContent;
  readonly hero: HeroContent;
  readonly about: AboutContent;
  readonly resume: ResumeContent;
  readonly contributions: ContributionsContent;
  readonly services: ServicesContent;
  readonly skills: SkillsContent;
  readonly portfolio: PortfolioContent;
  readonly publications: PublicationsContent;
  readonly testimonials: TestimonialsContent;
  readonly clients: ClientsContent;
  readonly contact: ContactContent;
  readonly navigation: NavigationContent;
  readonly theme: ThemeLabels;
  readonly notFound: NotFoundContent;
  readonly privacy: PrivacyContent;
  readonly cookieBanner: CookieBannerContent;
}
