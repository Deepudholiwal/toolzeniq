'use client';

interface AdPlaceholderProps {
  position?: 'top' | 'middle' | 'bottom' | 'sidebar';
  className?: string;
}

export default function AdPlaceholder({ position = 'top', className = '' }: AdPlaceholderProps) {
  const getAdConfig = () => {
    switch (position) {
      case 'top':
        return {
          label: 'Banner Ad',
          size: 'h-24 w-full',
          description: '728x90 Banner'
        };
      case 'middle':
        return {
          label: 'Content Ad',
          size: 'h-32 w-full',
          description: '300x250 Rectangle'
        };
      case 'bottom':
        return {
          label: 'Footer Ad',
          size: 'h-24 w-full',
          description: '728x90 Banner'
        };
      case 'sidebar':
        return {
          label: 'Sidebar Ad',
          size: 'h-48 w-full',
          description: '300x600 Skyscraper'
        };
      default:
        return {
          label: 'Ad',
          size: 'h-24 w-full',
          description: 'Ad placeholder'
        };
    }
  };

  const config = getAdConfig();

  return (
    <div
      className={`rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 text-center ${className}`}
    >
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{config.label}</p>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75"></div>
      </div>
      <div className={`mx-auto ${config.size} bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400 font-medium`}>
        {config.description}
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">AdSense Ready</p>
    </div>
  );
}
