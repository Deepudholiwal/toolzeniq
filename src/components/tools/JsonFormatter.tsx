'use client';

import { useState } from 'react';
import { Copy, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [formatType, setFormatType] = useState<'format' | 'minify'>('format');

  const processJson = () => {
    try {
      const json = JSON.parse(input);
      if (formatType === 'format') {
        setOutput(JSON.stringify(json, null, 2));
      } else {
        setOutput(JSON.stringify(json));
      }
      setError('');
    } catch (err) {
      console.error(err);
      setError('Invalid JSON');
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const downloadJson = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          JSON Formatter & Validator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Format, validate, minify JSON data. Perfect for developers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Input */}
        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold">Input JSON</h3>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Paste your JSON here...'
              className="w-full h-96 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 resize-vertical font-mono text-sm bg-white dark:bg-gray-800"
              rows={20}
            />
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <button
                onClick={() => setFormatType('format')}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                  formatType === 'format' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                Format
              </button>
              <button
                onClick={() => setFormatType('minify')}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                  formatType === 'minify' 
                    ? 'bg-green-600 text-white shadow-lg' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                Minify
              </button>
            </div>
            <Button onClick={processJson} className="ml-auto">
              Process JSON
            </Button>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold">Output JSON</h3>
              {error && (
                <span className="ml-auto px-3 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200">
                  Error
                </span>
              )}
            </div>
            <textarea
              value={error || output}
              readOnly
              className={cn(
                "w-full h-96 p-6 rounded-2xl border-2 font-mono text-sm bg-white dark:bg-gray-800 resize-vertical",
                error 
                  ? "border-red-200 dark:border-red-700 focus:border-red-500 focus:ring-red-500/20" 
                  : "border-green-200 dark:border-green-700 focus:border-green-500 focus:ring-green-500/20"
              )}
              rows={20}
            />
          </div>

          {output && !error && (
            <div className="flex gap-4">
              <Button onClick={copyToClipboard} className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>
              <Button onClick={downloadJson} variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download JSON
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h4 className="font-semibold mb-2">Real-time validation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Instant JSON validation and error highlighting</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold mb-2">Lightning fast</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Process large JSON files instantly</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="font-semibold mb-2">Mobile ready</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Works perfectly on all devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

