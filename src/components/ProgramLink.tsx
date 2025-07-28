'use client'

import Link from 'next/link'
import { StatusTagType, isComingSoonStatus } from './StatusTag'

interface ProgramLinkProps {
  href: string
  status?: StatusTagType
  children: React.ReactNode
}

export default function ProgramLink({ href, status, children }: ProgramLinkProps) {
  const isComingSoon = status ? isComingSoonStatus(status) : false
  
  return (
    <Link
      href={href}
      className={`inline-flex items-center text-accent-light dark:text-accent-dark font-medium ${
        isComingSoon ? 'opacity-75 hover:opacity-100' : 'hover:underline'
      }`}
    >
      {children}
    </Link>
  )
} 