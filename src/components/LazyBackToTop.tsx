'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load the BackToTop component
const BackToTop = dynamic(() => import('./BackToTop'), {
  ssr: false,
  loading: () => null,
})

export default function LazyBackToTop() {
  return (
    <Suspense fallback={null}>
      <BackToTop />
    </Suspense>
  )
} 