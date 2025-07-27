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

export default function NeuralBackground({ disabled = false }: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [neurons, setNeurons] = useState<Neuron[]>([])
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
    
    // Throttle resize events
    const throttledResize = throttle(updateDimensions, 250)
    window.addEventListener('resize', throttledResize)
    
    return () => window.removeEventListener('resize', throttledResize)
  }, [])

  // Initialize neurons
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const neuronCount = Math.floor((dimensions.width * dimensions.height) / 25000) // Reduced density
    const minNeurons = 15 // Reduced from 20
    const maxNeurons = 40 // Reduced from 60
    const finalNeuronCount = Math.max(minNeurons, Math.min(maxNeurons, neuronCount))
    
    const newNeurons: Neuron[] = []
    const margin = 100 // Keep some margin from edges

    // Create neurons distributed across the entire screen
    for (let i = 0; i < finalNeuronCount; i++) {
      const x = margin + Math.random() * (dimensions.width - 2 * margin)
      const y = margin + Math.random() * (dimensions.height - 2 * margin)
      
      newNeurons.push({
        id: i,
        x,
        y,
        connections: [],
        isActive: false,
        activationTime: 0
      })
    }

    // Create connections between nearby neurons
    newNeurons.forEach((neuron, index) => {
      newNeurons.forEach((otherNeuron, otherIndex) => {
        if (index !== otherIndex) {
          const distance = Math.sqrt(
            Math.pow(neuron.x - otherNeuron.x, 2) + 
            Math.pow(neuron.y - otherNeuron.y, 2)
          )
          
          // Reduced connection distance and max connections
          if (distance < 200 && neuron.connections.length < 3) {
            neuron.connections.push(otherIndex)
          }
        }
      })
    })

    setNeurons(newNeurons)
  }, [dimensions])

  // Throttled mouse tracking
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (disabled || !isVisible) return
      
      const newMousePos = { x: e.clientX, y: e.clientY }
      setMousePosition(newMousePos)

      // Only update neurons if canvas is visible
      setNeurons(prevNeurons => {
        return prevNeurons.map(neuron => {
          const distance = Math.sqrt(
            Math.pow(neuron.x - newMousePos.x, 2) + 
            Math.pow(neuron.y - newMousePos.y, 2)
          )

          if (distance < 100) { // Reduced activation distance
            return {
              ...neuron,
              isActive: true,
              activationTime: Date.now()
            }
          }

          if (neuron.isActive && Date.now() - neuron.activationTime > 300) { // Faster deactivation
            return {
              ...neuron,
              isActive: false,
              activationTime: 0
            }
          }

          return neuron
        })
      })
    },
    [disabled, isVisible]
  )

  // Throttled version of handleMouseMove
  const throttledHandleMouseMove = useMemo(
    () => throttle(handleMouseMove, 50),
    [handleMouseMove]
  )

  // Mouse tracking effect
  useEffect(() => {
    if (disabled) return
    
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', throttledHandleMouseMove)
      return () => window.removeEventListener('mousemove', throttledHandleMouseMove)
    }
  }, [disabled, throttledHandleMouseMove])

  // Add visibility observer to pause animation when off-screen
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

  // Animation loop with performance optimizations
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0 || dimensions.height === 0 || !isVisible) {
      // Cancel animation if not visible
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Set canvas to use GPU acceleration
    canvas.style.willChange = 'transform'
    ctx.imageSmoothingEnabled = false // Disable smoothing for better performance
    
    let lastTime = 0
    const targetFPS = 24 // Reduced to 24fps for better performance
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      
      // Only render at target FPS
      if (deltaTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      
      lastTime = currentTime - (deltaTime % frameInterval)
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw connections
      neurons.forEach(neuron => {
        neuron.connections.forEach(connectionId => {
          const connectedNeuron = neurons[connectionId]
          if (connectedNeuron) {
            const isGlowing = neuron.isActive || connectedNeuron.isActive
            
            ctx.strokeStyle = isGlowing 
              ? `rgba(76, 175, 80, 0.6)`
              : `rgba(76, 175, 80, 0.2)`
            ctx.lineWidth = isGlowing ? 2 : 1
            
            ctx.beginPath()
            ctx.moveTo(neuron.x, neuron.y)
            ctx.lineTo(connectedNeuron.x, connectedNeuron.y)
            ctx.stroke()

            if (isGlowing) {
              const time = Date.now() * 0.01
              const pulse = Math.sin(time) * 0.5 + 0.5
              
              ctx.fillStyle = `rgba(76, 175, 80, ${pulse * 0.6})`
              ctx.beginPath()
              ctx.arc(
                neuron.x + (connectedNeuron.x - neuron.x) * pulse,
                neuron.y + (connectedNeuron.y - neuron.y) * pulse,
                4,
                0,
                Math.PI * 2
              )
              ctx.fill()
            }
          }
        })
      })

      // Draw neurons
      neurons.forEach(neuron => {
        ctx.fillStyle = neuron.isActive 
          ? `rgba(76, 175, 80, 0.8)`
          : `rgba(76, 175, 80, 0.3)`
        
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, neuron.isActive ? 8 : 5, 0, Math.PI * 2)
        ctx.fill()

        if (neuron.isActive) {
          ctx.fillStyle = `rgba(76, 175, 80, 0.2)`
          ctx.beginPath()
          ctx.arc(neuron.x, neuron.y, 15, 0, Math.PI * 2)
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
      // Clean up will-change
      canvas.style.willChange = 'auto'
    }
  }, [dimensions, neurons, mousePosition, isVisible])

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
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 0.5 }}
    />
  )
}