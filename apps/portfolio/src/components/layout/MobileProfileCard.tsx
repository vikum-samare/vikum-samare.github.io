import { ProfileContent } from '@/types';
import { Icons, Image } from '@/components/ui';
import clsx from 'clsx';

interface MobileProfileCardProps {
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

export function MobileProfileCard({ profile }: MobileProfileCardProps) {
  return (
    <div className="lg:hidden mobile-full-height flex flex-col pt-12 w-full">
      <div className="flex-1 flex flex-col items-center justify-evenly px-6 py-2 w-full mx-auto">
        <div className="relative">
          <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-border transition-none shadow-xl">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              width={224}
              height={224}
              className="w-full h-full object-cover [image-rendering:auto]"
              priority
              decoding="sync"
            />
          </div>
        </div>

        <div className="text-center w-full">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">{profile.name}</h2>
            <span className="w-3 h-3 rounded-full bg-accent-primary" />
          </div>
          <p className="text-xl sm:text-2xl text-text-primary">{profile.title}</p>
          <p className="text-lg text-text-secondary">{profile.subtitle}</p>
        </div>

        <div className="text-center w-full">
          <a 
            href={`mailto:${profile.email}`}
            className="text-lg text-text-primary hover:text-accent-primary transition-colors"
          >
            {profile.email}
          </a>
          <p className="text-text-secondary">{profile.location}</p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3 w-full">
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
                  'w-11 h-11 rounded-full border border-border',
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

        <a
          href="#contact"
          className="btn-primary w-full max-w-sm text-lg py-3"
        >
          <Icons.Mail width={20} height={20} />
          {profile.hireButtonText}
        </a>

        <div className="flex flex-col items-center">
          <p className="text-sm text-text-muted text-center mb-3">
            {profile.copyright}
          </p>
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-xs text-text-secondary mb-1 uppercase tracking-wider font-medium">
              Scroll
            </span>
            <Icons.ArrowDown width={20} height={20} className="text-accent-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
