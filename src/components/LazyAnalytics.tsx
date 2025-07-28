'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load the Analytics component
const Analytics = dynamic(() => import('@vercel/analytics/react').then(mod => ({ default: mod.Analytics })), {
  ssr: false,
  loading: () => null,
})

// Google Analytics
const GoogleAnalytics = dynamic(() => import('@next/third-parties/google').then(mod => ({ default: mod.GoogleAnalytics })), {
  ssr: false,
  loading: () => null,
})

export default function LazyAnalytics() {
  return (
    <Suspense fallback={null}>
      <Analytics />
      <GoogleAnalytics gaId="G-HKMQDNQJTV" />
    </Suspense>
  )
} 