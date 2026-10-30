// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Public production URL for canonical links, Open Graph and the sitemap.
// Set SITE_URL in the Vercel/Netlify dashboard (see .env.example).
const site = process.env.SITE_URL ?? 'https://navin-llanes.vercel.app';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  // Older pages now live as sections of the single page.
  redirects: {
    '/projects': '/#projects',
    '/experience': '/#journey',
    '/stack': '/#skills',
    '/certifications': '/#journey',
    '/typing-test': '/',
    '/blog': '/',
  },
  // Fonts are downloaded at build time and self-hosted (no third-party requests at runtime).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Pixelify Sans',
      cssVariable: '--font-pixel',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
    {
      provider: fontProviders.google(),
      name: 'Geist',
      cssVariable: '--font-sans',
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Geist Mono',
      cssVariable: '--font-mono',
      weights: ['400 500'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
