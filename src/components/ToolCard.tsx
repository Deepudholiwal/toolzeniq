'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  comingSoon?: boolean;
}

export default function ToolCard({ slug, title, description, icon, category, comingSoon }: ToolCardProps) {
  return (
    <Link href={`/tools/${slug}`} className="group">
      <div className="card h-full">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl group-hover:scale-110 transition-all duration-300 min-w-[64px] flex items-center justify-center">
            <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                {category}
              </span>
              {comingSoon && (
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                  Coming soon
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3 leading-tight">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0">
            Free & Fast →
          </span>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ml-auto" />
        </div>
      </div>
    </Link>
  );
}

