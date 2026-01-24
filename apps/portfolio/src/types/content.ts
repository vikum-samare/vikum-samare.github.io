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
  readonly percentage: number;
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
 * Portfolio project
 */
export interface PortfolioProject {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly imageUrl: string;
  readonly tags: readonly string[];
  readonly link?: string;
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
 * Navigation item
 */
export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly icon: 'home' | 'about' | 'resume' | 'services' | 'skills' | 'portfolio' | 'testimonials' | 'contact';
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
  readonly services: ServicesContent;
  readonly skills: SkillsContent;
  readonly portfolio: PortfolioContent;
  readonly testimonials: TestimonialsContent;
  readonly clients: ClientsContent;
  readonly contact: ContactContent;
  readonly navigation: NavigationContent;
  readonly theme: ThemeLabels;
  readonly notFound: NotFoundContent;
}
