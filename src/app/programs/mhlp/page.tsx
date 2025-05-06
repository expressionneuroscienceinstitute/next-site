import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function MHLPProgram() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-6">
          <Link href="/programs" className="text-accent-light dark:text-accent-dark hover:underline inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Programs
          </Link>
        </div>

        <div className="mb-12">
          <div className="flex items-center">
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark">Mental Health Labeling Platform</h1>
            <span className="ml-4 text-sm font-medium text-purple-light dark:text-purple-dark px-3 py-1 bg-purple-light/10 dark:bg-purple-dark/10 rounded-full">
              Coming Soon
            </span>
          </div>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Advanced tools for analyzing and understanding mental health data patterns.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-secondary/20 dark:border-purple-dark/20 mb-12">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Project Overview</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The Mental Health Labeling Platform (MHLP) is our upcoming initiative focused on developing advanced tools for analyzing and understanding patterns in mental health data. By leveraging machine learning and data science techniques, we aim to identify subtle patterns that may be relevant for diagnosis and treatment of various mental health conditions.
          </p>
          
          <div className="flex items-center justify-center p-8 bg-background-light/50 dark:bg-background-dark/80 rounded-lg my-8">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto text-accent-light dark:text-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h3 className="mt-4 text-xl font-semibold text-text-light dark:text-text-dark">
                Under Development
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                This program is currently in the early stages of development. <br />
                Check back soon for updates!
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4 mt-8">Planned Features</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-300">
            <li>Interactive visualization tools for mental health data patterns</li>
            <li>Machine learning algorithms for identifying correlations in complex datasets</li>
            <li>Collaborative platform for researchers to share and analyze anonymized data</li>
            <li>Open API for integration with existing research tools and frameworks</li>
            <li>Standardized protocols for ethical data collection and analysis</li>
          </ul>
        </div>
        
        <div className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-secondary/20 dark:border-purple-dark/20">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">Interested in Contributing?</h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We&apos;re looking for researchers, developers, and mental health professionals to help shape this platform. If you&apos;re interested in contributing to the development of the MHLP, we&apos;d love to hear from you.
          </p>
          
          <div className="flex justify-center">
            <a 
              href="mailto:mhlp@expression-neuroscience.org" 
              className="inline-block px-8 py-3 rounded-lg font-semibold bg-accent-light dark:bg-accent-dark text-background-light dark:text-background-dark hover:opacity-90 transition-opacity"
            >
              Contact the MHLP Team
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 