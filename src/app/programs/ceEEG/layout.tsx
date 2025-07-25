import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Continuous Embedded Electroencephalogram',
  description: 'A novel and non-invasive method of measuring brain activity in real-time, with a maximum ambulatory duration of 3 months, compared to the current max ambulatory duration of 72 hours; ceEEG has the potential to make Brain-Computer Interfaces (BCIs) more accessible to the general public.',
  openGraph: {
    title: 'Continuous Embedded Electroencephalogram | Expression Neuroscience Institute',
    description: 'ceEEG is a groundbreaking, non-invasive technology for real-time brain monitoring. With a maximum ambulatory duration of 3 months—far surpassing the current 72-hour standard—ceEEG paves the way for accessible, long-term Brain-Computer Interfaces (BCIs) and new frontiers in neuroscience and clinical care.',
    url: 'https://www.expression.ngo/programs/ceEEG',
  },
  twitter: {
    title: 'Continuous Embedded Electroencephalogram | Expression Neuroscience Institute',
    description: 'ceEEG enables non-invasive, real-time brain monitoring for up to 3 months, making advanced Brain-Computer Interfaces (BCIs) more accessible to the public and transforming neuroscience research.',
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
    'research tools',
    'pattern recognition',
    'open science',
    'datasets'
  ],
}

export default function ceEEGLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}