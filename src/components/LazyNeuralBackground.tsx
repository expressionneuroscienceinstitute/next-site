'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { useAccessibility } from './AccessibilityProvider'

// Lazy load the NeuralBackground component
const NeuralBackground = dynamic(() => import('./NeuralBackground'), {
  ssr: false,
  loading: () => null,
})

export default function LazyNeuralBackground() {
  const { settings } = useAccessibility()

  // Only render if neuron background is enabled
  if (!settings.neuronBackgroundEnabled || !settings.allMotionEnabled) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <NeuralBackground disabled={!settings.allMotionEnabled || !settings.neuronBackgroundEnabled} />
    </Suspense>
  )
} 