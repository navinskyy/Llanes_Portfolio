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
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Fonts are downloaded at build time and self-hosted (no third-party requests at runtime).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Michroma',
      cssVariable: '--font-legend',
      weights: [400],
      subsets: ['latin'],
      fallbacks: ['Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Public Sans',
      cssVariable: '--font-body',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-data',
      weights: [400, 600],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
