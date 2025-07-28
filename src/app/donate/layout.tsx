import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Support our mission to advance neuroscience research and mental health through open-source tools and datasets.',
}

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 