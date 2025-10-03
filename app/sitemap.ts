// app/sitemap.ts

import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.spacematch.com.ng';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // https://www.spacematch.com.ng/
      url: BASE_URL,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly', // Using 'weekly' as a common default, but you can adjust
      priority: 1.00,
    },
    {
      // https://www.spacematch.com.ng/products/
      url: `${BASE_URL}/products/`,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      // https://www.spacematch.com.ng/property/search/
      url: `${BASE_URL}/property/search/`,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      // https://www.spacematch.com.ng/sign-in/
      url: `${BASE_URL}/sign-in/`,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      // https://www.spacematch.com.ng/sign-up/
      url: `${BASE_URL}/sign-up/`,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      // https://www.spacematch.com.ng/our-community/
      url: `${BASE_URL}/our-community/`,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      // https://www.spacematch.com.ng/contact-us/
      url: `${BASE_URL}/contact-us/`,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      // https://www.spacematch.com.ng/faq/
      url: `${BASE_URL}/faq/`,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly',
      priority: 0.80,
    },
    {
      // https://www.spacematch.com.ng/products/solutions/?type=flexihabitat
      url: `${BASE_URL}/products/solutions/?type=flexihabitat`,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      // https://www.spacematch.com.ng/products/solutions/?type=terratribe
      url: `${BASE_URL}/products/solutions/?type=terratribe`,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      // https://www.spacematch.com.ng/products/solutions/?type=rootsmanor
      url: `${BASE_URL}/products/solutions/?type=rootsmanor`,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    // Dynamic property pages (can be fetched and generated automatically)
    {
      // https://www.spacematch.com.ng/property/5/
      url: `${BASE_URL}/property/5/`,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      // https://www.spacematch.com.ng/property/4/
      url: `${BASE_URL}/property/4/`,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      // https://www.spacematch.com.ng/property/3/
      url: `${BASE_URL}/property/3/`,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      // https://www.spacematch.com.ng/property/2/
      url: `${BASE_URL}/property/2/`,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      // https://www.spacematch.com.ng/property/1/
      url: `${BASE_URL}/property/1/`,
      lastModified: '2025-10-03T12:29:59+00:00',
      changeFrequency: 'weekly',
      priority: 0.64,
    },
  ];
}