import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider'
import { AccessibilityProvider } from '@/components/AccessibilityProvider'
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react"
import SkipToContent from '@/components/SkipToContent'
import BackToTop from '@/components/BackToTop'
import GlobalAccessibilityControls from '@/components/GlobalAccessibilityControls'

export const metadata: Metadata = {
  metadataBase: new URL("https://www.expression.ngo"),
  title: {
    default: "Expression Neuroscience Institute",
    template: "%s | Expression Neuroscience Institute",
  },
  description: "Advancing neuroscience through innovative, accessible research. A nonprofit organization dedicated to open science, mental health research, and making neuroscience more accessible to everyone.",
  keywords: [
    "neuroscience",
    "mental health",
    "research",
    "nonprofit",
    "open science",
    "brain research",
    "psychology",
    "accessibility",
    "innovation"
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
    description: "Advancing neuroscience through innovative, accessible research. A nonprofit organization dedicated to open science and mental health research.",
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
    description: "Advancing neuroscience through innovative, accessible research.",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Load fonts from Google Fonts with fallback optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Font loading optimization - prevent layout shift */
            html { font-family: system-ui, -apple-system, sans-serif; }
            .font-loading { font-family: system-ui, -apple-system, sans-serif; }
            .font-loaded { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
          `
        }} />
        
        {/* Additional SEO meta tags */}
        <meta name="theme-color" content="#4F46E5" />
        <meta name="color-scheme" content="dark light" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        
        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NonprofitOrganization",
              "name": "Expression Neuroscience Institute",
              "url": "https://www.expression.ngo",
              "logo": "https://www.expression.ngo/logos/ENI_logo_pink_vector.svg",
              "description": "Advancing neuroscience through innovative, accessible research. A nonprofit organization dedicated to open science and mental health research.",
              "foundingDate": "04/14/2025",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://github.com/expressionneuroscienceinstitute"
              ],
              "areaServed": "Worldwide",
              "knowsAbout": [
                "Neuroscience",
                "Mental Health",
                "Research",
                "Open Science",
                "Brain Research"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <SkipToContent />
        <ThemeProvider>
          <AccessibilityProvider>
            {children}
            <GlobalAccessibilityControls />
          </AccessibilityProvider>
        </ThemeProvider>
        <BackToTop />
        {/* Load third-party scripts after user interaction to improve initial load */}
        <Script 
          id="donorbox-popup-button-installer" 
          src="https://donorbox.org/install-popup-button.js" 
          strategy="lazyOnload"
          data-href="https://donorbox.org/expression-neuroscience-institute?default_interval=q" 
          data-style="background: #0c0027; color: #fff; text-decoration: none; font-family: Verdana, sans-serif; display: flex; gap: 8px; width: fit-content; font-size: 16px; border-radius: 0 0 5px 5px; line-height: 24px; position: fixed; top: 50%; transform-origin: center; z-index: 9999; overflow: hidden; padding: 8px 22px 8px 18px; left: 20px; transform: translate(-50%, -50%) rotate(-90deg)" 
          data-button-cta="Donate" 
          data-img-src="https://donorbox.org/images/white_logo.svg" 
          data-reminder-widget-enabled="true"
        />
        <Analytics />
      </body>
    </html>
  );
}
