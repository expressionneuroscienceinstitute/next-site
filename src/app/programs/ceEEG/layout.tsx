import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Continuous Embedded Electroencephalogram',
  description: 'Building open source, non-invasive brain-computer interfaces that work for real people. Transparent, secure, community-driven neurotechnology - not proprietary black boxes.',
  openGraph: {
    title: 'Continuous Embedded Electroencephalogram | Expression Neuroscience Institute',
    description: 'ceEEG is building open source, non-invasive BCIs that actually work for people. We believe brain-computer interfaces must be transparent, secure, and user-controlled - technology that serves humanity, not corporations.',
    url: 'https://www.expression.ngo/programs/ceEEG',
  },
  twitter: {
    title: 'Continuous Embedded Electroencephalogram | Expression Neuroscience Institute',
    description: 'Building open source BCIs that work for real people. Join the movement for transparent, secure, user-controlled neurotechnology.',
  },
  alternates: {
    canonical: 'https://www.expression.ngo/programs/ceEEG',
  },
  keywords: [
    'ceEEG',
    'brain monitoring',
    'ambulatory EEG',
    'BCI',
    'brain-computer interface',
    'neuroscience',
    'non-invasive',
    'long-term EEG',
    'neurotechnology',
    'mental health',
    'research',
    'open science',
    'EEG research'
  ],
}

export default function ceEEGLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}