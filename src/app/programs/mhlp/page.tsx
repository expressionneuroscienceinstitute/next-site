import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function MHLPProgram() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" tabIndex={-1}>
        <nav className="mb-6" aria-label="Breadcrumb">
          <Link 
            href="/programs" 
            className="text-accent-light dark:text-accent-dark hover:underline inline-flex items-center focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark rounded"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Programs
          </Link>
        </nav>

        <header className="mb-12">
          <div className="flex items-center">
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark">Mental Health Labeling Platform</h1>
            <span className="ml-4 text-sm font-medium text-purple-light dark:text-purple-dark px-3 py-1 bg-purple-light/10 dark:bg-purple-dark/10 rounded-full" aria-label="Status: Coming Soon">
              Coming Soon
            </span>
          </div>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Data analysis tools for mental health research and pattern recognition.
          </p>
        </header>

        <section className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-secondary/20 dark:border-purple-dark/20 mb-12">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">What We&apos;re Planning</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            A platform for creating and sharing mental health datasets to find patterns that might be useful for research. We&apos;re focused on making these tools accessible to everyone who wants to study mental health conditions.
          </p>
          
          <div className="flex items-center justify-center p-8 bg-background-light/50 dark:bg-background-dark/80 rounded-lg my-8" role="status" aria-label="Development status">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto text-accent-light dark:text-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
          
          <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4 mt-8">What We Want to Build</h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-300" role="list">
            <li>Tools and datasets to help researchers visualize mental health data</li>
            <li>Ways to find patterns in datasets that might be hard to spot otherwise</li>
            <li>A place for researchers to share anonymized data safely</li>
            <li>Simple tools that don&apos;t require a PhD in machine learning to use. We like to make it easy for anyone to contribute to the platform.</li>
            <li>Clear guidelines for ethical data collection and sharing</li>
          </ul>
        </section>
        
        <section className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-secondary/20 dark:border-purple-dark/20">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">Want to Help?</h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We&apos;re looking for researchers, developers, and mental health professionals to help shape this platform. We believe the best research happens when people with different backgrounds and experiences work together. If you&apos;re interested in neuroscience, have ideas about mental health research, or want to contribute to open science, we&apos;d love to hear from you.
          </p>
          
          <div className="flex justify-center">
            <a 
              href="mailto:mhlp@expression-neuroscience.org" 
              className="inline-block px-8 py-3 rounded-lg font-semibold bg-accent-light dark:bg-accent-dark text-background-light dark:text-background-dark hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
              aria-label="Contact the Mental Health Labeling Platform team via email"
            >
              Contact the MHLP Team
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 