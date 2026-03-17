import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, HelpCircle, Star, Users, Clock, Zap } from 'lucide-react';

import ToolRenderer from '@/components/ToolRenderer';
import AdPlaceholder from '@/components/AdPlaceholder';
import { getToolBySlug, TOOLS } from '@/lib/tools';
import { Button } from '@/components/ui/button';

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
  const description = `${tool.description}. Free online ${tool.title.toLowerCase()} tool with no sign-up required. Fast, secure, and easy to use. Part of Toolzeniq's collection of ${TOOLS.length}+ free tools.`;
  const keywords = [...tool.keywords, tool.category.toLowerCase(), 'free', 'online', 'tool', 'no signup', 'fast', 'secure'].join(', ');

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

  if (!tool) {
    return (
      <div className="min-h-screen py-24">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Tool Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">The tool you're looking for doesn't exist.</p>
            <Link href="/tools">
              <Button>View All Tools</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedTools = TOOLS.filter(t =>
    t.category === tool.category && t.slug !== tool.slug
  ).slice(0, 6);

  const schema = {
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
  };

  return (
    <>
      <div className="min-h-screen py-24">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">{tool.title}</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-6">
              <span className="text-2xl">{tool.icon}</span>
              {tool.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
              {tool.title} - Free Online Tool
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {tool.description}. Our free online {tool.title.toLowerCase()} tool is fast, secure, and requires no sign-up. Perfect for {tool.keywords.slice(0, 3).join(', ')} and more.
            </p>
          </div>

          {/* Top Ad Placeholder */}
          <div className="mb-8">
            <AdPlaceholder position="top" />
          </div>

          {/* Tool Interface */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-12">
            <div className="p-8">
              <ToolRenderer slug={slug} />
            </div>
          </div>

          {/* Middle Ad Placeholder */}
          <div className="mb-12">
            <AdPlaceholder position="middle" />
          </div>

          {/* SEO Content Section */}
          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  About Our {tool.title} Tool
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Our {tool.title.toLowerCase()} tool is designed to help you {tool.description.toLowerCase()}.
                    Whether you're a developer, designer, student, or business professional, this tool provides
                    fast and accurate results without any complexity.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    Key features of our {tool.title.toLowerCase()} include:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                    <li>Free to use with no registration required</li>
                    <li>Fast processing with instant results</li>
                    <li>Secure and private - all processing happens in your browser</li>
                    <li>Works on all devices - desktop, tablet, and mobile</li>
                    <li>No file uploads required for most operations</li>
                    <li>Clean, intuitive interface</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Start using our {tool.title.toLowerCase()} tool today and experience the difference
                    that professional-grade utilities can make in your workflow.
                  </p>
                </div>
              </section>

              {/* How to Use */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  How to Use {tool.title}
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Access the Tool</h3>
                      <p className="text-gray-600 dark:text-gray-300">Navigate to our {tool.title.toLowerCase()} page and you'll see the clean, intuitive interface.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Input Your Data</h3>
                      <p className="text-gray-600 dark:text-gray-300">Enter or upload your content using the provided input fields.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Configure Options</h3>
                      <p className="text-gray-600 dark:text-gray-300">Adjust any available settings to customize the output according to your needs.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Get Results</h3>
                      <p className="text-gray-600 dark:text-gray-300">Click process and receive your results instantly. Download or copy as needed.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-blue-600" />
                      Is {tool.title} free to use?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">Yes, our {tool.title.toLowerCase()} tool is completely free with no hidden costs or premium features.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-blue-600" />
                      Do I need to create an account?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">No registration required. Use our tools instantly without signing up.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-blue-600" />
                      Is my data secure?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">All processing happens in your browser. We don't store or transmit your data to our servers.</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-blue-600" />
                      Does it work on mobile devices?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">Yes, our tools are fully responsive and work perfectly on phones, tablets, and desktops.</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Tool Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tool Statistics</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Users</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">10K+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Avg. Time</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">&lt; 2s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Rating</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">4.9/5</span>
                  </div>
                </div>
              </div>

              {/* Related Tools */}
              {relatedTools.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Tools</h3>
                  <div className="space-y-3">
                    {relatedTools.map((relatedTool) => (
                      <Link
                        key={relatedTool.slug}
                        href={`/tools/${relatedTool.slug}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                      >
                        <span className="text-xl">{relatedTool.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {relatedTool.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {relatedTool.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Ad */}
              <AdPlaceholder position="sidebar" />
            </div>
          </div>

          {/* Bottom Ad Placeholder */}
          <div className="mb-12">
            <AdPlaceholder position="bottom" />
          </div>

          {/* Back to Tools */}
          <div className="text-center">
            <Link href="/tools">
              <Button variant="outline" size="lg" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to All Tools
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}

