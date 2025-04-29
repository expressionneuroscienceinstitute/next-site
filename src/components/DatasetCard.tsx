'use client'

import { motion } from 'framer-motion'
import { Dataset } from '@/lib/datasets'
import { useState } from 'react'
import ProgressModal from './ProgressModal'
import ProgressTimeline from './ProgressTimeline'

interface DatasetCardProps {
  dataset: Dataset
  index: number
}

export default function DatasetCard({ dataset, index }: DatasetCardProps) {
  const isComingSoon = dataset.status === 'coming soon';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasUpdates = !!dataset.updates && dataset.updates.length > 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`card hover:shadow-xl transition-shadow duration-200 ${isComingSoon ? 'opacity-70' : ''}`}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-text-light dark:text-text-dark">
            {dataset.title}
          </h3>
          {isComingSoon && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              Coming Soon
            </span>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{dataset.description}</p>
        <div className="flex gap-4 items-center">
          <a
            href={isComingSoon ? '#' : dataset.viewLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium text-sm ${isComingSoon 
              ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' 
              : 'text-accent-light dark:text-accent-dark hover:underline'}`}
            onClick={(e) => isComingSoon && e.preventDefault()}
          >
            {isComingSoon ? 'View (Coming Soon)' : 'View Details'}
          </a>
          {dataset.downloadLink && !isComingSoon && (
            <a
              href={dataset.downloadLink}
              className="text-accent-light dark:text-accent-dark hover:underline font-medium text-sm"
            >
              Download Dataset
            </a>
          )}
          {isComingSoon && hasUpdates && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-xs text-purple-light dark:text-purple-dark hover:underline ml-auto"
            >
              Show Progress
            </button>
          )}
        </div>
      </motion.div>

      {hasUpdates && (
        <ProgressModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={`${dataset.title} - Progress`}
        >
          <ProgressTimeline updates={dataset.updates!} />
        </ProgressModal>
      )}
    </>
  )
} 