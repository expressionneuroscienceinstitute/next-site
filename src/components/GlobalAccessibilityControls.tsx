'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccessibility } from './AccessibilityProvider'

export default function GlobalAccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
  const { settings, updateSetting, resetSettings } = useAccessibility()

  const toggles = [
    {
      key: 'particlesEnabled' as keyof typeof settings,
      label: 'Floating Particles',
      description: 'Animated background particles'
    },
    {
      key: 'neuronBackgroundEnabled' as keyof typeof settings,
      label: 'Neural Network',
      description: 'Interactive neuron firing background'
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
    <div className="fixed bottom-4 left-4 z-50">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md rounded-full shadow-lg border border-border-light dark:border-border-dark hover:shadow-xl transition-all duration-300"
        whileHover={settings.allMotionEnabled ? { scale: 1.05 } : {}}
        whileTap={settings.allMotionEnabled ? { scale: 0.95 } : {}}
        aria-label={isOpen ? 'Close accessibility controls' : 'Open accessibility controls'}
      >
        <motion.div
          animate={settings.allMotionEnabled ? { rotate: isOpen ? 45 : 0 } : {}}
          transition={{ duration: settings.allMotionEnabled ? 0.2 : 0 }}
        >
          ⚙️
        </motion.div>
        <span className="text-sm font-medium text-text-light dark:text-text-dark">
          Settings
        </span>
      </motion.button>

      {/* Controls Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={settings.allMotionEnabled ? { opacity: 0, y: 20, scale: 0.9 } : { opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={settings.allMotionEnabled ? { opacity: 0, y: 20, scale: 0.9 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: settings.allMotionEnabled ? 0.2 : 0 }}
            className="absolute bottom-16 left-0 min-w-80 p-4 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md rounded-lg shadow-xl border border-border-light dark:border-border-dark"
          >
            <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-3">
              Accessibility Controls
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Customize visual effects to your preference
            </p>

            <div className="space-y-3">
              {toggles.map((toggle) => (
                <div key={toggle.key} className="flex items-center justify-between">
                  <div className="flex-1">
                    <label 
                      htmlFor={toggle.key}
                      className="text-sm font-medium text-text-light dark:text-text-dark cursor-pointer"
                    >
                      {toggle.label}
                    </label>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {toggle.description}
                    </p>
                  </div>
                  <motion.button
                    id={toggle.key}
                    onClick={() => updateSetting(toggle.key, !settings[toggle.key])}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                      settings[toggle.key]
                        ? 'bg-accent-light dark:bg-accent-dark'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    whileTap={settings.allMotionEnabled ? { scale: 0.95 } : {}}
                    aria-label={`Toggle ${toggle.label}`}
                    role="switch"
                    aria-checked={settings[toggle.key]}
                  >
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{
                        x: settings[toggle.key] ? 24 : 2
                      }}
                      transition={settings.allMotionEnabled ? { type: 'spring', stiffness: 500, damping: 30 } : { duration: 0 }}
                    />
                  </motion.button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-border-light dark:border-border-dark">
              <motion.button
                onClick={resetSettings}
                className="text-sm text-accent-light dark:text-accent-dark hover:underline"
                whileHover={settings.allMotionEnabled ? { scale: 1.02 } : {}}
              >
                Reset to defaults
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}