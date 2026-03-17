'use client';

export default function TermsPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container">
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Terms of Use
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            By using Toolzeniq you accept these terms and conditions.
          </p>
        </div>

        <div className="card p-10 max-w-3xl mx-auto space-y-6">
          <p className="text-gray-600 dark:text-gray-300">
            Toolzeniq is provided as-is. We do not guarantee any specific results. Use the tools at your own risk.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            If you have questions, please contact us through the contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
