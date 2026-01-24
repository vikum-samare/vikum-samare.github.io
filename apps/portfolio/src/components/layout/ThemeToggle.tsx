import { useState, useEffect } from 'react';
import { Icons } from '@/components/ui';
import clsx from 'clsx';

interface ThemeToggleProps {
  readonly labels: {
    readonly toggleTheme: string;
    readonly lightMode: string;
    readonly darkMode: string;
  };
}

export function ThemeToggle({ labels }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={labels.toggleTheme}
      className={clsx(
        'fixed top-6 left-6 z-50',
        'hidden lg:flex',
        'w-10 h-10 rounded-full',
        'bg-background-surface border border-border',
        'items-center justify-center',
        'text-text-secondary transition-colors duration-normal',
        'hover:text-accent-primary hover:border-accent-primary',
        'focus:outline-none focus:ring-2 focus:ring-accent-primary'
      )}
    >
      <span className="animate-rotate-slow">
        <Icons.Settings width={18} height={18} />
      </span>
      
      <div className={clsx(
        'absolute left-12 top-1/2 -translate-y-1/2',
        'px-3 py-1.5 rounded-md',
        'bg-background-card border border-border',
        'text-sm text-text-primary whitespace-nowrap',
        'opacity-0 invisible',
        isHovered && 'opacity-100 visible',
        'transition-all duration-normal',
        'pointer-events-none'
      )}>
        {isDark ? labels.lightMode : labels.darkMode}
      </div>
    </button>
  );
}
