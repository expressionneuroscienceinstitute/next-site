import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ["latin"] });
import { Analytics } from "@vercel/analytics/react"

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
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
