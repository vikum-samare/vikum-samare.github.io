import { SkillsContent } from '@/types';
import { SectionHeader, SkillCircle, Icons } from '@/components/ui';

interface SkillsSectionProps {
  readonly content: SkillsContent;
}

export function SkillsSection({ content }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-20 px-6 lg:px-12">
      <div className="max-w-4xl">
        <SectionHeader 
          label={content.sectionLabel} 
          icon={<Icons.Skills width={16} height={16} />} 
        />
        
        <h2 className="heading-lg mt-8">
          {content.heading}{' '}
          <span className="accent-text">{content.headingAccent}</span>
        </h2>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {content.skills.map((skill) => (
            <SkillCircle
              key={skill.id}
              name={skill.name}
              percentage={skill.percentage}
              icon={skill.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
