'use client'

import { motion } from 'framer-motion'
import { Milestone } from '@/lib/milestones'

interface TimelineProps {
  milestones: Milestone[]
}

const statusColors = {
  completed: {
    circle: 'bg-accent-light dark:bg-accent-dark',
    border: 'border-accent-light dark:border-accent-dark',
    text: 'text-accent-light dark:text-accent-dark',
    bg: 'bg-accent-light/10 dark:bg-accent-dark/10',
  },
  'in-progress': {
    circle: 'bg-purple-500 dark:bg-purple-400',
    border: 'border-purple-500 dark:border-purple-400',
    text: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-900/30',
  },
  planned: {
    circle: 'bg-gray-400 dark:bg-gray-500',
    border: 'border-gray-400 dark:border-gray-500',
    text: 'text-gray-600 dark:text-gray-400',
    bg: 'bg-gray-100 dark:bg-gray-800',
  }
}

export default function Timeline({ milestones }: TimelineProps) {
  return (
    <div className="max-w-2xl mx-auto relative py-8">
      {/* Central timeline line with gradient */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-accent-light via-purple-500 to-gray-400 dark:from-accent-dark dark:via-purple-400 dark:to-gray-500 opacity-50 z-10" />
      
      {/* Add line terminator soon */}

      <div className="space-y-12">
        {milestones.map((milestone, index) => {
          const colors = statusColors[milestone.status]

          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline node */}
              <div className="absolute left-1/2 -translate-x-1/2 top-6 flex items-center justify-center z-20">
                <motion.div
                  className={`relative w-4 h-4 rounded-full ${colors.circle} shadow-lg
                    border-2 border-white dark:border-gray-900`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {milestone.status === 'in-progress' && (
                    <>
                      <motion.div
                        className={`absolute -inset-2 rounded-full ${colors.circle} opacity-20`}
                        initial={{ scale: 0.8, opacity: 0.2 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                      <motion.div
                        className={`absolute -inset-1 rounded-full ${colors.circle} opacity-20`}
                        initial={{ scale: 0.8, opacity: 0.2 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 0.5
                        }}
                      />
                    </>
                  )}
                </motion.div>
              </div>

              {/* Content card */}
              <div className="relative mx-auto w-full max-w-lg px-4">
                <motion.div
                  className={`relative p-6 rounded-xl bg-white dark:bg-gray-900
                    border ${colors.border} shadow-[0_8px_30px_rgb(0,0,0,0.06)] z-20
                    transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)]`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h3 className={`text-base font-semibold ${colors.text}`}>
                      {milestone.title}
                    </h3>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                      {milestone.status.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <p className="text-xs font-medium text-text-light dark:text-text-dark mb-2">
                    {milestone.date}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                    {milestone.description}
                  </p>
                  {milestone.links && milestone.links.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {milestone.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          className={`inline-flex items-center text-xs ${colors.text} 
                            hover:underline transition-transform hover:translate-x-1`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.title}
                          <svg className="ml-1 w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}