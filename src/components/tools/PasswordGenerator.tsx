'use client';

import { useState } from 'react';
import { Key, Copy, RefreshCw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === '') {
      setPassword('');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(result);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPasswordStrength = () => {
    let score = 0;
    if (includeUppercase) score++;
    if (includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    if (length >= 8) score++;
    if (length >= 12) score++;

    if (score <= 2) return { label: 'Weak', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/20' };
    if (score <= 4) return { label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/20' };
    return { label: 'Strong', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Password Generator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Generate strong, secure passwords for your accounts and applications.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="card p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Password Length: {length}</label>
            <input
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>4</span>
              <span>32</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">Include uppercase letters (A-Z)</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">Include lowercase letters (a-z)</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">Include numbers (0-9)</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm">Include symbols (!@#$%^&*)</span>
            </label>
          </div>

          <Button onClick={generatePassword} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Password
          </Button>
        </div>

        {/* Output */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold">Generated Password</h3>
          </div>

          {password ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                <div className="font-mono text-lg break-all select-all">
                  {password}
                </div>
              </div>

              <div className={`p-3 rounded-lg ${strength.bg}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Strength:</span>
                  <span className={`text-sm font-bold ${strength.color}`}>{strength.label}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={copyToClipboard} className="flex-1">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Password
                    </>
                  )}
                </Button>
                <Button onClick={generatePassword} variant="outline" className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <Key className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-lg mb-2">No password generated yet</p>
              <p className="text-sm text-center">Configure your options and click "Generate Password"</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl">
          <h3 className="text-2xl font-bold mb-6">Password Security Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            <div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="font-semibold mb-2">Use Strong Passwords</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Combine uppercase, lowercase, numbers, and symbols</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">📏</span>
              </div>
              <h4 className="font-semibold mb-2">Longer is Better</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Use at least 12 characters for maximum security</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h4 className="font-semibold mb-2">Use Unique Passwords</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Don't reuse passwords across different accounts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}