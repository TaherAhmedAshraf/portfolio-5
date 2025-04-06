import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
      ],
    },
    sitemap: 'https://taher.one/sitemap.xml',
    host: 'https://taher.one',
  };
} 