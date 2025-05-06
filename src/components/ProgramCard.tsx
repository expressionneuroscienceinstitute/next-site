'use client'

import { motion } from 'framer-motion'
import ProgramLink from './ProgramLink'

interface ProgramCardProps {
  title: string
  description: string
  href: string
  comingSoon?: boolean
}

export default function ProgramCard({ title, description, href, comingSoon }: ProgramCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm shadow-lg p-6 border border-secondary/20 dark:border-purple-dark/20"
    >
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
          {title}
          {comingSoon && (
            <span className="ml-2 text-sm font-normal text-purple-light dark:text-purple-dark">
              Coming Soon
            </span>
          )}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <ProgramLink href={href} comingSoon={comingSoon}>
          Learn More
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </ProgramLink>
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-accent-dark/5 dark:to-purple-dark/5"
        initial={false}
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(128, 237, 153, 0.05) 0%, rgba(202, 240, 248, 0.05) 100%)',
            'radial-gradient(circle at 100% 100%, rgba(128, 237, 153, 0.05) 0%, rgba(202, 240, 248, 0.05) 100%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      />
    </motion.div>
  )
} 