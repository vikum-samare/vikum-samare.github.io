/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment under username.github.io/repo-name
  basePath: process.env.NODE_ENV === 'production' ? '/vikum-samare' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/vikum-samare' : '',
};

module.exports = nextConfig;
