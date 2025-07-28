'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface AccessibilitySettings {
  neuronBackgroundEnabled: boolean
  allMotionEnabled: boolean
  breathingEffectsEnabled: boolean
}

interface AccessibilityContextType {
  settings: AccessibilitySettings
  updateSetting: (key: keyof AccessibilitySettings, value: boolean) => void
  resetSettings: () => void
}

const defaultSettings: AccessibilitySettings = {
  neuronBackgroundEnabled: true,
  allMotionEnabled: true,
  breathingEffectsEnabled: false,
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
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

  // Save settings to localStorage when they change
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('accessibility-settings', JSON.stringify(settings))
    }
  }, [settings, mounted])

  const updateSetting = useCallback((key: keyof AccessibilitySettings, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }, [])

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings)
  }, [])

  // Return default settings during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <AccessibilityContext.Provider value={{ 
        settings: defaultSettings, 
        updateSetting: () => {}, 
        resetSettings: () => {} 
      }}>
        {children}
      </AccessibilityContext.Provider>
    )
  }

  return (
    <AccessibilityContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    // Return default settings if context is not available (fallback for server-side rendering)
    return {
      settings: defaultSettings,
      updateSetting: () => {},
      resetSettings: () => {}
    }
  }
  return context
}