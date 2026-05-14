import { MetadataRoute } from 'next'

// Force static generation for compatibility with static export
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.expression.ngo'

  const buildDate = new Date('2026-05-14T00:00:00.000Z')

  const routes = [
    '',
    '/about',
    '/research',
    '/roadmap',
    '/programs',
    '/programs/microneedle-eeg',
    '/contact',
    '/donate',
    '/governance',
    '/governance/bylaws',
    '/governance/policies',
    '/governance/meeting-minutes',
    '/governance/other-documents',
    '/governance/terms-of-service',
    '/governance/privacy-policy',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: buildDate,
    changeFrequency: route === '' ? 'weekly' : 'monthly' as const,
    priority: route === '' ? 1.0 : route.includes('governance') ? 0.6 : 0.8,
  }))
}
