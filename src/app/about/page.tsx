'use client'

import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import { aboutConfig } from '../data/aboutConfig'
import { 
  TitleSkeleton, 
  MissionSkeleton, 
  BoardSkeleton, 
  FutureSkeleton 
} from '@/components/AboutPageSkeleton'

const boardMembers = [
  {
    name: 'Dylan Carney (Anki)',
    role: 'Founder and Board Chair',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.' // Placeholder bio
  },
  {
    name: 'Desiree Astabie',
    role: 'Board Secretary',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.' // Placeholder bio
  },
  {
    name: 'Jon D. Rodriguez',
    role: 'Board Treasurer',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.' // Placeholder bio
  },
  {
    name: 'Grace Hart',
    role: 'Chief Science Officer',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.' // Placeholder bio
  }
]

export default function AboutPage() {

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {aboutConfig?.pageTitle ? (
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} 
            className="text-4xl font-bold text-text-light dark:text-text-dark mb-8"
          >
            {aboutConfig.pageTitle}
          </motion.h1>
        ) : (
          <TitleSkeleton />
        )}
        
        {aboutConfig?.mission?.title && aboutConfig?.mission?.text ? (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} 
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">{aboutConfig.mission.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {aboutConfig.mission.text}
            </p>
          </motion.section>
        ) : (
          <MissionSkeleton />
        )}

        {aboutConfig?.board?.title && aboutConfig.board.members?.length > 0 ? (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">{aboutConfig.board.title}</h2>
            <div className="grid gap-8 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
              {aboutConfig.board.members.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="card flex flex-col items-center"
                >
                  <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4 flex-shrink-0"></div>
                  <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-light dark:text-purple-dark mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-left min-w-0">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ) : (
          <BoardSkeleton />
        )}

        {aboutConfig?.future?.title && aboutConfig?.future?.text ? (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center py-12 border-t border-gray-200 dark:border-gray-700 mt-12"
          >
            <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">{aboutConfig.future.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
             {aboutConfig.future.text}
            </p>
          </motion.section>
        ) : (
          <FutureSkeleton />
        )}
      </div>
      <Footer />
    </div>
  )
} 