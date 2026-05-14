import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProgramLink from '@/components/ProgramLink'
import StatusTag from '@/components/StatusTag'
import type { StatusTagType } from '@/components/StatusTag'

export const metadata = {
  title: 'Programs',
  description:
    'Open-source research programs at Expression Neuroscience Institute. Currently focused on microneedle-array EEGs.',
}

interface Program {
  title: string
  description: string
  href: string
  longDescription: string
  status: StatusTagType
  funded: boolean
}

const programs: Program[] = [
  {
    title: 'Microneedle Array EEG',
    description:
      'A comfortable, gel-free, open-source EEG headset built on microneedle electrodes — designed in public.',
    href: '/programs/microneedle-eeg',
    longDescription:
      'Microneedle Array EEG is our one and only current research focus. We are exploring how tiny, painless electrode arrays can replace messy gel and bulky caps, then publishing every step — CAD, firmware, datasets, the experiments that fail — under permissive open licenses. This program is unfunded; we work on it because the next generation deserves neurotech they can actually inspect.',
    status: 'early-research',
    funded: false,
  },
]

export default function Programs() {
  return (
    <div className="page-shell">
      <Navbar />
      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <p className="kicker">Programs</p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mt-4">
            What we&apos;re building
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-light dark:text-muted-dark max-w-3xl leading-relaxed">
            One project at a time, fully in the open. We&apos;d rather do one
            thing rigorously than spread thin across a portfolio.
          </p>
        </div>

        <div className="grid gap-8">
          {programs.map((program) => (
            <article key={program.title} className="panel p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark">
                  {program.title}
                </h2>
                <StatusTag status={program.status} size="medium" className="flex-shrink-0" />
                {!program.funded && <span className="badge-soft">Unfunded</span>}
              </div>
              <p className="text-muted-light dark:text-muted-dark leading-relaxed mb-6 md:text-lg">
                {program.longDescription}
              </p>
              <ProgramLink href={program.href} status={program.status}>
                Read the full brief
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </ProgramLink>
            </article>
          ))}
        </div>

        <aside className="mt-12 panel p-8 border-dashed border-gray-300 dark:border-white/20">
          <h2 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
            Future programs
          </h2>
          <p className="text-muted-light dark:text-muted-dark leading-relaxed">
            We&apos;ll only ever open a new program once the current one is at a
            stable checkpoint and has the people, ethics oversight, and funding
            to do it right. Want to suggest a direction? Email us — we read
            everything.
          </p>
        </aside>
      </main>
      <Footer />
    </div>
  )
}
