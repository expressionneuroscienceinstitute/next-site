'use client'

import Link from 'next/link'
import SocialLinks, { defaultSocialLinks } from './SocialLinks'

export default function Footer() {
  return (
    <footer className="relative bg-surface-dark/95 text-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-accent-dark shadow-glow" />
              <span className="font-mono text-sm uppercase tracking-[0.2em] text-accent-dark">
                Expression Neuroscience Institute
              </span>
            </div>
            <p className="text-sm text-gray-300 max-w-md leading-relaxed">
              A Gen-Z, neurodivergent-led nonprofit building open-source
              neurotech. We document the process so the next person doesn&apos;t
              have to start from zero.
            </p>
            <div className="mt-6">
              <SocialLinks links={defaultSocialLinks} className="justify-start" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent-dark mb-3">
              {'// explore'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/programs/microneedle-eeg" className="hover:text-white">Microneedle EEG</Link></li>
              <li><Link href="/research" className="hover:text-white">Research</Link></li>
              <li><Link href="/roadmap" className="hover:text-white">Roadmap</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent-dark mb-3">
              {'// governance'}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/governance" className="hover:text-white">All documents</Link></li>
              <li><Link href="/governance/bylaws" className="hover:text-white">Bylaws</Link></li>
              <li><Link href="/governance/policies" className="hover:text-white">Policies</Link></li>
              <li><Link href="/governance/meeting-minutes" className="hover:text-white">Meeting minutes</Link></li>
              <li><Link href="/governance/terms-of-service" className="hover:text-white">Terms</Link></li>
              <li><Link href="/governance/privacy-policy" className="hover:text-white">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono uppercase tracking-[0.18em] text-gray-400">
          <span>
            &copy; {new Date().getFullYear()} Expression Neuroscience Institute · open by default
          </span>
          <span>v.{new Date().getFullYear()}.public-beta</span>
        </div>
      </div>
    </footer>
  )
}
