'use client';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container">
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Toolzeniq does not collect or store personal data. Use the tools anonymously.
          </p>
        </div>

        <div className="card p-10 max-w-3xl mx-auto space-y-6">
          <p className="text-gray-600 dark:text-gray-300">
            We respect your privacy. All processing happens in your browser, and no data is sent to our servers unless you explicitly choose to share it.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            The only data stored is anonymous analytics to help improve the service.
          </p>
        </div>
      </div>
    </div>
  );
}
