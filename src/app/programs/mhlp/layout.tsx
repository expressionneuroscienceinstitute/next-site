import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mental Health Labeling Platform',
  description: 'Data analysis tools for mental health research and pattern recognition. A platform for creating and sharing mental health datasets to find patterns that might be useful for research.',
  openGraph: {
    title: 'Mental Health Labeling Platform | Expression Neuroscience Institute',
    description: 'Data analysis tools for mental health research and pattern recognition. Coming soon from Expression Neuroscience Institute.',
    url: 'https://www.expression.ngo/programs/mhlp',
  },
  twitter: {
    title: 'Mental Health Labeling Platform | Expression Neuroscience Institute',
    description: 'Data analysis tools for mental health research and pattern recognition. Coming soon from Expression Neuroscience Institute.',
  },
  alternates: {
    canonical: 'https://www.expression.ngo/programs/mhlp',
  },
  keywords: [
    'mental health',
    'data analysis',
    'research tools',
    'pattern recognition',
    'neuroscience',
    'open science',
    'datasets'
  ],
}

export default function MHLPLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}