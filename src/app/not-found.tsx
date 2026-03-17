'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-md text-center p-10 rounded-3xl shadow-xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm">
        <AlertTriangle className="mx-auto h-16 w-16 text-blue-600 dark:text-blue-300" />
        <h1 className="mt-6 text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          The page you are looking for does not exist or may have moved. Try returning to the tools list.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button asChild>
            <Link href="/tools">All Tools</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
