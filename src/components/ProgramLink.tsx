'use client'

import Link from 'next/link'

interface ProgramLinkProps {
  href: string
  comingSoon?: boolean
  children: React.ReactNode
}

export default function ProgramLink({ href, comingSoon, children }: ProgramLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center text-accent-light dark:text-accent-dark font-medium ${
        comingSoon ? 'opacity-50 cursor-not-allowed' : 'hover:underline'
      }`}
      onClick={e => comingSoon && e.preventDefault()}
    >
      {children}
    </Link>
  )
} 