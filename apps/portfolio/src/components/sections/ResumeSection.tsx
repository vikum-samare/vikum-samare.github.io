import { useState } from 'react';
import { ResumeContent, ResumeItem, ResumeTimelineSection } from '@/types';
import { SectionHeader, Icons } from '@/components/ui';

interface ResumeSectionProps {
  readonly content: ResumeContent;
}

function TimelineItem({ item }: { readonly item: ResumeItem }) {
  return (
    <div className="relative pl-8 pb-6 last:pb-0">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
      <div className="absolute left-0 top-1.5 w-2 h-2 -translate-x-1/2 rounded-full bg-text-muted transition-colors duration-200 group-hover:bg-accent-primary hover:bg-accent-primary" />
      
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

function CollapsibleSection({ 
  section, 
  isExpanded, 
  onToggle,
  isFirst,
  isLast
}: { 
  readonly section: ResumeTimelineSection;
  readonly isExpanded: boolean;
  readonly onToggle: () => void;
  readonly isFirst: boolean;
  readonly isLast: boolean;
}) {
  return (
    <div className="relative">
      {/* Vertical line connecting sections */}
      {!isFirst && (
        <div className="absolute left-0 -top-6 h-6 w-px bg-border" />
      )}
      
      {/* Section header with dot */}
      <button
        onClick={onToggle}
        className="group flex items-center gap-4 w-full text-left py-2 cursor-pointer"
      >
        <div 
          className={`w-3 h-3 rounded-full border-2 transition-colors duration-200 -ml-1.5 ${
            isExpanded 
              ? 'bg-accent-primary border-accent-primary' 
              : 'bg-transparent border-text-muted group-hover:border-accent-primary'
          }`}
        />
        <span className={`text-lg font-medium transition-colors duration-200 ${
          isExpanded ? 'text-accent-primary' : 'text-text-secondary group-hover:text-accent-primary'
        }`}>
          {section.label}
        </span>
      </button>
      
      {/* Collapsible content */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-8 pt-4 pb-6">
          {section.items.map((item) => (
            <div key={item.id} className="group">
              <TimelineItem item={item} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Vertical line to next section */}
      {!isLast && (
        <div className="absolute left-0 -bottom-6 h-6 w-px bg-border" />
      )}
    </div>
  );
}

export function ResumeSection({ content }: ResumeSectionProps) {
  // First section and education section expanded by default
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    const defaultExpanded = new Set<string>();
    if (content.sections.length > 0) {
      defaultExpanded.add(content.sections[0].id); // First section
    }
    // Find and expand education section
    const educationSection = content.sections.find(s => s.id === 'education');
    if (educationSection) {
      defaultExpanded.add(educationSection.id);
    }
    return defaultExpanded;
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

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
        
        <div className="mt-12 pl-2 space-y-6">
          {content.sections.map((section, index) => (
            <CollapsibleSection
              key={section.id}
              section={section}
              isExpanded={expandedSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
              isFirst={index === 0}
              isLast={index === content.sections.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
