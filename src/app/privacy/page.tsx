import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, Database, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Privacy Policy | Toolzeniq - Free Online Tools',
  description: 'Learn about Toolzeniq\'s privacy policy. We respect your privacy - no data collection, no tracking, all processing happens locally in your browser.',
  keywords: 'privacy policy, data protection, no tracking, browser processing, anonymous tools',
  openGraph: {
    title: 'Privacy Policy | Toolzeniq',
    description: 'Learn about our commitment to your privacy. No data collection, no tracking.',
    url: 'https://toolzeniq.com/privacy',
    siteName: 'Toolzeniq',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">Privacy Policy</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Privacy First
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your privacy is our top priority. Learn how we protect your data and ensure secure, anonymous tool usage.
          </p>
        </div>

        {/* Last Updated */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: March 17, 2026
          </p>
        </div>

        {/* Privacy Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-800/50 text-center">
            <Lock className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">No Data Collection</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">We don't store or collect any personal information</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50 text-center">
            <Database className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Local Processing</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">All tools run in your browser, not on our servers</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-800/50 text-center">
            <Eye className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">No Tracking</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">No analytics, cookies, or tracking pixels</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200/50 dark:border-orange-800/50 text-center">
            <Shield className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Anonymous Usage</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Use all tools completely anonymously</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Information We Don't Collect</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  At Toolzeniq, we believe in privacy by design. Unlike many websites, we don't collect, store, or process any personal information. Here's what we explicitly don't do:
                </p>

                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-8">
                  <li>No email addresses or personal contact information</li>
                  <li>No IP addresses or location data</li>
                  <li>No browsing history or usage analytics</li>
                  <li>No cookies or tracking technologies</li>
                  <li>No user accounts or registration data</li>
                  <li>No payment information or financial data</li>
                  <li>No file uploads to our servers</li>
                  <li>No third-party data sharing</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How Our Tools Work</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  All Toolzeniq tools are designed to run entirely in your web browser. This means:
                </p>

                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-8">
                  <li><strong>Client-side processing:</strong> All calculations and transformations happen on your device</li>
                  <li><strong>No server communication:</strong> Your data never leaves your browser</li>
                  <li><strong>Offline capable:</strong> Many tools work without an internet connection</li>
                  <li><strong>Instant results:</strong> No waiting for server responses</li>
                  <li><strong>Secure by default:</strong> Your data is never transmitted over the internet</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Data Security & Privacy</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Since all processing happens locally in your browser, your data security is determined by your device's security. We recommend:
                </p>

                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-8">
                  <li>Using a modern, updated web browser</li>
                  <li>Keeping your device's operating system updated</li>
                  <li>Using antivirus software if handling sensitive files</li>
                  <li>Avoiding public computers for sensitive operations</li>
                  <li>Clearing browser cache regularly if concerned about local storage</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact & Support</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  If you have any questions about our privacy practices or need support, you can reach us through:
                </p>

                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-8">
                  <li><Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact form</Link> on our website</li>
                  <li>Email: privacy@toolzeniq.com (for privacy-specific inquiries)</li>
                  <li><Link href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">About page</Link> for more information about our mission</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Changes to This Policy</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  This privacy policy may be updated occasionally to reflect changes in our practices or for legal compliance. Any changes will be posted on this page with an updated "Last updated" date.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mt-8">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Privacy Commitment</h3>
                  <p className="text-blue-800 dark:text-blue-200">
                    Toolzeniq is committed to providing powerful tools while respecting your privacy. We believe that useful tools shouldn't come at the cost of your personal data. If you ever have concerns about privacy, please don't hesitate to contact us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="outline" size="lg" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
