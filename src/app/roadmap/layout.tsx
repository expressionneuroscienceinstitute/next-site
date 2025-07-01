import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'Explore the development roadmap and timeline for Expression Neuroscience Institute programs including Insight and Mental Health Labeling Platform.',
  openGraph: {
    title: 'Roadmap | Expression Neuroscience Institute',
    description: 'Explore our development roadmap and timeline for neuroscience research programs.',
    url: 'https://expression-neuroscience.org/roadmap',
  },
  twitter: {
    title: 'Roadmap | Expression Neuroscience Institute', 
    description: 'Explore our development roadmap and timeline for neuroscience research programs.',
  },
  alternates: {
    canonical: 'https://expression-neuroscience.org/roadmap',
  },
  keywords: [
    'roadmap',
    'timeline',
    'development',
    'neuroscience programs',
    'research timeline',
    'project milestones'
  ],
}

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}