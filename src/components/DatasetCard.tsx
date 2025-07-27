'use client'

import { motion } from 'framer-motion'
import { Dataset } from '@/lib/datasets'
import { useState } from 'react'
import StatusTag, { isComingSoonStatus, isAvailableStatus } from './StatusTag'
import ProgressModal from './ProgressModal'
import ProgressTimeline from './ProgressTimeline'

interface DatasetCardProps {
  dataset: Dataset
  index: number
}

export default function DatasetCard({ dataset, index }: DatasetCardProps) {
  const isComingSoon = isComingSoonStatus(dataset.status);
  const isAvailable = isAvailableStatus(dataset.status);
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
          <StatusTag 
            status={dataset.status} 
            size="small" 
            className="whitespace-nowrap" 
          />
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{dataset.description}</p>
        <div className="flex gap-4 items-center">
          <a
            href={isAvailable ? dataset.viewLink : '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium text-sm ${!isAvailable 
              ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' 
              : 'text-accent-light dark:text-accent-dark hover:underline'}`}
            onClick={(e) => !isAvailable && e.preventDefault()}
          >
            {!isAvailable ? 'View (Not Available)' : 'View Details'}
          </a>
          {dataset.downloadLink && isAvailable && (
            <a
              href={dataset.downloadLink}
              className="text-accent-light dark:text-accent-dark hover:underline font-medium text-sm"
            >
              Download Dataset
            </a>
          )}
          {!isAvailable && hasUpdates && (
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