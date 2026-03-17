import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://toolzeniq.com'),
  title: {
    default: "Toolzeniq - 50+ Free Online Tools | Image, Text, Developer Tools",
    template: "%s | Toolzeniq - Free Online Tools"
  },
  description: "Toolzeniq offers 50+ free online tools for image editing, text processing, developers, calculators, generators and more. Fast, SEO optimized, no sign-up required. Compress images, format JSON, generate QR codes, and much more.",
  keywords: [
    "online tools",
    "free tools",
    "image compressor",
    "json formatter",
    "qr code generator",
    "password generator",
    "word counter",
    "text tools",
    "developer tools",
    "image tools",
    "calculators",
    "generators",
    "converters",
    "no signup",
    "fast tools",
    "SEO optimized"
  ],
  authors: [{ name: "Deepak Yadav" }],
  creator: "Deepak Yadav",
  publisher: "Toolzeniq",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Web Tools",
  classification: "Online Tools & Utilities",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' }
  ],
  colorScheme: 'light dark',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3b82f6' }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toolzeniq.com',
    title: 'Toolzeniq - 50+ Free Online Tools | Image, Text, Developer Tools',
    description: '50+ free online tools for image editing, text processing, developers, calculators, generators and more. Fast, SEO optimized, no sign-up required.',
    siteName: 'Toolzeniq',
    images: [
      {
        url: 'https://toolzeniq.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Toolzeniq - Free Online Tools',
        type: 'image/jpeg',
      },
      {
        url: 'https://toolzeniq.com/og-image-square.jpg',
        width: 600,
        height: 600,
        alt: 'Toolzeniq - Free Online Tools',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toolzeniq - 50+ Free Online Tools | Image, Text, Developer Tools',
    description: '50+ free online tools for image editing, text processing, developers, calculators, generators and more. Fast, SEO optimized, no sign-up required.',
    creator: '@toolzeniq',
    images: ['https://toolzeniq.com/og-image.jpg'],
    site: '@toolzeniq',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://toolzeniq.com',
    languages: {
      'en-US': 'https://toolzeniq.com',
    },
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
    'yandex-verification': 'your-yandex-verification-code',
    'facebook-domain-verification': 'your-facebook-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Toolzeniq",
    "alternateName": "Toolzeniq - Free Online Tools",
    "url": "https://toolzeniq.com",
    "description": "50+ free online tools for image editing, text processing, developers, calculators, generators and more. Fast, SEO optimized, no sign-up required.",
    "publisher": {
      "@type": "Organization",
      "name": "Toolzeniq",
      "founder": {
        "@type": "Person",
        "name": "Deepak Yadav"
      },
      "url": "https://toolzeniq.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://toolzeniq.com/logo.png",
        "width": 512,
        "height": 512
      },
      "sameAs": [
        "https://github.com/Deepudholiwal/toolzeniq",
        "https://linkedin.com/in/deepak-yadav"
      ]
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://toolzeniq.com/tools?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Online Tools",
      "description": "Collection of free online tools and utilities",
      "numberOfItems": 50,
      "itemListElement": [
        {
          "@type": "SoftwareApplication",
          "name": "Image Compressor",
          "applicationCategory": "Utility",
          "operatingSystem": "Web Browser",
          "url": "https://toolzeniq.com/tools/image-compressor"
        },
        {
          "@type": "SoftwareApplication",
          "name": "JSON Formatter",
          "applicationCategory": "Developer Tool",
          "operatingSystem": "Web Browser",
          "url": "https://toolzeniq.com/tools/json-formatter"
        },
        {
          "@type": "SoftwareApplication",
          "name": "QR Code Generator",
          "applicationCategory": "Utility",
          "operatingSystem": "Web Browser",
          "url": "https://toolzeniq.com/tools/qr-code-generator"
        }
      ]
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
