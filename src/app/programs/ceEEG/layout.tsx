import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Continuous Embedded Electroencephalogram',
  description: 'Building open source, non-invasive brain-computer interfaces that work for real people. Transparent, secure, community-driven neurotechnology - not proprietary black boxes.',
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