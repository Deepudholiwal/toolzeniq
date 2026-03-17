'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function SubscriptionWidget() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Website' }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmail('');
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Failed to subscribe:', error);
      setError('Failed to subscribe. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start gap-4 mb-4">
          <Mail className="w-6 h-6 text-white flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-2xl font-bold text-white">Stay Updated</h3>
            <p className="text-blue-100 mt-1">
              Subscribe to get notified about new tools and updates
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div className="flex items-center gap-3 p-4 bg-white bg-opacity-20 rounded-lg text-white">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>Thanks for subscribing! Check your email for confirmation.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 transition-colors whitespace-nowrap"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}

        {error && (
          <p className="text-red-200 text-sm mt-3">{error}</p>
        )}

        <p className="text-blue-100 text-xs mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}