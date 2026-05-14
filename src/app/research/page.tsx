import Navbar from '@/components/Navbar'
import DatasetCard from '@/components/DatasetCard'
import { datasets, Dataset } from '@/lib/datasets'
import PublicationItem from '@/components/PublicationItem'
import { papers, Paper } from '@/lib/papers'
import { researchConfig } from '../data/researchConfig'
import { ResearchPageSkeleton } from '@/components/ResearchPageSkeleton'
import Footer from '@/components/Footer'

export default function ResearchPage() {
  const isConfigValid = researchConfig?.pageTitle && researchConfig?.datasets && researchConfig?.publications;

  return (
    <div className="page-shell flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {isConfigValid ? (
          <div>
            <div className="mb-12">
              <p className="kicker">Research</p>
              <h1 className="mt-4 text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark">
                {researchConfig.pageTitle}
              </h1>
              {researchConfig.intro && (
                <p className="mt-4 text-lg md:text-xl text-muted-light dark:text-muted-dark max-w-3xl leading-relaxed">
                  {researchConfig.intro}
                </p>
              )}
            </div>

            <section className="mb-16">
              <h2 className="text-base font-semibold text-text-light dark:text-text-dark mb-4">
                {researchConfig.datasets.title}
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {datasets.map((dataset: Dataset, index: number) => (
                  <div key={dataset.id}>
                    <DatasetCard dataset={dataset} index={index} />
                  </div>
                ))}
              </div>
              {datasets.length === 0 && (
                <div className="panel p-8">
                  <p className="text-muted-light dark:text-muted-dark">
                    {researchConfig.datasets.emptyMessage}
                  </p>
                </div>
              )}
            </section>

            <section>
              <h2 className="text-base font-semibold text-text-light dark:text-text-dark mb-4">
                {researchConfig.publications.title}
              </h2>
              <div className="space-y-6">
                {papers.map((paper: Paper, index: number) => (
                  <div key={paper.id} className="panel p-6">
                    <PublicationItem paper={paper} index={index} />
                  </div>
                ))}
              </div>
              {papers.length === 0 && (
                <div className="panel p-8">
                  <p className="text-muted-light dark:text-muted-dark">
                    {researchConfig.publications.emptyMessage}
                  </p>
                </div>
              )}
            </section>
          </div>
        ) : (
          <ResearchPageSkeleton />
        )}
      </main>
      <Footer />
    </div>
  )
} 