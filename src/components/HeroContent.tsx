'use client'

import Link from 'next/link'
import { useAccessibility } from './AccessibilityProvider'

export default function HeroContent() {
  const { settings: accessibilitySettings } = useAccessibility()

  return (
    <>
      {/* Main Title - Always visible */}
      <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold text-text-light dark:text-text-dark mb-6 ${
        accessibilitySettings.allMotionEnabled ? 'animate-fade-in' : ''
      }`}>
        Expression Neuroscience Institute
      </h1>

      {/* Subtitle - Always visible */}
      <p className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed ${
        accessibilitySettings.allMotionEnabled ? 'animate-fade-in animation-delay-100' : ''
      }`}>
        Advancing neuroscience through innovative, accessible research. 
        A nonprofit organization dedicated to open science and mental health research.
      </p>

      {/* Call to Action Buttons */}
      <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 ${
        accessibilitySettings.allMotionEnabled ? 'animate-slide-up animation-delay-200' : ''
      }`}>
        <a
          href="https://donorbox.org/expression-neuroscience-institute?default_interval=q"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-gradient-to-r from-accent-light to-purple-light dark:from-accent-dark dark:to-purple-dark text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-shadow duration-150">
            Support Our Research
          </button>
        </a>
        <Link href="/research">
          <button className="border-2 border-accent-light dark:border-accent-dark text-accent-light dark:text-accent-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-light hover:text-white dark:hover:bg-accent-dark dark:hover:text-white transition-colors duration-150">
            Read Our Papers
          </button>
        </Link>
      </div>
    </>
  )
} 