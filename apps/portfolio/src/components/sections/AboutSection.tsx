import { AboutContent } from '@/types';
import { SectionHeader, Icons, trackSheen } from '@/components/ui';

interface AboutSectionProps {
  readonly content: AboutContent;
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="relative glass-ambient py-20 px-6 lg:px-12">
      <div className="max-w-4xl">
        <SectionHeader 
          label={content.sectionLabel} 
          icon={<Icons.About width={16} height={16} />} 
        />
        
        <h2 className="heading-lg mt-8">
          {content.heading}{' '}
          <span className="accent-text">{content.headingAccent}</span>
        </h2>
        
        <div
          onMouseMove={trackSheen}
          className="liquid-glass mt-8 rounded-2xl p-6 lg:p-8 space-y-6"
        >
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
