'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AccessibilitySettings {
  particlesEnabled: boolean
  neuronBackgroundEnabled: boolean
  allMotionEnabled: boolean
  breathingEffectsEnabled: boolean
}

interface AccessibilityControlsProps {
  onSettingsChange: (settings: AccessibilitySettings) => void
}

const defaultSettings: AccessibilitySettings = {
  particlesEnabled: true,
  neuronBackgroundEnabled: true,
  allMotionEnabled: true,
  breathingEffectsEnabled: true,
}

export default function AccessibilityControls({ onSettingsChange }: AccessibilityControlsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [mounted, setMounted] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('accessibility-settings')
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings)
          setSettings(parsed)
        } catch (error) {
          console.warn('Failed to parse accessibility settings:', error)
        }
      }
    }
  }, [])

  // Notify parent of settings changes and save to localStorage
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('accessibility-settings', JSON.stringify(settings))
      onSettingsChange(settings)
    }
  }, [settings, mounted, onSettingsChange])

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const toggles = [
    {
      key: 'particlesEnabled' as keyof AccessibilitySettings,
      label: 'Floating Particles',
      description: 'Animated background particles'
    },
    {
      key: 'neuronBackgroundEnabled' as keyof AccessibilitySettings,
      label: 'Neural Network',
      description: 'Interactive neuron firing background'
    },
    {
      key: 'breathingEffectsEnabled' as keyof AccessibilitySettings,
      label: 'Breathing Effects',
      description: 'Subtle breathing animations'
    },
    {
      key: 'allMotionEnabled' as keyof AccessibilitySettings,
      label: 'All Motion',
      description: 'All animations and transitions'
    },
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md rounded-full shadow-lg border border-border-light dark:border-border-dark hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close accessibility controls' : 'Open accessibility controls'}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ⚙️
        </motion.div>
        <span className="text-sm font-medium text-text-light dark:text-text-dark">
          A11y
        </span>
      </motion.button>

      {/* Controls Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
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
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Toggle ${toggle.label}`}
                    role="switch"
                    aria-checked={settings[toggle.key]}
                  >
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                      animate={{
                        x: settings[toggle.key] ? 24 : 2
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-border-light dark:border-border-dark">
              <motion.button
                onClick={() => {
                  setSettings(defaultSettings)
                }}
                className="text-sm text-accent-light dark:text-accent-dark hover:underline"
                whileHover={{ scale: 1.02 }}
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

export type { AccessibilitySettings }