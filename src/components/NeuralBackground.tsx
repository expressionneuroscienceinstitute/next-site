'use client'

import { useEffect, useRef, useState } from 'react'
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

export default function NeuralBackground({ disabled = false }: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [neurons, setNeurons] = useState<Neuron[]>([])

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
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Initialize neurons
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const neuronCount = Math.floor((dimensions.width * dimensions.height) / 15000) // Scale with screen size
    const minNeurons = 20
    const maxNeurons = 60
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
          
          // Connect neurons within a larger distance and allow more connections
          if (distance < 250 && neuron.connections.length < 4) {
            neuron.connections.push(otherIndex)
          }
        }
      })
    })

    setNeurons(newNeurons)
  }, [dimensions])

  // Mouse tracking and neuron activation
  useEffect(() => {
    if (disabled) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const newMousePos = { x: e.clientX, y: e.clientY }
      setMousePosition(newMousePos)

      // Check if mouse is near any neuron and activate it
      setNeurons(prevNeurons => {
        return prevNeurons.map(neuron => {
          const distance = Math.sqrt(
            Math.pow(neuron.x - newMousePos.x, 2) + 
            Math.pow(neuron.y - newMousePos.y, 2)
          )

          if (distance < 120) { // Slightly smaller activation distance
            return {
              ...neuron,
              isActive: true,
              activationTime: Date.now()
            }
          }

          // Deactivate after 400ms for quicker firing
          if (neuron.isActive && Date.now() - neuron.activationTime > 400) {
            return {
              ...neuron,
              isActive: false,
              activationTime: 0
            }
          }

          return neuron
        })
      })
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [disabled])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number | null = null

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw connections
      neurons.forEach(neuron => {
        neuron.connections.forEach(connectionId => {
          const connectedNeuron = neurons[connectionId]
          if (connectedNeuron) {
            // Make connections glow when either neuron is active
            const isGlowing = neuron.isActive || connectedNeuron.isActive
            
            ctx.strokeStyle = isGlowing 
              ? `rgba(76, 175, 80, 0.6)`
              : `rgba(76, 175, 80, 0.2)`
            ctx.lineWidth = isGlowing ? 2 : 1
            
            ctx.beginPath()
            ctx.moveTo(neuron.x, neuron.y)
            ctx.lineTo(connectedNeuron.x, connectedNeuron.y)
            ctx.stroke()

            // Add faster pulsing effect along connections when active
            if (isGlowing) {
              const time = Date.now() * 0.01 // Faster pulsing
              const pulse = Math.sin(time) * 0.5 + 0.5
              
              ctx.fillStyle = `rgba(76, 175, 80, ${pulse * 0.6})`
              ctx.beginPath()
              ctx.arc(
                neuron.x + (connectedNeuron.x - neuron.x) * pulse,
                neuron.y + (connectedNeuron.y - neuron.y) * pulse,
                4, // Slightly larger pulse dots
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
        // Neuron body
        ctx.fillStyle = neuron.isActive 
          ? `rgba(76, 175, 80, 0.8)`
          : `rgba(76, 175, 80, 0.3)`
        
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, neuron.isActive ? 8 : 5, 0, Math.PI * 2)
        ctx.fill()

        // Glow effect when active
        if (neuron.isActive) {
          ctx.fillStyle = `rgba(76, 175, 80, 0.2)`
          ctx.beginPath()
          ctx.arc(neuron.x, neuron.y, 15, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [dimensions, neurons, mousePosition])

  if (dimensions.width === 0 || dimensions.height === 0 || disabled) {
    return null
  }

  return (
    <motion.canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{ zIndex: -1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 2 }}
    />
  )
}