'use client'

import ProgramLink from './ProgramLink'
import StatusTag from './StatusTag'
import type { StatusTagType } from './StatusTag'

interface ProgramCardProps {
  title: string
  description: string
  href: string
  status?: StatusTagType
}

export default function ProgramCard({ title, description, href, status }: ProgramCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white/95 dark:bg-background-dark/80 shadow-lg p-6 border border-secondary/20 dark:border-purple-dark/20 hover:shadow-xl transition-shadow duration-150 transform-gpu hover:-translate-y-1">
      <div className="relative z-10">
        <div className="flex items-center flex-wrap gap-2 mb-2">
          <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">
            {title}
          </h3>
          {status && (
            <StatusTag status={status} size="small" />
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <ProgramLink href={href} status={status}>
          Learn More
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </ProgramLink>
      </div>
      {/* Removed animated gradient background for better performance */}
    </div>
  )
} 