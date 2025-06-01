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
          <h1 className="text-4xl font-bold">Donate to ENI</h1>
          <p className="text-lg">
            Your support helps us continue our work in neuroscience and mental health.
          </p>
        </motion.div>
      </div>
    </div>
  )
} 