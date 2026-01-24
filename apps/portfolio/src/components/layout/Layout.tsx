import { ReactNode } from 'react';
import { SiteContent } from '@/types';
import { Sidebar } from './Sidebar';
import { FloatingNav } from './FloatingNav';
import { ThemeToggle } from './ThemeToggle';
import { MobileHeader } from './MobileHeader';

interface LayoutProps {
  readonly children: ReactNode;
  readonly content: SiteContent;
}

export function Layout({ children, content }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background-base">
      <ThemeToggle labels={content.theme} />
      <MobileHeader profile={content.profile} navigation={content.navigation} />
      
      <div className="flex">
        <Sidebar profile={content.profile} />
        
        <main className="flex-1 lg:ml-0 min-h-screen">
          {children}
        </main>
        
        <FloatingNav navigation={content.navigation} />
      </div>
    </div>
  );
}
