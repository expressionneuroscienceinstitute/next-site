'use client'

import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'

const boardMembers = [
  {
    name: 'Dylan Carney (Anki)',
    role: 'Founder and Board Chair',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.' // Placeholder bio
  },
  {
    name: 'Desiree Astabie',
    role: 'Board Secretary',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.' // Placeholder bio
  },
  {
    name: 'Jon D. Rodriguez',
    role: 'Board Treasurer',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.' // Placeholder bio
  },
  {
    name: 'Grace Hart',
    role: 'Chief Science Officer',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.' // Placeholder bio
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-text-light dark:text-text-dark mb-8">About ENI</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              The Expression Neuroscience Institute (ENI) is dedicated to advancing our
              understanding of the brain through innovative, accessible research. We believe
              that scientific discovery should be open, collaborative, and driven by the
              next generation of researchers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">Board Members</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {boardMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card flex flex-col items-center text-center"
                >
                  <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4 flex-shrink-0"></div>
                  <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-light dark:text-purple-dark mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-left">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">Governance</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Our governance documents outline our organizational structure, policies,
              and commitment to transparency.
            </p>
            <div className="flex gap-4">
              <a
                href="/governance/bylaws.pdf"
                className="text-accent-light dark:text-accent-dark hover:opacity-80 font-medium"
              >
                Bylaws
              </a>
              <a
                href="/governance/policies.pdf"
                className="text-accent-light dark:text-accent-dark hover:opacity-80 font-medium"
              >
                Policies
              </a>
            </div>
          </section>

          <section className="text-center py-12 border-t border-gray-200 dark:border-gray-700 mt-12">
            <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">Building the Future Together</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our work thrives on openness and collaboration. Whether you're a researcher, a student, a patient, or simply passionate about understanding the brain, your engagement matters. The future belongs to those who show up to build it. You showed up. Let's shape the future of neuroscience, together.
            </p>
          </section>

        </motion.div>
      </div>
    </div>
  )
} 