import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
  },
  {
    url: `${baseUrl}/contacts`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  },
];

export default sitemap;
