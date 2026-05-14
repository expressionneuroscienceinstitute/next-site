'use client'

import NeuralBackground from './NeuralBackground'
import { useAccessibility } from './AccessibilityProvider'

export default function LazyNeuralBackground() {
  const { settings } = useAccessibility()

  if (!settings.neuronBackgroundEnabled) {
    return null
  }

  return (
    <NeuralBackground
      motionEnabled={settings.allMotionEnabled}
      glowEffectsEnabled={settings.glowEffectsEnabled}
      stickyWithPage={settings.stickyNeuronBackgroundEnabled}
    />
  )
}
