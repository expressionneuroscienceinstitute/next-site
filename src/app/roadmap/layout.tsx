import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roadmap',
  description:
    'The development roadmap for Expression Neuroscience Institute and the open-source Microneedle Array EEG research program.',
  openGraph: {
    title: 'Roadmap | Expression Neuroscience Institute',
    description:
      'The development roadmap for our open-source Microneedle Array EEG research program.',
    url: 'https://www.expression.ngo/roadmap',
  },
  twitter: {
    title: 'Roadmap | Expression Neuroscience Institute',
    description:
      'The development roadmap for our open-source Microneedle Array EEG research program.',
  },
  alternates: {
    canonical: 'https://www.expression.ngo/roadmap',
  },
  keywords: [
    'roadmap',
    'timeline',
    'microneedle EEG',
    'open hardware',
    'neuroscience research',
    'project milestones',
  ],
}

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}