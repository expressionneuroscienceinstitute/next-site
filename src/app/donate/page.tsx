import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { donateConfig } from '../data/donateConfig'
import DonorBoxLoader from '@/components/DonorBoxLoader'

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-tech-grid bg-gradient-to-br from-background-light via-secondary/10 to-purple-light/5 dark:from-background-dark dark:via-purple-dark/5 dark:to-accent-dark/3">
      <Navbar />
      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" tabIndex={-1}>
        {donateConfig?.pageTitle ? (
          <div className="text-center mb-10">
            <span className="eyebrow">{'// donate'}</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark">
              {donateConfig.pageTitle}
            </h1>
          </div>
        ) : (
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8"></div>
        )}

        {donateConfig?.paragraph ? (
          <div className="text-center mb-12">
            <p className="text-lg text-muted-light dark:text-muted-dark max-w-3xl mx-auto leading-relaxed">
              {donateConfig.paragraph}
            </p>
          </div>
        ) : (
          <div className="space-y-4 mb-12">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse max-w-2xl mx-auto"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse max-w-xl mx-auto"></div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <DonorBoxLoader />
        </div>
      </main>
      <Footer />
    </div>
  )
} 