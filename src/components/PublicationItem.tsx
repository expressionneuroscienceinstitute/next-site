'use client'

import { motion } from 'framer-motion'
import { Paper } from '@/lib/papers'
import { useState } from 'react'
import ProgressModal from './ProgressModal'
import ProgressTimeline from './ProgressTimeline'

interface PublicationItemProps {
  paper: Paper
  index: number
}

// A list-item style presentation for publications
export default function PublicationItem({ paper, index }: PublicationItemProps) {
  const isComingSoon = paper.status === 'coming soon';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasUpdates = !!paper.updates && paper.updates.length > 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${isComingSoon ? 'opacity-70' : ''}`}
      >
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold text-text-light dark:text-text-dark">
            {paper.title}
          </h3>
          {isComingSoon && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex-shrink-0 ml-2 whitespace-nowrap">
              Coming Soon
            </span>
          )}
        </div>
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
        <div className="flex items-center gap-4 mt-2">
          {paper.url && !isComingSoon && (
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-light dark:text-accent-dark hover:underline font-medium text-sm inline-flex items-center"
            >
              View Publication
              <svg className="ml-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.5 10a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 014.5 10z" clipRule="evenodd"></path><path fillRule="evenodd" d="M10.207 4.043a.75.75 0 01.043 1.06l-4.25 4.5a.75.75 0 01-1.1 0l-4.25-4.5a.75.75 0 111.104-1.014L10 7.717l3.704-3.928a.75.75 0 011.06-.043z" clipRule="evenodd"></path></svg>
            </a>
          )}
          {isComingSoon && !hasUpdates && (
            <p className="text-sm text-gray-400 dark:text-gray-500">Link available upon publication</p>
          )}
          {isComingSoon && hasUpdates && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-xs text-purple-light dark:text-purple-dark hover:underline"
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
          title={`${paper.title} - Progress`}
        >
          <ProgressTimeline updates={paper.updates!} />
        </ProgressModal>
      )}
    </>
  )
} 