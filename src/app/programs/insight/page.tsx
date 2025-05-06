import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function InsightProgram() {
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
          <h1 className="text-4xl font-bold text-text-light dark:text-text-dark">Insight Program</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Open-Source VR Diagnostics for understanding visual processing and neural patterns.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-secondary/20 dark:border-purple-dark/20 mb-12">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The Insight Program is our flagship initiative focused on developing open-source virtual reality tools for understanding visual processing and binocular vision dysfunctions. Our VR diagnostics aim to provide researchers, clinicians, and patients with powerful tools to assess visual processing and binocular vision dysfunctions.
          </p>
          
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4 mt-8">Key Objectives</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-300">
            <li>Develop accessible VR-based tools for assessing visual processing capabilities</li>
            <li>Create open-source software for researchers to adapt and extend for their specific studies</li>
            <li>Establish standardized protocols for measuring misalignment and accommodative responses in binocular vision dysfunctions</li>
            <li>Build a collaborative community of researchers contributing to the advancement of visual neuroscience</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4 mt-8">Current Research</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our team is currently working on several projects within the Insight Program framework:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-background-light/50 dark:bg-background-dark/80 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-3">VR Diagnostic Tool Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Creating immersive VR environments that can isolate and test specific real world visual stimuli, allowing for precise measurements of misalignment.
              </p>
            </div>
            
            <div className="bg-background-light/50 dark:bg-background-dark/80 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-3">Pattern Recognition Algorithms</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Developing algorithms to identify misalignments in visual processing associated with different types of binocular vision dysfunctions.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-secondary/20 dark:border-purple-dark/20">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">Get Involved</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-background-light/50 dark:bg-background-dark/80 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-3">Research Participants</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Join our studies to help advance our understanding of visual processing.
              </p>
              <a href="mailto:participants@expression-neuroscience.org" className="text-accent-light dark:text-accent-dark hover:underline">
                Contact us
              </a>
            </div>
            
            <div className="bg-background-light/50 dark:bg-background-dark/80 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-3">Researchers</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Collaborate with our team or use our open-source tools in your own research.
              </p>
              <a href="mailto:research@expression-neuroscience.org" className="text-accent-light dark:text-accent-dark hover:underline">
                Learn more
              </a>
            </div>
            
            <div className="bg-background-light/50 dark:bg-background-dark/80 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-3">Developers</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Contribute to our open-source projects and help build the next generation of neural diagnostics.
              </p>
              <a href="https://github.com/expression-neuroscience" className="text-accent-light dark:text-accent-dark hover:underline">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 