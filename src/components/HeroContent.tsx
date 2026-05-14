'use client'

import Link from 'next/link'
import { useAccessibility } from './AccessibilityProvider'

export default function HeroContent() {
  const { settings: accessibilitySettings } = useAccessibility()
  const animate = accessibilitySettings.allMotionEnabled

  return (
    <div className="max-w-4xl">
      <h1
        className={`text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-text-light dark:text-text-dark ${
          animate ? 'animate-fade-in' : ''
        }`}
      >
        Demystifying neuroscience,{' '}
        <span className="gradient-text">in public</span>
        <span className="caret" aria-hidden="true" />
      </h1>

      <p
        className={`mt-6 text-lg md:text-2xl text-muted-light dark:text-muted-dark max-w-3xl leading-relaxed ${
          animate ? 'animate-fade-in animation-delay-100' : ''
        }`}
      >
        Expression Neuroscience Institute is a Gen-Z, neurodivergent-led
        nonprofit documenting the open-source design of a microneedle-array EEG —
        and everything we learn along the way.
      </p>

      <div
        className={`mt-10 flex flex-col sm:flex-row gap-4 ${
          animate ? 'animate-slide-up animation-delay-200' : ''
        }`}
      >
        <Link
          href="/programs/microneedle-eeg"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-mono text-sm uppercase tracking-[0.18em] bg-gradient-to-r from-accent-light to-neon-pink dark:from-accent-dark dark:to-neon-pink text-white shadow-glow hover:shadow-glow-pink transition-shadow focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
        >
          See the current project
        </Link>
        <Link
          href="/research"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-mono text-sm uppercase tracking-[0.18em] border border-accent-light dark:border-accent-dark text-accent-light dark:text-accent-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
        >
          Read the lab notes
        </Link>
        <a
          href="https://donorbox.org/expression-neuroscience-institute?default_interval=q"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-mono text-sm uppercase tracking-[0.18em] border border-purple-300/60 dark:border-purple-500/40 text-text-light dark:text-text-dark hover:border-accent-light dark:hover:border-accent-dark focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
        >
          Fund the work →
        </a>
      </div>
    </div>
  )
}
