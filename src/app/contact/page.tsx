import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare, HelpCircle, Clock, MapPin, Phone, Send, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Contact Us | Toolzeniq - Get in Touch',
  description: 'Have questions, feedback, or feature requests? Contact the Toolzeniq team. We\'re here to help with your online tool needs.',
  keywords: 'contact toolzeniq, support, feedback, help, customer service, tool suggestions',
  openGraph: {
    title: 'Contact Toolzeniq | Get in Touch',
    description: 'Have questions or feedback? Contact the Toolzeniq team for support and suggestions.',
    url: 'https://toolzeniq.com/contact',
    siteName: 'Toolzeniq',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">Contact Us</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Get in Touch
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions, feedback, or suggestions? We'd love to hear from you. Our team is here to help make Toolzeniq better for everyone.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Subject *
                  </label>
                  <select className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Tell us how we can help you..."
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-900 dark:text-white resize-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Email</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">hello@toolzeniq.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Response Time</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Within 24-48 hours</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Location</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Global (Remote Team)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Answers</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                  <div className="font-medium text-gray-900 dark:text-white mb-2">Are your tools really free?</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Yes! All tools are completely free with no hidden costs or premium features.</div>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                  <div className="font-medium text-gray-900 dark:text-white mb-2">Is my data safe?</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Absolutely. All processing happens in your browser - we never store or transmit your data.</div>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                  <div className="font-medium text-gray-900 dark:text-white mb-2">Do you offer API access?</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Not currently, but we're considering it for enterprise users. Let us know if this interests you!</div>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                  <div className="font-medium text-gray-900 dark:text-white mb-2">Can I suggest new tools?</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Definitely! We love hearing new tool ideas from our community.</div>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-green-800 dark:text-green-200">Thank you!</div>
                  <div className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Your message has been sent successfully. We'll get back to you within 24-48 hours.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative Contact Methods */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Other Ways to Reach Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">FAQ</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Check our frequently asked questions for quick answers.
              </p>
              <Link href="/faq">
                <Button variant="outline" size="sm">View FAQ</Button>
              </Link>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Feedback</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Share your thoughts and help us improve our tools.
              </p>
              <Link href="/feedback">
                <Button variant="outline" size="sm">Give Feedback</Button>
              </Link>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Newsletter</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Stay updated with new tools and features.
              </p>
              <Link href="/#newsletter">
                <Button variant="outline" size="sm">Subscribe</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
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
