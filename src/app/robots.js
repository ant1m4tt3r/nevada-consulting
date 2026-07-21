import { SITE_URL } from '../lib/seo';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/pt/account',
        '/en/account',
        '/pt/admin',
        '/en/admin',
        '/pt/booking/',
        '/en/booking/',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
