import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the Expression Neuroscience Institute, our mission, board members, and vision for advancing neuroscience through innovative, accessible research.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}