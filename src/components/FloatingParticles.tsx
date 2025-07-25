'use client'

import { motion } from 'framer-motion'

interface FloatingParticlesProps {
  disabled?: boolean
}

export default function FloatingParticles({ disabled = false }: FloatingParticlesProps) {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 10,
    duration: 20 + Math.random() * 15, // Slower movement
    x: Math.random() * 100,
    size: Math.random() * 4 + 1, // Smaller particles
  }))

  if (disabled) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-accent-light/30 to-purple-light/30 dark:from-accent-dark/20 dark:to-purple-dark/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
          }}
          animate={{
            y: [1000, -100],
            x: [0, Math.random() * 50 - 25], // Reduced horizontal movement
            opacity: [0, 0.5, 0.5, 0], // Reduced opacity
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}