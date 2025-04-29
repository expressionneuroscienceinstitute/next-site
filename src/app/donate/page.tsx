'use client'

import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'

export default function DonatePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-[#03045e] mb-6">
            Support Our Research
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your donation helps us continue our mission of advancing neuroscience research
            and making scientific discoveries accessible to all.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-xl px-8 py-4"
          >
            Donate Now
          </motion.button>
          <p className="mt-4 text-sm text-gray-500">
            Note: This is a placeholder. Payment processing will be implemented in the future.
          </p>
        </motion.div>
      </div>
    </div>
  )
} 