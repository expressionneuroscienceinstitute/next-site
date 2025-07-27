'use client' // Make client component for motion/conditional loading

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import LazyTimeline from '@/components/LazyTimeline'
import { roadmapConfig } from '../data/roadmapConfig'
import { RoadmapPageSkeleton } from '@/components/RoadmapPageSkeleton'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { StatusTagType } from '@/components/StatusTag'

interface Link {
  text: string;
  href: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: StatusTagType;
  date: string;
}

interface FutureResearchCard {
  title: string;
  text: string;
}

interface FutureResearch {
  title: string;
  cards: FutureResearchCard[];
}

interface RoadmapContent {
  title: string;
  description: string;
  timeline: Milestone[];
  futureResearch?: FutureResearch;
  links: Link[];
}

export default function RoadmapPage() {
  const [selectedProgram, setSelectedProgram] = useState('company')
  const [isLoaded, setIsLoaded] = useState(false)
  
  /* URL Hash Management */
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && roadmapConfig.programs.some(program => program.id === hash)) {
        setSelectedProgram(hash)
      }
    }
    
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    
    // Set loaded state after initial render
    setIsLoaded(true)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
  
  /* Roadmap Content Resolution */
  const getRoadmapContent = (): RoadmapContent => {
    if (selectedProgram === 'company') {
      return {
        ...roadmapConfig.company,
        timeline: roadmapConfig.company.timeline.milestones as Milestone[],
        links: []
      }
    } else if (selectedProgram === 'insight') {
      const insightProgram = roadmapConfig.currentPrograms.insight
      return {
        title: insightProgram.title,
        description: insightProgram.text,
        timeline: insightProgram.timeline.milestones as Milestone[],
        futureResearch: insightProgram.futureResearch,
        links: insightProgram.links
      }
    } else if (selectedProgram === 'ceEEG') {
      const ceEEGProgram = roadmapConfig.currentPrograms.ceEEG
      return {
        title: ceEEGProgram.title,
        description: ceEEGProgram.text,
        timeline: ceEEGProgram.timeline.milestones as Milestone[],
        futureResearch: ceEEGProgram.futureResearch,
        links: ceEEGProgram.links
      }
    }
    
    return {
      ...roadmapConfig.company,
      timeline: roadmapConfig.company.timeline.milestones as Milestone[],
      links: []
    }
  }

  const roadmapContent = getRoadmapContent()
  
  /* Configuration Validation */
  const isConfigValid = 
    roadmapConfig?.pageTitle &&
    roadmapConfig?.programs?.length > 0;

  /* Program Selection Handler */
  const handleProgramChange = (programId: string) => {
    setSelectedProgram(programId)
    window.history.pushState(null, '', `#${programId}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background-light via-secondary/10 to-purple-light/5 dark:from-background-dark dark:via-purple-dark/5 dark:to-accent-dark/3">
      <Navbar />
      <main id="main-content" className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full" tabIndex={-1}>
        {isConfigValid ? (
          <div>
            {/* Page Header */}
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-8 text-center">
              {roadmapConfig.pageTitle}
            </h1>
            
            {/* Program Selection */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-accent-light dark:text-accent-dark mb-6 text-center">
                {roadmapConfig.currentPrograms.title}
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {roadmapConfig.programs.map((program) => (
                  <button
                    key={program.id}
                    onClick={() => handleProgramChange(program.id)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      selectedProgram === program.id
                        ? 'bg-accent-light dark:bg-accent-dark text-white shadow-lg'
                        : 'bg-white/80 dark:bg-background-dark/50 text-text-light dark:text-text-dark hover:bg-accent-light/10 dark:hover:bg-accent-dark/10'
                    }`}
                  >
                    {program.name}
                  </button>
                ))}
              </div>
              
              {/* Selected Program Content */}
              <div className="bg-white/90 dark:bg-background-dark/70 backdrop-blur-md rounded-xl p-8 shadow-xl border border-secondary/30 dark:border-purple-dark/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <h3 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">
                  {roadmapContent.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {roadmapContent.description}
                </p>
                
                {/* Program Links */}
                {roadmapContent.links && roadmapContent.links.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-accent-light dark:text-accent-dark mb-3">
                      Related Links
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {roadmapContent.links.map((link, index) => (
                        <Link
                          key={index}
                          href={link.href}
                          className="inline-flex items-center px-4 py-2 bg-accent-light/10 dark:bg-accent-dark/10 text-accent-light dark:text-accent-dark rounded-lg hover:bg-accent-light/20 dark:hover:bg-accent-dark/20 transition-colors duration-300"
                        >
                          {link.text}
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
            
            {/* Timeline Section - Lazy Loaded */}
            {isLoaded && roadmapContent.timeline && roadmapContent.timeline.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-accent-light dark:text-accent-dark mb-6 text-center">
                  Timeline
                </h2>
                <LazyTimeline milestones={roadmapContent.timeline} />
              </section>
            )}
            
            {/* Future Research Section */}
            {roadmapContent.futureResearch && roadmapContent.futureResearch.cards && 
             roadmapContent.futureResearch.cards.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-semibold text-accent-light dark:text-accent-dark mb-6 text-center">
                  {roadmapContent.futureResearch.title}
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {roadmapContent.futureResearch.cards.map((card, index) => (
                    <div 
                      key={index} 
                      className="bg-white/90 dark:bg-background-dark/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-secondary/30 dark:border-purple-dark/30 hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                    >
                      <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <RoadmapPageSkeleton />
        )}
      </main>
      <Footer />
    </div>
  )
} 