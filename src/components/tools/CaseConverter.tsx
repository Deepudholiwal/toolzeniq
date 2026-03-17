'use client';

import { useState } from 'react';
import { Type, Copy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convertToUpperCase = () => {
    setOutput(input.toUpperCase());
  };

  const convertToLowerCase = () => {
    setOutput(input.toLowerCase());
  };

  const convertToTitleCase = () => {
    setOutput(
      input.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
    );
  };

  const convertToSentenceCase = () => {
    setOutput(
      input.toLowerCase().replace(/(^\w|\.\s*\w)/g, (char) => char.toUpperCase())
    );
  };

  const convertToCamelCase = () => {
    const words = input.toLowerCase().split(/[\s-_]+/);
    const camelCase = words
      .map((word, index) =>
        index === 0
          ? word
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('');
    setOutput(camelCase);
  };

  const convertToPascalCase = () => {
    setOutput(
      input.toLowerCase()
        .split(/[\s-_]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    );
  };

  const convertToSnakeCase = () => {
    setOutput(
      input.toLowerCase()
        .replace(/[\s-_]+/g, '_')
        .replace(/([a-z])([A-Z])/g, '$1_$2')
    );
  };

  const convertToKebabCase = () => {
    setOutput(
      input.toLowerCase()
        .replace(/[\s_]+/g, '-')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
    );
  };

  const convertToAlternatingCase = () => {
    setOutput(
      input.split('').map((char, index) =>
        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      ).join('')
    );
  };

  const convertToInverseCase = () => {
    setOutput(
      input.split('').map(char =>
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      ).join('')
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  const conversions = [
    { name: 'UPPERCASE', action: convertToUpperCase, description: 'Convert all letters to uppercase' },
    { name: 'lowercase', action: convertToLowerCase, description: 'Convert all letters to lowercase' },
    { name: 'Title Case', action: convertToTitleCase, description: 'Capitalize first letter of each word' },
    { name: 'Sentence case', action: convertToSentenceCase, description: 'Capitalize first letter of each sentence' },
    { name: 'camelCase', action: convertToCamelCase, description: 'First word lowercase, others capitalized' },
    { name: 'PascalCase', action: convertToPascalCase, description: 'All words capitalized' },
    { name: 'snake_case', action: convertToSnakeCase, description: 'Words separated by underscores' },
    { name: 'kebab-case', action: convertToKebabCase, description: 'Words separated by hyphens' },
    { name: 'aLtErNaTiNg CaSe', action: convertToAlternatingCase, description: 'Alternate between upper and lower case' },
    { name: 'iNvErSe CaSe', action: convertToInverseCase, description: 'Invert the case of each letter' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Case Converter
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Convert text between different case styles. Perfect for programming, writing, and formatting.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Type className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold">Input Text</h3>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full h-64 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 resize-vertical font-mono text-sm bg-white dark:bg-gray-800"
              rows={10}
            />
          </div>

          {/* Conversion Buttons */}
          <div className="card p-6">
            <h3 className="text-xl font-bold mb-4">Case Conversions</h3>
            <div className="grid grid-cols-2 gap-3">
              {conversions.map((conversion) => (
                <button
                  key={conversion.name}
                  onClick={conversion.action}
                  disabled={!input.trim()}
                  className="p-3 text-left border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title={conversion.description}
                >
                  <div className="font-mono text-sm font-medium">{conversion.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{conversion.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Type className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold">Output Text</h3>
              </div>
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
                  onClick={clearAll}
                  variant="outline"
                  size="sm"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Converted text will appear here..."
              className="w-full h-64 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 resize-vertical font-mono text-sm"
              rows={10}
            />
          </div>

          {/* Preview */}
          {output && (
            <div className="card p-6">
              <h3 className="text-lg font-bold mb-4">Preview</h3>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border">
                <pre className="font-mono text-sm whitespace-pre-wrap break-words">{output}</pre>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl">
          <h3 className="text-2xl font-bold mb-6">Supported Case Styles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔤</span>
              </div>
              <h4 className="font-semibold mb-2">Basic Cases</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">UPPERCASE, lowercase, Title Case, Sentence case</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h4 className="font-semibold mb-2">Programming Cases</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">camelCase, PascalCase, snake_case, kebab-case</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-semibold mb-2">Special Cases</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Alternating case, Inverse case, and more</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}