'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Sparkles, Users, Wrench, Zap, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TOOLS } from '@/lib/tools';

const featuredTools = [
  {
    slug: 'image-compressor',
    title: 'Image Compressor',
    description: 'Compress images without losing quality',
    icon: '🖼️',
    category: 'Image Tools',
  },
  {
    slug: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Format and validate JSON data',
    icon: '💻',
    category: 'Developer Tools',
  },
  {
    slug: 'qr-code-generator',
    title: 'QR Code Generator',
    description: 'Generate QR codes from text/URL',
    icon: '📱',
    category: 'Generators',
  },
  {
    slug: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, sentences',
    icon: '📝',
    category: 'Text Tools',
  },
  {
    slug: 'password-generator',
    title: 'Password Generator',
    description: 'Create strong, random passwords',
    icon: '🔒',
    category: 'Generators',
  },
  {
    slug: 'unit-converter',
    title: 'Unit Converter',
    description: 'Convert between common units',
    icon: '⚖️',
    category: 'Converters',
  },
];

const stats = [
  { label: 'Total Tools', value: '50+', icon: Wrench, color: 'text-blue-600' },
  { label: 'Happy Users', value: '100K+', icon: Users, color: 'text-green-600' },
  { label: 'Fast & Free', value: 'Always', icon: Zap, color: 'text-purple-600' },
  { label: '5-Star Rating', value: '4.9/5', icon: Star, color: 'text-yellow-600' },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const filteredTools = useMemo(() => {
    if (!searchTerm.trim()) return featuredTools;

    return TOOLS.filter(tool =>
      tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    ).slice(0, 6); // Limit to 6 results for dropdown
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/tools?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || isSubscribed) return;

    setIsSubscribing(true);
    try {
      // Simulate API call - replace with actual newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-32">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2" />
              50+ Free Online Tools
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6 animate-fade-in stagger-1">
              Free Online Tools
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in stagger-2">
              50+ powerful tools for images, text, developers, calculators, generators. Fast, free, no sign-up required.
            </p>
            <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto mb-8 animate-fade-in stagger-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search 50+ tools..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all focus-ring"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
                {searchTerm && filteredTools.length > 0 && isSearchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-h-80 overflow-y-auto z-50">
                    {filteredTools.map((tool, index) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                      >
                        <span className="text-2xl">{tool.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 dark:text-white">{tool.title}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{tool.description}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </form>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-fade-in stagger-4">
              <Button size="lg" className="px-8 flex-shrink-0 hover-lift" asChild>
                <Link href="/tools" className="flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-300 float" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-700 float" />

        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="particle absolute top-1/4 left-1/4 stagger-1" />
          <div className="particle absolute top-1/3 right-1/3 stagger-2" />
          <div className="particle absolute bottom-1/3 left-1/3 stagger-3" />
          <div className="particle absolute bottom-1/4 right-1/4 stagger-4" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`text-center animate-fade-in stagger-${index + 1}`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4 hover-scale ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="container py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4 animate-fade-in">
            Popular Tools
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in stagger-1">
            Start with our most popular tools used by thousands daily
          </p>
        </div>

        <div className="tool-grid">
          {featuredTools.map((tool, index) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className={`card group hover-lift animate-fade-in stagger-${index + 1}`}>
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{tool.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
              <Button className="w-full group-hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover-glow">
                Use Tool
              </Button>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16 animate-fade-in stagger-6">
          <Button size="lg" variant="outline" className="hover-lift" asChild>
            <Link href="/tools" className="flex items-center">
              View All Tools
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative z-10 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Stay Updated
            </h2>
            <p className="text-xl mb-12 opacity-90 animate-fade-in stagger-1 max-w-xl mx-auto">
              Get notified when we add new tools and features to make your workflow even better
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-fade-in stagger-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:ring-4 focus:ring-white/30 focus:outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribed}
              />
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 hover-lift"
                onClick={handleNewsletterSubmit}
                disabled={isSubscribing || isSubscribed || !email.trim()}
              >
                {isSubscribed ? 'Subscribed!' : isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
            {isSubscribed && (
              <p className="text-sm opacity-75 mt-4 animate-fade-in">
                ✅ Thanks for subscribing! We'll keep you updated with new tools and features.
              </p>
            )}
            {!isSubscribed && (
              <p className="text-sm opacity-75 mt-4 animate-fade-in stagger-3">
                No spam, unsubscribe at any time.
              </p>
            )}
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-300" />
        </div>
      </section>
    </div>
  );
}

