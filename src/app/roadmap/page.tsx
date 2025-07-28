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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background-light via-secondary/10 to-purple-light/5 dark:from-background-dark dark:via-purple-dark/5 dark:to-accent-dark/3">
      <Navbar />
      <main id="main-content" className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full" tabIndex={-1}>
        {isConfigValid ? (
          <div>
            {/* Page Header */}
            <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-8 text-center">
              {roadmapConfig.pageTitle}
            </h1>
            
            {/* Interactive Roadmap Content */}
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