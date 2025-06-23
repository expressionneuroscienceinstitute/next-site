'use client'

import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import { donateConfig } from '../data/donateConfig'

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
            Your support helps us continue our work in neuroscience, mental health, open science, and science education.
          </p>
          <a href={donateConfig.href} className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            {donateConfig.buttonText}
          </a>
        </motion.div>
      </div>
    </div>
  )
} 