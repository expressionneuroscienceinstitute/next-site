'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-300 text-sm">
        <p>&copy; {new Date().getFullYear()} Expression Neuroscience Institute. All rights reserved.</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">Governance</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Our governance documents outline our organizational structure, policies,
            and commitment to transparency.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/governance"
              className="text-accent-light dark:text-accent-dark hover:opacity-80 font-medium"
            >
              All Documents
            </Link>
            <Link
              href="/governance/bylaws"
              className="text-accent-light dark:text-accent-dark hover:opacity-80 font-medium"
            >
              Bylaws
            </Link>
            <Link
              href="/governance/policies"
              className="text-accent-light dark:text-accent-dark hover:opacity-80 font-medium"
            >
              Policies
            </Link>
            <Link
              href="/governance/meeting-minutes"
              className="text-accent-light dark:text-accent-dark hover:opacity-80 font-medium"
            >
              Meeting Minutes
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 