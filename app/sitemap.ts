import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.spacematch.com.ng';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // Your homepage
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      // A static route
      url: `${BASE_URL}/properties`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // You would include all your other static and dynamic routes here
  ];
}