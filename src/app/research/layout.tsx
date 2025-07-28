import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Research datasets and publications from the Expression Neuroscience Institute.',
}

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 