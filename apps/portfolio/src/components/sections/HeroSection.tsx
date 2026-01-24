import { HeroContent } from '@/types';
import { SectionHeader, Icons } from '@/components/ui';

interface HeroSectionProps {
  readonly content: HeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="hero" className="min-h-screen flex items-center py-20 px-6 lg:px-12">
      <div className="max-w-4xl">
        <SectionHeader 
          label={content.sectionLabel} 
          icon={<Icons.Home width={16} height={16} />} 
        />
        
        <h1 className="heading-xl mt-8 text-balance">
          {content.greeting}{' '}
          <span className="accent-text">{content.name}</span>,{' '}
          {content.title}
        </h1>
        
        <p className="text-lg text-text-secondary mt-6 max-w-2xl">
          {content.description}
        </p>

        <div className="mt-16">
          <a
            href="#portfolio"
            className="inline-flex items-center gap-4 text-text-secondary hover:text-text-primary transition-colors"
          >
            <div className="relative w-32 h-32">
              <svg 
                className="w-full h-full animate-rotate-slow" 
                viewBox="0 0 100 100"
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text className="text-[10px] fill-current uppercase tracking-widest">
                  <textPath href="#circlePath">
                    {content.scrollCta} • {content.scrollCta} • 
                  </textPath>
                </text>
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <Icons.ArrowDown width={28} height={28} />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
