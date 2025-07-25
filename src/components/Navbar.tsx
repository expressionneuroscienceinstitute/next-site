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
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isSettingsOpen])

  const settingsToggles = [
    {
      key: 'particlesEnabled' as keyof typeof settings,
      label: 'Particles',
      description: 'Animated background particles'
    },
    {
      key: 'neuronBackgroundEnabled' as keyof typeof settings,
      label: 'Neural Network',
      description: 'Interactive neuron background'
    },
    {
      key: 'breathingEffectsEnabled' as keyof typeof settings,
      label: 'Breathing Effects',
      description: 'Subtle breathing animations'
    },
    {
      key: 'allMotionEnabled' as keyof typeof settings,
      label: 'All Motion',
      description: 'All animations and transitions'
    },
  ]

  return (
    <nav className="bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark" role="navigation" aria-label="Main navigation">
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

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-light dark:hover:bg-gray-800 dark:focus:ring-accent-dark"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
            >
              <span className="sr-only">{isOpen ? 'Close main menu' : 'Open main menu'}</span>
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

          {/* Desktop Theme Toggle and Settings */}
          <div className="hidden sm:flex items-center space-x-2 relative">
            {/* Settings Button */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={toggleSettings}
                type="button"
                className="p-2 rounded-md text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
                aria-label={isSettingsOpen ? 'Close accessibility settings' : 'Open accessibility settings'}
                aria-expanded={isSettingsOpen}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </button>

              {/* Settings Dropdown */}
              {isSettingsOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-border-light dark:border-border-dark z-50">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
                      Accessibility Settings
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Customize visual effects to your preference
                    </p>

                    <div className="space-y-3">
                      {settingsToggles.map((toggle) => (
                        <div key={toggle.key} className="flex items-center justify-between">
                          <div className="flex-1">
                            <label 
                              htmlFor={`desktop-${toggle.key}`}
                              className="text-sm font-medium text-text-light dark:text-text-dark cursor-pointer"
                            >
                              {toggle.label}
                            </label>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {toggle.description}
                            </p>
                          </div>
                          <button
                            id={`desktop-${toggle.key}`}
                            onClick={() => updateSetting(toggle.key, !settings[toggle.key])}
                            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                              settings[toggle.key]
                                ? 'bg-accent-light dark:bg-accent-dark'
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                            aria-label={`Toggle ${toggle.label}`}
                            role="switch"
                            aria-checked={settings[toggle.key]}
                          >
                            <div
                              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200 ${
                                settings[toggle.key] ? 'translate-x-6' : 'translate-x-0.5'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-border-light dark:border-border-dark">
                      <button
                        onClick={resetSettings}
                        className="text-sm text-accent-light dark:text-accent-dark hover:underline"
                      >
                        Reset to defaults
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1" role="menu">
          {navItems.map((item) => {
            const isActive = isActivePage(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark ${
                  isActive
                    ? 'text-accent-light dark:text-accent-dark border-l-4 border-accent-light dark:border-accent-dark'
                    : 'text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={toggleMenu}
                role="menuitem"
                aria-current={isActive ? 'page' : undefined}
              >
                {item.name}
              </Link>
            )
          })}
          
          {/* Mobile Settings Section */}
          <div className="px-3 py-2 border-t border-border-light dark:border-border-dark mt-2">
            <h4 className="text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Accessibility Settings
            </h4>
            <div className="space-y-2">
              {settingsToggles.map((toggle) => (
                <div key={toggle.key} className="flex items-center justify-between">
                  <div className="flex-1">
                    <label 
                      htmlFor={`mobile-${toggle.key}`}
                      className="text-sm text-text-light dark:text-text-dark cursor-pointer"
                    >
                      {toggle.label}
                    </label>
                  </div>
                  <button
                    id={`mobile-${toggle.key}`}
                    onClick={() => updateSetting(toggle.key, !settings[toggle.key])}
                    className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                      settings[toggle.key]
                        ? 'bg-accent-light dark:bg-accent-dark'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`Toggle ${toggle.label}`}
                    role="switch"
                    aria-checked={settings[toggle.key]}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 ${
                        settings[toggle.key] ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={resetSettings}
              className="text-sm text-accent-light dark:text-accent-dark hover:underline mt-2"
            >
              Reset to defaults
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 