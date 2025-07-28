'use client'

import { motion } from 'framer-motion'
import { Paper } from '@/lib/papers'
import { useState } from 'react'
import StatusTag, { isComingSoonStatus, isAvailableStatus } from './StatusTag'
import ProgressModal from './ProgressModal'
import ProgressTimeline from './ProgressTimeline'

interface PublicationItemProps {
  paper: Paper
  index: number
}

export default function PublicationItem({ paper, index }: PublicationItemProps) {
  const isComingSoon = isComingSoonStatus(paper.status);
  const isAvailable = isAvailableStatus(paper.status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasUpdates = !!paper.updates && paper.updates.length > 0;

  return (
    <>
      {/* Publication Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${isComingSoon ? 'opacity-70' : ''}`}
      >
        {/* Paper Header */}
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
            {paper.title}
          </h3>
          <StatusTag 
            status={paper.status} 
            size="small" 
            className="flex-shrink-0 ml-2 whitespace-nowrap" 
          />
        </div>
        
        {/* Paper Metadata */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          {paper.authors.join(', ')} ({paper.year})
        </p>
        {paper.abstract && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {paper.abstract}
          </p>
        )}
        {paper.journal && (
          <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-2">
            {paper.journal}
          </p>
        )}
        
        {/* Paper Actions */}
        <div className="flex items-center gap-4 mt-2">
          {paper.url && isAvailable && (
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-light dark:text-accent-dark hover:underline font-medium text-sm inline-flex items-center"
            >
              View Publication
              <svg className="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 00-1.5 0v3.25H5.75V6.75h3.25a.75.75 0 000-1.5h-4a.75.75 0 00-.75.75z" clipRule="evenodd"/><path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd"/></svg>
            </a>
          )}
          {!isAvailable && !hasUpdates && (
            <p className="text-sm text-gray-400 dark:text-gray-500">Link available upon publication</p>
          )}
          {!isAvailable && hasUpdates && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-xs text-purple-light dark:text-purple-dark hover:underline"
            >
              Show Progress
            </button>
          )}
        </div>
      </motion.div>

      {/* Progress Modal */}
      {hasUpdates && (
        <ProgressModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={`${paper.title} - Progress`}
        >
          <ProgressTimeline updates={paper.updates!} />
        </ProgressModal>
      )}
    </>
  )
} 