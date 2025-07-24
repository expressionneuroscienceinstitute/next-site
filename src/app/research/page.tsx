'use client'

import Navbar from '@/components/Navbar'
import DatasetCard from '@/components/DatasetCard'
import { datasets, Dataset } from '@/lib/datasets'
import PublicationItem from '@/components/PublicationItem'
import { papers, Paper } from '@/lib/papers'
import { motion } from 'framer-motion'
import { researchConfig } from '../data/researchConfig'
import { ResearchPageSkeleton } from '@/components/ResearchPageSkeleton'
import Footer from '@/components/Footer'

export default function ResearchPage() {
  const isConfigValid = researchConfig?.pageTitle && researchConfig?.datasets && researchConfig?.publications;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background-light via-secondary/10 to-purple-light/5 dark:from-background-dark dark:via-purple-dark/5 dark:to-accent-dark/3">
      <Navbar />
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {isConfigValid ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Page Header */}
            <motion.h1 
              className="text-4xl font-bold text-text-light dark:text-text-dark mb-8 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {researchConfig.pageTitle}
            </motion.h1> 
            
            {/* Datasets Section */}
            <motion.section 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-semibold text-accent-light dark:text-accent-dark mb-6 text-center">
                {researchConfig.datasets.title}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {datasets.map((dataset: Dataset, index: number) => (
                  <motion.div
                    key={dataset.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <DatasetCard dataset={dataset} index={index} />
                  </motion.div>
                ))}
              </div>
              {datasets.length === 0 && (
                <div className="bg-white/90 dark:bg-background-dark/70 backdrop-blur-md rounded-xl p-8 shadow-xl border border-secondary/30 dark:border-purple-dark/30 text-center">
                  <p className="text-gray-600 dark:text-gray-300 mt-4">
                    {researchConfig.datasets.emptyMessage}
                  </p>
                </div>
              )}
            </motion.section>
            
            {/* Publications Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-accent-light dark:text-accent-dark mb-6 text-center">
                {researchConfig.publications.title}
              </h2>
              <div className="space-y-6"> 
                {papers.map((paper: Paper, index: number) => (
                  <motion.div
                    key={paper.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    }}
                    className="bg-white/90 dark:bg-background-dark/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-secondary/30 dark:border-purple-dark/30 hover:shadow-2xl transition-all duration-300"
                  >
                    <PublicationItem paper={paper} index={index} /> 
                  </motion.div>
                ))}
              </div>
              {papers.length === 0 && (
                <div className="bg-white/90 dark:bg-background-dark/70 backdrop-blur-md rounded-xl p-8 shadow-xl border border-secondary/30 dark:border-purple-dark/30 text-center">
                  <p className="text-gray-600 dark:text-gray-300 mt-4">
                    {researchConfig.publications.emptyMessage}
                  </p>
                </div>
              )}
            </motion.section>
            
          </motion.div>
        ) : (
          <ResearchPageSkeleton />
        )}
      </div>
      <Footer />
    </div>
  )
} 