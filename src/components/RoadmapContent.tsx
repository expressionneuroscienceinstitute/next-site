'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LazyTimeline from './LazyTimeline'
import { roadmapConfig } from '../app/data/roadmapConfig'
import { StatusTagType } from './StatusTag'

interface Link {
  text: string
  href: string
}

interface Milestone {
  id: string
  title: string
  description: string
  status: StatusTagType
  date: string
}

interface FutureResearchCard {
  title: string
  text: string
}

interface FutureResearch {
  title: string
  cards: FutureResearchCard[]
}

interface RoadmapContent {
  title: string
  description: string
  timeline: Milestone[]
  futureResearch?: FutureResearch
  links: Link[]
}

const SUPPORTED_PROGRAMS = new Set(roadmapConfig.programs.map((p) => p.id))

export default function RoadmapContent() {
  const [selectedProgram, setSelectedProgram] = useState('company')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && SUPPORTED_PROGRAMS.has(hash)) {
        setSelectedProgram(hash)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    setIsLoaded(true)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const getRoadmapContent = (): RoadmapContent => {
    if (selectedProgram === 'microneedle-eeg') {
      const program = roadmapConfig.currentPrograms.microneedleEeg
      return {
        title: program.title,
        description: program.text,
        timeline: program.timeline.milestones as Milestone[],
        futureResearch: program.futureResearch,
        links: program.links,
      }
    }

    return {
      ...roadmapConfig.company,
      timeline: roadmapConfig.company.timeline.milestones as Milestone[],
      links: [],
    }
  }

  const roadmapContent = getRoadmapContent()

  const handleProgramChange = (programId: string) => {
    setSelectedProgram(programId)
    window.history.pushState(null, '', `#${programId}`)
  }

  return (
    <>
      <section className="mb-12">
        <div className="flex flex-wrap gap-3 mb-8">
          {roadmapConfig.programs.map((program) => {
            const isActive = selectedProgram === program.id
            return (
              <button
                key={program.id}
                onClick={() => handleProgramChange(program.id)}
                className={`px-5 py-2.5 rounded-lg font-mono text-sm uppercase tracking-[0.15em] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark ${
                  isActive
                    ? 'bg-accent-light dark:bg-accent-dark text-white shadow-glow'
                    : 'bg-white/80 dark:bg-surface-dark/50 text-text-light dark:text-text-dark border border-purple-200/60 dark:border-purple-500/30 hover:border-accent-light dark:hover:border-accent-dark'
                }`}
              >
                {program.name}
              </button>
            )
          })}
        </div>

        <div className="panel p-8 md:p-10">
          <h3 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">
            {roadmapContent.title}
          </h3>
          <p className="text-lg text-muted-light dark:text-muted-dark mb-6 leading-relaxed">
            {roadmapContent.description}
          </p>

          {roadmapContent.links.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-accent-light dark:text-accent-dark mb-3">
                Related links
              </h4>
              <div className="flex flex-wrap gap-3">
                {roadmapContent.links.map((link, index) => {
                  const external = link.href.startsWith('http')
                  return external ? (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-[0.18em] bg-accent-light/10 dark:bg-accent-dark/10 text-accent-light dark:text-accent-dark hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
                    >
                      {link.text}
                      <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      key={index}
                      href={link.href}
                      className="inline-flex items-center px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-[0.18em] bg-accent-light/10 dark:bg-accent-dark/10 text-accent-light dark:text-accent-dark hover:bg-accent-light/20 dark:hover:bg-accent-dark/20"
                    >
                      {link.text}
                      <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {isLoaded && roadmapContent.timeline.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark mb-6">
            Timeline
          </h2>
          <LazyTimeline milestones={roadmapContent.timeline} />
        </section>
      )}

      {roadmapContent.futureResearch && roadmapContent.futureResearch.cards.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-text-light dark:text-text-dark mb-6">
            {roadmapContent.futureResearch.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {roadmapContent.futureResearch.cards.map((card, index) => (
              <div key={index} className="panel p-6">
                <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2 font-mono">
                  {card.title}
                </h3>
                <p className="text-muted-light dark:text-muted-dark leading-relaxed">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
