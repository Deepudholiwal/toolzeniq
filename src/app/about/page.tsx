import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Users, Zap, Shield, Target, Heart, Code, Globe, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About Us | Toolzeniq - Free Online Tools',
  description: 'Learn about Toolzeniq\'s mission to provide free, privacy-first online tools. No sign-up required, fast processing, and complete anonymity.',
  keywords: 'about toolzeniq, free tools, privacy first, no signup, online utilities, developer tools',
  openGraph: {
    title: 'About Toolzeniq | Free Online Tools',
    description: 'Learn about our mission to provide free, privacy-first online tools for everyone.',
    url: 'https://toolzeniq.com/about',
    siteName: 'Toolzeniq',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">About Us</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Our Story
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            About Toolzeniq
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Empowering users worldwide with free, privacy-first online tools. No sign-up, no tracking, just powerful utilities that work when you need them.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50 text-center">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Our Mission</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Democratize access to powerful tools for everyone</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-800/50 text-center">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Your data stays on your device, always</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-800/50 text-center">
            <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Instant results with no waiting</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200/50 dark:border-orange-800/50 text-center">
            <Globe className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Accessible</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Works on any device, anywhere</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-12">
            <div className="p-8 md:p-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Toolzeniq Exists</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  In a world where digital tools are increasingly complex and privacy-invasive, Toolzeniq was born from a simple belief: everyone should have access to powerful utilities without compromising their privacy or paying exorbitant fees.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  We noticed that many online tools required sign-ups, collected unnecessary data, or were simply too slow. Developers, designers, students, and professionals needed better options. So we built Toolzeniq – a collection of fast, free, and privacy-respecting tools that work exactly when and how you need them.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Core Principles</h2>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Privacy by Design</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">All tools run locally in your browser. No data collection, no tracking, no server uploads.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Zero Friction</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">No sign-ups, no downloads, no waiting. Just open, use, and get results instantly.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Code className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Open & Transparent</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">We believe in transparency. Our code is open-source and our practices are clear.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Heart className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">User-Centric</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Every decision we make prioritizes the user experience and utility.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What Sets Us Apart</h2>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-8">
                  <li><strong>Truly Free:</strong> No premium features, no paywalls, no ads (yet)</li>
                  <li><strong>Privacy Focused:</strong> Your data never leaves your device</li>
                  <li><strong>Fast & Reliable:</strong> Optimized for speed and performance</li>
                  <li><strong>Accessible:</strong> Works on any device with a modern browser</li>
                  <li><strong>Comprehensive:</strong> Covering image tools, text tools, developer utilities, and more</li>
                  <li><strong>Regular Updates:</strong> New tools and improvements added frequently</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Vision</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  We envision a world where powerful digital tools are as accessible as a pencil and paper. Where privacy isn't a luxury but a fundamental right. Where getting things done doesn't require sacrificing your personal data or breaking your workflow.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  Toolzeniq is more than just a collection of utilities – it's a statement that useful tools can be both powerful and principled. We're building the future of online tools, one privacy-respecting utility at a time.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Join Our Community</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Toolzeniq is built by users, for users. We love hearing from our community about what tools they need, what works well, and how we can improve. Your feedback helps us build better tools for everyone.
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/50 rounded-xl p-6 mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Get in Touch</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Have suggestions for new tools or feedback about existing ones? We'd love to hear from you.
                  </p>
                  <Link href="/contact">
                    <Button className="gap-2">
                      Contact Us
                      <Users className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</div>
            <div className="text-gray-600 dark:text-gray-300">Free Tools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100K+</div>
            <div className="text-gray-600 dark:text-gray-300">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">0</div>
            <div className="text-gray-600 dark:text-gray-300">Data Collected</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Always Available</div>
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
