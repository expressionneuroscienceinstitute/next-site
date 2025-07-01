import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about the Expression Neuroscience Institute, our mission, board members, and vision for advancing neuroscience through innovative, accessible research.',
  openGraph: {
    title: 'About Us | Expression Neuroscience Institute',
    description: 'Learn about our mission, board members, and vision for advancing neuroscience through innovative, accessible research.',
    url: 'https://www.expression.ngo/about',
  },
  twitter: {
    title: 'About Us | Expression Neuroscience Institute',
    description: 'Learn about our mission, board members, and vision for advancing neuroscience through innovative, accessible research.',
  },
  alternates: {
    canonical: 'https://www.expression.ngo/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}