'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { StatusTagType } from './StatusTag'

// Lazy load the Timeline component
const Timeline = dynamic(() => import('./Timeline'), {
  ssr: false,
  loading: () => null,
})

interface Milestone {
  id: string
  date: string
  title: string
  description: string
  status: StatusTagType
}

interface LazyTimelineProps {
  milestones: Milestone[]
}

export default function LazyTimeline({ milestones }: LazyTimelineProps) {
  return (
    <Suspense fallback={null}>
      <Timeline milestones={milestones} />
    </Suspense>
  )
} 