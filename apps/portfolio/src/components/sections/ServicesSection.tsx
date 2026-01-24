import { ServicesContent, ServiceItem } from '@/types';
import { SectionHeader, Card, Icons } from '@/components/ui';

interface ServicesSectionProps {
  readonly content: ServicesContent;
}

const serviceIconMap = {
  design: Icons.Design,
  code: Icons.Code,
  seo: Icons.Seo,
  mobile: Icons.Mobile,
  consulting: Icons.Consulting,
} as const;

function ServiceCard({ service }: { readonly service: ServiceItem }) {
  const Icon = serviceIconMap[service.icon];
  
  return (
    <Card hover className="group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-text-secondary mt-2 leading-relaxed">
            {service.description}
          </p>
        </div>
        <div className="ml-4 text-accent-primary">
          <Icon width={24} height={24} />
        </div>
      </div>
    </Card>
  );
}

export function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 px-6 lg:px-12">
      <div className="max-w-4xl">
        <SectionHeader 
          label={content.sectionLabel} 
          icon={<Icons.Services width={16} height={16} />} 
        />
        
        <h2 className="heading-lg mt-8">
          {content.heading}{' '}
          <span className="accent-text">{content.headingAccent}</span>
        </h2>
        
        <div className="mt-12 space-y-4">
          {content.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
