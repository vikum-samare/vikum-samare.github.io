import { useState, useEffect } from 'react';
import { NavigationContent } from '@/types';
import { Icons } from '@/components/ui';
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
  testimonials: Icons.Testimonials,
  contact: Icons.Contact,
} as const;

export function FloatingNav({ navigation }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.items.map((item) => item.sectionId);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
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
                aria-label={item.label}
                className={clsx(
                  'nav-icon-btn',
                  isActive && 'active'
                )}
              >
                <Icon width={18} height={18} />
              </button>
              
              <div className={clsx(
                'absolute right-12 top-1/2 -translate-y-1/2',
                'px-3 py-1.5 rounded-md',
                'bg-background-card border border-border',
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
