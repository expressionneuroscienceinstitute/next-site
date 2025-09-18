import React from 'react'

export type StatusTagType = 
  // General status tags
  | 'available'
  | 'coming-soon'
  | 'early-research'
  | 'hypothetical'
  | 'in-development'
  | 'published'
  | 'draft'
  | 'under-review'
  | 'deprecated'
  | 'experimental'
  // Timeline status tags
  | 'completed'
  | 'in-progress'
  | 'planned'
  | 'speculative'
  | 'waiting-on-something'

interface StatusTagProps {
  status: StatusTagType
  className?: string
  size?: 'small' | 'medium' | 'large'
}

const statusConfig = {
  // General status tags
  'available': {
    label: 'Available',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    textColor: 'text-green-700 dark:text-green-300',
    borderColor: 'border-green-200 dark:border-green-700',
  },
  'coming-soon': {
    label: 'Coming Soon',
    bgColor: 'bg-gradient-to-r from-purple-100 to-pink-100 dark:bg-gradient-to-r dark:from-purple-900/30 dark:to-pink-900/30',
    textColor: 'text-purple-700 dark:text-purple-300',
    borderColor: 'border-purple-300 dark:border-purple-700',
  },
  'early-research': {
    label: 'Early Research',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    textColor: 'text-blue-700 dark:text-blue-300',
    borderColor: 'border-blue-200 dark:border-blue-700',
  },
  'hypothetical': {
    label: 'Hypothetical',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    textColor: 'text-yellow-700 dark:text-yellow-300',
    borderColor: 'border-yellow-200 dark:border-yellow-700',
  },
  'in-development': {
    label: 'In Development',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    textColor: 'text-orange-700 dark:text-orange-300',
    borderColor: 'border-orange-200 dark:border-orange-700',
  },
  'published': {
    label: 'Published',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    borderColor: 'border-emerald-200 dark:border-emerald-700',
  },
  'draft': {
    label: 'Draft',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    textColor: 'text-gray-700 dark:text-gray-300',
    borderColor: 'border-gray-200 dark:border-gray-600',
  },
  'under-review': {
    label: 'Under Review',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
    textColor: 'text-indigo-700 dark:text-indigo-300',
    borderColor: 'border-indigo-200 dark:border-indigo-700',
  },
  'deprecated': {
    label: 'Deprecated',
    bgColor: 'bg-red-100 dark:bg-red-900/20',
    textColor: 'text-red-700 dark:text-red-300',
    borderColor: 'border-red-200 dark:border-red-700',
  },
  'experimental': {
    label: 'Experimental',
    bgColor: 'bg-pink-100 dark:bg-pink-900/20',
    textColor: 'text-pink-700 dark:text-pink-300',
    borderColor: 'border-pink-200 dark:border-pink-700',
  },
  // Timeline status tags
  'completed': {
    label: 'Completed',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    borderColor: 'border-emerald-200 dark:border-emerald-700',
  },
  'in-progress': {
    label: 'In Progress',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    textColor: 'text-blue-700 dark:text-blue-300',
    borderColor: 'border-blue-200 dark:border-blue-700',
  },
  'planned': {
    label: 'Planned',
    bgColor: 'bg-violet-100 dark:bg-violet-900/20',
    textColor: 'text-violet-700 dark:text-violet-300',
    borderColor: 'border-violet-200 dark:border-violet-700',
  },
  'speculative': {
    label: 'Speculative',
    bgColor: 'bg-amber-100 dark:bg-amber-900/20',
    textColor: 'text-amber-700 dark:text-amber-300',
    borderColor: 'border-amber-200 dark:border-amber-700',
  },
  'waiting-on-something': {
    label: 'Waiting on Something',
    bgColor: 'bg-gradient-to-r from-indigo-100 to-sky-100 dark:bg-gradient-to-r dark:from-indigo-900/30 dark:to-sky-900/30',
    textColor: 'text-indigo-700 dark:text-indigo-300',
    borderColor: 'border-indigo-300 dark:border-indigo-600',
  },
} as const

const sizeConfig = {
  small: 'text-xs px-2 py-0.5',
  medium: 'text-sm px-3 py-1',
  large: 'text-base px-4 py-2',
} as const

export default function StatusTag({ status, className = '', size = 'medium' }: StatusTagProps) {
  const config = statusConfig[status]
  const sizeClasses = sizeConfig[size]
  
  // Icon for special statuses
  const getStatusIcon = () => {
    if (status === 'waiting-on-something') {
      return (
        <svg className="w-3.5 h-3.5 mr-1.5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
    if (status === 'coming-soon') {
      return (
        <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
    return null
  }
  
  return (
    <span
      className={`
        inline-flex items-center justify-center font-medium rounded-full border
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        ${sizeClasses} ${className}
        flex-shrink-0 whitespace-nowrap
        ${status === 'waiting-on-something' || status === 'coming-soon' ? 'shadow-sm' : ''}
      `.trim()}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      {getStatusIcon()}
      {config.label}
    </span>
  )
}

export function isComingSoonStatus(status: StatusTagType): boolean {
  return status === 'coming-soon' || status === 'hypothetical'
}

export function isAvailableStatus(status: StatusTagType): boolean {
  return status === 'available' || status === 'published'
}

export function isCompletedStatus(status: StatusTagType): boolean {
  return status === 'completed'
}

export function isInProgressStatus(status: StatusTagType): boolean {
  return status === 'in-progress'
}

export function isPlannedStatus(status: StatusTagType): boolean {
  return status === 'planned'
}

export function isSpeculativeStatus(status: StatusTagType): boolean {
  return status === 'speculative'
} 