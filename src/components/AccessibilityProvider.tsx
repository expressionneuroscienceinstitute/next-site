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

const STORAGE_KEY = 'eni-a11y-v2'
const LEGACY_STORAGE_KEY = 'accessibility-settings'

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

function readStoredSettings(): Partial<AccessibilitySettings> | null {
  if (typeof window === 'undefined') return null
  try {
    const next = localStorage.getItem(STORAGE_KEY)
    if (next) return JSON.parse(next) as Partial<AccessibilitySettings>
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY)
    if (legacy) {
      const parsed = JSON.parse(legacy) as Partial<AccessibilitySettings>
      localStorage.removeItem(LEGACY_STORAGE_KEY)
      return parsed
    }
  } catch {
    return null
  }
  return null
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const parsed = readStoredSettings()
      if (parsed) {
        setSettings(mergeWithDefaults(parsed))
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mergeWithDefaults(parsed)))
      }
    }
  }, [])

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
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
