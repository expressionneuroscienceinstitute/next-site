import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProgramLink from '@/components/ProgramLink'

const programs = [
  {
    title: 'Insight Program',
    description: 'Open-Source VR Diagnostics for understanding visual processing and neural patterns.',
    href: '/programs/insight',
    longDescription: 'The Insight Program focuses on developing open-source virtual reality tools for understanding visual processing and neural patterns. Our VR diagnostics aim to provide researchers and clinicians with powerful tools to assess neural functioning and visual perception patterns.',
  },
  {
    title: 'Mental Health Labeling Platform',
    description: 'Advanced tools for analyzing and understanding mental health data patterns.',
    href: '/programs/mhlp',
    longDescription: 'Our Mental Health Labeling Platform is designed to help researchers analyze and understand patterns in mental health data. By leveraging advanced machine learning techniques, we aim to identify subtle patterns that may be relevant for diagnosis and treatment.',
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
            We develop innovative research programs to advance our understanding of neural patterns and expressions.
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