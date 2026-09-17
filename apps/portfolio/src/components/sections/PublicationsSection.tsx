import { Publication, PublicationsContent } from '@/types';
import { SectionHeader, Icons, Image, trackSheen } from '@/components/ui';
import publicationData from '@/data/publications.json';
import clsx from 'clsx';

interface PublicationsSectionProps {
  readonly content: PublicationsContent;
  /** Locale for the published date; defaults to English. */
  readonly locale?: string;
}

const articles = publicationData.articles as readonly Publication[];

function formatDate(iso: string, locale: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function ArticleCard({
  article,
  content,
  locale,
}: {
  readonly article: Publication;
  readonly content: PublicationsContent;
  readonly locale: string;
}) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={trackSheen}
      className="liquid-glass liquid-glass-interactive group flex flex-col overflow-hidden rounded-xl"
    >
      {article.coverUrl && (
        <div className="aspect-video overflow-hidden">
          <Image
            src={article.coverUrl}
            alt=""
            width={600}
            height={338}
            className="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
        {article.publishedAt && (
          <time
            dateTime={article.publishedAt}
            className="text-xs text-text-muted"
          >
            {formatDate(article.publishedAt, locale)}
          </time>
        )}

        <h3 className="mt-2 text-lg font-medium text-text-primary group-hover:text-accent-primary transition-colors">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            {article.excerpt}
          </p>
        )}

        {article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className={clsx(
                  'liquid-glass px-2 py-0.5 rounded-full text-xs',
                  'text-accent-primary dark:text-white'
                )}
              >
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        )}

        <span className="mt-4 pt-1 text-sm text-accent-primary inline-flex items-center gap-1">
          {content.readMoreLabel}
          <Icons.ChevronRight width={14} height={14} />
        </span>
      </div>
    </a>
  );
}

export function PublicationsSection({
  content,
  locale = 'en',
}: PublicationsSectionProps) {
  // Nothing published yet, or the feed was unreachable: skip the section
  // rather than render an empty heading.
  if (articles.length === 0) return null;

  return (
    <section
      id="publications"
      className="relative glass-ambient py-20 px-6 lg:px-12"
    >
      <div className="max-w-5xl">
        <SectionHeader
          label={content.sectionLabel}
          icon={<Icons.Writing width={16} height={16} />}
        />

        <h2 className="heading-lg mt-8">
          {content.heading}{' '}
          <span className="accent-text">{content.headingAccent}</span>
        </h2>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.url}
              article={article}
              content={content}
              locale={locale}
            />
          ))}
        </div>

        <a
          href={content.viewAllUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent-primary transition-colors"
        >
          {content.viewAllLabel}
          <Icons.ChevronRight width={14} height={14} />
        </a>
      </div>
    </section>
  );
}
