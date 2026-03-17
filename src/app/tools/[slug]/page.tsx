import type { Metadata } from 'next';

import ToolRenderer from '@/components/ToolRenderer';
import { getToolBySlug, TOOLS } from '@/lib/tools';

interface ToolPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool not found | Toolzeniq',
      description: 'Explore our collection of free online tools.',
    };
  }

  return {
    title: `${tool.title} | Toolzeniq`,
    description: tool.description,
    openGraph: {
      title: `${tool.title} | Toolzeniq`,
      description: tool.description,
      url: `https://toolzeniq.com/tools/${tool.slug}`,
      siteName: 'Toolzeniq',
      images: [
        {
          url: `https://toolzeniq.com/og-image.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.title} | Toolzeniq`,
      description: tool.description,
      images: 'https://toolzeniq.com/og-image.jpg',
    },
  };
}

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  const schema = tool
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: tool.title,
        description: tool.description,
        url: `https://toolzeniq.com/tools/${tool.slug}`,
        applicationCategory: tool.category,
        image: 'https://toolzeniq.com/og-image.jpg',
      }
    : null;

  return (
    <>
      <ToolRenderer slug={slug} />
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
}

