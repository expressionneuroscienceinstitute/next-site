'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import { useState, useEffect, useRef } from 'react'
import { useAccessibility } from './AccessibilityProvider'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Research', href: '/research' },
  { name: 'About', href: '/about' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Programs', href: '/programs' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { settings, updateSetting, resetSettings } = useAccessibility()
  const settingsRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  const isActivePage = (href: string) => {
    return pathname === href
  }

  // Close settings dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false)
      }
    }

    if (isSettingsOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    }
  }, [isSettingsOpen])

  const settingsToggles = [
    {
      key: 'neuronBackgroundEnabled' as keyof typeof settings,
      label: 'Neural Network',
      description: 'Interactive neuron background'
    },
    {
      key: 'glowEffectsEnabled' as keyof typeof settings,
      label: 'Glow Effects',
      description: 'Visual glow and shimmer effects'
    },
    {
      key: 'allMotionEnabled' as keyof typeof settings,
      label: 'All Motion',
      description: 'All animations and transitions'
    },
  ]

  return (
    <nav className="bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark relative z-[99999]" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                href="/" 
                className="text-xl font-bold text-accent-light dark:text-accent-dark focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark rounded"
                aria-label="Expression Neuroscience Institute Home"
              >
                ENI
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8" role="menubar">
              {navItems.map((item) => {
                const isActive = isActivePage(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark rounded-t ${
                      isActive
                        ? 'text-accent-light dark:text-accent-dark border-accent-light dark:border-accent-dark'
                        : 'text-text-light dark:text-text-dark border-transparent hover:text-accent-light dark:hover:text-accent-dark hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-3">
            <ThemeToggle />
            
            {/* Settings Toggle */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={toggleSettings}
                className="p-2 rounded-full bg-secondary/20 dark:bg-purple-dark/20 hover:bg-secondary/30 dark:hover:bg-purple-dark/30 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark"
                title="Accessibility settings"
                aria-label="Accessibility settings"
              >
                <svg className="w-5 h-5 text-text-light dark:text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Settings Dropdown */}
              {isSettingsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-background-dark rounded-lg shadow-lg border border-secondary/30 dark:border-purple-dark/30 p-4 z-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">Accessibility</h3>
                    <button
                      onClick={resetSettings}
                      className="text-sm text-accent-light dark:text-accent-dark hover:underline"
                    >
                      Reset
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {settingsToggles.map((toggle) => (
                      <div key={toggle.key} className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-text-light dark:text-text-dark">
                            {toggle.label}
                          </label>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {toggle.description}
                          </p>
                        </div>
                        <button
                          onClick={() => updateSetting(toggle.key, !settings[toggle.key])}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark ${
                            settings[toggle.key]
                              ? 'bg-accent-light dark:bg-accent-dark'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                          role="switch"
                          aria-checked={settings[toggle.key]}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings[toggle.key] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark hover:bg-secondary/20 dark:hover:bg-purple-dark/20 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-border-dark">
            {navItems.map((item) => {
              const isActive = isActivePage(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block pl-3 pr-4 py-2 text-base font-medium border-l-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark ${
                    isActive
                      ? 'text-accent-light dark:text-accent-dark border-accent-light dark:border-accent-dark bg-accent-light/10 dark:bg-accent-dark/10'
                      : 'text-text-light dark:text-text-dark border-transparent hover:text-accent-light dark:hover:text-accent-dark hover:bg-secondary/10 dark:hover:bg-purple-dark/10'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
          
          <div className="pt-4 pb-3 border-t border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark">
            <div className="flex items-center justify-end px-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
} 