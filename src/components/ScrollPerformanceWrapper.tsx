'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollPerformanceWrapperProps {
  children: ReactNode
  className?: string
}

export default function ScrollPerformanceWrapper({ 
  children, 
  className = '' 
}: ScrollPerformanceWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Enable passive scroll listeners for better performance
    let isScrolling: NodeJS.Timeout | null = null

    const handleScroll = () => {
      // Add scrolling class for potential CSS optimizations
      container.classList.add('is-scrolling')

      // Clear our timeout throughout the scroll
      if (isScrolling) {
        clearTimeout(isScrolling)
      }

      // Set a timeout to run after scrolling ends
      isScrolling = setTimeout(() => {
        container.classList.remove('is-scrolling')
      }, 150)
    }

    // Use passive event listener for better performance
    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (isScrolling) {
        clearTimeout(isScrolling)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`scroll-performance-container ${className}`}
      style={{
        // CSS containment for better performance
        contain: 'layout style paint',
        // Enable GPU acceleration
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        // Optimize scrolling
        WebkitOverflowScrolling: 'touch',
        // Prevent layout shifts
        willChange: 'scroll-position',
      }}
    >
      {children}
      <style jsx>{`
        .scroll-performance-container {
          /* Ensure smooth scrolling */
          scroll-behavior: smooth;
        }

        /* Reduce visual complexity during scroll */
        .scroll-performance-container.is-scrolling {
          /* Disable expensive effects during scroll */
          pointer-events: none;
        }

        .scroll-performance-container.is-scrolling * {
          /* Reduce paint operations during scroll */
          will-change: auto !important;
        }

        /* Optimize child elements */
        .scroll-performance-container > * {
          /* Prevent layout thrashing */
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  )
} 