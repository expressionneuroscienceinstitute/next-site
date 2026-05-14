'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'

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

export interface NeuralBackgroundProps {
  /** When false, draws a single idle frame (no signals, no mouse pulses). */
  motionEnabled?: boolean
  /** Extra halos and brighter trails on active nodes. */
  glowEffectsEnabled?: boolean
  /** True: canvas is in the document layer (scrolls with the page). False: fills the viewport (fixed). */
  stickyWithPage?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function throttle(func: (...args: any[]) => any, limit: number) {
  let inThrottle = false
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lastArgs: any[] | null = null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (...args: any[]) {
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

function neuronsOverlap(
  neuron1: { x: number; y: number },
  neuron2: { x: number; y: number },
  minDistance: number = 40,
): boolean {
  const distance = Math.sqrt(
    Math.pow(neuron1.x - neuron2.x, 2) + Math.pow(neuron1.y - neuron2.y, 2),
  )
  return distance < minDistance
}

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
        signalQueue: [],
      })
    }
  }

  return neurons
}

function createNetworkConnections(neurons: Neuron[], maxConnections: number = 4, maxDistance: number = 250): void {
  neurons.forEach((neuron, index) => {
    const nearbyNeurons = neurons
      .map((other, otherIndex) => ({ neuron: other, index: otherIndex, distance: 0 }))
      .filter(({ index: otherIndex }) => otherIndex !== index)
      .map(({ neuron: other, index: otherIndex }) => ({
        neuron: other,
        index: otherIndex,
        distance: Math.sqrt(Math.pow(neuron.x - other.x, 2) + Math.pow(neuron.y - other.y, 2)),
      }))
      .filter(({ distance }) => distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, maxConnections)

    neuron.connections = nearbyNeurons.map(({ index }) => index)
  })
}

export default function NeuralBackground({
  motionEnabled = true,
  glowEffectsEnabled = true,
  stickyWithPage = false,
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const neuronsRef = useRef<Neuron[]>([])
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return

      if (!stickyWithPage) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
        return
      }

      const footer = document.querySelector('footer') as HTMLElement | null
      const footerHeight = footer?.offsetHeight || 0
      const doc = document.documentElement
      const body = document.body
      const fullHeight = Math.max(
        body?.scrollHeight || 0,
        doc?.scrollHeight || 0,
        body?.offsetHeight || 0,
        doc?.offsetHeight || 0,
        body?.clientHeight || 0,
        doc?.clientHeight || 0,
      )

      setDimensions({
        width: window.innerWidth,
        height: Math.max(0, fullHeight - footerHeight),
      })
    }

    updateDimensions()

    const throttledResize = throttle(updateDimensions, 250)
    window.addEventListener('resize', throttledResize)

    const resizeObserver = new ResizeObserver(throttledResize)
    if (document.body) resizeObserver.observe(document.body)
    const footer = document.querySelector('footer') as HTMLElement | null
    if (footer) resizeObserver.observe(footer)

    return () => {
      window.removeEventListener('resize', throttledResize)
      resizeObserver.disconnect()
    }
  }, [stickyWithPage])

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

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!motionEnabled || !isVisible) return
      const canvas = canvasRef.current
      if (!canvas) return
      const r = canvas.getBoundingClientRect()
      mousePositionRef.current = {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
      }
    },
    [motionEnabled, isVisible],
  )

  const throttledHandleMouseMove = useMemo(() => throttle(handleMouseMove, 16), [handleMouseMove])

  useEffect(() => {
    if (!motionEnabled) return

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', throttledHandleMouseMove)
      return () => window.removeEventListener('mousemove', throttledHandleMouseMove)
    }
  }, [motionEnabled, throttledHandleMouseMove])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.01, rootMargin: stickyWithPage ? '200px 0px 200px 0px' : '0px' },
    )

    observer.observe(canvas)
    return () => observer.disconnect()
  }, [stickyWithPage])

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

    const drawIdle = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)
      const neurons = neuronsRef.current
      const dim = glowEffectsEnabled ? 0.15 : 0.1
      const dimActive = glowEffectsEnabled ? 0.35 : 0.22

      neurons.forEach((neuron) => {
        neuron.connections.forEach((connectionId) => {
          const connectedNeuron = neurons[connectionId]
          if (connectedNeuron) {
            ctx.strokeStyle = `rgba(76, 175, 80, ${dim})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(neuron.x, neuron.y)
            ctx.lineTo(connectedNeuron.x, connectedNeuron.y)
            ctx.stroke()
          }
        })
      })

      neurons.forEach((neuron) => {
        ctx.fillStyle = `rgba(76, 175, 80, ${dimActive})`
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, 5, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    if (!motionEnabled) {
      drawIdle()
      canvas.style.willChange = 'auto'
      return () => {
        canvas.style.willChange = 'auto'
      }
    }

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

      neurons.forEach((neuron) => {
        const distance = Math.sqrt(
          Math.pow(neuron.x - mousePos.x, 2) + Math.pow(neuron.y - mousePos.y, 2),
        )

        const activationDistance = 60

        if (distance < activationDistance) {
          if (!neuron.isActive) {
            neuron.isActive = true
            neuron.activationTime = currentTimeMs
          }
        } else if (neuron.isActive && currentTimeMs - neuron.activationTime > 400) {
          neuron.isActive = false
          neuron.activationTime = 0
        }

        if (neuron.isActive && currentTimeMs - neuron.lastFired > 800) {
          neuron.connections.forEach((connectionId) => {
            const signal: Signal = {
              id: `${neuron.id}-${connectionId}-${currentTimeMs}`,
              fromNeuron: neuron.id,
              toNeuron: connectionId,
              progress: 0,
              startTime: currentTimeMs,
              duration: 1200 + Math.random() * 800,
              intensity: 1.0,
            }

            neurons[connectionId].signalQueue.push(signal)
          })

          neuron.lastFired = currentTimeMs
        }

        neuron.signalQueue = neuron.signalQueue.filter((signal) => {
          const elapsed = currentTimeMs - signal.startTime
          signal.progress = Math.min(1, elapsed / signal.duration)
          signal.intensity = 1 - signal.progress * 0.8
          return signal.progress < 1
        })
      })

      const edge = glowEffectsEnabled ? 0.4 : 0.28
      const edgeMuted = glowEffectsEnabled ? 0.15 : 0.1
      const lw = glowEffectsEnabled ? 2 : 1

      neurons.forEach((neuron) => {
        neuron.connections.forEach((connectionId) => {
          const connectedNeuron = neurons[connectionId]
          if (connectedNeuron) {
            const isGlowing = neuron.isActive || connectedNeuron.isActive

            ctx.strokeStyle = isGlowing ? `rgba(76, 175, 80, ${edge})` : `rgba(76, 175, 80, ${edgeMuted})`
            ctx.lineWidth = isGlowing ? lw : 1

            ctx.beginPath()
            ctx.moveTo(neuron.x, neuron.y)
            ctx.lineTo(connectedNeuron.x, connectedNeuron.y)
            ctx.stroke()
          }
        })
      })

      const signalAlpha = glowEffectsEnabled ? 0.8 : 0.55
      const trailAlpha = glowEffectsEnabled ? 0.3 : 0.18

      neurons.forEach((neuron) => {
        neuron.signalQueue.forEach((signal) => {
          const fromNeuron = neurons[signal.fromNeuron]
          const toNeuron = neurons[signal.toNeuron]

          if (fromNeuron && toNeuron) {
            const x = fromNeuron.x + (toNeuron.x - fromNeuron.x) * signal.progress
            const y = fromNeuron.y + (toNeuron.y - fromNeuron.y) * signal.progress

            ctx.fillStyle = `rgba(76, 175, 80, ${signal.intensity * signalAlpha})`
            ctx.beginPath()
            ctx.arc(x, y, 3 + signal.intensity * 2, 0, Math.PI * 2)
            ctx.fill()

            ctx.strokeStyle = `rgba(76, 175, 80, ${signal.intensity * trailAlpha})`
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(fromNeuron.x, fromNeuron.y)
            ctx.lineTo(x, y)
            ctx.stroke()
          }
        })
      })

      neurons.forEach((neuron) => {
        const baseOpacity = neuron.isActive ? 0.9 : 0.4
        const baseSize = neuron.isActive ? 10 : 6

        ctx.fillStyle = `rgba(76, 175, 80, ${baseOpacity})`
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, baseSize, 0, Math.PI * 2)
        ctx.fill()

        if (neuron.isActive && glowEffectsEnabled) {
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
  }, [dimensions, isVisible, motionEnabled, glowEffectsEnabled])

  if (dimensions.width === 0 || dimensions.height === 0) {
    return null
  }

  return (
    <div
      className={
        stickyWithPage
          ? 'pointer-events-none absolute left-0 right-0 top-0 z-0 w-full'
          : 'pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden'
      }
      style={stickyWithPage ? { height: dimensions.height } : undefined}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="block h-full w-full opacity-[0.38] dark:opacity-[0.34]"
        style={{ transform: 'translateZ(0)' }}
      />
    </div>
  )
}
