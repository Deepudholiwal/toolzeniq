'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/lib/tools';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container">
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Categories
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Browse tools by category to quickly find the right utility.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="card p-8 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{category.icon}</div>
                <div>
                  <h2 className="text-2xl font-semibold">{category.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{category.tools.length} tools</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
