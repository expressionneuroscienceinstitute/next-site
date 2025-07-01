'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ProgramCard from './ProgramCard'

const programs = [
  {
    title: 'Insight Program',
    description: 'Open-source VR tools for visual processing and Binocular Vision Dysfunction (BVD) research.',
    href: '/programs/insight',
  },
  {
    title: 'Mental Health Labeling Platform',
    description: 'Data analysis tools for mental health research and pattern recognition in Electroencephalography (EEG), eye-tracking, and other neurophysiological data.',
    href: '/programs/mhlp',
    comingSoon: true,
  },
]

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background-light to-secondary/10 dark:from-background-dark dark:to-purple-dark/10">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            {/* Title Section */}
            <div className="sm:text-center lg:text-left relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-accent-light dark:text-accent-dark font-semibold text-lg">
                  Science by the next generation, for the next generation.
                </span>
                <h1 className="mt-2 text-4xl tracking-tight font-extrabold text-text-light dark:text-text-dark sm:text-5xl md:text-6xl">
                  <span className="block">The future is built by people</span>
                  <span className="block text-accent-light dark:text-accent-dark">who show up to build it</span>
                </h1>
              </motion.div>
              
              {/* ENI Logo - External file with proper dark mode support */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hidden lg:block absolute -top-10 right-10 md:right-5 sm:right-0"
              >
                <Image
                  src="/logos/ENI_logo_pink_vector.svg"
                  alt="Expression Neuroscience Institute Logo"
                  width={350}
                  height={350}
                  priority
                />
              </motion.div>
            </div>
            
            {/* Content Section (paragraph, cards, buttons) */}
            <div className="mt-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl lg:max-w-2xl"
              >
                We&apos;re a group of students and researchers studying how brains work by looking at electrical activity in the brain, behavior, and sociology. Our research focuses on understanding mental health conditions and brain function through open, collaborative science. We hope to also enable the next generation of scientists to more easily transition into the world of research and build the world we want to live in.
              </motion.p>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
                aria-label="Key features"
              >
                <article className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-secondary/20 dark:border-purple-dark/20">
                  <h3 className="text-accent-light dark:text-accent-dark font-semibold text-lg mb-2">Open Source</h3>
                  <p className="text-gray-600 dark:text-gray-300">All our tools and research are freely available for anyone to use and build upon. We enourage you to provide feedback and contribute to our cause wherever you see fit!</p>
                </article>
                <article className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-secondary/20 dark:border-purple-dark/20">
                  <h3 className="text-accent-light dark:text-accent-dark font-semibold text-lg mb-2">Student-Led</h3>
                  <p className="text-gray-600 dark:text-gray-300">Research driven by undergraduate and graduate students (with the help of our post-graduate advisors) with lived experience of mental health disorders.</p>
                </article>
                <article className="bg-white/80 dark:bg-background-dark/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-secondary/20 dark:border-purple-dark/20">
                  <h3 className="text-accent-light dark:text-accent-dark font-semibold text-lg mb-2">Real Impact</h3>
                  <p className="text-gray-600 dark:text-gray-300">Developing practical tools for VR diagnostics and mental health research while also evolving the way we do science.</p>
                </article>
              </motion.section>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-6 flex justify-center sm:justify-center lg:justify-start gap-4"
              >
                <Link
                  href="https://donorbox.org/expression-neuroscience-institute?default_interval=q"
                  className="inline-block px-8 py-3 rounded-lg font-semibold bg-accent-light dark:bg-accent-dark text-background-light dark:text-background-dark hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Support our research through donations (opens in new tab)"
                >
                  Support Our Research
                </Link>
                <Link
                  href="/research#:~:text=Publications"
                  className="inline-block px-8 py-3 border-2 border-accent-light dark:border-accent-dark text-accent-light dark:text-accent-dark font-semibold rounded-lg hover:bg-accent-light hover:text-background-light dark:hover:bg-accent-dark dark:hover:text-background-dark transition-colors focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
                >
                  Read Our Papers
                </Link>
              </motion.div>
            </div>

            {/* Programs Section */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16"
            >
              <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-8">Our Work</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {programs.map((program) => (
                  <ProgramCard key={program.title} {...program} />
                ))}
              </div>
            </motion.section>
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