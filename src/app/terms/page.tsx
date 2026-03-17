import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ArrowLeft, Calendar, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Toolzeniq - Legal Agreement',
  description: 'Read Toolzeniq\'s Terms & Conditions. Understand your rights and responsibilities when using our free online tools.',
  keywords: 'terms of use, terms and conditions, legal agreement, toolzeniq terms, user agreement',
  openGraph: {
    title: 'Terms & Conditions | Toolzeniq',
    description: 'Read our Terms & Conditions to understand your rights and responsibilities.',
    url: 'https://toolzeniq.com/terms',
    siteName: 'Toolzeniq',
  },
};

export default function TermsPage() {
  const lastUpdated = "January 15, 2024";

  return (
    <div className="min-h-screen py-24">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">Terms & Conditions</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            Legal Agreement
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Please read these terms and conditions carefully before using Toolzeniq.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-amber-800 dark:text-amber-200">Important Notice</div>
              <div className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                By accessing and using Toolzeniq, you accept and agree to be bound by the terms and provision of this agreement.
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">1. Acceptance of Terms</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  By accessing and using Toolzeniq ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">2. Description of Service</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Toolzeniq provides a collection of free online tools and utilities for various purposes including but not limited to text processing, image manipulation, development tools, and productivity utilities. All tools are designed to process data locally in your web browser.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">3. User Obligations</h2>
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">By using our Service, you agree to:</p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                    <li>Use the Service only for lawful purposes</li>
                    <li>Not attempt to reverse engineer, modify, or interfere with our tools</li>
                    <li>Not use the Service to process illegal, harmful, or copyrighted content without permission</li>
                    <li>Not overload our servers or attempt to gain unauthorized access</li>
                    <li>Respect the intellectual property rights of others</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">4. Privacy and Data Handling</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Your privacy is important to us. All tool processing occurs locally in your web browser. We do not store, transmit, or have access to the data you process through our tools. For more information, please review our <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">5. Intellectual Property</h2>
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    The Service and its original content, features, and functionality are and will remain the exclusive property of Toolzeniq and its licensors. The Service is protected by copyright, trademark, and other laws.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Our tools are provided under open-source licenses where applicable. You retain all rights to the content you process through our tools.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">6. Disclaimers and Limitations</h2>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Shield className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-red-800 dark:text-red-200">Important Disclaimers</div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm text-red-700 dark:text-red-300">
                    <p>The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, Toolzeniq:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Excludes all representations and warranties relating to this website and its contents</li>
                      <li>Does not guarantee the accuracy, completeness, or timeliness of the tools or results</li>
                      <li>Is not responsible for any loss or damage arising from your use of our tools</li>
                      <li>Does not warrant that the service will be uninterrupted or error-free</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">7. Limitation of Liability</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  In no event shall Toolzeniq, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">8. Termination</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">9. Changes to Terms</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">10. Governing Law</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  These Terms shall be interpreted and governed by the laws of the jurisdiction in which Toolzeniq operates, without regard to conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">11. Contact Information</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  If you have any questions about these Terms & Conditions, please contact us through our <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact page</Link>.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mt-8">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Need Help?</h3>
                  <p className="text-blue-700 dark:text-blue-300 mb-4">
                    If you have questions about these terms or need clarification, don't hesitate to reach out.
                  </p>
                  <Link href="/contact">
                    <Button className="gap-2">
                      Contact Us
                      <FileText className="w-4 h-4" />
                    </Button>
                  </Link>
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
