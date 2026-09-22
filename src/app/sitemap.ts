import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://melcadi.com';
  const locales = ['en', 'fr', 'ar'];
  const routes = ['', '/privacy', '/terms'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      const languageAlternates: Record<string, string> = {};
      locales.forEach((l) => {
        languageAlternates[l] = `${baseUrl}/${l}${route}`;
      });
      languageAlternates['x-default'] = `${baseUrl}/en${route}`;

      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.6,
        alternates: {
          languages: languageAlternates,
        },
      });
    });
  });

  return sitemapEntries;
}

