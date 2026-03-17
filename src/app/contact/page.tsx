'use client';

import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container">
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Contact
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have feedback or feature requests? Drop us a message and we&apos;ll get back to you soon.
          </p>
        </div>

        <div className="card p-10 max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-2 block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Message</label>
              <textarea
                rows={5}
                placeholder="Your message…"
                className="mt-2 block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
