import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider'
import { AccessibilityProvider } from '@/components/AccessibilityProvider'
import LazyAnalytics from '@/components/LazyAnalytics'
import SkipToContent from '@/components/SkipToContent'
import LazyBackToTop from '@/components/LazyBackToTop'
import DonorboxPopupButton from '@/components/DonorboxPopupButton'
import LazyNeuralBackground from '@/components/LazyNeuralBackground'
import ScrollPerformanceScript from '@/components/ScrollPerformanceScript'
import { GoogleTagManager } from '@next/third-parties/google'

import { Inter, Syne } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['600', '700', '800'],
})

const SITE_DESCRIPTION =
  "A Gen-Z, neurodivergent-led nonprofit building open-source neuroscience. Currently documenting the design of microneedle-array EEGs in public."

export const metadata: Metadata = {
  metadataBase: new URL("https://www.expression.ngo"),
  title: {
    default: "Expression Neuroscience Institute",
    template: "%s | Expression Neuroscience Institute",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "neuroscience",
    "microneedle EEG",
    "microneedle array",
    "open hardware",
    "open science",
    "brain-computer interface",
    "neurodivergent",
    "nonprofit research",
    "mental health",
    "neurotechnology",
  ],
  authors: [{ name: "Expression Neuroscience Institute" }],
  creator: "Expression Neuroscience Institute",
  publisher: "Expression Neuroscience Institute",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.expression.ngo",
    siteName: "Expression Neuroscience Institute",
    title: "Expression Neuroscience Institute",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/logos/ENI_logo_pink_vector.svg",
        width: 1200,
        height: 630,
        alt: "Expression Neuroscience Institute Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expression Neuroscience Institute",
    description: SITE_DESCRIPTION,
    images: ["/logos/ENI_logo_pink_vector.svg"],
    creator: "@ExpressionNeuroscience",
    site: "@ExpressionNeuroscience",
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
  },
  alternates: {
    canonical: "https://www.expression.ngo",
  },
  category: "Science & Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NonprofitOrganization",
    name: "Expression Neuroscience Institute",
    url: "https://www.expression.ngo",
    logo: "https://www.expression.ngo/logos/ENI_logo_pink_vector.svg",
    description: SITE_DESCRIPTION,
    foundingDate: "2025-04-14",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    sameAs: [
      "https://github.com/expressionneuroscienceinstitute",
    ],
    areaServed: "Worldwide",
    knowsAbout: [
      "Microneedle Array EEG",
      "Open Hardware",
      "Open Science",
      "Neuroscience",
      "Mental Health",
      "Neurodivergent Research",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${syne.variable}`}>
      <head>
        <link rel="preload" href="/logos/ENI_logo_pink_vector.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/favicon.ico" as="image" />

        <link rel="dns-prefetch" href="//vercel.live" />

        <meta name="theme-color" content="#10002b" />
        <meta name="color-scheme" content="dark light" />
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>

      <body className={`${inter.className} font-sans`} suppressHydrationWarning>
        <AccessibilityProvider>
          <ThemeProvider>
            <div className="relative isolate min-h-screen w-full">
              <LazyNeuralBackground />
              <div className="relative z-[1] flex min-h-screen w-full flex-col">
                <SkipToContent />
                {children}
                <LazyBackToTop />
              </div>
            </div>
          </ThemeProvider>
        </AccessibilityProvider>
        <DonorboxPopupButton />
        <LazyAnalytics />
        <GoogleTagManager gtmId="GTM-MFDMW9W8" />
        <ScrollPerformanceScript />
      </body>
    </html>
  );
}
