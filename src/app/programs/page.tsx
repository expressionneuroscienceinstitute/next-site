import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProgramLink from '@/components/ProgramLink'

const programs = [
  {
    title: 'Insight Program',
    description: 'Open-source VR tools for visual processing and Binocular Vision Dysfunction (BVD) research.',
    href: '/programs/insight',
    longDescription: 'Insight is a platform built to diagnose and measure Binocular Vision Dysfunction (BVD) and other visual processing disorders, then provide a personalized treatment plan and vision therapy exercises. We believe that, with opensource tools like Insight, BVD could be treated by anyone, anywhere, at any time within the next decade. All our code and tools are open source and free to use for anyone.',
  },
  {
    title: 'Mental Health Labeling Platform',
    description: 'Data analysis tools for mental health research and pattern recognition in Electroencephalography (EEG), eye-tracking, and other neurophysiological data.',
    href: '/programs/mhlp',
    longDescription: 'A platform for creating and sharing mental health datasets to find patterns that might be useful for research. We&apos;re focused on making these tools and datasets accessible to everyone who wants to study mental health conditions and other neurological conditions.',
    comingSoon: true,
  },
]

export default function Programs() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-text-light dark:text-text-dark">Our Programs</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            We build open-source tools and datasets for neuroscience and mental health research.
          </p>
        </div>

        <div className="grid gap-12 md:gap-16">
          {programs.map((program) => (
            <div key={program.title} className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-secondary/20 dark:border-purple-dark/20">
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">
                {program.title}
                {program.comingSoon && (
                  <span className="ml-3 text-sm font-normal text-purple-light dark:text-purple-dark px-3 py-1 bg-purple-light/10 dark:bg-purple-dark/10 rounded-full">
                    Coming Soon
                  </span>
                )}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {program.longDescription}
              </p>
              <ProgramLink href={program.href} comingSoon={program.comingSoon}>
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