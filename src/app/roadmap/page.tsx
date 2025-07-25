'use client' // Make client component for motion/conditional loading

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Timeline from '@/components/Timeline'
import { roadmapConfig } from '../data/roadmapConfig'
import { RoadmapPageSkeleton } from '@/components/RoadmapPageSkeleton'
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
  const [selectedProgram, setSelectedProgram] = useState('company')
  
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
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
  
  /* Roadmap Content Resolution */
  const getRoadmapContent = (): RoadmapContent => {
    if (selectedProgram === 'company') {
      return {
        ...roadmapConfig.company,
        links: []
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
    
    return {
      ...roadmapConfig.company,
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
            <header className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-8">
                {roadmapConfig.pageTitle}
              </h1>
            </header>
            
            {/* Program Selector */}
            <nav className="mb-8" aria-label="Program selection">
              <div className="flex flex-wrap gap-3 justify-center" role="tablist">
                {roadmapConfig.programs.map(program => (
                  <button
                    key={program.id}
                    onClick={() => !program.comingSoon && handleProgramChange(program.id)}
                    className={`px-6 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark ${
                      selectedProgram === program.id
                        ? 'bg-accent-light dark:bg-accent-dark text-white font-medium shadow-lg'
                        : 'bg-white/90 dark:bg-background-dark/70 backdrop-blur-md border border-secondary/30 dark:border-purple-dark/30 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-lg'
                    } ${program.comingSoon ? 'opacity-60 cursor-not-allowed' : ''}`}
                    disabled={program.comingSoon}
                    role="tab"
                    aria-selected={selectedProgram === program.id}
                    aria-label={`${program.name}${program.comingSoon ? ' (Coming Soon)' : ''}`}
                  >
                    {program.name}
                    {program.comingSoon && (
                      <span className="ml-2 text-xs font-normal" aria-hidden="true">Coming Soon</span>
                    )}
                  </button>
                ))}
              </div>
            </nav>
            
            {/* Current Program Description */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-accent-light dark:text-accent-dark mb-6 text-center">
                {roadmapContent.title}
              </h2>
              <div className="bg-white/90 dark:bg-background-dark/70 backdrop-blur-md rounded-xl p-8 shadow-xl border border-secondary/30 dark:border-purple-dark/30">
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {roadmapContent.description}
                </p>
                {roadmapContent.links && roadmapContent.links.length > 0 && (
                  <div className="flex gap-4 flex-wrap">
                    {roadmapContent.links.map((link: Link) => (
                      <Link 
                        key={link.href} 
                        href={link.href}
                        target="_blank"
                        className="text-accent-light dark:text-accent-dark hover:underline font-medium hover:scale-105 transition-transform duration-200"
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
              <h2 className="text-2xl font-semibold text-accent-light dark:text-accent-dark mb-6 text-center">
                {roadmapContent.timeline.title}
              </h2>
              {roadmapContent.timeline.milestones && roadmapContent.timeline.milestones.length > 0 ? (
                <div className="bg-white/90 dark:bg-background-dark/70 backdrop-blur-md rounded-xl p-8 shadow-xl border border-secondary/30 dark:border-purple-dark/30">
                  <Timeline milestones={roadmapContent.timeline.milestones.map(milestone => ({
                    ...milestone,
                    status: milestone.status as "completed" | "in-progress" | "planned"
                  }))} />
                </div>
              ) : (
                <div className="bg-white/90 dark:bg-background-dark/70 backdrop-blur-md rounded-xl p-8 shadow-xl border border-secondary/30 dark:border-purple-dark/30 text-center">
                  <p className="text-gray-500 dark:text-gray-400">Timeline details coming soon.</p> 
                </div>
              )}
            </section>

            {/* Future Research Section - only render if futureResearch exists and has cards */}
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