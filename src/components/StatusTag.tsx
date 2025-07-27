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
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    textColor: 'text-purple-700 dark:text-purple-300',
    borderColor: 'border-purple-200 dark:border-purple-700',
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
} as const

const sizeConfig = {
  small: 'text-xs px-2 py-0.5',
  medium: 'text-sm px-3 py-1',
  large: 'text-base px-4 py-2',
} as const

export default function StatusTag({ status, className = '', size = 'medium' }: StatusTagProps) {
  const config = statusConfig[status]
  const sizeClasses = sizeConfig[size]
  
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        ${sizeClasses} ${className}
      `.trim()}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
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