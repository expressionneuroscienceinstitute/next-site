'use client' // Ensure client component if using hooks/motion

import Navbar from '@/components/Navbar'
import DatasetCard from '@/components/DatasetCard' // Keep dataset stuff for now
import { datasets, Dataset } from '@/lib/datasets' // Import Dataset type
import PublicationItem from '@/components/PublicationItem' // Import PublicationItem
import { papers, Paper } from '@/lib/papers'       // Import papers and Paper type
import { motion } from 'framer-motion' // Add motion if needed
import { researchConfig } from '../data/researchConfig' // Import config
import { ResearchPageSkeleton } from '@/components/ResearchPageSkeleton' // Import skeleton
import Footer from '@/components/Footer' // Import Footer

export default function ResearchPage() { // Renamed component
  // Check if config data is available (basic check)
  const isConfigValid = researchConfig?.pageTitle && researchConfig?.datasets && researchConfig?.publications;

  // You might want more robust checks for datasets/papers arrays, but keeping simple for now

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
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-8">
              {researchConfig.pageTitle}
            </h1> 
            
            {/* Section for Datasets */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-6">
                {researchConfig.datasets.title}
              </h2>
              {/* Always render the container, map handles empty array */}
              <div className="grid gap-6 md:grid-cols-2">
                {datasets.map((dataset: Dataset, index: number) => (
                  <DatasetCard key={dataset.id} dataset={dataset} index={index} />
                ))}
              </div>
              {/* Optional: Message if array is genuinely empty after filtering? */}
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
              {/* Always render the container, map handles empty array */}
              <div className="space-y-0"> 
                {papers.map((paper: Paper, index: number) => (
                  <PublicationItem key={paper.id} paper={paper} index={index} /> 
                ))}
              </div>
              {/* Optional: Message if array is genuinely empty */}
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