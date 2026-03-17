import { TOOLS, CATEGORIES } from '@/lib/tools';

export default function sitemap() {
  const baseUrl = 'https://toolzeniq.com';

  const staticPages = [
    '',
    '/tools',
    '/categories',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ];

  const toolPages = TOOLS.map((tool) => `/tools/${tool.slug}`);
  const categoryPages = CATEGORIES.map((cat) => `/categories/${cat.slug}`);

  const pages = [...staticPages, ...toolPages, ...categoryPages];

  return pages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
  }));
}
