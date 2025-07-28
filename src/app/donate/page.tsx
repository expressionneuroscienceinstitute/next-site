import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { donateConfig } from '../data/donateConfig'
import DonorBoxLoader from '@/components/DonorBoxLoader'

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-secondary/10 to-purple-light/5 dark:from-background-dark dark:via-purple-dark/5 dark:to-accent-dark/3">
      <Navbar />
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" tabIndex={-1}>
        {donateConfig?.pageTitle ? (
          <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-8 text-center">
            {donateConfig.pageTitle}
          </h1>
        ) : (
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8"></div>
        )}
        
        {donateConfig?.paragraph ? (
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
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