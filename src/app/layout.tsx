import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Toolzeniq - Free Online Tools",
    template: "%s | Toolzeniq"
  },
  description: "Toolzeniq - Free online tools for image editing, text processing, developers, calculators, generators and more. Fast, SEO optimized, no sign-up required.",
  keywords: "online tools, image compressor, json formatter, qr code generator, free tools",
  authors: [{ name: "Deepak Yadav" }],
  creator: "Deepak Yadav",
  // themeColor: "#3b82f6",
  openGraph: {
    title: "Toolzeniq - Free Online Tools",
    description: "50+ free online tools for everyday needs",
    url: "https://toolzeniq.com",
    siteName: "Toolzeniq",
    images: [
      {
        url: "https://toolzeniq.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolzeniq - Free Online Tools",
    description: "50+ free online tools for everyday needs",
    images: "https://toolzeniq.com/og-image.jpg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
