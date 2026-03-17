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

  const title = `${tool.title} - Free Online Tool | Toolzeniq`;
  const description = `${tool.description} Free online ${tool.title.toLowerCase()} tool. No sign-up required, fast and secure. Part of Toolzeniq's collection of ${TOOLS.length}+ free tools.`;
  const keywords = [...tool.keywords, tool.category.toLowerCase(), 'free', 'online', 'tool', 'no signup'].join(', ');

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Deepak Yadav" }],
    creator: "Deepak Yadav",
    publisher: "Toolzeniq",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title,
      description,
      url: `https://toolzeniq.com/tools/${tool.slug}`,
      siteName: 'Toolzeniq',
      images: [
        {
          url: `https://toolzeniq.com/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${tool.title} - Free Online Tool`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@toolzeniq',
      images: ['https://toolzeniq.com/og-image.jpg'],
      site: '@toolzeniq',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://toolzeniq.com/tools/${tool.slug}`,
    },
    other: {
      'article:author': 'Deepak Yadav',
      'article:publisher': 'https://toolzeniq.com',
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
        '@graph': [
          {
            '@type': 'WebApplication',
            'name': tool.title,
            'description': tool.description,
            'url': `https://toolzeniq.com/tools/${tool.slug}`,
            'applicationCategory': 'Utility',
            'operatingSystem': 'Web Browser',
            'browserRequirements': 'Requires JavaScript',
            'image': 'https://toolzeniq.com/og-image.jpg',
            'screenshot': 'https://toolzeniq.com/og-image.jpg',
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD',
              'availability': 'https://schema.org/InStock'
            },
            'creator': {
              '@type': 'Person',
              'name': 'Deepak Yadav',
              'url': 'https://toolzeniq.com'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Toolzeniq',
              'url': 'https://toolzeniq.com',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://toolzeniq.com/logo.png'
              }
            },
            'featureList': tool.keywords?.slice(0, 5) || [],
            'softwareVersion': '1.0',
            'datePublished': '2024-01-01',
            'dateModified': new Date().toISOString().split('T')[0]
          },
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://toolzeniq.com'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'All Tools',
                'item': 'https://toolzeniq.com/tools'
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': tool.title,
                'item': `https://toolzeniq.com/tools/${tool.slug}`
              }
            ]
          }
        ]
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

