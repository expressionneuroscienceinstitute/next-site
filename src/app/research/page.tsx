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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {isConfigValid ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Page Header */}
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-8">
              {researchConfig.pageTitle}
            </h1> 
            
            {/* Datasets Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-6">
                {researchConfig.datasets.title}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {datasets.map((dataset: Dataset, index: number) => (
                  <DatasetCard key={dataset.id} dataset={dataset} index={index} />
                ))}
              </div>
              {datasets.length === 0 && (
                 <p className="text-gray-600 dark:text-gray-300 mt-4">
                   {researchConfig.datasets.emptyMessage}
                 </p>
              )}
            </section>
            
            {/* Publications Section */}
            <section>
              <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-6">
                {researchConfig.publications.title}
              </h2>
              <div className="space-y-0"> 
                {papers.map((paper: Paper, index: number) => (
                  <PublicationItem key={paper.id} paper={paper} index={index} /> 
                ))}
              </div>
              {papers.length === 0 && (
                 <p className="text-gray-600 dark:text-gray-300 mt-4">
                   {researchConfig.publications.emptyMessage}
                 </p>
              )}
            </section>
            
          </motion.div>
        ) : (
          <ResearchPageSkeleton />
        )}
      </div>
      <Footer />
    </div>
  )
} 