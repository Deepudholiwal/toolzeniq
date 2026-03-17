'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container">
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            About Toolzeniq
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of free, no‑signup tools designed to help you get things done quickly.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-2">Our mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We believe everyone should have access to simple, fast and privacy-first tools without the need to sign up or install anything.
            </p>
          </div>
          <div className="card p-8">
            <h2 className="text-2xl font-semibold mb-2">Built for web</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Toolzeniq is built with modern web standards based on Next.js and Tailwind CSS. It works fast on mobile and desktop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
