'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function DonorBoxLoader() {
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
  )
} 