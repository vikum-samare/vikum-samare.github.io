# Portfolio

A static Next.js portfolio site using the Pages Router, designed for GitHub Pages deployment.

## Features

- 🌍 Multi-language support (EN, DE, NL)
- 🌓 Dark/Light theme toggle with persistent preference
- 📱 Fully responsive design
- ⚡ Static export for fast loading
- 🎨 Tailwind CSS with custom design system
- 📝 Content-driven architecture with typed configuration

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm

### Installation

```bash
cd apps/portfolio
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
pnpm build
```

This generates a static export in the `out/` directory.

### Type Checking

```bash
pnpm type-check
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Sidebar, FloatingNav, etc.)
│   ├── sections/        # Page sections (Hero, About, Portfolio, etc.)
│   └── ui/              # Reusable UI components (Card, Icons, etc.)
├── config/              # Content configuration for each language
├── pages/               # Next.js pages
│   ├── index.tsx        # English (default)
│   ├── de/index.tsx     # German
│   └── nl/index.tsx     # Dutch
├── styles/              # Global styles and Tailwind config
└── types/               # TypeScript type definitions
```

## Customization

### Content

Edit the content files in `src/config/`:
- `content.en.ts` - English content
- `content.de.ts` - German content  
- `content.nl.ts` - Dutch content

### Theme

The design system is defined in:
- `tailwind.config.ts` - Tailwind configuration
- `src/styles/globals.css` - CSS custom properties for theming

### Adding Sections

1. Create a new section component in `src/components/sections/`
2. Add the content type to `src/types/content.ts`
3. Add content to each language config file
4. Import and use the section in the page components

## Deployment

The site automatically deploys to GitHub Pages when pushing to the `main` branch.

### Manual Deployment

```bash
pnpm build
# Upload the 'out/' directory to your hosting provider
```

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations (optional)

## License

MIT
