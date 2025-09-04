'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import StatusTag, { StatusTagType } from './StatusTag'
import { useAccessibility } from './AccessibilityProvider'

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
  },
  'waiting-on-something': {
    circle: { light: '#6366F1', dark: '#818CF8' }, // indigo-500 / indigo-400
    border: { light: '#6366F1', dark: '#818CF8' },
    text: { light: '#4338CA', dark: '#A5B4FC' }, // indigo-700 / indigo-300
    bg: { light: '#3730A3', dark: 'rgba(49, 46, 129, 0.3)' }, // indigo-800 / indigo-900 with opacity
  },
  'coming-soon': {
    circle: { light: '#A855F7', dark: '#C084FC' }, // purple-500 / purple-400
    border: { light: '#A855F7', dark: '#C084FC' },
    text: { light: '#7C3AED', dark: '#E9D5FF' }, // purple-700 / purple-300
    bg: { light: '#6B21A8', dark: 'rgba(88, 28, 135, 0.3)' }, // purple-800 / purple-900 with opacity
  }
}

export default function Timeline({ milestones }: TimelineProps) {
  /* Theme State Management */
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { settings } = useAccessibility();
  
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
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1.5 opacity-70 z-0"
        style={{ 
          background: gradientStyle
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
          left: '48.8095%',
          
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

              {/* Milestone Content Card */}
              <div className="relative mx-auto w-full max-w-lg px-4">
                <motion.div
                  className={`relative p-6 rounded-xl border z-20 transition-all duration-300 overflow-hidden ${
                    milestone.status === 'waiting-on-something' 
                      ? 'bg-gradient-to-br from-white via-indigo-50 to-sky-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-indigo-950 dark:to-sky-950 shadow-[0_4px_20px_rgb(99,102,241,0.15)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.25)]' 
                      : milestone.status === 'coming-soon'
                      ? 'bg-gradient-to-br from-white via-purple-50 to-pink-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-950 dark:to-pink-950 shadow-[0_4px_20px_rgb(168,85,247,0.15)] hover:shadow-[0_8px_30px_rgb(168,85,247,0.25)]'
                      : milestone.status === 'completed'
                      ? 'bg-gradient-to-br from-white via-emerald-50 to-green-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-emerald-950 dark:to-green-950 shadow-[0_4px_20px_rgb(16,185,129,0.15)] hover:shadow-[0_8px_30px_rgb(16,185,129,0.25)]'
                      : milestone.status === 'in-progress'
                      ? 'bg-gradient-to-br from-white via-blue-50 to-cyan-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-950 dark:to-cyan-950 shadow-[0_4px_20px_rgb(59,130,246,0.15)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.25)]'
                      : milestone.status === 'planned'
                      ? 'bg-gradient-to-br from-white via-violet-50 to-purple-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-violet-950 dark:to-purple-950 shadow-[0_4px_20px_rgb(139,92,246,0.15)] hover:shadow-[0_8px_30px_rgb(139,92,246,0.25)]'
                      : milestone.status === 'speculative'
                      ? 'bg-gradient-to-br from-white via-amber-50 to-yellow-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-amber-950 dark:to-yellow-950 shadow-[0_4px_20px_rgb(245,158,11,0.15)] hover:shadow-[0_8px_30px_rgb(245,158,11,0.25)]'
                      : 'bg-white dark:bg-gray-900 shadow-[0_4px_20px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]'
                  }`}
                  style={{ borderColor: colorSet?.border[theme] }}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Glow Effects (if enabled) */}
                  {settings.glowEffectsEnabled && (
                    <>
                      {/* Shimmer effect for coming-soon */}
                      {milestone.status === 'coming-soon' && (
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite]">
                          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>
                      )}
                      
                      {/* Waiting indicator overlay */}
                      {milestone.status === 'waiting-on-something' && (
                        <div className="absolute top-3 right-3">
                          <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-ping" />
                        </div>
                      )}
                      
                      {/* Pulse effect for completed */}
                      {milestone.status === 'completed' && (
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl blur-md animate-pulse" />
                      )}
                      
                      {/* Progress wave effect */}
                      {milestone.status === 'in-progress' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1">
                          <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 animate-[wave_2s_ease-in-out_infinite]" />
                        </div>
                      )}
                      
                      {/* Subtle glow for planned */}
                      {milestone.status === 'planned' && (
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl blur animate-[glow_4s_ease-in-out_infinite]" />
                      )}
                      
                      {/* Sparkle effect for speculative */}
                      {milestone.status === 'speculative' && (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.1),transparent_50%)] animate-[sparkle_3s_ease-in-out_infinite]" />
                      )}
                    </>
                  )}
                  
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
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-100 mb-2">
                    {milestone.date}
                  </p>
                  <p className="text-sm text-gray-900 dark:text-gray-100 mb-3 leading-relaxed">
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