'use client'

import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import { donateConfig } from '../data/donateConfig'
import { DonatePageSkeleton } from '@/components/DonatePageSkeleton'

export default function DonatePage() {
  const isConfigValid = donateConfig?.pageTitle && donateConfig?.paragraph && donateConfig?.buttonText && donateConfig?.note;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isConfigValid ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-6">
              {donateConfig.pageTitle}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {donateConfig.paragraph}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-xl px-8 py-4"
            >
              {donateConfig.buttonText}
            </motion.button>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {donateConfig.note}
            </p>
          </motion.div>
        ) : (
          <DonatePageSkeleton />
        )}
      </div>
    </div>
  )
} 