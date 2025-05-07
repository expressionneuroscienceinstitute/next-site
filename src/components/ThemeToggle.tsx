'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && theme === 'dark'
  
  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const svgVariants = {
    rotate: {
      rotate: isDark ? 30 : 0,
      scale: 1.1,
    },
    normal: {
      rotate: 0,
      scale: 1,
    }
  }

  if (!mounted) {
    return <div className="w-10 h-10" />
  }

  return (
    <motion.button
      onClick={toggle}
      className="relative p-2 rounded-full bg-secondary/20 dark:bg-purple-dark/20 hover:bg-secondary/30 dark:hover:bg-purple-dark/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light dark:focus-visible:ring-accent-dark"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial="normal"
        animate={isDark ? "rotate" : "normal"}
        variants={svgVariants}
        transition={{ duration: 0.3, type: "tween" }}
        className="text-text-light dark:text-text-dark"
      >
        {isDark ? (
          // Sun icon
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M4.93 4.93l1.41 1.41" />
            <path d="M17.66 17.66l1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M6.34 17.66l-1.41 1.41" />
            <path d="M19.07 4.93l-1.41 1.41" />
          </>
        ) : (
          // Moon icon
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </motion.svg>
    </motion.button>
  )
} 