import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider'
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Improve font loading performance
  preload: true
});

export const metadata: Metadata = {
  title: "Expression Neuroscience Institute",
  description: "Advancing neuroscience through innovative, accessible research.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/logos/ENI_logo_pink_vector.svg" as="image" type="image/svg+xml" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
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
