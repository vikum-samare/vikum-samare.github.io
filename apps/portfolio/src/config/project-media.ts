import { PortfolioProject, PortfolioScreenshot } from '@/types';

export type ProjectId =
  | 'proj-1'
  | 'proj-2'
  | 'proj-3'
  | 'proj-4'
  | 'proj-5'
  | 'proj-6';

interface ProjectMedia {
  readonly imageUrl: string;
  readonly tags: readonly string[];
  readonly link?: string;
  readonly coverUrl: string;
  readonly coverFit?: 'cover' | 'contain';
  readonly screenshots: readonly PortfolioScreenshot[];
}

/**
 * Everything about a project that is the same in every language: imagery, the
 * tech tag row, and the outbound link. Text lives in the content.<lang>.ts
 * files and is merged in by `project()` below, so a new screenshot is added
 * once here rather than three times.
 *
 * Screenshot captions are deliberately absent: none of the shots have real
 * captions yet, and a caption is translatable text, so it belongs in the
 * language files if one is ever added.
 */
const media: Record<ProjectId, ProjectMedia> = {
  'proj-1': {
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    tags: ['NestJS', 'MongoDB', 'React Native', 'Kubernetes', 'RabbitMQ', 'GitHub Actions'],
    link: '#',
    coverUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=700&fit=crop',
    screenshots: [
      { url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=500&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop' },
    ],
  },
  'proj-2': {
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop',
    tags: ['React Native', 'Redux', 'Node.js', 'AWS EC2', 'App Center'],
    coverUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&h=700&fit=crop',
    screenshots: [
      { url: 'https://assets.vikum.dev/projects/clyde-co/screen-1.png' },
      { url: 'https://assets.vikum.dev/projects/clyde-co/screen-2.png' },
      { url: 'https://assets.vikum.dev/projects/clyde-co/screen-3.png' },
      { url: 'https://assets.vikum.dev/projects/clyde-co/screen-4.png' },
      { url: 'https://assets.vikum.dev/projects/clyde-co/screen-5.png' },
    ],
  },
  'proj-3': {
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    tags: ['NestJS', 'React', 'React Native', 'AWS', 'DynamoDB'],
    link: '#',
    coverUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=700&fit=crop',
    // TODO: replace with real screenshots.
    screenshots: [
      { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop' },
    ],
  },
  'proj-4': {
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    tags: ['React', 'React Native', 'Fintech'],
    coverUrl: '/maybank-cover.png',
    coverFit: 'contain',
    screenshots: [
      { url: 'https://assets.vikum.dev/projects/maybank/maybank-3.png' },
      { url: 'https://assets.vikum.dev/projects/maybank/maybank-1.png' },
      { url: 'https://assets.vikum.dev/projects/maybank/maybank-2.png' },
    ],
  },
  'proj-5': {
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'AWS', 'Dwolla'],
    link: '#',
    coverUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=700&fit=crop',
    // TODO: replace with real screenshots.
    screenshots: [
      { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=500&fit=crop' },
    ],
  },
  'proj-6': {
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
    tags: ['React', 'React Native', 'Node.js', 'AWS', 'Docker', 'NGINX', 'Jenkins'],
    link: '#',
    coverUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&h=700&fit=crop',
    // TODO: replace with real screenshots.
    screenshots: [
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=500&fit=crop' },
    ],
  },
};

interface ProjectText {
  readonly title: string;
  readonly category: string;
  readonly subtitle?: string;
  readonly description: readonly string[];
  readonly linkLabel?: string;
}

/** Merges the shared media for `id` with this language's text. */
export function project(id: ProjectId, text: ProjectText): PortfolioProject {
  const { coverUrl, coverFit, screenshots, ...card } = media[id];
  return {
    id,
    ...card,
    title: text.title,
    category: text.category,
    details: {
      coverUrl,
      coverFit,
      subtitle: text.subtitle,
      description: text.description,
      screenshots,
      linkLabel: text.linkLabel,
    },
  };
}
