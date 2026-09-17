import { useState, useEffect } from 'react';
import { NavigationContent } from '@/types';
import { Icons, trackSheen } from '@/components/ui';
import clsx from 'clsx';

interface FloatingNavProps {
  readonly navigation: NavigationContent;
}

const iconMap = {
  home: Icons.Home,
  about: Icons.About,
  resume: Icons.Resume,
  contributions: Icons.Contributions,
  services: Icons.Services,
  skills: Icons.Skills,
  portfolio: Icons.Portfolio,
  publications: Icons.Writing,
  testimonials: Icons.Testimonials,
  contact: Icons.Contact,
} as const;

export function FloatingNav({ navigation }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    // The page scrolls inside <main>, not the window, so a window scroll
    // listener never fires. Observe the sections against that container
    // instead: a section counts as current once it crosses the upper fifth
    // of the viewport.
    const root = document.querySelector('main');
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visible.set(id, entry.boundingClientRect.top);
          } else {
            visible.delete(id);
          }
        });

        // Topmost section inside the band wins.
        const current = [...visible.entries()].sort((a, b) => a[1] - b[1])[0];
        if (current) setActiveSection(current[0]);
      },
      { root, rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    const observed = navigation.items
      .map((item) => document.getElementById(item.sectionId))
      .filter((el): el is HTMLElement => el !== null);

    observed.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navigation.items]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col gap-3">
        {navigation.items.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = activeSection === item.sectionId;

          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => scrollToSection(item.sectionId)}
                onMouseMove={trackSheen}
                aria-label={item.label}
                className={clsx(
                  'nav-icon-btn liquid-glass liquid-glass-interactive',
                  isActive && 'active liquid-glass-accent'
                )}
              >
                <Icon width={18} height={18} />
              </button>
              
              <div className={clsx(
                'absolute right-12 top-1/2 -translate-y-1/2',
                'px-3 py-1.5 rounded-md',
                'liquid-glass',
                'text-sm text-text-primary whitespace-nowrap',
                'opacity-0 invisible group-hover:opacity-100 group-hover:visible',
                'transition-all duration-normal',
                'pointer-events-none'
              )}>
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
