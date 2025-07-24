'use client'

import { motion } from 'framer-motion'

export default function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10,
    x: Math.random() * 100,
    size: Math.random() * 6 + 2,
  }))

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
            x: [0, Math.random() * 200 - 100],
            opacity: [0, 0.7, 0.7, 0],
            scale: [1, 1.2, 1],
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