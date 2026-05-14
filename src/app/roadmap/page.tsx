import Navbar from '@/components/Navbar'
import { roadmapConfig } from '../data/roadmapConfig'
import { RoadmapPageSkeleton } from '@/components/RoadmapPageSkeleton'
import Footer from '@/components/Footer'
import RoadmapContent from '@/components/RoadmapContent'

export default function RoadmapPage() {
  /* Configuration Validation */
  const isConfigValid = 
    roadmapConfig?.pageTitle &&
    roadmapConfig?.programs?.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-tech-grid bg-gradient-to-br from-background-light via-secondary/10 to-purple-light/5 dark:from-background-dark dark:via-purple-dark/5 dark:to-accent-dark/3">
      <Navbar />
      <main id="main-content" className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full" tabIndex={-1}>
        {isConfigValid ? (
          <div>
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark">
                {roadmapConfig.pageTitle}
              </h1>
              <p className="mt-3 text-lg text-muted-light dark:text-muted-dark max-w-3xl">
                Public, dated, honest about uncertainty. Pick a track:
              </p>
            </div>

            <RoadmapContent />
          </div>
        ) : (
          <RoadmapPageSkeleton />
        )}
      </main>
      <Footer />
    </div>
  )
} 