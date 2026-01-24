import { PortfolioContent, PortfolioProject } from '@/types';
import { SectionHeader, Icons, Image } from '@/components/ui';
import clsx from 'clsx';

interface PortfolioSectionProps {
  readonly content: PortfolioContent;
}

function ProjectCard({ project }: { readonly project: PortfolioProject }) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-background-card">
      <div className="aspect-video overflow-hidden relative">
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={600}
          height={338}
          className="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105"
        />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 max-w-[calc(100%-1.5rem)]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={clsx(
                'px-2 py-0.5 rounded-full text-xs',
                'bg-background-surface/90 backdrop-blur-sm',
                'text-text-primary dark:text-text-primary text-accent-subtle border border-border'
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-text-primary group-hover:text-accent-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-text-secondary mt-1">{project.category}</p>
      </div>
      
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
          aria-label={`View ${project.title}`}
        />
      )}
    </div>
  );
}

export function PortfolioSection({ content }: PortfolioSectionProps) {
  return (
    <section id="portfolio" className="py-20 px-6 lg:px-12">
      <div className="max-w-5xl">
        <SectionHeader 
          label={content.sectionLabel} 
          icon={<Icons.Portfolio width={16} height={16} />} 
        />
        
        <h2 className="heading-lg mt-8">
          {content.heading}{' '}
          <span className="accent-text">{content.headingAccent}</span>
        </h2>
        
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {content.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
