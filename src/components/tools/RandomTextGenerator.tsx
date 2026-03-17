'use client';

import { useState } from 'react';
import { Shuffle, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur',
  'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui',
  'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

export default function RandomTextGenerator() {
  const [output, setOutput] = useState('');
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [includeHtml, setIncludeHtml] = useState(false);

  const generateLoremIpsum = () => {
    let result = '';

    if (type === 'paragraphs') {
      for (let i = 0; i < count; i++) {
        result += LOREM_IPSUM;
        if (i < count - 1) result += '\n\n';
      }
    } else if (type === 'sentences') {
      const sentences = LOREM_IPSUM.split(/[.!?]+/).filter(s => s.trim());
      for (let i = 0; i < count; i++) {
        const sentence = sentences[Math.floor(Math.random() * sentences.length)].trim();
        result += sentence + '. ';
      }
      result = result.trim();
    } else if (type === 'words') {
      for (let i = 0; i < count; i++) {
        const word = WORDS[Math.floor(Math.random() * WORDS.length)];
        result += word + ' ';
      }
      result = result.trim();
    }

    if (includeHtml && type === 'paragraphs') {
      result = result.split('\n\n').map(p => `<p>${p}</p>`).join('\n');
    }

    setOutput(result);
  };

  const generateRandomWords = () => {
    let result = '';
    for (let i = 0; i < count; i++) {
      const word = WORDS[Math.floor(Math.random() * WORDS.length)];
      result += word + ' ';
    }
    setOutput(result.trim());
  };

  const generateGibberish = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz ';
    let result = '';
    for (let i = 0; i < count * 10; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    setOutput(result.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const downloadText = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'random-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearOutput = () => setOutput('');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Random Text Generator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Generate Lorem Ipsum text, random words, or gibberish content for your projects.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4">Generation Options</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Text Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="paragraphs">Paragraphs</option>
                  <option value="sentences">Sentences</option>
                  <option value="words">Words</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Count ({type.slice(0, -1)})
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="html"
                  checked={includeHtml}
                  onChange={(e) => setIncludeHtml(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="html" className="ml-2 text-sm font-medium">
                  Include HTML paragraph tags
                </label>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4">Quick Generators</h3>
            <div className="grid grid-cols-1 gap-3">
              <Button onClick={generateLoremIpsum} className="w-full">
                <Shuffle className="w-4 h-4 mr-2" />
                Generate Lorem Ipsum
              </Button>
              <Button onClick={generateRandomWords} variant="outline" className="w-full">
                <Shuffle className="w-4 h-4 mr-2" />
                Generate Random Words
              </Button>
              <Button onClick={generateGibberish} variant="outline" className="w-full">
                <Shuffle className="w-4 h-4 mr-2" />
                Generate Gibberish
              </Button>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Generated Text</h3>
              <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  disabled={!output}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button
                  onClick={downloadText}
                  variant="outline"
                  size="sm"
                  disabled={!output}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button
                  onClick={clearOutput}
                  variant="outline"
                  size="sm"
                >
                  Clear
                </Button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Generated text will appear here..."
              className="w-full h-96 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 resize-vertical font-mono text-sm"
              rows={20}
            />
          </div>

          {/* Statistics */}
          {output && (
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-4">Statistics</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {output.split(/\s+/).filter(word => word.length > 0).length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {output.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {output.split('\n').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Lines</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl">
          <h3 className="text-2xl font-bold mb-6">Use Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-semibold mb-2">Design Mockups</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Fill layouts with realistic placeholder text</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h4 className="font-semibold mb-2">Development</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Test layouts and typography with sample content</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h4 className="font-semibold mb-2">Writing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Generate content for brainstorming and planning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}