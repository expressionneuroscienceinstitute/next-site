'use client'

import Link from 'next/link'

export default function HeroContent() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-text-light dark:text-text-dark md:text-5xl lg:text-6xl">
        Demystifying neuroscience,{' '}
        <span className="relative whitespace-nowrap text-coral-light dark:text-coral-dark">
          in public
          <span
            className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-rose-400 via-emerald-400 to-sky-400 opacity-90 dark:opacity-100"
            aria-hidden
          />
        </span>
      </h1>

      <p className="mt-5 text-lg leading-relaxed text-muted-light dark:text-muted-dark md:text-xl">
        Expression Neuroscience Institute documents the open-source design of a microneedle-array EEG — the messy middle,
        not just the highlight reel.
      </p>

      <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row">
        <Link
          href="/programs/microneedle-eeg"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-coral-light to-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-coral-light dark:from-coral-dark dark:to-rose-400 dark:focus:ring-coral-dark"
        >
          Current project
        </Link>
        <Link
          href="/research"
          className="inline-flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white/90 px-6 py-3 text-sm font-semibold text-text-light transition hover:border-accent-light dark:border-white/15 dark:bg-white/5 dark:text-text-dark dark:hover:border-accent-dark"
        >
          Research page
        </Link>
        <a
          href="https://donorbox.org/expression-neuroscience-institute?default_interval=q"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-accent-light underline decoration-2 underline-offset-4 transition hover:text-coral-light dark:text-accent-dark dark:hover:text-coral-dark"
        >
          Donate
        </a>
      </div>
    </div>
  )
}
