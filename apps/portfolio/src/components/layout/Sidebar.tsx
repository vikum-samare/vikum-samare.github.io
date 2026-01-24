import { ProfileContent } from '@/types';
import { Icons, Image } from '@/components/ui';
import clsx from 'clsx';

interface SidebarProps {
  readonly profile: ProfileContent;
}

const socialIconMap = {
  twitter: Icons.Twitter,
  dribbble: Icons.Dribbble,
  instagram: Icons.Instagram,
  github: Icons.GitHub,
  linkedin: Icons.LinkedIn,
  youtube: Icons.YouTube,
  stackoverflow: Icons.Stackoverflow,
} as const;

export function Sidebar({ profile }: SidebarProps) {
  return (
    <aside className="w-sidebar shrink-0 h-[calc(100vh-5rem)] sticky top-20 p-6 pt-0 hidden lg:block">
      <div className="h-full bg-background-surface border border-border rounded-2xl p-6 flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-text-primary">{profile.name.split(' ')[0]}</span>
            <span className="w-2 h-2 rounded-full bg-accent-primary" />
          </div>
          <div className="text-right text-sm">
            <div className="text-text-primary">{profile.title}</div>
            <div className="text-text-secondary">{profile.subtitle}</div>
          </div>
        </div>

        <div className="relative mb-6 mx-auto">
          <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-border transition-none">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              width={192}
              height={192}
              className="w-full h-full object-cover [image-rendering:auto]"
              priority
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <a 
            href={`mailto:${profile.email}`}
            className="text-text-primary hover:text-accent-primary transition-colors"
          >
            {profile.email}
          </a>
          <p className="text-text-secondary mt-1">{profile.location}</p>
        </div>

        <p className="text-sm text-text-muted text-center mb-6">
          {profile.copyright}
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {profile.socialLinks.map((social) => {
            const Icon = socialIconMap[social.platform];
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={clsx(
                  'w-10 h-10 rounded-full border border-border',
                  'flex items-center justify-center',
                  'text-text-secondary transition-all duration-normal',
                  'hover:text-text-primary hover:border-text-primary'
                )}
              >
                <Icon width={18} height={18} />
              </a>
            );
          })}
        </div>

        <div className="mt-auto">
          <a
            href="#contact"
            className="btn-primary w-full"
          >
            <Icons.Mail width={18} height={18} />
            {profile.hireButtonText}
          </a>
        </div>
      </div>
    </aside>
  );
}
