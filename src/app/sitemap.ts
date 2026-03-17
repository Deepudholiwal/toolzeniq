import { TOOLS, CATEGORIES } from '@/lib/tools';

export default function sitemap() {
  const baseUrl = 'https://toolzeniq.com';

  const staticPages = [
    {
      url: '',
      priority: 1.0,
      changeFrequency: 'daily' as const,
    },
    {
      url: '/tools',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      url: '/categories',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      url: '/blog',
      priority: 0.8,
      changeFrequency: 'daily' as const,
    },
    {
      url: '/about',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    },
    {
      url: '/contact',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      url: '/privacy',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    {
      url: '/terms',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
  ];

  const toolPages = TOOLS.map((tool) => ({
    url: `/tools/${tool.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  const categoryPages = CATEGORIES.map((cat) => ({
    url: `/categories/${cat.slug}`,
    priority: 0.7,
    changeFrequency: 'weekly' as const,
  }));

  const allPages = [...staticPages, ...toolPages, ...categoryPages];

  return allPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date().toISOString(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
