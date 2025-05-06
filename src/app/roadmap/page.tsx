'use client' // Make client component for motion/conditional loading

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Timeline from '@/components/Timeline'
import { roadmapConfig } from '../data/roadmapConfig'
import { RoadmapPageSkeleton } from '@/components/RoadmapPageSkeleton'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface Link {
  text: string;
  href: string;
}

interface RoadmapContent {
  title: string;
  description: string;
  timeline: {
    title: string;
    milestones: {
      id: string;
      date: string;
      title: string;
      description: string;
      status: string;
    }[];
  };
  futureResearch?: {
    title: string;
    cards: {
      title: string;
      text: string;
    }[];
  };
  links?: Link[];
}

export default function RoadmapPage() {
  // Default to "company" roadmap
  const [selectedProgram, setSelectedProgram] = useState('company')
  
  // Get program from URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      // Check if hash corresponds to a valid program
      if (hash && roadmapConfig.programs.some(program => program.id === hash)) {
        setSelectedProgram(hash)
      }
    }
    
    // Run once on component mount
    handleHashChange()
    
    // Add listener for hash changes
    window.addEventListener('hashchange', handleHashChange)
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
  
  // Determine which roadmap to display
  const getRoadmapContent = (): RoadmapContent => {
    if (selectedProgram === 'company') {
      return {
        ...roadmapConfig.company,
        links: [] // Company roadmap doesn't have links
      }
    } else if (selectedProgram === 'insight') {
      const insightProgram = roadmapConfig.currentPrograms.insight
      return {
        title: insightProgram.title,
        description: insightProgram.text,
        timeline: insightProgram.timeline,
        futureResearch: insightProgram.futureResearch,
        links: insightProgram.links
      }
    } else if (selectedProgram === 'mhlp') {
      const mhlpProgram = roadmapConfig.currentPrograms.mhlp
      return {
        title: mhlpProgram.title,
        description: mhlpProgram.text,
        timeline: mhlpProgram.timeline,
        futureResearch: mhlpProgram.futureResearch,
        links: mhlpProgram.links
      }
    }
    
    // Fallback to company roadmap
    return {
      ...roadmapConfig.company,
      links: []
    }
  }
  
  const roadmapContent = getRoadmapContent()
  
  // Check if config data is available (basic check)
  const isConfigValid = 
    roadmapConfig?.pageTitle &&
    roadmapConfig?.programs?.length > 0;

  const handleProgramChange = (programId: string) => {
    setSelectedProgram(programId)
    // Update URL hash without triggering a page reload
    window.history.pushState(null, '', `#${programId}`)
  }
  
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
              {roadmapConfig.pageTitle}
            </h1>
            
            {/* Program Selector */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {roadmapConfig.programs.map(program => (
                  <button
                    key={program.id}
                    onClick={() => !program.comingSoon && handleProgramChange(program.id)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedProgram === program.id
                        ? 'bg-accent-light dark:bg-accent-dark text-white font-medium'
                        : 'bg-background-light-secondary dark:bg-background-dark-secondary hover:bg-gray-200 dark:hover:bg-gray-700'
                    } ${program.comingSoon ? 'opacity-60 cursor-not-allowed' : ''}`}
                    disabled={program.comingSoon}
                  >
                    {program.name}
                    {program.comingSoon && (
                      <span className="ml-2 text-xs font-normal">Coming Soon</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Current Program Description */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-6">
                {roadmapContent.title}
              </h2>
              <div className="card bg-background-light-secondary dark:bg-background-dark-secondary border border-border-light dark:border-border-dark rounded-lg p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {roadmapContent.description}
                </p>
                {roadmapContent.links && roadmapContent.links.length > 0 && (
                  <div className="flex gap-4">
                    {roadmapContent.links.map((link: Link) => (
                      <Link 
                        key={link.href} 
                        href={link.href}
                        target="_blank"
                        className="text-link-light dark:text-link-dark hover:underline font-medium"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Timeline Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-6">
                {roadmapContent.timeline.title}
              </h2>
              {roadmapContent.timeline.milestones && roadmapContent.timeline.milestones.length > 0 ? (
                <Timeline milestones={roadmapContent.timeline.milestones.map(milestone => ({
                  ...milestone,
                  status: milestone.status as "completed" | "in-progress" | "planned"
                }))} />
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Timeline details coming soon.</p> 
              )}
            </section>

            {/* Future Research Section - only render if futureResearch exists and has cards */}
            {roadmapContent.futureResearch && roadmapContent.futureResearch.cards && 
             roadmapContent.futureResearch.cards.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-6">
                  {roadmapContent.futureResearch.title}
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {roadmapContent.futureResearch.cards.map((card, index) => (
                    <div key={index} className="card bg-background-light-secondary dark:bg-background-dark-secondary border border-border-light dark:border-border-dark rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        ) : (
          <RoadmapPageSkeleton />
        )}
      </div>
      <Footer />
    </div>
  )
} 