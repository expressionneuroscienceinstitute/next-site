'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode, useEffect, useState } from 'react'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering anything until mounted.
  // Leaving the DOM untouched during SSR/first paint eliminates the flash
  // where the light-theme markup is replaced by the dark-theme markup (or vice-versa)
  // which was causing a perceptible "hitch" for some users.
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={true}
      storageKey="eni-theme"
    >
      {children}
    </NextThemesProvider>
  )
} 