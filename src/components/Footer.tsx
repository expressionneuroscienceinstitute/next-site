'use client'

import Link from 'next/link'
import SocialLinks, { defaultSocialLinks } from './SocialLinks'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gradient-to-b from-rose-50/50 to-gray-50 dark:border-white/10 dark:from-purple-950/30 dark:to-[#080510]">
      <div
        className="h-0.5 w-full bg-gradient-to-r from-rose-500 via-emerald-500 to-sky-500 opacity-80 dark:opacity-90"
        aria-hidden
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold text-text-light dark:text-text-dark">Expression Neuroscience Institute</p>
            <p className="mt-2 text-sm text-muted-light dark:text-muted-dark leading-relaxed max-w-sm">
              A Gen-Z, neurodivergent-led nonprofit building open neurotech and sharing how we get there.
            </p>
            <div className="mt-4">
              <SocialLinks links={defaultSocialLinks} className="justify-start" />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-light dark:text-muted-dark mb-2">
              Explore
            </p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/programs/microneedle-eeg" className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark">
                  Microneedle EEG
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-light dark:text-muted-dark mb-2">
              Governance
            </p>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/governance" className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark">
                  All documents
                </Link>
              </li>
              <li>
                <Link href="/governance/bylaws" className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark">
                  Bylaws
                </Link>
              </li>
              <li>
                <Link href="/governance/policies" className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark">
                  Policies
                </Link>
              </li>
              <li>
                <Link href="/governance/meeting-minutes" className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark">
                  Meeting minutes
                </Link>
              </li>
              <li>
                <Link href="/governance/terms-of-service" className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/governance/privacy-policy" className="text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 pt-6 border-t border-gray-200 text-xs text-muted-light dark:border-white/10 dark:text-muted-dark">
          © {new Date().getFullYear()} Expression Neuroscience Institute
        </p>
      </div>
    </footer>
  )
}
