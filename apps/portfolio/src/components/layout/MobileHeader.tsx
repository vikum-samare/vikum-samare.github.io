import { useState, useEffect } from 'react';
import { ProfileContent, NavigationContent } from '@/types';
import { Icons } from '@/components/ui';
import clsx from 'clsx';

interface MobileHeaderProps {
  readonly profile: ProfileContent;
  readonly navigation: NavigationContent;
}

const iconMap = {
  home: Icons.Home,
  about: Icons.About,
  resume: Icons.Resume,
  services: Icons.Services,
  skills: Icons.Skills,
  portfolio: Icons.Portfolio,
  testimonials: Icons.Testimonials,
  contact: Icons.Contact,
} as const;

export function MobileHeader({ profile, navigation }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="lg:hidden">
      <header className="fixed top-0 left-0 right-0 z-40 bg-background-surface/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-accent-primary transition-colors"
            >
              <Icons.Settings width={18} height={18} />
            </button>
            <span className="text-lg font-semibold text-text-primary">
              {profile.name.split(' ')[0]}
            </span>
            <span className="w-2 h-2 rounded-full bg-accent-primary" />
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="w-10 h-10 flex items-center justify-center text-text-secondary"
          >
            {isMenuOpen ? <Icons.Close /> : <Icons.Menu />}
          </button>
        </div>
      </header>

      <div
        className={clsx(
          'fixed inset-0 z-30 bg-background-base/95 backdrop-blur-sm',
          'transition-opacity duration-normal',
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        )}
      >
        <nav className="pt-20 px-6">
          <div className="space-y-2">
            {navigation.items.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.sectionId)}
                  className={clsx(
                    'w-full flex items-center gap-4 px-4 py-3',
                    'text-left text-lg text-text-secondary',
                    'rounded-xl transition-colors duration-normal',
                    'hover:bg-state-hover hover:text-text-primary'
                  )}
                >
                  <Icon width={20} height={20} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="btn-primary w-full"
            >
              <Icons.Mail width={18} height={18} />
              {profile.hireButtonText}
            </a>
          </div>
        </nav>
      </div>

      <div className="h-14" />
    </div>
  );
}
