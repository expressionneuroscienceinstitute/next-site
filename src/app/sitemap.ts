import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.expression.ngo'
  
  // Core pages
  const routes = [
    '',
    '/about',
    '/research',
    '/roadmap',
    '/programs',
    '/programs/mhlp',
    '/governance',
    '/governance/bylaws',
    '/governance/policies',
    '/governance/meeting-minutes',
    '/governance/other-documents',
    '/governance/terms-of-service',
    '/governance/privacy-policy',
    '/donate',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route.includes('governance') ? 0.6 : 0.8,
  }))
}