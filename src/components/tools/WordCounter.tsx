'use client';

import { useState, useMemo } from 'react';
import { FileText, Hash, Type, AlignLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length;
    const lines = text.split('\n').length;

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      lines,
    };
  }, [text]);

  const readingTime = useMemo(() => {
    const wordsPerMinute = 200;
    const minutes = stats.words / wordsPerMinute;
    return Math.max(1, Math.round(minutes));
  }, [stats.words]);

  const clearText = () => setText('');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Word Counter & Text Statistics
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Count words, characters, sentences, and more. Get detailed text statistics instantly.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold">Text Input</h3>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here..."
              className="w-full h-96 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 resize-vertical font-mono text-sm bg-white dark:bg-gray-800"
              rows={20}
            />
            <div className="flex gap-4 mt-4">
              <Button onClick={clearText} variant="outline" className="flex-1">
                Clear Text
              </Button>
              <Button
                onClick={() => navigator.clipboard.writeText(text)}
                variant="outline"
                className="flex-1"
                disabled={!text}
              >
                Copy Text
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Hash className="w-6 h-6 text-green-600" />
              Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <span className="font-medium">Words</span>
                <span className="text-2xl font-bold text-blue-600">{stats.words}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <span className="font-medium">Characters</span>
                <span className="text-2xl font-bold text-green-600">{stats.characters}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <span className="font-medium">Characters (no spaces)</span>
                <span className="text-2xl font-bold text-purple-600">{stats.charactersNoSpaces}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <span className="font-medium">Sentences</span>
                <span className="text-2xl font-bold text-orange-600">{stats.sentences}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <span className="font-medium">Paragraphs</span>
                <span className="text-2xl font-bold text-red-600">{stats.paragraphs}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <span className="font-medium">Lines</span>
                <span className="text-2xl font-bold text-indigo-600">{stats.lines}</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Type className="w-6 h-6 text-purple-600" />
              Reading Time
            </h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {readingTime}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                minute{readingTime !== 1 ? 's' : ''} to read
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Based on 200 words per minute
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlignLeft className="w-6 h-6 text-blue-600" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button
                onClick={() => setText(text.toUpperCase())}
                variant="outline"
                className="w-full"
                disabled={!text}
              >
                Convert to UPPERCASE
              </Button>
              <Button
                onClick={() => setText(text.toLowerCase())}
                variant="outline"
                className="w-full"
                disabled={!text}
              >
                Convert to lowercase
              </Button>
              <Button
                onClick={() => setText(text.split(' ').map(word =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' '))}
                variant="outline"
                className="w-full"
                disabled={!text}
              >
                Title Case
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-semibold mb-2">Detailed Statistics</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get comprehensive text analysis with multiple metrics</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold mb-2">Real-time Updates</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Statistics update instantly as you type</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h4 className="font-semibold mb-2">Quick Actions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Built-in text transformation tools</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}