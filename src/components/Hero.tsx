import Link from 'next/link'
import Image from 'next/image'
import ProgramCard from './ProgramCard'
import LazyNeuralBackground from './LazyNeuralBackground'
import HeroContent from './HeroContent'
import type { StatusTagType } from './StatusTag'

interface HeroProgram {
  title: string
  description: string
  href: string
  status?: StatusTagType
}

const programs: HeroProgram[] = [
  {
    title: 'Insight Program',
    description: 'Open-source VR tools for visual processing and Binocular Vision Dysfunction (BVD) research.',
    href: '/programs/insight',
    status: 'in-development' as StatusTagType,
  },
  {
    title: 'Continuous Embedded Electroencephalogram',
    description: 'Building open source, non-invasive brain-computer interfaces that work for real people. Transparent, secure, community-driven neurotechnology.',
    href: '/programs/ceEEG',
    status: 'early-research' as StatusTagType,
  },
]

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background-light via-secondary/20 to-purple-light/10 dark:from-background-dark dark:via-purple-dark/10 dark:to-accent-dark/5 min-h-screen">
      {/* Neural Background Animation - Lazy Loaded */}
      <LazyNeuralBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/logos/ENI_logo_pink_vector.svg"
                alt="Expression Neuroscience Institute"
                width={200}
                height={80}
                priority
                className="mx-auto"
              />
            </Link>
          </div>

          {/* Interactive Hero Content */}
          <HeroContent />

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/95 dark:bg-background-dark/90 rounded-xl p-6 shadow-lg border border-secondary/30 dark:border-purple-dark/30 hover:shadow-xl transition-shadow duration-150 hover:-translate-y-0.5">
              <h3 className="text-xl font-semibold text-accent-light dark:text-accent-dark mb-2">Open Source</h3>
              <p className="text-gray-600 dark:text-gray-300">All our research and tools are open source, promoting transparency and collaboration.</p>
            </div>
            <div className="bg-white/95 dark:bg-background-dark/90 rounded-xl p-6 shadow-lg border border-secondary/30 dark:border-purple-dark/30 hover:shadow-xl transition-shadow duration-150 hover:-translate-y-0.5">
              <h3 className="text-xl font-semibold text-accent-light dark:text-accent-dark mb-2">Student-Led</h3>
              <p className="text-gray-600 dark:text-gray-300">Empowering students to lead cutting-edge neuroscience research and innovation.</p>
            </div>
            <div className="bg-white/95 dark:bg-background-dark/90 rounded-xl p-6 shadow-lg border border-secondary/30 dark:border-purple-dark/30 hover:shadow-xl transition-shadow duration-150 hover:-translate-y-0.5">
              <h3 className="text-xl font-semibold text-accent-light dark:text-accent-dark mb-2">Real Impact</h3>
              <p className="text-gray-600 dark:text-gray-300">Making neuroscience research accessible and impactful for real-world applications.</p>
            </div>
          </div>

          {/* Program Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.title} {...program} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 