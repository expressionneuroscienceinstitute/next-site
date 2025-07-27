'use client'

import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import { donateConfig } from '../data/donateConfig'
import { useEffect } from 'react'

export default function DonatePage() {
  useEffect(() => {
    // Load DonorBox script
    const script = document.createElement('script')
    script.src = 'https://donorbox.org/widget.js'
    script.async = true
    script.setAttribute('data-paypalExpress', 'false')
    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://donorbox.org/widget.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-secondary/10 to-purple-light/5 dark:from-background-dark dark:via-purple-dark/5 dark:to-accent-dark/3">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-6">
            {donateConfig.pageTitle}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {donateConfig.paragraph}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/90 dark:bg-background-dark/70 backdrop-blur-md rounded-xl p-8 shadow-xl border border-secondary/30 dark:border-purple-dark/30"
        >
          <iframe
            src="https://donorbox.org/embed/expression-neuroscience-institute"
            name="donorbox"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
            style={{
              maxWidth: '500px',
              minWidth: '250px',
              maxHeight: 'none',
              minHeight: '600px',
              width: '100%',
              height: '600px'
            }}
          />
        </motion.div>
      </div>
    </div>
  )
} 