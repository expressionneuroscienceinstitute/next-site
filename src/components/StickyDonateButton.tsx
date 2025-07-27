'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from './AccessibilityProvider'

export default function StickyDonateButton() {
  const [isVisible, setIsVisible] = useState(false)
  const { settings: accessibilitySettings } = useAccessibility()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed bottom-8 left-8 z-50"
        >
          <motion.div
            whileHover={accessibilitySettings.allMotionEnabled ? { scale: 1.05 } : {}}
            whileTap={accessibilitySettings.allMotionEnabled ? { scale: 0.95 } : {}}
            className="relative"
          >
            {/* Pulsing effect for donation button */}
            <motion.div
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-light to-emerald-500 dark:from-accent-dark dark:to-emerald-400"
              animate={accessibilitySettings.allMotionEnabled ? {
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              } : {}}
              transition={{
                duration: 2,
                repeat: accessibilitySettings.allMotionEnabled ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
            <a
              href="https://donorbox.org/expression-neuroscience-institute?default_interval=q"
              className="relative inline-block px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-accent-light to-emerald-500 dark:from-accent-dark dark:to-emerald-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Support our research through donations (opens in new tab)"
              title="Support Our Research"
            >
              <span className="hidden sm:inline">Support Our Research</span>
              <span className="sm:hidden">Donate</span>
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 