import { ClientsContent } from '@/types';
import { Image } from '@/components/ui';

interface ClientsSectionProps {
  readonly content: ClientsContent;
}

export function ClientsSection({ content }: ClientsSectionProps) {
  return (
    <section id="clients" className="py-20 px-6 lg:px-12 border-t border-border">
      <div className="max-w-5xl">
        <p className="text-sm text-text-muted uppercase tracking-wider mb-8">
          {content.heading}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {content.clients.map((client) => (
            <div key={client.id} className="flex items-center justify-center">
              {client.link ? (
                <a
                  href={client.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-50 hover:opacity-100 transition-opacity duration-normal"
                >
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    width={120}
                    height={48}
                    className="max-h-12 w-auto grayscale"
                  />
                </a>
              ) : (
                <div className="opacity-50">
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    width={120}
                    height={48}
                    className="max-h-12 w-auto grayscale"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
