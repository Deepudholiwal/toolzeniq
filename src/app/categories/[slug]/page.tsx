import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryBySlug, TOOLS, CATEGORIES } from '@/lib/tools';
import ToolCard from '@/components/ToolCard';
import { Button } from '@/components/ui/button';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  return params.then(({ slug }) => {
    const category = getCategoryBySlug(slug);

    if (!category) {
      return {
        title: 'Category not found | Toolzeniq',
        description: 'Explore our collection of free online tools.',
      };
    }

    return {
      title: `${category.name} | Toolzeniq`,
      description: category.description,
      openGraph: {
        title: `${category.name} | Toolzeniq`,
        description: category.description,
        url: `https://toolzeniq.com/categories/${category.slug}`,
        siteName: 'Toolzeniq',
        images: [
          {
            url: 'https://toolzeniq.com/og-image.jpg',
            width: 1200,
            height: 630,
          },
        ],
        type: 'website',
      },
    };
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const tools = TOOLS.filter((tool) => category.tools.includes(tool.slug));

  return (
    <div className="min-h-screen py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {category.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mt-4">{category.description}</p>
          </div>
          <Button asChild className="inline-flex items-center justify-center px-6 py-3">
            <Link href="/tools">Browse all tools</Link>
          </Button>
        </div>

        <div className="tool-grid">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} {...tool} comingSoon={!tool.component} />
          ))}
        </div>
      </div>
    </div>
  );
}
