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
          Open-source VR tools for visual processing and Binocular Vision Dysfunction (BVD) research.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-secondary/20 dark:border-purple-dark/20 mb-12">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">What is Insight?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We&apos;re making VR software to study visual processing and binocular vision dysfunction. The goal is to help researchers and clinicians understand how vision can affect people&apos;s lives - especially those with conditions like OCD, ADHD, or Autism. 
          </p>
          
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4 mt-8">What We&apos;re Working On</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-300">
            <li>VR experiences that can measure how well your eyes work together</li>
            <li>Open-source code that anyone can use and modify - yes even you!</li>
            <li>Better ways to diagnose and treatbinocular vision dysfunction and other visual processing disorders</li>
            <li>Tools that work for people who can&apos;t afford expensive vision testing and treatment</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4 mt-8">Current Projects</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Right now we&apos;re focused on:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-background-light/50 dark:bg-background-dark/80 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-3">VR Eye Tests</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Creating VR environments that can test specific visual abilities and measure how well your eyes coordinate with each other.
              </p>
            </div>
            
            <div className="bg-background-light/50 dark:bg-background-dark/80 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-3">Pattern Detection</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Software that can spot patterns (called biomarkers) that can be used to diagnose and treat visual processing disorders.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-secondary/20 dark:border-purple-dark/20">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">Get Involved</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-background-light/50 dark:bg-background-dark/80 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-3">Be a Test Participant</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Help us test our VR tools and contribute to research.
              </p>
              <a href="mailto:participants@expressionneuroscienceinstitute.org" className="text-accent-light dark:text-accent-dark hover:underline">
                Contact us
              </a>
            </div>
            
            <div className="bg-background-light/50 dark:bg-background-dark/80 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-3">For Researchers</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Use our tools in your own research or collaborate with us.
              </p>
              <a href="mailto:research@expressionneuroscienceinstitute.org" className="text-accent-light dark:text-accent-dark hover:underline">
                Learn more
              </a>
            </div>
            
            <div className="bg-background-light/50 dark:bg-background-dark/80 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-3">Developers</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All our code is open source - check it out on <a href="https://github.com/expressionneuroscienceinstitute" className="text-accent-light dark:text-accent-dark hover:underline">our GitHub</a> and contribute if you want.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 