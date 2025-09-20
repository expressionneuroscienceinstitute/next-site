"use client"

import { useEffect } from 'react'
import { motion } from 'framer-motion'

const DONORBOX_WIDGET_SRC = 'https://donorbox.org/widget.js'
const DONORBOX_IFRAME_SRC = 'https://donorbox.org/embed/expression-neuroscience-institute?donor_wall_color=%230f0029&only_donor_wall=true'

export default function DonorBoxLoader() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const existingScript = document.querySelector(`script[src="${DONORBOX_WIDGET_SRC}"]`)
    if (existingScript) {
      return
    }

    const script = document.createElement('script')
    script.src = DONORBOX_WIDGET_SRC
    script.async = true
    script.setAttribute('paypalExpress', 'true')
    document.body.appendChild(script)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex justify-center"
      aria-label="Recent donor activity"
    >
      <div className="w-full max-w-xl rounded-2xl border border-secondary/30 dark:border-purple-dark/30 bg-white/95 dark:bg-background-dark/80 backdrop-blur-lg p-6 shadow-xl">
        <iframe
          title="Donorbox donor wall"
          src={DONORBOX_IFRAME_SRC}
          name="donorbox"
          scrolling="no"
          frameBorder="0"
          style={{
            width: '100%',
            minWidth: '310px',
            maxWidth: '500px',
            minHeight: '345px',
            height: '375px',
          }}
        />
      </div>
    </motion.section>
  )
}
