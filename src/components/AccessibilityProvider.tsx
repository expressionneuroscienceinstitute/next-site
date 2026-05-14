'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface AccessibilitySettings {
  neuronBackgroundEnabled: boolean
  stickyNeuronBackgroundEnabled: boolean
  allMotionEnabled: boolean
  glowEffectsEnabled: boolean
  preferLargeText: boolean
}

interface AccessibilityContextType {
  settings: AccessibilitySettings
  updateSetting: (key: keyof AccessibilitySettings, value: boolean) => void
  resetSettings: () => void
}

const defaultSettings: AccessibilitySettings = {
  neuronBackgroundEnabled: true,
  stickyNeuronBackgroundEnabled: false,
  allMotionEnabled: true,
  glowEffectsEnabled: true,
  preferLargeText: false,
}

function mergeWithDefaults(raw: Partial<AccessibilitySettings>): AccessibilitySettings {
  return { ...defaultSettings, ...raw }
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('accessibility-settings')
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings) as Partial<AccessibilitySettings>
          setSettings(mergeWithDefaults(parsed))
        } catch (error) {
          console.warn('Failed to parse accessibility settings:', error)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('accessibility-settings', JSON.stringify(settings))
    }
  }, [settings, mounted])

  useEffect(() => {
    if (!mounted || typeof document === 'undefined') return
    document.documentElement.classList.toggle('prefer-large-text', settings.preferLargeText)
  }, [settings.preferLargeText, mounted])

  const updateSetting = useCallback((key: keyof AccessibilitySettings, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings)
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('prefer-large-text')
    }
  }, [])

  if (!mounted) {
    return (
      <AccessibilityContext.Provider
        value={{
          settings: defaultSettings,
          updateSetting: () => {},
          resetSettings: () => {},
        }}
      >
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
    return {
      settings: defaultSettings,
      updateSetting: () => {},
      resetSettings: () => {},
    }
  }
  return context
}
