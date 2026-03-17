'use client';

import { useMemo, useState } from 'react';
import { Copy, Download, RefreshCw, Search as SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GenericToolProps {
  slug: string;
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export default function GenericTool({ slug }: GenericToolProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<Record<string, any>>({});

  const title = useMemo(() => {
    return slug
      .split('-')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  }, [slug]);

  const reset = () => {
    setInput('');
    setOutput('');
    setError(null);
    setOptions({});
  };

  const runTool = () => {
    setError(null);

    switch (slug) {
      case 'character-counter': {
        const chars = input.length;
        const words = input.trim() ? input.trim().split(/\s+/).length : 0;
        const lines = input.split('\n').length;
        setOutput(`Characters: ${chars}\nWords: ${words}\nLines: ${lines}`);
        return;
      }

      case 'remove-duplicates': {
        const lines = input.split('\n');
        const uniqueLines = [...new Set(lines)];
        setOutput(uniqueLines.join('\n'));
        return;
      }

      case 'text-sorter': {
        const lines = input.split('\n').filter(line => line.trim());
        const sorted = lines.sort((a, b) => a.localeCompare(b));
        setOutput(sorted.join('\n'));
        return;
      }

      case 'text-reverser': {
        setOutput(input.split('').reverse().join(''));
        return;
      }

      case 'base64-encoder': {
        try {
          setOutput(btoa(input));
        } catch (e) {
          setError('Invalid input for Base64 encoding');
        }
        return;
      }

      case 'base64-decoder': {
        try {
          setOutput(atob(input));
        } catch (e) {
          setError('Invalid Base64 string');
        }
        return;
      }

      case 'url-encoder': {
        setOutput(encodeURIComponent(input));
        return;
      }

      case 'url-decoder': {
        try {
          setOutput(decodeURIComponent(input));
        } catch (e) {
          setError('Invalid URL encoded string');
        }
        return;
      }

      case 'slug-generator': {
        const slug = input
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
        setOutput(slug);
        return;
      }

      case 'binary-to-decimal': {
        try {
          const decimal = parseInt(input, 2);
          if (isNaN(decimal)) throw new Error();
          setOutput(decimal.toString());
        } catch (e) {
          setError('Invalid binary number');
        }
        return;
      }

      case 'decimal-to-binary': {
        const num = parseInt(input);
        if (isNaN(num)) {
          setError('Invalid decimal number');
          return;
        }
        setOutput(num.toString(2));
        return;
      }

      case 'text-to-ascii': {
        const ascii = input.split('').map(char => char.charCodeAt(0)).join(' ');
        setOutput(ascii);
        return;
      }

      case 'ascii-to-text': {
        try {
          const text = input.split(' ').map(code => String.fromCharCode(parseInt(code))).join('');
          setOutput(text);
        } catch (e) {
          setError('Invalid ASCII codes');
        }
        return;
      }

      case 'html-formatter': {
        try {
          // Simple HTML indentation
          const formatted = input
            .replace(/></g, '>\n<')
            .split('\n')
            .map(line => {
              const indent = line.match(/^(\s*)/)?.[1] || '';
              const tagMatch = line.match(/<(\w+)/);
              if (tagMatch) {
                const tag = tagMatch[1];
                if (line.includes(`</${tag}>`)) {
                  return indent + line.trim();
                } else if (line.includes('<') && !line.includes('/>') && !line.includes('</')) {
                  return indent + line.trim();
                }
              }
              return indent + '  ' + line.trim();
            })
            .join('\n');
          setOutput(formatted);
        } catch (e) {
          setError('Invalid HTML');
        }
        return;
      }

      case 'css-minifier': {
        try {
          // Remove comments, extra spaces, and line breaks
          let minified = input
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/\s*{\s*/g, '{') // Remove spaces around {
            .replace(/\s*}\s*/g, '}') // Remove spaces around }
            .replace(/\s*;\s*/g, ';') // Remove spaces around ;
            .replace(/\s*:\s*/g, ':') // Remove spaces around :
            .replace(/;\s*}/g, '}') // Remove ; before }
            .trim();
          setOutput(minified);
        } catch (e) {
          setError('Invalid CSS');
        }
        return;
      }

      case 'js-minifier': {
        try {
          // Basic JS minification: remove extra spaces and line breaks
          let minified = input
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
            .replace(/\/\/.*$/gm, '') // Remove line comments
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/\s*{\s*/g, '{') // Remove spaces around {
            .replace(/\s*}\s*/g, '}') // Remove spaces around }
            .replace(/\s*\(\s*/g, '(') // Remove spaces around (
            .replace(/\s*\)\s*/g, ')') // Remove spaces around )
            .replace(/\s*;\s*/g, ';') // Remove spaces around ;
            .replace(/\s*,\s*/g, ',') // Remove spaces around ,
            .replace(/;\s*}/g, '}') // Remove ; before }
            .trim();
          setOutput(minified);
        } catch (e) {
          setError('Invalid JavaScript');
        }
        return;
      }

      case 'regex-tester': {
        try {
          const flags = options.flags || 'g';
          const regex = new RegExp(input, flags);
          const testString = options.testString || '';
          const matches = testString.match(regex);
          if (matches) {
            setOutput(`Matches found: ${matches.length}\n${matches.join('\n')}`);
          } else {
            setOutput('No matches found');
          }
        } catch (e) {
          setError('Invalid regex pattern');
        }
        return;
      }

      case 'age-calculator': {
        try {
          const birthDate = new Date(options.birthDate);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          setOutput(`Age: ${age} years`);
        } catch (e) {
          setError('Invalid birth date');
        }
        return;
      }

      case 'percentage-calculator': {
        const value = parseFloat(options.value);
        const total = parseFloat(options.total);
        if (isNaN(value) || isNaN(total) || total === 0) {
          setError('Invalid numbers');
          return;
        }
        const percentage = (value / total) * 100;
        setOutput(`${percentage.toFixed(2)}%`);
        return;
      }

      case 'discount-calculator': {
        const original = parseFloat(options.original);
        const discount = parseFloat(options.discount);
        if (isNaN(original) || isNaN(discount)) {
          setError('Invalid numbers');
          return;
        }
        const discountAmount = (original * discount) / 100;
        const finalPrice = original - discountAmount;
        setOutput(`Discount Amount: $${discountAmount.toFixed(2)}\nFinal Price: $${finalPrice.toFixed(2)}`);
        return;
      }

      case 'profit-margin-calculator': {
        const cost = parseFloat(options.cost);
        const price = parseFloat(options.price);
        if (isNaN(cost) || isNaN(price) || cost === 0) {
          setError('Invalid numbers');
          return;
        }
        const profit = price - cost;
        const margin = (profit / price) * 100;
        setOutput(`Profit: $${profit.toFixed(2)}\nMargin: ${margin.toFixed(2)}%`);
        return;
      }

      case 'gst-calculator': {
        const amount = parseFloat(options.amount);
        const rate = parseFloat(options.rate);
        if (isNaN(amount) || isNaN(rate)) {
          setError('Invalid numbers');
          return;
        }
        const gst = (amount * rate) / 100;
        const total = amount + gst;
        setOutput(`GST Amount: $${gst.toFixed(2)}\nTotal: $${total.toFixed(2)}`);
        return;
      }

      case 'emi-calculator': {
        const principal = parseFloat(options.principal);
        const rate = parseFloat(options.rate) / 100 / 12;
        const years = parseFloat(options.years);
        if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
          setError('Invalid numbers');
          return;
        }
        const months = years * 12;
        const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
        const totalAmount = emi * months;
        const totalInterest = totalAmount - principal;
        setOutput(`EMI: $${emi.toFixed(2)}\nTotal Amount: $${totalAmount.toFixed(2)}\nTotal Interest: $${totalInterest.toFixed(2)}`);
        return;
      }

      case 'loan-interest-calculator': {
        const principal = parseFloat(options.principal);
        const rate = parseFloat(options.rate) / 100;
        const years = parseFloat(options.years);
        if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
          setError('Invalid numbers');
          return;
        }
        const interest = principal * rate * years;
        const total = principal + interest;
        setOutput(`Interest: $${interest.toFixed(2)}\nTotal Amount: $${total.toFixed(2)}`);
        return;
      }

      case 'salary-calculator': {
        const gross = parseFloat(options.gross);
        const taxRate = parseFloat(options.taxRate) / 100;
        const deductions = parseFloat(options.deductions) || 0;
        if (isNaN(gross) || isNaN(taxRate)) {
          setError('Invalid numbers');
          return;
        }
        const tax = gross * taxRate;
        const net = gross - tax - deductions;
        setOutput(`Tax: $${tax.toFixed(2)}\nNet Salary: $${net.toFixed(2)}`);
        return;
      }

      case 'random-number-generator': {
        const count = parseInt(options.count) || 1;
        const min = parseInt(options.min) || 0;
        const max = parseInt(options.max) || 100;
        const numbers = Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
        setOutput(numbers.join('\n'));
        return;
      }

      case 'uuid-generator': {
        const count = parseInt(options.count) || 1;
        const uuids = Array.from({ length: count }, () => {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        });
        setOutput(uuids.join('\n'));
        return;
      }

      case 'fake-address-generator': {
        const count = parseInt(options.count) || 1;
        const streets = ['Main St', 'Oak Ave', 'Pine Rd', 'Elm St', 'Maple Dr'];
        const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
        const states = ['NY', 'CA', 'IL', 'TX', 'AZ'];
        const addresses = Array.from({ length: count }, () => {
          const streetNum = Math.floor(Math.random() * 9999) + 1;
          const street = streets[Math.floor(Math.random() * streets.length)];
          const city = cities[Math.floor(Math.random() * cities.length)];
          const state = states[Math.floor(Math.random() * states.length)];
          const zip = Math.floor(Math.random() * 90000) + 10000;
          return `${streetNum} ${street}, ${city}, ${state} ${zip}`;
        });
        setOutput(addresses.join('\n'));
        return;
      }

      case 'unit-converter': {
        const value = parseFloat(options.value);
        const fromUnit = options.fromUnit;
        const toUnit = options.toUnit;
        if (isNaN(value)) {
          setError('Invalid value');
          return;
        }
        // Simple length conversion
        const conversions: Record<string, number> = { m: 1, cm: 100, km: 0.001, ft: 3.28084, in: 39.3701 };
        const result = value * (conversions[toUnit] / conversions[fromUnit]);
        setOutput(`${result.toFixed(2)} ${toUnit}`);
        return;
      }

      case 'temperature-converter': {
        const value = parseFloat(options.value);
        const fromUnit = options.fromUnit;
        const toUnit = options.toUnit;
        if (isNaN(value)) {
          setError('Invalid value');
          return;
        }
        let celsius = value;
        if (fromUnit === 'F') celsius = (value - 32) * 5/9;
        if (fromUnit === 'K') celsius = value - 273.15;
        
        let result = celsius;
        if (toUnit === 'F') result = celsius * 9/5 + 32;
        if (toUnit === 'K') result = celsius + 273.15;
        
        setOutput(`${result.toFixed(2)}°${toUnit}`);
        return;
      }

      case 'time-converter': {
        const time = options.time;
        const fromZone = parseInt(options.fromZone) || 0;
        const toZone = parseInt(options.toZone) || 0;
        if (!time) {
          setError('Invalid time');
          return;
        }
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + (toZone - fromZone) * 60;
        const newHours = Math.floor(totalMinutes / 60) % 24;
        const newMinutes = totalMinutes % 60;
        setOutput(`${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`);
        return;
      }

      case 'currency-converter': {
        const amount = parseFloat(options.amount);
        const rate = parseFloat(options.rate);
        if (isNaN(amount) || isNaN(rate)) {
          setError('Invalid numbers');
          return;
        }
        const result = amount * rate;
        setOutput(`$${result.toFixed(2)}`);
        return;
      }

      case 'color-palette-generator': {
        const count = parseInt(options.count) || 5;
        const colors = Array.from({ length: count }, () => {
          const hue = Math.floor(Math.random() * 360);
          return `hsl(${hue}, 70%, 50%)`;
        });
        setOutput(colors.join('\n'));
        return;
      }

      case 'random-color-generator': {
        const count = parseInt(options.count) || 1;
        const colors = Array.from({ length: count }, () => {
          const color = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
          return `#${color}`;
        });
        setOutput(colors.join('\n'));
        return;
      }

      case 'gradient-generator': {
        const count = parseInt(options.count) || 5;
        const colors = Array.from({ length: count }, () => {
          const color = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
          return `#${color}`;
        });
        const gradient = `linear-gradient(to right, ${colors.join(', ')})`;
        setOutput(gradient);
        return;
      }

      case 'lorem-ipsum-generator': {
        const count = parseInt(options.count) || 3;
        const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
        const paragraphs = Array.from({ length: count }, () => lorem);
        setOutput(paragraphs.join('\n\n'));
        return;
      }

      case 'random-text': {
        const count = parseInt(options.count) || 3;
        const type = options.type || 'paragraphs';
        const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];
        
        if (type === 'words') {
          const randomWords = Array.from({ length: count }, () => words[Math.floor(Math.random() * words.length)]);
          setOutput(randomWords.join(' '));
        } else if (type === 'sentences') {
          const sentences = Array.from({ length: count }, () => {
            const sentenceWords = Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () => words[Math.floor(Math.random() * words.length)]);
            return sentenceWords.join(' ') + '.';
          });
          setOutput(sentences.join(' '));
        } else {
          const paragraphs = Array.from({ length: count }, () => {
            const sentences = Array.from({ length: Math.floor(Math.random() * 5) + 3 }, () => {
              const sentenceWords = Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () => words[Math.floor(Math.random() * words.length)]);
              return sentenceWords.join(' ') + '.';
            });
            return sentences.join(' ');
          });
          setOutput(paragraphs.join('\n\n'));
        }
        return;
      }

      default:
        setError('Tool not implemented yet');
        return;
    }
  };

  const renderToolBody = () => {
    return (
      <div className="space-y-6">
        <SectionCard title="Input">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-56 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm"
          />
        </SectionCard>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={runTool} className="flex-1">
            <SearchIcon className="w-4 h-4 mr-2" />
            Run
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            className="flex-1"
          >
            Clear
          </Button>
          <Button
            onClick={() => copyToClipboard(output)}
            variant="outline"
            className="flex-1"
            disabled={!output}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Output
          </Button>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 text-red-700 dark:text-red-200">
            {error}
          </div>
        )}

        <SectionCard title="Output">
          <textarea
            value={output}
            readOnly
            className="w-full h-56 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm"
          />
        </SectionCard>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3">
          A free tool to {title.toLowerCase()}. Use the controls below to get started.
        </p>
      </div>

      {renderToolBody()}
    </div>
  );
}
