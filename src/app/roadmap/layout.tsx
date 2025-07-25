import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'Explore the development roadmap and timeline for Expression Neuroscience Institute programs including Insight and ceEEG, a novel and non-invasive method of measuring brain activity in real-time for up to 3 months—enabling accessible Brain-Computer Interfaces (BCIs) and new frontiers in neuroscience.',
  openGraph: {
    title: 'Roadmap | Expression Neuroscience Institute',
    description: 'Explore our development roadmap and timeline for neuroscience research programs.',
    url: 'https://www.expression.ngo/roadmap',
  },
  twitter: {
    title: 'Roadmap | Expression Neuroscience Institute', 
    description: 'Explore our development roadmap and timeline for neuroscience research programs.',
  },
  alternates: {
    canonical: 'https://www.expression.ngo/roadmap',
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