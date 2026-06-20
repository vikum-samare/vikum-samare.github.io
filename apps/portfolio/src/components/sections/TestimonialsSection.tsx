import { useState } from 'react';
import { TestimonialsContent, TestimonialItem } from '@/types';
import { SectionHeader, Card, Icons, Image } from '@/components/ui';
import clsx from 'clsx';

interface TestimonialsSectionProps {
  readonly content: TestimonialsContent;
}

function TestimonialCard({ testimonial }: { readonly testimonial: TestimonialItem }) {
  return (
    <Card className="h-full">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={testimonial.authorImageUrl}
          alt={testimonial.authorName}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium text-text-primary">{testimonial.authorName}</h3>
          <p className="text-sm text-text-secondary">
            {testimonial.authorTitle} of{' '}
            <span className="text-accent-primary">{testimonial.authorCompany}</span>
          </p>
        </div>
      </div>
      
      <blockquote className="text-text-secondary leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      
      {testimonial.projectLink && testimonial.projectLabel && (
        <a
          href={testimonial.projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm text-text-muted hover:text-accent-primary transition-colors underline underline-offset-4"
        >
          {testimonial.projectLabel}
        </a>
      )}
    </Card>
  );
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = content.testimonials;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-20 px-6 lg:px-12">
      <div className="max-w-4xl">
        <SectionHeader 
          label={content.sectionLabel} 
          icon={<Icons.Testimonials width={16} height={16} />} 
        />
        
        <h2 className="heading-lg mt-8">
          {content.heading}{' '}
          <span className="accent-text">{content.headingAccent}</span>
        </h2>
        
        <div className="mt-12">
          <div className="overflow-hidden">
            <div
              className="transition-transform duration-slow ease-gentle"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-1">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              aria-label="Previous testimonial"
              className={clsx(
                'w-10 h-10 rounded-full border border-border',
                'flex items-center justify-center',
                'text-text-secondary transition-all duration-normal',
                'hover:text-text-primary hover:border-text-primary'
              )}
            >
              <Icons.ChevronLeft width={18} height={18} />
            </button>
            
            <span className="text-sm text-text-secondary">
              {currentIndex + 1} / {testimonials.length}
            </span>
            
            <button
              onClick={goToNext}
              aria-label="Next testimonial"
              className={clsx(
                'w-10 h-10 rounded-full border border-border',
                'flex items-center justify-center',
                'text-text-secondary transition-all duration-normal',
                'hover:text-text-primary hover:border-text-primary'
              )}
            >
              <Icons.ChevronRight width={18} height={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
