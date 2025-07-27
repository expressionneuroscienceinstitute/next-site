'use client'

import { motion } from 'framer-motion'
import { useAccessibility } from './AccessibilityProvider'
import { useEffect, useState } from 'react'

export default function NavbarDonateButton() {
  const [mounted, setMounted] = useState(false)
  const { settings: accessibilitySettings } = useAccessibility()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-24 h-10" />
  }

  return (
    <motion.div
      whileHover={mounted && accessibilitySettings.allMotionEnabled ? { scale: 1.05 } : {}}
      whileTap={mounted && accessibilitySettings.allMotionEnabled ? { scale: 0.95 } : {}}
      className="relative"
    >
      <a
        href="https://donorbox.org/expression-neuroscience-institute?default_interval=q"
        className="inline-flex items-center px-4 py-2 rounded-md font-medium bg-gradient-to-r from-accent-light to-emerald-500 dark:from-accent-dark dark:to-emerald-400 text-white shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Support our research through donations (opens in new tab)"
        title="Support Our Research"
      >
        <span className="hidden sm:inline">Support Our Research</span>
        <span className="sm:hidden">Donate</span>
      </a>
    </motion.div>
  )
} 