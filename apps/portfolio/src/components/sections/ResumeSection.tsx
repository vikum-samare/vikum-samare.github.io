import { ResumeContent, ResumeItem } from '@/types';
import { SectionHeader, Icons } from '@/components/ui';

interface ResumeSectionProps {
  readonly content: ResumeContent;
}

function TimelineItem({ item }: { readonly item: ResumeItem }) {
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      <div className="absolute left-0 top-2 bottom-0 w-px bg-border" />
      <div className="absolute left-0 top-2 w-2 h-2 -translate-x-1/2 rounded-full bg-accent-primary" />
      
      <div className="space-y-1">
        <span className="text-sm text-accent-primary">{item.period}</span>
        <h4 className="text-lg font-medium text-text-primary">{item.title}</h4>
        <p className="text-text-secondary">{item.organization}</p>
        {item.description && (
          <p className="text-sm text-text-muted mt-2">{item.description}</p>
        )}
      </div>
    </div>
  );
}

export function ResumeSection({ content }: ResumeSectionProps) {
  return (
    <section id="resume" className="py-20 px-6 lg:px-12">
      <div className="max-w-4xl">
        <SectionHeader 
          label={content.sectionLabel} 
          icon={<Icons.Resume width={16} height={16} />} 
        />
        
        <h2 className="heading-lg mt-8">
          {content.heading}{' '}
          <span className="accent-text">{content.headingAccent}</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-accent-primary" />
              </span>
              {content.educationTitle}
            </h3>
            <div>
              {content.education.map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-accent-primary" />
              </span>
              {content.experienceTitle}
            </h3>
            <div>
              {content.experience.map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
