'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Research', href: '/research' },
  { name: 'About', href: '/about' },
  { name: 'Roadmap', href: '/roadmap' },
]

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-none dark:border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-accent-light dark:text-accent-dark">
                ENI
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/donate"
              className="btn-primary"
            >
              Donate
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
} 