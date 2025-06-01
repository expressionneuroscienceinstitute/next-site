'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { useState } from 'react'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Research', href: '/research' },
  { name: 'About', href: '/about' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Programs', href: '/programs' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark">
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

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-light dark:hover:bg-gray-800 dark:focus:ring-accent-dark"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Mobile Menu Icon */}
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden sm:flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
} 