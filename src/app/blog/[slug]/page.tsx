'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Simple markdown formatter
function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line.trim()) {
      elements.push(<div key={`empty-${i}`} className="my-2" />);
    } else if (line.startsWith('# ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          {line.slice(2)}
        </h2>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h3 key={i} className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          {line.slice(3)}
        </h3>
      );
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={i} className="ml-6 text-gray-700 dark:text-gray-300 mb-2">
          {line.slice(2)}
        </li>
      );
    } else if (line.match(/^\d+\. /)) {
      const match = line.match(/^\d+\. (.+)/);
      elements.push(
        <li key={i} className="ml-6 text-gray-700 dark:text-gray-300 mb-2">
          {match?.[1]}
        </li>
      );
    } else {
      // Format inline markdown: **bold**, *italic*, `code`
      const rendered = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code>$1</code>');

      elements.push(
        <p
          key={i}
          className="text-gray-700 dark:text-gray-300 leading-7 mb-4"
          dangerouslySetInnerHTML={{ __html: rendered }}
        />
      );
    }
  }

  return (
    <div className="space-y-4">
      {elements}
    </div>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await fetch('/api/admin/blogs');
      if (response.ok) {
        const blogs: Blog[] = await response.json();
        const foundBlog = blogs.find((b) => b.slug === slug && b.published);
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setNotFound(true);
        }
      }
    } catch (error) {
      console.error('Failed to fetch blog:', error);
      setNotFound(true);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const publishDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Article Header */}
          <div className="px-6 sm:px-8 py-8 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {blog.title}
            </h1>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: blog.title,
                      text: blog.excerpt,
                      url: window.location.href,
                    });
                  }
                }}
                className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          {/* Excerpt */}
          {blog.excerpt && (
            <div className="px-6 sm:px-8 py-6 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
              <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                {blog.excerpt}
              </p>
            </div>
          )}

          {/* Article content */}
          <div className="px-6 sm:px-8 py-8">
            <MarkdownContent content={blog.content} />
          </div>

          {/* Article footer */}
          <div className="px-6 sm:px-8 py-6 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Last updated on {new Date(blog.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                View More Articles
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}