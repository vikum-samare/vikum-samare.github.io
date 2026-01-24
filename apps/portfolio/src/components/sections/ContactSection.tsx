import { ContactContent } from '@/types';
import { SectionHeader, Icons } from '@/components/ui';
import clsx from 'clsx';

interface ContactSectionProps {
  readonly content: ContactContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 px-6 lg:px-12">
      <div className="max-w-4xl">
        <SectionHeader 
          label={content.sectionLabel} 
          icon={<Icons.Contact width={16} height={16} />} 
        />
        
        <h2 className="heading-lg mt-8">
          {content.heading}{' '}
          <span className="accent-text">{content.headingAccent}</span>
        </h2>
        
        <a
          href={`mailto:${content.email}`}
          className="text-lg text-text-secondary hover:text-accent-primary transition-colors mt-4 block"
        >
          {content.email}
        </a>
        
        <form className="mt-12 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {content.fields.slice(0, 4).map((field) => (
              <div key={field.id}>
                <label className="text-xs uppercase tracking-wider text-text-muted">
                  {field.label}
                  {field.required && <span className="text-accent-primary ml-1">*</span>}
                </label>
                
                {field.type === 'select' ? (
                  <div className="relative">
                    <select className="form-select">
                      <option value="">{field.placeholder}</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                      <Icons.ChevronDown width={16} height={16} />
                    </div>
                  </div>
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="form-input"
                  />
                )}
              </div>
            ))}
          </div>
          
          {content.fields.find((f) => f.id === 'budget') && (
            <div>
              <label className="text-xs uppercase tracking-wider text-text-muted">
                {content.fields.find((f) => f.id === 'budget')?.label}
              </label>
              <input
                type="text"
                placeholder={content.fields.find((f) => f.id === 'budget')?.placeholder}
                className="form-input"
              />
            </div>
          )}
          
          {content.fields.find((f) => f.type === 'textarea') && (
            <div>
              <label className="text-xs uppercase tracking-wider text-text-muted">
                {content.fields.find((f) => f.type === 'textarea')?.label}
              </label>
              <textarea
                placeholder={content.fields.find((f) => f.type === 'textarea')?.placeholder}
                required={content.fields.find((f) => f.type === 'textarea')?.required}
                className="form-textarea"
                rows={4}
              />
            </div>
          )}
          
          <div className="border-t border-border pt-8">
            <button
              type="button"
              className={clsx(
                'inline-flex items-center gap-2',
                'text-text-secondary hover:text-accent-primary',
                'transition-colors duration-normal'
              )}
            >
              <Icons.Attachment width={18} height={18} />
              {content.attachmentLabel}
            </button>
          </div>
          
          <div>
            <button type="submit" className="btn-primary">
              {content.submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
