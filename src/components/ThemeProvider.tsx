'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ThemeContext = createContext({
  isDark: false,
  toggle: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check system preference on mount
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(prefersDark)
    setMounted(true)

    // Add listener for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    // Update document class when theme changes
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark, mounted])

  const toggle = () => {
    setIsTransitioning(true)
    setIsDark(!isDark)
    
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 400)
  }

  // Don't render anything until after hydration to avoid SSR flickering
  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      <div className="relative overflow-hidden min-h-screen">
        <div className={`min-h-screen ${isDark ? 'bg-background-dark' : 'bg-background-light'} transition-colors duration-300`}>
          {isTransitioning && (
            <motion.div 
              className="pointer-events-none fixed inset-0 z-50 bg-accent-light dark:bg-accent-dark mix-blend-difference opacity-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.05, 0] }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          )}
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  )
} 