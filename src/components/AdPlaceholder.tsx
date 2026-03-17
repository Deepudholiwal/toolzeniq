'use client';

interface AdPlaceholderProps {
  label?: string;
  className?: string;
}

export default function AdPlaceholder({ label = 'Ad', className = '' }: AdPlaceholderProps) {
  return (
    <div
      className={`rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 p-8 text-center ${className}`}
    >
      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{label}</p>
      <div className="mt-4 h-20 w-full bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-xs text-gray-400">
        Ad placeholder
      </div>
    </div>
  );
}
