'use client'

import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import { aboutConfig } from '../data/aboutConfig'
import Image from 'next/image'
import { 
  TitleSkeleton, 
  MissionSkeleton, 
  BoardSkeleton, 
  FutureSkeleton 
} from '@/components/AboutPageSkeleton'


export default function AboutPage() {

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" tabIndex={-1}>
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
                  <Image 
                    className="rounded-xl mb-4 flex-shrink-0" 
                    src={member.image} 
                    alt={`${member.name} - ${member.role} at Expression Neuroscience Institute`}
                    width={192}
                    height={192}
                  />
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
      </main>
      <Footer />
    </div>
  )
} 