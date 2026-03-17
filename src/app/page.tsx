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
          </div>

          {/* Featured Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {featuredTools.map((tool, index) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{tool.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{tool.category}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{tool.description}</p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                  Try it now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm mb-4 ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="max-w-2xl mx-auto text-center bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Get notified when we add new tools and features to Toolzeniq.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribed}
              />
              <Button
                type="submit"
                disabled={isSubscribed || isSubscribing}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all disabled:opacity-50"
              >
                {isSubscribed ? 'Subscribed!' : isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-300" />
        </div>
      </section>
    </div>
  );
}

