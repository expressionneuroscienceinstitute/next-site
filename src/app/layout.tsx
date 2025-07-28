import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider'
import { AccessibilityProvider } from '@/components/AccessibilityProvider'
import LazyAnalytics from '@/components/LazyAnalytics'
import SkipToContent from '@/components/SkipToContent'
import LazyBackToTop from '@/components/LazyBackToTop'

import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

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
  const structuredData = {
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
  };

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/logos/ENI_logo_pink_vector.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/favicon.ico" as="image" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//vercel.live" />
        
        {/* Additional SEO meta tags */}
        <meta name="theme-color" content="#4F46E5" />
        <meta name="color-scheme" content="dark light" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        
        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HKMQDNQJTV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HKMQDNQJTV');
            `
          }}
        />
      </head>

      <body className={`${inter.className} font-sans`} suppressHydrationWarning>
        <SkipToContent />
        <ThemeProvider>
          <AccessibilityProvider>
            {children}
          </AccessibilityProvider>
        </ThemeProvider>
        <LazyBackToTop />
        <LazyAnalytics />
        
        {/* Add scroll performance script after body is available */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined' && typeof document !== 'undefined') {
                  let scrollTimeout;
                  const body = document.body;
                  
                  if (body) {
                    function handleScroll() {
                      if (!body.classList.contains('is-scrolling')) {
                        body.classList.add('is-scrolling');
                      }
                      
                      clearTimeout(scrollTimeout);
                      scrollTimeout = setTimeout(() => {
                        body.classList.remove('is-scrolling');
                      }, 150);
                    }
                    
                    window.addEventListener('scroll', handleScroll, { passive: true });
                  }
                }
              })();
            `
          }}
        />
      </body>
    </html>
  );
}
