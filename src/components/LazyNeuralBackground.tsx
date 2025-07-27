'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load the NeuralBackground component
const NeuralBackground = dynamic(() => import('./NeuralBackground'), {
  ssr: false,
  loading: () => null,
})

interface LazyNeuralBackgroundProps {
  disabled?: boolean
}

export default function LazyNeuralBackground({ disabled = false }: LazyNeuralBackgroundProps) {
  return (
    <Suspense fallback={null}>
      <NeuralBackground disabled={disabled} />
    </Suspense>
  )
} 