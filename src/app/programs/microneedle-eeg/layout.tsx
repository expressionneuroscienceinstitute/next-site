import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Microneedle Array EEG',
  description:
    'An open, in-public R&D log: designing a comfortable, low-impedance, gel-free EEG headset using microneedle arrays. Unfunded research by Expression Neuroscience Institute.',
  keywords: [
    'microneedle EEG',
    'microneedle array',
    'dry electrode',
    'gel-free EEG',
    'open hardware EEG',
    'biopotential electrode',
    'neurotechnology',
    'open science',
    'neurodivergent',
  ],
  alternates: {
    canonical: 'https://www.expression.ngo/programs/microneedle-eeg',
  },
}

export default function MicroneedleEegLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
