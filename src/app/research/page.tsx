'use client'

import Navbar from '@/components/Navbar'
import DatasetCard from '@/components/DatasetCard'
import { datasets, Dataset } from '@/lib/datasets'
import PublicationItem from '@/components/PublicationItem'
import { papers, Paper } from '@/lib/papers'
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
          <div>
            {/* Page Header */}
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-8 text-center">
              {researchConfig.pageTitle}
            </h1> 
            
            {/* Datasets Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-accent-light dark:text-accent-dark mb-6 text-center">
                {researchConfig.datasets.title}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {datasets.map((dataset: Dataset, index: number) => (
                  <div key={dataset.id}>
                    <DatasetCard dataset={dataset} index={index} />
                  </div>
                ))}
              </div>
              {datasets.length === 0 && (
                <div className="bg-white/90 dark:bg-background-dark/70 backdrop-blur-md rounded-xl p-8 shadow-xl border border-secondary/30 dark:border-purple-dark/30 text-center">
                  <p className="text-gray-600 dark:text-gray-300 mt-4">
                    {researchConfig.datasets.emptyMessage}
                  </p>
                </div>
              )}
            </section>
            
            {/* Publications Section */}
            <section>
              <h2 className="text-2xl font-semibold text-accent-light dark:text-accent-dark mb-6 text-center">
                {researchConfig.publications.title}
              </h2>
              <div className="space-y-6"> 
                {papers.map((paper: Paper, index: number) => (
                  <div
                    key={paper.id}
                    className="bg-white/90 dark:bg-background-dark/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-secondary/30 dark:border-purple-dark/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <PublicationItem paper={paper} index={index} /> 
                  </div>
                ))}
              </div>
              {papers.length === 0 && (
                <div className="bg-white/90 dark:bg-background-dark/70 backdrop-blur-md rounded-xl p-8 shadow-xl border border-secondary/30 dark:border-purple-dark/30 text-center">
                  <p className="text-gray-600 dark:text-gray-300 mt-4">
                    {researchConfig.publications.emptyMessage}
                  </p>
                </div>
              )}
            </section>
            
          </div>
        ) : (
          <ResearchPageSkeleton />
        )}
      </div>
      <Footer />
    </div>
  )
} 