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
    <div className="relative overflow-hidden rounded-xl bg-white/95 dark:bg-background-dark/80 shadow-lg p-6 border border-secondary/20 dark:border-purple-dark/20 hover:shadow-xl transition-shadow duration-150 hover:-translate-y-1 text-center">
      <div className="relative z-10">
        <div className="flex flex-col items-center gap-2 mb-4">
          <h3 className="text-xl font-semibold text-text-light dark:text-text-dark text-center">
            {title}
          </h3>
          {status && (
            <StatusTag status={status} size="small" className="flex-shrink-0 whitespace-nowrap" />
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">{description}</p>
        <div className="flex justify-center">
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
      </div>
      {/* Removed animated gradient background for better performance */}
    </div>
  )
} 