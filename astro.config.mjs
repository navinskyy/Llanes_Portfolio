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
  // The site is one long scroll; the old inner pages point at their sheet.
  redirects: {
    '/projects': '/#projects',
    '/experience': '/#experience',
    '/stack': '/#stack',
    '/certifications': '/#certificates',
  },
  // Fonts are downloaded at build time and self-hosted (no third-party requests at runtime).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Archivo',
      cssVariable: '--font-sheet',
      weights: ['400 900'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Archivo Narrow',
      cssVariable: '--font-note',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Arial Narrow', 'sans-serif'],
    },
  ],
});
