'use client';

import { useMemo, useState } from 'react';
import { Download, Image as ImageIcon, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageToolProps {
  slug: string;
}

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = URL.createObjectURL(file);
  });
}

export default function ImageTool({ slug }: ImageToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputText, setOutputText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<Record<string, any>>({});

  const title = useMemo(() => {
    return slug
      .split('-')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  }, [slug]);

  const reset = () => {
    setFile(null);
    setOutputUrl(null);
    setOutputText('');
    setError(null);
    setOptions({});
  };

  const runTool = async () => {
    setError(null);
    setOutputUrl(null);
    setOutputText('');

    if (!file) {
      setError('Please upload an image first.');
      return;
    }

    try {
      const image = await loadImage(file);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setError('Your browser does not support Canvas.');
        return;
      }

      switch (slug) {
        case 'image-compressor': {
          const quality = Number(options.quality) || 0.8;
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          
          // Determine output format based on input file type
          const inputType = file.type.toLowerCase();
          let outputFormat = 'image/jpeg';
          let outputQuality = quality;
          
          if (inputType === 'image/png') {
            // For PNG, we'll convert to JPEG for compression since PNG is lossless
            outputFormat = 'image/jpeg';
            outputQuality = quality;
          } else if (inputType === 'image/webp') {
            outputFormat = 'image/webp';
          }
          
          setOutputUrl(canvas.toDataURL(outputFormat, outputQuality));
          return;
        }
        case 'image-resizer': {
          const width = Number(options.width) || image.width;
          const height = Number(options.height) || Math.round((image.height / image.width) * width);
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(image, 0, 0, width, height);
          setOutputUrl(canvas.toDataURL('image/png'));
          return;
        }
        case 'image-cropper': {
          const cropX = Number(options.cropX) || 0;
          const cropY = Number(options.cropY) || 0;
          const cropW = Number(options.cropW) || image.width;
          const cropH = Number(options.cropH) || image.height;
          canvas.width = cropW;
          canvas.height = cropH;
          ctx.drawImage(image, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
          setOutputUrl(canvas.toDataURL('image/png'));
          return;
        }
        case 'jpg-to-png': {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          setOutputUrl(canvas.toDataURL('image/png'));
          return;
        }
        case 'png-to-jpg': {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          setOutputUrl(canvas.toDataURL('image/jpeg', 0.92));
          return;
        }
        case 'watermark-image': {
          const text = options.text || 'Watermark';
          const position = options.position || 'bottom-right';
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);

          ctx.font = `${Math.max(16, Math.round(image.width / 20))}px sans-serif`;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';

          const padding = 16;
          const metrics = ctx.measureText(text);
          const textWidth = metrics.width;
          const textHeight = parseInt(ctx.font, 10);

          let x = padding;
          let y = padding;

          if (position.includes('bottom')) {
            y = image.height - textHeight - padding;
            ctx.textBaseline = 'bottom';
          }
          if (position.includes('right')) {
            x = image.width - textWidth - padding;
            ctx.textAlign = 'right';
          }

          ctx.fillText(text, x, y);
          setOutputUrl(canvas.toDataURL('image/png'));
          return;
        }
        case 'image-to-base64': {
          const reader = new FileReader();
          reader.onload = () => {
            setOutputText(String(reader.result ?? ''));
          };
          reader.onerror = () => setError('Unable to read file.');
          reader.readAsDataURL(file);
          return;
        }
        case 'image-metadata': {
          const { name, size, type, lastModified } = file;
          const metadata = {
            name,
            size: formatBytes(size),
            type,
            lastModified: new Date(lastModified).toLocaleString(),
            dimensions: `${image.width} x ${image.height}`,
          };
          setOutputText(JSON.stringify(metadata, null, 2));
          return;
        }
        default: {
          setError('This image tool is not yet implemented.');
        }
      }
    } catch (err) {
      setError('Something went wrong processing the image.');
    }
  };

  const getDefaultButtonLabel = () => {
    switch (slug) {
      case 'image-compressor':
        return 'Compress Image';
      case 'image-resizer':
        return 'Resize Image';
      case 'image-cropper':
        return 'Crop Image';
      case 'jpg-to-png':
        return 'Convert to PNG';
      case 'png-to-jpg':
        return 'Convert to JPG';
      case 'watermark-image':
        return 'Apply Watermark';
      case 'image-to-base64':
        return 'Generate Base64';
      case 'image-metadata':
        return 'Show Metadata';
      default:
        return 'Run';
    }
  };

  const actionLabel = getDefaultButtonLabel();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          {title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Use the controls below to {title.toLowerCase()}.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card p-8 space-y-6">
          <div>
            <p className="text-lg font-semibold mb-2">Upload Image</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Select a file to begin.</p>
            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const nextFile = e.target.files?.[0] ?? null;
                  setFile(nextFile);
                  setOutputUrl(null);
                  setOutputText('');
                  setError(null);
                }}
              />
            </div>
          </div>

          {file && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">Selected file:</p>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formatBytes(file.size)}</p>
            </div>
          )}

          {(slug === 'image-resizer' || slug === 'image-cropper') && (
            <div className="space-y-4">
              {slug === 'image-resizer' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">Width</span>
                    <input
                      type="number"
                      value={options.width ?? ''}
                      onChange={(e) => setOptions((prev) => ({ ...prev, width: e.target.value }))}
                      className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
                      placeholder="e.g. 800"
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">Height (optional)</span>
                    <input
                      type="number"
                      value={options.height ?? ''}
                      onChange={(e) => setOptions((prev) => ({ ...prev, height: e.target.value }))}
                      className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
                      placeholder="Leave blank to preserve aspect ratio"
                    />
                  </label>
                </div>
              )}

              {slug === 'image-cropper' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">X</span>
                    <input
                      type="number"
                      value={options.cropX ?? 0}
                      onChange={(e) => setOptions((prev) => ({ ...prev, cropX: e.target.value }))}
                      className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">Y</span>
                    <input
                      type="number"
                      value={options.cropY ?? 0}
                      onChange={(e) => setOptions((prev) => ({ ...prev, cropY: e.target.value }))}
                      className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">Width</span>
                    <input
                      type="number"
                      value={options.cropW ?? ''}
                      onChange={(e) => setOptions((prev) => ({ ...prev, cropW: e.target.value }))}
                      className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
                      placeholder="Leave blank for full width"
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">Height</span>
                    <input
                      type="number"
                      value={options.cropH ?? ''}
                      onChange={(e) => setOptions((prev) => ({ ...prev, cropH: e.target.value }))}
                      className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
                      placeholder="Leave blank for full height"
                    />
                  </label>
                </div>
              )}
            </div>
          )}

          {slug === 'watermark-image' && (
            <div className="space-y-4">
              <label className="flex flex-col">
                <span className="text-sm font-medium">Watermark Text</span>
                <input
                  type="text"
                  value={options.text ?? 'Watermark'}
                  onChange={(e) => setOptions((prev) => ({ ...prev, text: e.target.value }))}
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
                />
              </label>
              <label className="flex flex-col">
                <span className="text-sm font-medium">Position</span>
                <select
                  value={options.position ?? 'bottom-right'}
                  onChange={(e) => setOptions((prev) => ({ ...prev, position: e.target.value }))}
                  className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
                >
                  <option value="top-left">Top left</option>
                  <option value="top-right">Top right</option>
                  <option value="bottom-left">Bottom left</option>
                  <option value="bottom-right">Bottom right</option>
                </select>
              </label>
            </div>
          )}

          {slug === 'image-compressor' && (
            <div className="space-y-4">
              <label className="flex flex-col">
                <span className="text-sm font-medium">Compression Quality</span>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={options.quality ?? 0.8}
                  onChange={(e) => setOptions((prev) => ({ ...prev, quality: parseFloat(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>High Compression</span>
                  <span>Low Compression</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Quality: {Math.round((options.quality ?? 0.8) * 100)}%
                </p>
              </label>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={runTool} className="flex-1">
              <Wand2 className="w-4 h-4 mr-2" />
              {actionLabel}
            </Button>
            <Button
              onClick={reset}
              variant="outline"
              className="flex-1"
            >
              Reset
            </Button>
            {outputUrl && (
              <Button onClick={() => {
                const a = document.createElement('a');
                a.href = outputUrl;
                a.download = `output.${slug === 'png-to-jpg' || slug === 'jpg-to-png' ? (slug === 'png-to-jpg' ? 'jpg' : 'png') : 'png'}`;
                a.click();
              }}
              variant="outline"
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            )}
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 text-red-700 dark:text-red-200">
              {error}
            </div>
          )}
        </div>

        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-4">Result</h2>

          {outputUrl && (
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={outputUrl} alt="Result" className="max-h-80 w-auto rounded-xl shadow-lg" />
              </div>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = outputUrl;
                    link.download = `compressed-${file?.name || 'image'}`;
                    link.click();
                  }}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Compressed Image
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">The image has been compressed and is ready for download.</p>
            </div>
          )}

          {outputText && (
            <div className="space-y-4">
              <textarea
                value={outputText}
                readOnly
                rows={10}
                className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-mono text-sm"
              />
            </div>
          )}

          {!outputUrl && !outputText && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <ImageIcon className="w-20 h-20 mb-4" />
              <p className="text-center">No output yet. Run the tool to see results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
