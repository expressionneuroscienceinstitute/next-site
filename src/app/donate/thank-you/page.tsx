'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function DonateThankYouPage() {
  useEffect(() => {
    // Track donation conversion for Google Ads
    if (typeof window !== 'undefined' && window.dataLayer) {
      // Generate unique transaction ID
      const transactionId = `donation_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`

      window.dataLayer.push({
        'event': 'conversion_complete',
        'conversion_type': 'donation',
        'transaction_id': transactionId,
        'value': 1
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-secondary/10 to-purple-light/5 dark:from-background-dark dark:via-purple-dark/5 dark:to-accent-dark/3">
      <Navbar />
      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" tabIndex={-1}>
        <div className="text-center">
          <div className="bg-white/90 dark:bg-background-dark/70 backdrop-blur-md rounded-xl p-8 shadow-xl border border-secondary/30 dark:border-purple-dark/30">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
                Thank You for Your Donation!
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Your generous contribution helps advance neuroscience research and makes our work possible.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-text-light dark:text-text-dark mb-3">
                What happens next?
              </h2>
              <ul className="text-left space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent-light dark:bg-accent-dark rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  You&apos;ll receive an email confirmation with your donation receipt
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent-light dark:bg-accent-dark rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  Your funds will directly support our research initiatives
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent-light dark:bg-accent-dark rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  You&apos;ll receive updates on how your donation is making an impact
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <Link
                href="/research"
                className="inline-block bg-accent-light dark:bg-accent-dark text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-light/90 dark:hover:bg-accent-dark/90 transition-colors mr-4"
              >
                Learn About Our Research
              </Link>
              <Link
                href="/"
                className="inline-block border border-accent-light dark:border-accent-dark text-accent-light dark:text-accent-dark px-6 py-3 rounded-lg font-medium hover:bg-accent-light/10 dark:hover:bg-accent-dark/10 transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}