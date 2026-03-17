'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, Wrench } from 'lucide-react';
import { getToolBySlug, TOOLS } from '@/lib/tools';
import { Button } from '@/components/ui/button';
import AdPlaceholder from '@/components/AdPlaceholder';

const ImageCompressor = dynamic(() => import('@/components/tools/ImageCompressor'), { ssr: false });
const ImageTool = dynamic(() => import('@/components/tools/ImageTool'), { ssr: false });
const JsonFormatter = dynamic(() => import('@/components/tools/JsonFormatter'), { ssr: false });
const WordCounter = dynamic(() => import('@/components/tools/WordCounter'), { ssr: false });
const CaseConverter = dynamic(() => import('@/components/tools/CaseConverter'), { ssr: false });
const RandomTextGenerator = dynamic(() => import('@/components/tools/RandomTextGenerator'), { ssr: false });
const QRCodeGenerator = dynamic(() => import('@/components/tools/QRCodeGenerator'), { ssr: false });
const PasswordGenerator = dynamic(() => import('@/components/tools/PasswordGenerator'), { ssr: false });
const GenericTool = dynamic(() => import('@/components/tools/GenericTool'), { ssr: false });

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  'image-compressor': ImageCompressor,
  'json-formatter': JsonFormatter,
  'word-counter': WordCounter,
  'case-converter': CaseConverter,
  'random-text-generator': RandomTextGenerator,
  'qr-code-generator': QRCodeGenerator,
  'password-generator': PasswordGenerator,
};

const IMAGE_TOOL_SLUGS = [
  'image-compressor',
  'image-resizer',
  'image-cropper',
  'jpg-to-png',
  'png-to-jpg',
  'image-to-base64',
  'image-metadata',
  'watermark-image',
];


interface ToolRendererProps {
  slug: string;
}

function ToolFallback({ slug }: { slug: string }) {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center">
        <Wrench className="w-14 h-14 text-gray-400" />
        <h1 className="text-3xl font-bold">Tool not found</h1>
        <p className="max-w-xl text-gray-600 dark:text-gray-300">
          We couldn&apos;t find the tool you&apos;re looking for. Try browsing the full tool list instead.
        </p>
        <Link href="/tools">
          <Button variant="outline" className="mt-2">
            Back to All Tools
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center">
      <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-gray-200 dark:border-gray-800 shadow-sm">
        <p className="text-5xl">{tool.icon}</p>
      </div>
      <h1 className="text-4xl font-bold">{tool.title}</h1>
      <p className="max-w-2xl text-gray-600 dark:text-gray-300">{tool.description}</p>
      <div className="space-y-2">
        <p className="font-semibold text-gray-700 dark:text-gray-200">Coming soon</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">We are working on bringing this tool online soon. In the meantime, explore other useful tools below.</p>
      </div>

      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {TOOLS.slice(0, 4).map((item) => (
          <Link key={item.slug} href={`/tools/${item.slug}`} className="block">
            <div className="card h-full p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.category}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Try it</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-300 hover:underline">
          <ChevronLeft className="w-4 h-4" /> Back to all tools
        </Link>
      </div>
    </div>
  );
}

export default function ToolRenderer({ slug }: ToolRendererProps) {
  const ToolComponent = TOOL_COMPONENTS[slug];

  const isImageTool = IMAGE_TOOL_SLUGS.includes(slug);

  return (
    <div className="container py-12">
      <AdPlaceholder label="Header Ad" className="mb-10" />
      {isImageTool ? <ImageTool slug={slug} /> : ToolComponent ? <ToolComponent /> : <GenericTool slug={slug} />}
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <AdPlaceholder label="Sidebar Ad" />
        <AdPlaceholder label="Below Tool Ad" />
      </div>
    </div>
  );
}

