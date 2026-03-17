'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, X, ChevronDown, Sparkles, Wrench, Palette, Calculator, Code, FileText, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CATEGORIES, TOOLS } from '@/lib/tools';

interface NavItem {
  href: string;
  label: string;
  items?: {
    href: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    description?: string;
    tools?: number;
  }[];
  icon?: React.ComponentType<{ className?: string }>;
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeMobile, setActiveMobile] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Group categories by type for better organization
  const navItems: NavItem[] = useMemo(() => {
    const toolCategories = CATEGORIES.map((category) => ({
      href: `/categories/${category.slug}`,
      label: category.name,
      icon: getCategoryIcon(category.slug),
      description: category.description,
      tools: category.tools.length,
    }));

    return [
      { href: '/', label: 'Home' },
      {
        href: '/tools',
        label: 'Tools',
        icon: Wrench,
        items: toolCategories,
      },
      { href: '/blog', label: 'Blog' },
    ];
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored === 'dark' || (!stored && prefersDark);

    if (initial !== isDark) setIsDark(initial);
    document.documentElement.classList.toggle('dark', initial);

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  const handleMobileToggle = (label: string) => {
    setActiveMobile((prev) => (prev === label ? null : label));
  };

  const renderDesktopNavItem = (item: NavItem) => {
    const isActive =
      pathname === item.href ||
      (item.items && item.items.some((sub) => pathname.startsWith(sub.href)));

    const IconComponent = item.icon;

    const linkClassName = `relative inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
      isActive
        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
    }`;

    const renderMegaMenu = () =>
      item.items ? (
        <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-4 w-[600px] -translate-x-1/2 opacity-0 scale-95 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:scale-100">
          <div className="rounded-2xl border border-gray-200/60 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-gray-700/60 dark:bg-gray-900/95 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 p-6 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              {IconComponent && <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">{item.label}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Explore our collection of {item.items.length} tool categories</div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {item.items.map((sub) => {
                  const isSubActive = pathname === sub.href;
                  const SubIcon = sub.icon as React.ComponentType<{ className?: string }> || Sparkles;

                  return (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={`group flex items-start gap-3 p-3 rounded-xl transition-all duration-200 ${
                        isSubActive
                          ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                      }`}
                    >
                      <div className={`p-2 rounded-lg transition-colors ${
                        isSubActive
                          ? 'bg-blue-100 dark:bg-blue-900/50'
                          : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50'
                      }`}>
                        <SubIcon className={`w-4 h-4 ${
                          isSubActive
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium text-sm transition-colors ${
                          isSubActive
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                        }`}>
                          {sub.label}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                          {sub.description}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {sub.tools} tools
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Footer CTA */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <span>View all tools</span>
                  <ChevronDown className="w-3.5 h-3.5 rotate-[-90deg]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null;

    return (
      <div key={item.href} className="relative group">
        <Link href={item.href} className={linkClassName}>
          {IconComponent && <IconComponent className="w-4 h-4" />}
          <span>{item.label}</span>
          {item.items ? (
            <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
          ) : null}
        </Link>
        {renderMegaMenu()}
      </div>
    );
  };

  const renderMobileNavItem = (item: NavItem) => {
    const isActiveMobile = pathname === item.href;
    const IconComponent = item.icon;

    return (
      <div key={item.href} className="border-b border-gray-200/60 dark:border-gray-800/60 last:border-b-0">
        <div className="flex items-center justify-between py-4">
          <Link
            href={item.href}
            className={`flex items-center gap-3 font-medium transition-colors ${
              isActiveMobile
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
            onClick={() => setIsOpen(false)}
          >
            {IconComponent && <IconComponent className="w-5 h-5" />}
            <span>{item.label}</span>
          </Link>
          {item.items ? (
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              onClick={() => handleMobileToggle(item.label)}
              aria-label={`Toggle ${item.label} submenu`}
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${activeMobile === item.label ? 'rotate-180' : ''}`}
              />
            </button>
          ) : null}
        </div>

        {item.items && activeMobile === item.label && (
          <div className="space-y-2 pb-4 pl-8">
            {item.items.map((sub) => {
              const isSubActive = pathname === sub.href;
              const SubIcon = sub.icon as React.ComponentType<{ className?: string }> || Sparkles;

              return (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isSubActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                      : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <SubIcon className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{sub.label}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {sub.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-800/50'
        : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
            <Sparkles className="w-6 h-6" />
            <span>Toolzeniq</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(renderDesktopNavItem)}

            <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-2 h-auto border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="hidden lg:inline">{isDark ? 'Light' : 'Dark'}</span>
              </Button>
            </div>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-gray-200/60 dark:border-gray-800/60 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
            <div className="py-4 space-y-1">
              {navItems.map(renderMobileNavItem)}

              <div className="pt-4 border-t border-gray-200/60 dark:border-gray-800/60">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Helper function to get category icons
function getCategoryIcon(slug: string) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'image-tools': Palette,
    'text-tools': FileText,
    'developer-tools': Code,
    'calculators': Calculator,
    'generators': Zap,
    'converters': Wrench,
    'design-tools': Palette,
  };

  return iconMap[slug] || Wrench;
}

