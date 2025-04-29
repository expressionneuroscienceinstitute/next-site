import Navbar from '@/components/Navbar'
import { milestones } from '@/lib/milestones'
import Timeline from '@/components/Timeline'


export default function RoadmapPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-[#03045e] mb-8">Research Roadmap</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#03045e] mb-6">Current Programs</h2>
          <div className="card">
            <h3 className="text-xl font-semibold text-[#03045e] mb-2">Insight Program</h3>
            <p className="text-gray-600 mb-4">
              Our flagship research program focusing on Binocular Vision Dysfunction (BVD)
              and how this underdiagnosed condition can lead to broad neurological and visual impairments. This program combines behavioral studies,
              neuroimaging, and machine learning approaches to better understand and
              treat BVD.
            </p>
            <div className="flex gap-4">
              <a
                href="/data"
                className="text-[#0077b6] hover:text-[#03045e] font-medium"
              >
                View Datasets
              </a>
              <a
                href="/papers"
                className="text-[#0077b6] hover:text-[#03045e] font-medium"
              >
                Read Papers
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#03045e] mb-6">Timeline</h2>
          <div className="space-y-8">
          <Timeline milestones={milestones} />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-[#03045e] mb-6">Future Research</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card">
              <h3 className="text-xl font-semibold text-[#03045e] mb-2">
                Neural Plasticity Studies
              </h3>
              <p className="text-gray-600">
                Investigating the brain's ability to adapt and reorganize in response
                to visual training interventions.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold text-[#03045e] mb-2">
                AI-Assisted Diagnosis
              </h3>
              <p className="text-gray-600">
                Developing machine learning models to improve early detection and
                diagnosis of visual processing disorders.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 