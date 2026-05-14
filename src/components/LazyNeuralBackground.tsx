'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { useAccessibility } from './AccessibilityProvider'

const NeuralBackground = dynamic(() => import('./NeuralBackground'), {
  ssr: false,
  loading: () => null,
})

export default function LazyNeuralBackground() {
  const { settings } = useAccessibility()

  if (!settings.neuronBackgroundEnabled) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <NeuralBackground
        motionEnabled={settings.allMotionEnabled}
        glowEffectsEnabled={settings.glowEffectsEnabled}
        stickyWithPage={settings.stickyNeuronBackgroundEnabled}
      />
    </Suspense>
  )
}
