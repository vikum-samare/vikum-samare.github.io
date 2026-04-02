# AI Coding Agent Instructions

## Project Overview
This is a **monorepo** containing a multilingual portfolio site built with **Next.js Pages Router** and configured for **static export** to GitHub Pages.

## Architecture & Key Patterns

### Content-Driven Multi-Language System
- **Content files**: `src/config/content.{en,de,nl}.ts` define all text content
- **Types first**: All content structures are strictly typed in `src/types/content.ts`
- **Page structure**: Each language has its own page route (`/`, `/de/`, `/nl/`)
- **Pattern**: Always update all three language files when adding new content fields

### Component Organization
```
src/components/
├── layout/     # Layout system: Sidebar, FloatingNav, MobileHeader, ThemeToggle
├── sections/   # Page sections: HeroSection, AboutSection, etc.
└── ui/         # Reusable components: Card, Icons, SectionHeader
```

### Responsive Layout Strategy
- **Desktop**: Fixed sidebar + main content area + floating navigation
- **Mobile**: Hidden sidebar + mobile header + mobile profile card + floating nav
- **Key components**: `Layout.tsx` orchestrates responsive behavior, `MobileProfileCard` appears before content on mobile

### Theme System (Critical Pattern)
- **CSS Custom Properties** in `globals.css` define both light/dark themes
- **Tailwind config** maps to CSS variables: `bg-background-base`, `text-primary`, etc.
- **Theme toggle**: `ThemeToggle.tsx` persists preference via `localStorage`
- **Never use hardcoded colors** - always use the semantic tokens from the design system

### Static Export Configuration
- **Next.js config**: `output: 'export'`, `images: unoptimized`, `trailingSlash: true`
- **Build command**: `pnpm build` generates static files in `out/` directory
- **No server-side features**: No API routes, no ISR, no server components

## Development Workflow

### Essential Commands
```bash
cd apps/portfolio          # Always work in the portfolio app directory
pnpm install              # Install dependencies
pnpm dev                  # Development server (localhost:3000)
pnpm build                # Static export for production
pnpm type-check           # TypeScript validation
```

### Dependencies & Package Management
- **Package manager**: pnpm (specified in package.json)
- **Key dependencies**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **No runtime dependencies**: Site runs as static HTML/CSS/JS

### Adding New Sections
1. Create section component in `src/components/sections/`
2. Add content interface to `src/types/content.ts`
3. Add content to all language configs (`content.{en,de,nl}.ts`)
4. Import and use in page components (`pages/index.tsx`, `pages/{lang}/index.tsx`)

## Critical Considerations

### Content Management
- **Immutable exports**: All content configs export as `const` with `readonly` properties  
- **Type safety**: Content changes must be made in types first, then implementations
- **Translation parity**: All three languages must have matching content structure

### Styling Guidelines
- **Mobile-first responsive**: Design primarily for mobile, enhance for desktop
- **Design tokens only**: Use semantic color tokens, never hex/rgb values directly
- **Component styles**: Prefer Tailwind utilities over custom CSS classes
- **Spacing system**: Use the extended spacing scale defined in `tailwind.config.ts`

### Performance & SEO
- **Static generation**: All pages pre-rendered at build time
- **Meta tags**: Each language page includes complete Open Graph and Twitter meta tags
- **Image optimization disabled**: Due to static export constraints
- **Font loading**: Inter font loaded via Google Fonts with `display=swap`

This codebase prioritizes maintainable, type-safe content management with a responsive, theme-aware design system optimized for static hosting.