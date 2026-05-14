'use client'

import Link from 'next/link'
import { useAccessibility } from './AccessibilityProvider'

export default function HeroContent() {
  const { settings: accessibilitySettings } = useAccessibility()
  const animate = accessibilitySettings.allMotionEnabled

  return (
    <div className="max-w-3xl">
      <h1
        className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-text-light dark:text-text-dark ${
          animate ? 'animate-fade-in' : ''
        }`}
      >
        Demystifying neuroscience,{' '}
        <span className="text-accent-light dark:text-accent-dark">in public</span>
      </h1>

      <p
        className={`mt-5 text-lg md:text-xl text-muted-light dark:text-muted-dark leading-relaxed ${
          animate ? 'animate-fade-in animation-delay-100' : ''
        }`}
      >
        Expression Neuroscience Institute documents the open-source design of a microneedle-array EEG — the messy middle, not just the highlight reel.
      </p>

      <div
        className={`mt-8 flex flex-col sm:flex-row flex-wrap gap-3 ${
          animate ? 'animate-slide-up animation-delay-200' : ''
        }`}
      >
        <Link
          href="/programs/microneedle-eeg"
          className="inline-flex items-center justify-center rounded-lg bg-accent-light dark:bg-accent-dark px-6 py-3 text-sm font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
        >
          Current project
        </Link>
        <Link
          href="/research"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-white/15 bg-white/80 dark:bg-white/5 px-6 py-3 text-sm font-medium text-text-light dark:text-text-dark hover:border-accent-light dark:hover:border-accent-dark focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
        >
          Research page
        </Link>
        <a
          href="https://donorbox.org/expression-neuroscience-institute?default_interval=q"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium text-accent-light dark:text-accent-dark hover:underline focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
        >
          Donate
        </a>
      </div>
    </div>
  )
}
