import type { ComponentType } from 'react';

export interface Tool {
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  keywords: string[];
  /** Optional component for the tool. If not provided, a placeholder page is shown. */
  component?: ComponentType;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  tools: string[]; // slugs
  icon: string;
}

export const CATEGORIES: Category[] = [
  // Categories are defined in lib/tools.ts
];
