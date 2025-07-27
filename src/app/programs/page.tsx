import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProgramLink from '@/components/ProgramLink'
import StatusTag from '@/components/StatusTag'
import type { StatusTagType } from '@/components/StatusTag'

interface Program {
  title: string
  description: string
  href: string
  longDescription: string
  status?: StatusTagType
}

const programs: Program[] = [
  {
    title: 'Insight Program',
    description: 'Open-source VR tools for visual processing and Binocular Vision Dysfunction (BVD) research.',
    href: '/programs/insight',
    longDescription: 'Insight is a platform built to diagnose and measure Binocular Vision Dysfunction (BVD) and other visual processing disorders, then provide a personalized treatment plan and vision therapy exercises. We believe that, with open source tools like Insight, BVD could be treated by anyone, anywhere, at any time within the next decade. All our code and tools are open source and free to use for anyone.',
    status: 'in-development',
  },
  {
    title: 'Continuous Embedded Electroencephalogram',
    description: 'Building open source, non-invasive brain-computer interfaces that work for real people. Transparent, secure, community-driven neurotechnology.',
    href: '/programs/ceEEG',
    longDescription: 'Continuous Embedded Electroencephalogram (ceEEG) is our initiative to build brain-computer interfaces that actually work for people. We believe BCIs have failed because they&apos;ve been locked in proprietary black boxes, requiring surgery, and designed for profit rather than people. ceEEG is different: open source, non-invasive, transparent, and community-driven. Every line of code, every design decision, every algorithm - it&apos;s all open. Your brain data stays yours. No corporate servers, no hidden algorithms, no venture capital influence. Just technology that respects human autonomy.',
    status: 'early-research',
  },
]

export default function Programs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-secondary/10 to-purple-light/5 dark:from-background-dark dark:via-purple-dark/5 dark:to-accent-dark/3">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-text-light dark:text-text-dark">Our Programs</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            We build open-source tools and datasets for neuroscience and mental health research.
          </p>
        </div>

        <div className="grid gap-8 md:gap-12">
          {programs.map((program) => (
            <div 
              key={program.title} 
              className="bg-white/90 dark:bg-background-dark/70 backdrop-blur-md rounded-xl p-8 shadow-xl border border-secondary/30 dark:border-purple-dark/30 hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              <div className="flex items-center flex-wrap gap-3 mb-4">
                <h2 className="text-2xl font-bold text-accent-light dark:text-accent-dark">
                  {program.title}
                </h2>
                {program.status && (
                  <StatusTag status={program.status} size="medium" />
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {program.longDescription}
              </p>
              <ProgramLink href={program.href} status={program.status}>
                Learn More
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </ProgramLink>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
} 