import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StatusTag from '@/components/StatusTag'

export default function ceEEGProgram() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Skip link for main content */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-light focus:text-background-light focus:rounded focus:outline-none focus:ring-2 focus:ring-accent-light focus:ring-offset-2"
      >
        Skip to main content
      </a>
      
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" tabIndex={-1}>
        <nav className="mb-6" aria-label="Breadcrumb navigation">
          <Link 
            href="/programs" 
            className="text-accent-light dark:text-accent-dark hover:underline inline-flex items-center focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark rounded"
            aria-label="Navigate back to all programs"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Programs
          </Link>
        </nav>

        <header className="mb-12">
          <div className="flex items-center flex-wrap gap-4">
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark">Continuous Embedded Electroencephalogram</h1>
            <StatusTag status="early-research" size="medium" />
          </div>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Making brain-computer interfaces work for real people through open, non-invasive technology.
          </p>
        </header>

        <section className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-secondary/20 dark:border-purple-dark/20 mb-12" aria-labelledby="bci-problems-heading">
          <h2 id="bci-problems-heading" className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Why BCIs Haven&apos;t Worked Yet</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Current ambulatory EEG is limited to 72 hours<sup>1</sup>. Subcutaneous devices like UNEEG can monitor for months<sup>2</sup>, but they require surgery. Neither approach has created BCIs that people actually want to use.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We believe the problem isn&apos;t just technical - it&apos;s philosophical. For BCIs to work for people, they need to be:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300 mb-6" role="list" aria-label="Core principles for successful brain-computer interfaces">
            <li><strong>Open Source:</strong> You can see exactly how it works and modify it for your needs</li>
            <li><strong>Transparent:</strong> No black boxes, no proprietary algorithms controlling your brain data</li>
            <li><strong>Secure:</strong> Your neural data stays yours, with encryption you control</li>
            <li><strong>Trustworthy:</strong> Built by a community, not a corporation trying to monetize your thoughts</li>
            <li><strong>Non-invasive:</strong> No surgery, no implants - technology that respects your body</li>
          </ul>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6 my-8" role="note" aria-labelledby="research-focus-heading">
            <h3 id="research-focus-heading" className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Our Research Focus</h3>
            <p className="text-blue-700 dark:text-blue-300">
              We&apos;re exploring how to extend non-invasive brain monitoring beyond current limits while keeping everything open source. If we can&apos;t make it work for everyone, we won&apos;t make it at all.
            </p>
          </div>
          
          <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4 mt-8">What We&apos;re Exploring</h3>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-300" role="list" aria-label="Research areas we are investigating">
            <li>New electrode materials that stay comfortable for weeks without skin irritation</li>
            <li>Power solutions that don&apos;t require daily charging or battery swaps</li>
            <li>Open source signal processing that runs on your device, not the cloud</li>
            <li>Data formats that you own and control completely</li>
            <li>Community-driven development where users shape the technology</li>
          </ul>

          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg" role="complementary" aria-labelledby="references-heading">
            <h4 id="references-heading" className="sr-only">References</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>References:</strong><br/>
              1. Faulkner HJ, et al. &ldquo;How much time is enough? Establishing an optimal duration of recording for ambulatory video EEG.&rdquo; <em>Epilepsy Behav</em>. 2021. PMID: 34358734<br/>
              2. Duun-Henriksen J, et al. &ldquo;Ultra-long-term subcutaneous home monitoring of epilepsy—490 days of EEG from nine patients.&rdquo; <em>Epilepsia</em>. 2019. PMID: 31608435
            </p>
          </div>
        </section>
        
        <section className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-secondary/20 dark:border-purple-dark/20" aria-labelledby="join-us-heading">
          <h2 id="join-us-heading" className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">Build This With Us</h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We need people who understand that technology should serve humanity, not the other way around. Whether you&apos;re an engineer tired of closed-source medical devices, a researcher who believes in open science, or someone living with a neurological condition who knows what real solutions look like - we need your perspective.
          </p>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This isn&apos;t about building the next tech unicorn. It&apos;s about making sure that when BCIs finally work, they work for everyone.
          </p>
          
          <div className="flex justify-center">
            <a 
              href="mailto:ceEEG@expression.ngo" 
              className="inline-block px-8 py-3 rounded-lg font-semibold bg-accent-light dark:bg-accent-dark text-background-light dark:text-background-dark hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
              aria-label="Contact the Continuous Embedded Electroencephalogram team via email to join the open BCI movement"
            >
              Join the Open BCI Movement
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 