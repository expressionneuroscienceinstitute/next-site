'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load the StickyDonateButton component
const StickyDonateButton = dynamic(() => import('./StickyDonateButton'), {
  ssr: false,
  loading: () => null,
})

export default function LazyStickyDonateButton() {
  return (
    <Suspense fallback={null}>
      <StickyDonateButton />
    </Suspense>
  )
} 