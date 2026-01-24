import { AboutContent } from '@/types';
import { SectionHeader, Icons } from '@/components/ui';

interface AboutSectionProps {
  readonly content: AboutContent;
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 px-6 lg:px-12">
      <div className="max-w-4xl">
        <SectionHeader 
          label={content.sectionLabel} 
          icon={<Icons.About width={16} height={16} />} 
        />
        
        <h2 className="heading-lg mt-8">
          {content.heading}{' '}
          <span className="accent-text">{content.headingAccent}</span>
        </h2>
        
        <div className="mt-8 space-y-6">
          {content.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-text-secondary leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
