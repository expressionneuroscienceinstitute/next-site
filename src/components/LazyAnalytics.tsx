'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load the Vercel Analytics component
const Analytics = dynamic(() => import('@vercel/analytics/react').then(mod => ({ default: mod.Analytics })), {
  ssr: false,
  loading: () => null,
})

export default function LazyAnalytics() {
  return (
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  )
} 