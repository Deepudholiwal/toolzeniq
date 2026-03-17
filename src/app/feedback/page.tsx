import FeedbackForm from '@/components/FeedbackForm';

export const metadata = {
  title: 'Send Feedback',
  description: 'Share your feedback and suggestions about our tools',
};

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Feedback</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Your feedback helps us improve our tools and services. We appreciate your thoughts!
          </p>
        </div>

        <FeedbackForm />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600 mb-2">💬</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Share Ideas</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tell us about features you'd like to see or improvements to existing tools.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600 mb-2">⭐</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Rate Tools</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Rate your experience with our tools to help us understand what works best.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-purple-600 mb-2">🐛</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Report Issues</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Found a bug or experiencing issues? Let us know and we'll fix it quickly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}