'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ProgramCard from './ProgramCard'

const programs = [
  {
    title: 'Insight Program',
    description: 'Open-Source VR Diagnostics for understanding visual processing and neural patterns.',
    href: '/programs/insight',
  },
  {
    title: 'Mental Health Labeling Platform',
    description: 'Advanced tools for analyzing and understanding mental health data patterns.',
    href: '/programs/mhlp',
    comingSoon: true,
  },
]

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background-light to-secondary/10 dark:from-background-dark dark:to-purple-dark/10">
      {/* <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div> */}
      
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-accent-light dark:text-accent-dark font-semibold text-lg">
                  Science by the next generation, for the next generation.
                </span>
                <h1 className="mt-2 text-4xl tracking-tight font-extrabold text-text-light dark:text-text-dark sm:text-5xl md:text-6xl">
                  <span className="block">Decoding the Brain's</span>
                  <span className="block text-accent-light dark:text-accent-dark">Hidden Patterns</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              >
                We study how the brain expresses itself through patterns of neural activity, 
                behavior, and biological signals. Our innovative research aims to decode these 
                complex patterns to better understand neurological conditions and human cognition.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
              >
                <div className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-secondary/20 dark:border-purple-dark/20">
                  <h3 className="text-accent-light dark:text-accent-dark font-semibold text-lg mb-2">Innovation</h3>
                  <p className="text-gray-600 dark:text-gray-300">Developing new methods to capture and analyze neural expression patterns</p>
                </div>
                <div className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-secondary/20 dark:border-purple-dark/20">
                  <h3 className="text-accent-light dark:text-accent-dark font-semibold text-lg mb-2">Impact</h3>
                  <p className="text-gray-600 dark:text-gray-300">Advancing our understanding of brain function and neurological conditions</p>
                </div>
                <div className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-secondary/20 dark:border-purple-dark/20">
                  <h3 className="text-accent-light dark:text-accent-dark font-semibold text-lg mb-2">Accessibility</h3>
                  <p className="text-gray-600 dark:text-gray-300">Making neuroscience research and data freely available to the global community</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 sm:flex sm:justify-center lg:justify-start gap-4"
              >
                <Link
                  href="/donate"
                  className="inline-block px-8 py-3 rounded-lg font-semibold bg-accent-light dark:bg-accent-dark text-background-light dark:text-background-dark hover:opacity-90 transition-opacity"
                >
                  Support Our Research
                </Link>
                <Link
                  href="/papers"
                  className="inline-block px-8 py-3 border-2 border-accent-light dark:border-accent-dark text-accent-light dark:text-accent-dark font-semibold rounded-lg hover:bg-accent-light hover:text-background-light dark:hover:bg-accent-dark dark:hover:text-background-dark transition-colors"
                >
                  Read Our Papers
                </Link>
              </motion.div>

              {/* Programs Section */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-24"
              >
                <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-8">Our Work</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {programs.map((program) => (
                    <ProgramCard key={program.title} {...program} />
                  ))}
                </div>
              </motion.section>
            </div>
          </main>
        </div>
      </div>

      {/* Decorative background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-0 right-0 w-1/3 h-full bg-[url('/brain-pattern.svg')] opacity-10 dark:opacity-5"
      />
    </div>
  )
} 