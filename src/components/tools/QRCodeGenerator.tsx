'use client';

import { useState, useRef } from 'react';
import { QrCode, Download, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!text.trim()) return;

    setIsGenerating(true);
    try {
      // Using a simple QR code API - in production, you'd want to use a more robust solution
      const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const a = document.createElement('a');
    a.href = qrCodeUrl;
    a.download = 'qrcode.png';
    a.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const clearAll = () => {
    setText('');
    setQrCodeUrl('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          QR Code Generator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Generate QR codes from text, URLs, or any content. Perfect for sharing links and information.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Input Section */}
        <div className="card p-8 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/50 rounded-3xl flex items-center justify-center mb-6 mx-auto">
              <QrCode className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Enter Content</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text, URL, or any content to encode..."
              className="w-full h-32 p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 resize-vertical bg-white dark:bg-gray-800"
              rows={4}
            />
          </div>

          <div className="space-y-4">
            <Button
              onClick={generateQRCode}
              disabled={!text.trim() || isGenerating}
              className="w-full"
            >
              {isGenerating ? 'Generating...' : 'Generate QR Code'}
            </Button>

            <div className="flex gap-4">
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="flex-1"
                disabled={!text}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Text
              </Button>
              <Button
                onClick={clearAll}
                variant="outline"
                className="flex-1"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="card p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <QrCode className="w-6 h-6" />
            Generated QR Code
          </h3>

          {qrCodeUrl ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-2xl shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className="w-64 h-64"
                  />
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
                <div className="text-center">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">QR Code Ready!</h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                    Scan this code with any QR code reader to access your content.
                  </p>
                  <Button onClick={downloadQRCode} className="w-full">
                    <Download className="w-5 h-5 mr-2" />
                    Download QR Code
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Content encoded:</p>
                <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-3 rounded-lg break-all">
                  {text}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <QrCode className="w-24 h-24 mb-4 opacity-30" />
              <p className="text-lg mb-2">No QR code generated yet</p>
              <p className="text-sm">Enter some content and click "Generate QR Code"</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4">Perfect for</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h4 className="font-semibold mb-2">URLs & Links</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Share websites, social media, and online content</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="font-semibold mb-2">Contact Info</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Business cards, contact details, and addresses</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h4 className="font-semibold mb-2">Text Messages</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Plain text, messages, and short notes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}