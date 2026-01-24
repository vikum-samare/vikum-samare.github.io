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
    <div className="lg:hidden min-h-screen flex flex-col pt-16">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Profile Image */}
        <div className="relative mb-6">
          <div className="w-48 h-48 rounded-3xl overflow-hidden border-2 border-border transition-none shadow-lg">
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

        {/* Name and Title */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-2xl font-bold text-text-primary">{profile.name}</h2>
            <span className="w-2.5 h-2.5 rounded-full bg-accent-primary" />
          </div>
          <p className="text-lg text-text-primary">{profile.title}</p>
          <p className="text-text-secondary">{profile.subtitle}</p>
        </div>

        {/* Contact Info */}
        <div className="text-center mb-8">
          <a 
            href={`mailto:${profile.email}`}
            className="text-text-primary hover:text-accent-primary transition-colors"
          >
            {profile.email}
          </a>
          <p className="text-text-secondary mt-1">{profile.location}</p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
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
                  'w-12 h-12 rounded-full border border-border',
                  'flex items-center justify-center',
                  'text-text-secondary transition-all duration-normal',
                  'hover:text-text-primary hover:border-text-primary'
                )}
              >
                <Icon width={20} height={20} />
              </a>
            );
          })}
        </div>

        {/* Hire Button */}
        <a
          href="#contact"
          className="btn-primary w-full max-w-sm text-lg py-4"
        >
          <Icons.Mail width={20} height={20} />
          {profile.hireButtonText}
        </a>

        {/* Copyright */}
        <p className="text-sm text-text-muted text-center mt-8">
          {profile.copyright}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="flex flex-col items-center pb-8 animate-bounce">
        <span className="text-xs text-text-muted mb-2 uppercase tracking-wider">Scroll</span>
        <Icons.ArrowDown width={20} height={20} className="text-text-muted" />
      </div>
    </div>
  );
}
