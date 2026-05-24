import { SkillsContent } from '@/types';
import { SectionHeader, SkillBadge, Icons } from '@/components/ui';

interface SkillsSectionProps {
  readonly content: SkillsContent;
}

export function SkillsSection({ content }: SkillsSectionProps) {
  const categories = [...new Set(content.skills.map((s) => s.category))];

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

        <div className="mt-12 space-y-8">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {content.skills
                  .filter((s) => s.category === category)
                  .map((skill) => (
                    <SkillBadge key={skill.id} name={skill.name} icon={skill.icon} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
