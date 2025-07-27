'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import StatusTag, { StatusTagType } from './StatusTag'

interface MilestoneLink {
  title: string;
  url: string;
}

interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  status: StatusTagType;
  links?: MilestoneLink[];
}

interface TimelineProps {
  milestones: Milestone[]
}

// Color mapping for timeline visualization (keeping for visual consistency)
const statusColorValues = {
  completed: {
    circle: { light: '#059669', dark: '#10B981' }, // emerald-600 / emerald-500
    border: { light: '#059669', dark: '#10B981' },
    text: { light: '#047857', dark: '#34D399' }, // emerald-700 / emerald-400
    bg: { light: '#065F46', dark: 'rgba(6, 78, 59, 0.4)' }, // emerald-800 / emerald-900 with opacity
  },
  'in-progress': {
    circle: { light: '#3B82F6', dark: '#60A5FA' }, // blue-500 / blue-400
    border: { light: '#3B82F6', dark: '#60A5FA' },
    text: { light: '#1D4ED8', dark: '#93C5FD' }, // blue-700 / blue-300
    bg: { light: '#1E40AF', dark: 'rgba(30, 58, 138, 0.3)' }, // blue-800 / blue-900 with opacity
  },
  planned: {
    circle: { light: '#8B5CF6', dark: '#A78BFA' }, // violet-500 / violet-400
    border: { light: '#8B5CF6', dark: '#A78BFA' },
    text: { light: '#6D28D9', dark: '#C4B5FD' }, // violet-700 / violet-300
    bg: { light: '#5B21B6', dark: 'rgba(76, 29, 149, 0.3)' }, // violet-800 / violet-900 with opacity
  },
  speculative: {
    circle: { light: '#F59E0B', dark: '#FBBF24' }, // amber-500 / amber-400
    border: { light: '#F59E0B', dark: '#FBBF24' },
    text: { light: '#B45309', dark: '#FCD34D' }, // amber-700 / amber-300
    bg: { light: '#92400E', dark: 'rgba(120, 53, 15, 0.3)' }, // amber-800 / amber-900 with opacity
  }
}

export default function Timeline({ milestones }: TimelineProps) {
  /* Theme State Management */
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  /* Theme Detection and Monitoring */
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setTheme(isDarkMode ? 'dark' : 'light');
  }, []);
  
  /* Dynamic Gradient Generation */
  const gradientColors = milestones.map(m => {
    return statusColorValues[m.status as keyof typeof statusColorValues]?.circle[theme]; 
  }).filter(Boolean); 

  const gradientStyle = gradientColors.length > 0 
    ? `linear-gradient(to bottom, ${gradientColors.join(', ')})`
    : 'none';
    

  return (
    <section className="max-w-2xl mx-auto relative py-8" aria-label="Project timeline">
      {/* Central timeline line with dynamic gradient */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1.5 opacity-70 z-10"
        style={{ 
          background: gradientStyle,
          transform: 'translateX(5px)' // Fine-tune the line position otherwise it is off center and will not look good with line terminator
        }} 
        aria-hidden="true"
      />
      
      {/* Timeline Terminator */}
      <motion.div 
        className="absolute -bottom-2 z-20"
        style={{ 
          borderColor: theme === 'light' ? '#e5e7eb' : '#374151',
          backgroundColor: theme === 'light' ? 'white' : '#111827',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          borderWidth: '3px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Milestone Cards */}
      <div className="space-y-12">
        {milestones.map((milestone, index) => {
          /* Color Theme Resolution */
          const colorSet = statusColorValues[milestone.status as keyof typeof statusColorValues];
          
          return (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Node */}
              <div className="absolute left-1/2 -translate-x-1/2 top-6 flex items-center justify-center z-20">
                <motion.div
                  className="relative w-4 h-4 rounded-full shadow-lg border-2 border-white dark:border-gray-900"
                  style={{ backgroundColor: colorSet?.circle[theme] }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Pulse Animation for In-Progress Items */}
                  {milestone.status === 'in-progress' && (
                    <>
                      <motion.div
                        className="absolute -inset-2 rounded-full opacity-20"
                        style={{ backgroundColor: colorSet?.circle[theme] }}
                        initial={{ scale: 0.8, opacity: 0.2 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                      <motion.div
                        className="absolute -inset-1 rounded-full opacity-20"
                        style={{ backgroundColor: colorSet?.circle[theme] }}
                        initial={{ scale: 0.8, opacity: 0.2 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 0.5
                        }}
                      />
                    </>
                  )}
                </motion.div>
              </div>

              {/* Milestone Content Card */}
              <div className="relative mx-auto w-full max-w-lg px-4">
                <motion.div
                  className="relative p-6 rounded-xl bg-white dark:bg-gray-900 border shadow-[0_4px_20px_rgb(0,0,0,0.08)] z-20 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                  style={{ borderColor: colorSet?.border[theme] }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h3 
                      className="text-base font-bold"
                      style={{ color: colorSet?.text[theme] }}
                    >
                      {milestone.title}
                    </h3>
                    <StatusTag 
                      status={milestone.status} 
                      size="small" 
                      className="flex-shrink-0"
                    />
                  </div>
                  
                  {/* Card Content */}
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                    {milestone.date}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                    {milestone.description}
                  </p>
                  
                  {/* Card Links */}
                  {milestone.links && milestone.links.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {milestone.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-medium text-accent-light dark:text-accent-dark hover:underline transition-colors duration-200"
                        >
                          {link.title}
                          <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}