'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

interface Neuron {
  id: number
  x: number
  y: number
  connections: number[]
  isActive: boolean
  activationTime: number
  lastFired: number
  signalQueue: Signal[]
}

interface Signal {
  id: string
  fromNeuron: number
  toNeuron: number
  progress: number
  startTime: number
  duration: number
  intensity: number
}

interface NeuralBackgroundProps {
  disabled?: boolean
}

// Throttle function for performance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function throttle(func: (...args: any[]) => any, limit: number) {
  let inThrottle = false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lastArgs: any[] | null = null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function(...args: any[]) {
    lastArgs = args
    
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      
      setTimeout(() => {
        inThrottle = false
        if (lastArgs) {
          func(...lastArgs)
          lastArgs = null
        }
      }, limit)
    }
  }
}

// Check if two neurons overlap
function neuronsOverlap(neuron1: { x: number; y: number }, neuron2: { x: number; y: number }, minDistance: number = 40): boolean {
  const distance = Math.sqrt(
    Math.pow(neuron1.x - neuron2.x, 2) + 
    Math.pow(neuron1.y - neuron2.y, 2)
  )
  return distance < minDistance
}

// Generate neurons with no overlaps
function generateNeurons(width: number, height: number, count: number): Neuron[] {
  const neurons: Neuron[] = []
  const margin = 80
  const minDistance = 45
  const maxAttempts = 100

  for (let i = 0; i < count; i++) {
    let attempts = 0
    let x: number, y: number
    let validPosition = false

    while (attempts < maxAttempts && !validPosition) {
      x = margin + Math.random() * (width - 2 * margin)
      y = margin + Math.random() * (height - 2 * margin)
      
      validPosition = true
      
      // Check against existing neurons
      for (const existingNeuron of neurons) {
        if (neuronsOverlap({ x, y }, existingNeuron, minDistance)) {
          validPosition = false
          break
        }
      }
      
      attempts++
    }

    if (validPosition) {
      neurons.push({
        id: i,
        x: x!,
        y: y!,
        connections: [],
        isActive: false,
        activationTime: 0,
        lastFired: 0,
        signalQueue: []
      })
    }
  }

  return neurons
}

// Create network connections
function createNetworkConnections(neurons: Neuron[], maxConnections: number = 4, maxDistance: number = 250): void {
  neurons.forEach((neuron, index) => {
    const nearbyNeurons = neurons
      .map((other, otherIndex) => ({ neuron: other, index: otherIndex, distance: 0 }))
      .filter(({ index: otherIndex }) => otherIndex !== index)
      .map(({ neuron: other, index: otherIndex }) => ({
        neuron: other,
        index: otherIndex,
        distance: Math.sqrt(
          Math.pow(neuron.x - other.x, 2) + 
          Math.pow(neuron.y - other.y, 2)
        )
      }))
      .filter(({ distance }) => distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, maxConnections)

    neuron.connections = nearbyNeurons.map(({ index }) => index)
  })
}

export default function NeuralBackground({ disabled = false }: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const neuronsRef = useRef<Neuron[]>([])
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isVisible, setIsVisible] = useState(true)

  // Initialize dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
    }

    updateDimensions()
    
    const throttledResize = throttle(updateDimensions, 250)
    window.addEventListener('resize', throttledResize)
    
    return () => window.removeEventListener('resize', throttledResize)
  }, [])

  // Initialize neurons with better procedural generation
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const neuronCount = Math.floor((dimensions.width * dimensions.height) / 20000)
    const minNeurons = 25
    const maxNeurons = 60
    const finalNeuronCount = Math.max(minNeurons, Math.min(maxNeurons, neuronCount))
    
    const newNeurons = generateNeurons(dimensions.width, dimensions.height, finalNeuronCount)
    createNetworkConnections(newNeurons)
    
    neuronsRef.current = newNeurons
  }, [dimensions])

  // Mouse tracking with very close proximity detection
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (disabled || !isVisible) return
      
      mousePositionRef.current = { x: e.clientX, y: e.clientY }
    },
    [disabled, isVisible]
  )

  const throttledHandleMouseMove = useMemo(
    () => throttle(handleMouseMove, 16), // ~60fps
    [handleMouseMove]
  )

  useEffect(() => {
    if (disabled) return
    
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', throttledHandleMouseMove)
      return () => window.removeEventListener('mousemove', throttledHandleMouseMove)
    }
  }, [disabled, throttledHandleMouseMove])

  // Visibility observer
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  // Animation loop with optimized performance
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0 || dimensions.height === 0 || !isVisible) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    canvas.style.willChange = 'transform'
    ctx.imageSmoothingEnabled = false
    
    let lastTime = 0
    const targetFPS = 30
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      
      if (deltaTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      
      lastTime = currentTime - (deltaTime % frameInterval)
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      const neurons = neuronsRef.current
      const mousePos = mousePositionRef.current
      const currentTimeMs = currentTime

      // Update neuron states based on mouse proximity
      neurons.forEach(neuron => {
        const distance = Math.sqrt(
          Math.pow(neuron.x - mousePos.x, 2) + 
          Math.pow(neuron.y - mousePos.y, 2)
        )

        const activationDistance = 60 // Increased proximity distance

        if (distance < activationDistance) {
          if (!neuron.isActive) {
            neuron.isActive = true
            neuron.activationTime = currentTimeMs
          }
        } else if (neuron.isActive && currentTimeMs - neuron.activationTime > 400) {
          neuron.isActive = false
          neuron.activationTime = 0
        }

        // Propagate signals
        if (neuron.isActive && currentTimeMs - neuron.lastFired > 800) {
          neuron.connections.forEach(connectionId => {
            const signalId = `${neuron.id}-${connectionId}-${currentTimeMs}`
            const signal: Signal = {
              id: signalId,
              fromNeuron: neuron.id,
              toNeuron: connectionId,
              progress: 0,
              startTime: currentTimeMs,
              duration: 1200 + Math.random() * 800,
              intensity: 1.0
            }
            
            neurons[connectionId].signalQueue.push(signal)
          })
          
          neuron.lastFired = currentTimeMs
        }

        // Update existing signals
        neuron.signalQueue = neuron.signalQueue.filter(signal => {
          const elapsed = currentTimeMs - signal.startTime
          signal.progress = Math.min(1, elapsed / signal.duration)
          signal.intensity = 1 - (signal.progress * 0.8)
          return signal.progress < 1
        })
      })

      // Draw connections
      neurons.forEach(neuron => {
        neuron.connections.forEach(connectionId => {
          const connectedNeuron = neurons[connectionId]
          if (connectedNeuron) {
            const isGlowing = neuron.isActive || connectedNeuron.isActive
            
            ctx.strokeStyle = isGlowing 
              ? `rgba(76, 175, 80, 0.4)`
              : `rgba(76, 175, 80, 0.15)`
            ctx.lineWidth = isGlowing ? 2 : 1
            
            ctx.beginPath()
            ctx.moveTo(neuron.x, neuron.y)
            ctx.lineTo(connectedNeuron.x, connectedNeuron.y)
            ctx.stroke()
          }
        })
      })

      // Draw signals traveling through connections
      neurons.forEach(neuron => {
        neuron.signalQueue.forEach(signal => {
          const fromNeuron = neurons[signal.fromNeuron]
          const toNeuron = neurons[signal.toNeuron]
          
          if (fromNeuron && toNeuron) {
            const x = fromNeuron.x + (toNeuron.x - fromNeuron.x) * signal.progress
            const y = fromNeuron.y + (toNeuron.y - fromNeuron.y) * signal.progress
            
            // Draw signal particle
            ctx.fillStyle = `rgba(76, 175, 80, ${signal.intensity * 0.8})`
            ctx.beginPath()
            ctx.arc(x, y, 3 + signal.intensity * 2, 0, Math.PI * 2)
            ctx.fill()
            
            // Draw signal trail
            ctx.strokeStyle = `rgba(76, 175, 80, ${signal.intensity * 0.3})`
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(fromNeuron.x, fromNeuron.y)
            ctx.lineTo(x, y)
            ctx.stroke()
          }
        })
      })

      // Draw neurons
      neurons.forEach(neuron => {
        const baseOpacity = neuron.isActive ? 0.9 : 0.4
        const baseSize = neuron.isActive ? 10 : 6
        
        // Neuron core
        ctx.fillStyle = `rgba(76, 175, 80, ${baseOpacity})`
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, baseSize, 0, Math.PI * 2)
        ctx.fill()

        // Active neuron glow
        if (neuron.isActive) {
          const time = currentTime * 0.005
          const pulse = Math.sin(time) * 0.3 + 0.7
          
          ctx.fillStyle = `rgba(76, 175, 80, ${0.2 * pulse})`
          ctx.beginPath()
          ctx.arc(neuron.x, neuron.y, 20, 0, Math.PI * 2)
          ctx.fill()
          
          ctx.fillStyle = `rgba(76, 175, 80, ${0.1 * pulse})`
          ctx.beginPath()
          ctx.arc(neuron.x, neuron.y, 30, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      canvas.style.willChange = 'auto'
    }
  }, [dimensions, isVisible])

  if (dimensions.width === 0 || dimensions.height === 0 || disabled) {
    return null
  }

  return (
    <motion.canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{ 
        zIndex: -1,
        transform: 'translateZ(0)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 0.5 }}
    />
  )
}