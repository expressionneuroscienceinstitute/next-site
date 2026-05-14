'use client'

import { useEffect } from 'react'

/**
 * Toggles a `.is-scrolling` class on <body> while the user is scrolling so we
 * can disable hover effects globally for jank-free scrolling. Implemented as a
 * normal React effect (instead of an inline script with dangerouslySetInnerHTML)
 * so it works under a strict Content Security Policy.
 */
export default function ScrollPerformanceScript() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    const body = document.body
    if (!body) return

    let scrollTimeout: ReturnType<typeof setTimeout> | undefined

    const handleScroll = () => {
      if (!body.classList.contains('is-scrolling')) {
        body.classList.add('is-scrolling')
      }
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        body.classList.remove('is-scrolling')
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
      body.classList.remove('is-scrolling')
    }
  }, [])

  return null
}
