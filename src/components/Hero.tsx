'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ProgramCard from './ProgramCard'
import NeuralBackground from './NeuralBackground'
// Removed FloatingParticles import
import { useAccessibility } from './AccessibilityProvider'

const programs = [
  {
    title: 'Insight Program',
    description: 'Open-source VR tools for visual processing and Binocular Vision Dysfunction (BVD) research.',
    href: '/programs/insight',
  },
  {
    title: 'Continuous Embedded Electroencephalogram',
    description: 'A novel and non-invasive method of measuring brain activity in real-time, with a maximum ambulatory duration of 3 months, compared to the current max ambulatory duration of 72 hours; ceEEG has the potential to make Brain-Computer Interfaces (BCIs) more accessible to the general public.',
    href: '/programs/ceEEG',
    comingSoon: true,
  },
]

export default function Hero() {
  const { settings: accessibilitySettings } = useAccessibility()

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background-light via-secondary/20 to-purple-light/10 dark:from-background-dark dark:via-purple-dark/10 dark:to-accent-dark/5 min-h-screen">
      {/* Neural Background Animation */}
      {accessibilitySettings.neuronBackgroundEnabled && (
        <NeuralBackground disabled={!accessibilitySettings.allMotionEnabled} />
      )}
      
      {/* Animated Background Gradient */}
      {accessibilitySettings.allMotionEnabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-accent-light/5 via-transparent to-transparent dark:from-accent-dark/5"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            {/* Title Section with Enhanced Animations */}
            <div className="sm:text-center lg:text-left relative">
              <motion.div
                initial={{ opacity: accessibilitySettings.allMotionEnabled ? 0 : 1, y: accessibilitySettings.allMotionEnabled ? 20 : 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: accessibilitySettings.allMotionEnabled ? 0.5 : 0, ease: "easeOut" }}
              >
                <motion.span 
                  className="text-accent-light dark:text-accent-dark font-semibold text-lg"
                  whileHover={accessibilitySettings.allMotionEnabled ? { scale: 1.05 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Science by the next generation, for the next generation.
                </motion.span>
                
                <motion.h1 
                  className="mt-2 text-4xl tracking-tight font-extrabold text-text-light dark:text-text-dark sm:text-5xl md:text-6xl"
                >
                  <span className="block">
                    The future is built by people
                  </span>
                  <span className="block text-accent-light dark:text-accent-dark">
                    who show up to build it
                  </span>
                </motion.h1>
              </motion.div>
              
              {/* Enhanced Logo with Shape-Following Breathing Glow Effect */}
              <motion.div
                initial={{ opacity: accessibilitySettings.allMotionEnabled ? 0 : 1 }}
                animate={{ 
                  opacity: 1,
                }}
                transition={{ 
                  opacity: { duration: 0.4, delay: accessibilitySettings.allMotionEnabled ? 0.2 : 0 },
                }}
                className="hidden lg:block absolute -top-10 right-10 md:right-5 sm:right-0"
              >
                <motion.div
                  className="relative"
                  animate={accessibilitySettings.breathingEffectsEnabled ? {
                    // Create breathing glow that follows the logo shape using multiple drop-shadows
                    filter: [
                      "drop-shadow(0 0 2px rgba(34, 197, 94, 0.3)) drop-shadow(0 0 4px rgba(34, 197, 94, 0.2))",
                      "drop-shadow(0 0 8px rgba(34, 197, 94, 0.6)) drop-shadow(0 0 16px rgba(34, 197, 94, 0.4)) drop-shadow(0 0 24px rgba(34, 197, 94, 0.2))",
                      "drop-shadow(0 0 2px rgba(34, 197, 94, 0.3)) drop-shadow(0 0 4px rgba(34, 197, 94, 0.2))"
                    ]
                  } : {
                    filter: "drop-shadow(0 0 4px rgba(34, 197, 94, 0.1))"
                  }}
                  transition={{
                    duration: accessibilitySettings.breathingEffectsEnabled ? 3.5 : 0,
                    repeat: accessibilitySettings.breathingEffectsEnabled ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/logos/ENI_logo_pink_vector.svg"
                    alt="Expression Neuroscience Institute Logo"
                    width={350}
                    height={350}
                    priority
                    className="drop-shadow-lg"
                  />
                </motion.div>
              </motion.div>
            </div>
            
            {/* Content Section with Staggered Animations */}
            <div className="mt-4">
              <motion.p
                initial={{ opacity: accessibilitySettings.allMotionEnabled ? 0 : 1, y: accessibilitySettings.allMotionEnabled ? 15 : 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: accessibilitySettings.allMotionEnabled ? 0.4 : 0, delay: accessibilitySettings.allMotionEnabled ? 0.3 : 0 }}
                className="text-base text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl lg:max-w-2xl"
              >
                We&apos;re a group of students and researchers studying how brains work by looking at electrical activity in the brain, behavior, and sociology. Our research focuses on understanding mental health conditions and brain function through open, collaborative science. We hope to also enable the next generation of scientists to more easily transition into the world of research and build the world we want to live in.
              </motion.p>

              {/* Enhanced Feature Cards */}
              <motion.section
                initial={{ opacity: accessibilitySettings.allMotionEnabled ? 0 : 1, y: accessibilitySettings.allMotionEnabled ? 20 : 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: accessibilitySettings.allMotionEnabled ? 0.4 : 0, delay: accessibilitySettings.allMotionEnabled ? 0.5 : 0 }}
                className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
                aria-label="Key features and organization values"
                role="region"
              >
                {[
                  {
                    title: "Open Source",
                    content: "All our tools and research are freely available for anyone to use and build upon. We encourage you to provide feedback and contribute to our cause wherever you see fit!",
                    gradient: "from-emerald-500/10 to-green-500/10 dark:from-emerald-400/10 dark:to-green-400/10"
                  },
                  {
                    title: "Student-Led",
                    content: "Research driven by undergraduate and graduate students (with the help of our post-graduate advisors) with lived experience of mental health disorders.",
                    gradient: "from-blue-500/10 to-indigo-500/10 dark:from-blue-400/10 dark:to-indigo-400/10"
                  },
                  {
                    title: "Real Impact",
                    content: "Developing practical tools for VR diagnostics and mental health research while also evolving the way we do science.",
                    gradient: "from-purple-500/10 to-pink-500/10 dark:from-purple-400/10 dark:to-pink-400/10"
                  }
                ].map((feature, index) => (
                  <motion.article 
                    key={feature.title}
                    className={`bg-white/90 dark:bg-background-dark/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-secondary/30 dark:border-purple-dark/30 bg-gradient-to-br ${feature.gradient} hover:shadow-2xl transition-all duration-300`}
                    initial={{ opacity: accessibilitySettings.allMotionEnabled ? 0 : 1, y: accessibilitySettings.allMotionEnabled ? 15 : 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: accessibilitySettings.allMotionEnabled ? 0.3 : 0, delay: accessibilitySettings.allMotionEnabled ? 0.6 + index * 0.05 : 0 }}
                    whileHover={accessibilitySettings.allMotionEnabled ? { 
                      scale: 1.02, 
                      y: -5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    } : {}}
                  >
                    <motion.h3 
                      className="text-accent-light dark:text-accent-dark font-semibold text-lg mb-2"
                      whileHover={accessibilitySettings.allMotionEnabled ? { scale: 1.05 } : {}}
                    >
                      {feature.title}
                    </motion.h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.content}</p>
                  </motion.article>
                ))}
              </motion.section>

              {/* Enhanced Call-to-Action Buttons */}
              <motion.div
                initial={{ opacity: accessibilitySettings.allMotionEnabled ? 0 : 1, y: accessibilitySettings.allMotionEnabled ? 15 : 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: accessibilitySettings.allMotionEnabled ? 0.4 : 0, delay: accessibilitySettings.allMotionEnabled ? 0.8 : 0 }}
                className="mt-6 flex justify-center sm:justify-center lg:justify-start gap-4"
              >
                <motion.div
                  whileHover={accessibilitySettings.allMotionEnabled ? { scale: 1.05 } : {}}
                  whileTap={accessibilitySettings.allMotionEnabled ? { scale: 0.95 } : {}}
                  className="relative"
                >
                  {/* Pulsing effect for donation button */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-light to-emerald-500 dark:from-accent-dark dark:to-emerald-400"
                    animate={accessibilitySettings.allMotionEnabled ? {
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: accessibilitySettings.allMotionEnabled ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                  <Link
                    href="https://donorbox.org/expression-neuroscience-institute?default_interval=q"
                    className="relative inline-block px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-accent-light to-emerald-500 dark:from-accent-dark dark:to-emerald-400 text-white hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Support our research through donations (opens in new tab)"
                  >
                    Support Our Research
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={accessibilitySettings.allMotionEnabled ? { scale: 1.05 } : {}}
                  whileTap={accessibilitySettings.allMotionEnabled ? { scale: 0.95 } : {}}
                >
                  <Link
                    href="/research#:~:text=Publications"
                    className="inline-block px-8 py-3 border-2 border-accent-light dark:border-accent-dark text-accent-light dark:text-accent-dark font-semibold rounded-lg hover:bg-accent-light hover:text-white dark:hover:bg-accent-dark dark:hover:text-background-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark"
                  >
                    Read Our Papers
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Programs Section with Enhanced Animations */}
            <motion.section
              initial={{ opacity: accessibilitySettings.allMotionEnabled ? 0 : 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: accessibilitySettings.allMotionEnabled ? 0.4 : 0, delay: accessibilitySettings.allMotionEnabled ? 1.0 : 0 }}
              className="mt-16"
              aria-label="Our research programs and initiatives"
              role="region"
            >
              <motion.h2 
                className="text-3xl font-bold text-text-light dark:text-text-dark mb-8"
                initial={{ opacity: accessibilitySettings.allMotionEnabled ? 0 : 1, x: accessibilitySettings.allMotionEnabled ? -15 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: accessibilitySettings.allMotionEnabled ? 0.3 : 0, delay: accessibilitySettings.allMotionEnabled ? 1.1 : 0 }}
              >
                Our Work
              </motion.h2>
              <div className="grid gap-6 md:grid-cols-2">
                {programs.map((program, index) => (
                  <motion.div
                    key={program.title}
                    initial={{ opacity: accessibilitySettings.allMotionEnabled ? 0 : 1, y: accessibilitySettings.allMotionEnabled ? 20 : 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: accessibilitySettings.allMotionEnabled ? 0.3 : 0, delay: accessibilitySettings.allMotionEnabled ? 1.2 + index * 0.05 : 0 }}
                  >
                    <ProgramCard {...program} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </main>
        </div>
      </div>
    </div>
  )
} 