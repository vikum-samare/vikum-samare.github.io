import { useEffect, useRef, useState } from 'react';
import { PortfolioContent, PortfolioProject } from '@/types';
import { SectionHeader, Icons, Image, trackSheen } from '@/components/ui';
import clsx from 'clsx';

interface PortfolioSectionProps {
  readonly content: PortfolioContent;
}

// Always rendered (never conditionally mounted) so the expanded copy ships in the
// static HTML and stays crawlable; `open` only drives showModal()/close().
function ProjectModal({
  project,
  open,
  onClose,
}: {
  readonly project: PortfolioProject;
  readonly open: boolean;
  readonly onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const details = project.details;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!details) return null;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        // Backdrop click: the dialog element itself is the only hit target outside the panel.
        if (e.target === ref.current) ref.current?.close();
      }}
      id={`project-${project.id}`}
      className={clsx(
        // Transitions live in globals.css under `dialog.project-dialog`.
        'project-dialog',
        // Mobile: bottom sheet pinned to the bottom edge. sm+: centred modal.
        'w-full max-w-none max-h-[90dvh] rounded-t-2xl rounded-b-none',
        'sm:w-[min(56rem,92vw)] sm:m-auto sm:max-h-[88vh] sm:rounded-2xl',
        'p-0 overflow-hidden',
        'liquid-glass text-text-primary',
        'backdrop:bg-black/50 backdrop:backdrop-blur-sm'
      )}
    >
      <div className="hide-scrollbar max-h-[90dvh] sm:max-h-[88vh] overflow-y-auto">
        <div
          aria-hidden
          className="sm:hidden sticky top-0 z-10 flex justify-center pt-2 pb-1 backdrop-blur-md"
        >
          <span className="h-1 w-10 rounded-full bg-border" />
        </div>
        <div className="relative aspect-[21/9]">
          <Image
            src={details.coverUrl ?? project.imageUrl}
            alt={project.title}
            width={1200}
            height={514}
            className={clsx(
              'w-full h-full',
              // 'contain' keeps transparent artwork whole; the glass shows through.
              details.coverFit === 'contain' ? 'object-contain p-4' : 'object-cover'
            )}
          />
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close"
            onMouseMove={trackSheen}
            className="liquid-glass liquid-glass-interactive absolute top-3 right-3 p-2 rounded-full hover:text-accent-primary"
          >
            <Icons.Close width={18} height={18} />
          </button>
        </div>

        <div className="p-6 lg:p-8">
          <p className="text-sm text-text-secondary">{project.category}</p>
          <h3 className="heading-lg mt-1">{project.title}</h3>
          {details.subtitle && (
            <p className="text-base text-text-secondary mt-2">{details.subtitle}</p>
          )}

          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="liquid-glass px-2 py-0.5 rounded-full text-xs text-accent-primary dark:text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {details.description.map((para) => (
              <p
                key={para.slice(0, 40)}
                className="text-sm leading-relaxed text-text-secondary [&_a]:text-accent-primary [&_a]:underline [&_strong]:text-text-primary [&_strong]:font-medium"
                // Authored by us in src/config/content.*.ts at build time, never user input.
                dangerouslySetInnerHTML={{ __html: para }}
              />
            ))}
          </div>

          {details.screenshots && details.screenshots.length > 0 && (
            // CSS columns, not a grid: portrait phone shots and wide desktop
            // shots keep their own aspect ratio and flow around each other.
            <div className="mt-8 columns-2 sm:columns-3 gap-4 [&>*]:mb-4">
              {details.screenshots.map((shot) => (
                <figure key={shot.url} className="break-inside-avoid rounded-xl overflow-hidden border border-border">
                  <Image
                    src={shot.url}
                    alt={shot.caption ?? project.title}
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />
                  {shot.caption && (
                    <figcaption className="px-3 py-2 text-xs text-text-secondary bg-background-surface">
                      {shot.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}

          {project.link && project.link !== '#' && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={trackSheen}
              className="liquid-glass liquid-glass-interactive liquid-glass-accent inline-block mt-8 px-4 py-2 rounded-full text-sm"
            >
              {details.linkLabel ?? 'Visit project'}
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  readonly project: PortfolioProject;
  readonly onOpen: () => void;
}) {
  return (
    <div
      onMouseMove={trackSheen}
      className="liquid-glass liquid-glass-interactive group relative overflow-hidden rounded-xl"
    >
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
                'liquid-glass px-2 py-0.5 rounded-full text-xs',
                'text-accent-primary dark:text-white'
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

      {project.details ? (
        <button
          type="button"
          onClick={onOpen}
          className="absolute inset-0"
          aria-label={`View ${project.title}`}
        />
      ) : (
        project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0"
            aria-label={`View ${project.title}`}
          />
        )
      )}
    </div>
  );
}

const HASH_PREFIX = '#project-';

export function PortfolioSection({ content }: PortfolioSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  // The URL hash is the source of truth, so /#project-<id> deep links and the
  // back button both work without a router.
  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.startsWith(HASH_PREFIX)
        ? window.location.hash.slice(HASH_PREFIX.length)
        : null;
      setOpenId(content.projects.some((p) => p.id === id) ? id : null);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [content.projects]);

  const close = () => {
    if (window.location.hash.startsWith(HASH_PREFIX)) window.history.back();
    else setOpenId(null);
  };

  return (
    <section id="portfolio" className="relative glass-ambient py-20 px-6 lg:px-12">
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
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => {
                window.location.hash = `${HASH_PREFIX.slice(1)}${project.id}`;
              }}
            />
          ))}
        </div>
      </div>

      {content.projects.map((project) => (
        <ProjectModal
          key={project.id}
          project={project}
          open={openId === project.id}
          onClose={close}
        />
      ))}
    </section>
  );
}
