// SEO Configuration for Toolzeniq
export const SEO_CONFIG = {
  site: {
    name: 'Toolzeniq',
    title: 'Toolzeniq - 50+ Free Online Tools',
    description: 'Toolzeniq offers 50+ free online tools for image editing, text processing, developers, calculators, generators and more. Fast, SEO optimized, no sign-up required.',
    url: 'https://toolzeniq.com',
    ogImage: 'https://toolzeniq.com/og-image.jpg',
    twitterHandle: '@toolzeniq',
    creator: 'Deepak Yadav',
  },

  keywords: [
    'online tools',
    'free tools',
    'image compressor',
    'json formatter',
    'qr code generator',
    'password generator',
    'word counter',
    'text tools',
    'developer tools',
    'image tools',
    'calculators',
    'generators',
    'converters',
    'no signup',
    'fast tools',
    'SEO optimized'
  ],

  social: {
    twitter: {
      card: 'summary_large_image',
      site: '@toolzeniq',
      creator: '@toolzeniq',
    },
    linkedin: 'https://linkedin.com/in/deepak-yadav',
    github: 'https://github.com/Deepudholiwal/toolzeniq',
  },

  verification: {
    google: 'your-google-verification-code',
    bing: 'your-bing-verification-code',
    yandex: 'your-yandex-verification-code',
    facebook: 'your-facebook-verification-code',
  },

  performance: {
    dnsPrefetch: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      '//www.google-analytics.com',
      '//www.googletagmanager.com',
    ],
    preconnect: [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ],
  },
};

// Helper function to generate structured data for tools
export function generateToolStructuredData(tool: any) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        'name': tool.title,
        'description': tool.description,
        'url': `${SEO_CONFIG.site.url}/tools/${tool.slug}`,
        'applicationCategory': 'Utility',
        'operatingSystem': 'Web Browser',
        'browserRequirements': 'Requires JavaScript',
        'image': SEO_CONFIG.site.ogImage,
        'screenshot': SEO_CONFIG.site.ogImage,
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD',
          'availability': 'https://schema.org/InStock'
        },
        'creator': {
          '@type': 'Person',
          'name': SEO_CONFIG.site.creator,
          'url': SEO_CONFIG.site.url
        },
        'publisher': {
          '@type': 'Organization',
          'name': SEO_CONFIG.site.name,
          'url': SEO_CONFIG.site.url,
          'logo': {
            '@type': 'ImageObject',
            'url': `${SEO_CONFIG.site.url}/logo.png`
          }
        },
        'featureList': tool.keywords?.slice(0, 5) || [],
        'softwareVersion': '1.0',
        'datePublished': '2024-01-01',
        'dateModified': new Date().toISOString().split('T')[0]
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': SEO_CONFIG.site.url
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'All Tools',
            'item': `${SEO_CONFIG.site.url}/tools`
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': tool.title,
            'item': `${SEO_CONFIG.site.url}/tools/${tool.slug}`
          }
        ]
      }
    ]
  };
}

// Helper function to generate organization structured data
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': SEO_CONFIG.site.name,
    'url': SEO_CONFIG.site.url,
    'logo': {
      '@type': 'ImageObject',
      'url': `${SEO_CONFIG.site.url}/logo.png`,
      'width': 512,
      'height': 512
    },
    'description': SEO_CONFIG.site.description,
    'founder': {
      '@type': 'Person',
      'name': SEO_CONFIG.site.creator
    },
    'sameAs': [
      SEO_CONFIG.social.github,
      SEO_CONFIG.social.linkedin
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer service',
      'url': `${SEO_CONFIG.site.url}/contact`
    }
  };
}