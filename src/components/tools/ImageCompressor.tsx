'use client';

import { useState, useRef, useCallback } from 'react';
import { Download, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ImageCompressor() {
  const [image, setImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [quality, setQuality] = useState(80);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setCompressedImage(null);
    }
  };

  const compressImage = useCallback(async () => {
    if (!image || !canvasRef.current) return;

    setIsCompressing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCompressedImage(url);
            setIsCompressing(false);
          }
        },
        'image/jpeg',
        quality / 100
      );
    };
    img.src = URL.createObjectURL(image);
  }, [image, quality]);

  const downloadCompressed = () => {
    if (compressedImage) {
      const a = document.createElement('a');
      a.href = compressedImage;
      a.download = `compressed-${image?.name || 'image.jpg'}`;
      a.click();
    }
  };

  const originalSize = image ? (image.size / 1024 / 1024).toFixed(2) : 0;
  const compressedSize = compressedImage ? (compressedImage.length * 0.75 / 1024 / 1024).toFixed(2) : 0; // Approximate

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Image Compressor
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Compress your images without losing quality. Perfect for web, email, and social media.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Upload Section */}
        <div className="card p-8 text-center">
          <div className="mb-8 p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-3xl hover:border-blue-400 transition-colors h-96 flex flex-col items-center justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-4 hover:scale-105 transition-transform">
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-3xl flex items-center justify-center">
                <ImageIcon className="w-10 h-10 text-gray-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Click to upload</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
              </div>
            </label>
          </div>

          {image && (
            <div className="space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={URL.createObjectURL(image)} alt="Original" className="max-h-64 w-auto mx-auto rounded-xl shadow-lg object-contain" />
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Original size: {originalSize} MB</p>
                <div className="flex items-center justify-center gap-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    Quality:
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <span className="text-sm font-bold text-blue-600">{quality}%</span>
                  </label>
                </div>
                <Button onClick={compressImage} disabled={isCompressing} className="mt-4 w-full">
                  {isCompressing ? 'Compressing...' : 'Compress Image'}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="card p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Download className="w-6 h-6" />
            Compressed Preview
          </h3>
          
          {compressedImage ? (
            <div className="space-y-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={compressedImage} alt="Compressed" className="max-h-64 w-auto mx-auto rounded-xl shadow-lg object-contain border-4 border-dashed border-green-200 dark:border-green-800" />
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-green-700 dark:text-green-300 font-medium">Original</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{originalSize} MB</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-700 dark:text-green-300 font-medium">Compressed</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{compressedSize} MB</p>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <Button onClick={downloadCompressed} className="w-full">
                    <Download className="w-5 h-5 mr-2" />
                    Download Compressed Image
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <ImageIcon className="w-24 h-24 mb-4 opacity-30" />
              <p className="text-lg mb-2">Compressed image will appear here</p>
              <p className="text-sm">Upload an image to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

