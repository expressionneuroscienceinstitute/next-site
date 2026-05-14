'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    // Honeypot — must stay empty. Hidden from real users via CSS.
    website: '',
  })
  const [renderedAt, setRenderedAt] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    setMounted(true)
    setRenderedAt(Date.now())
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          website: formData.website,
          renderedAt,
        })
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setIsSuccess(true)
        setSubmitMessage('Thank you for your message! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '', website: '' })

        // Track conversion for Google Ads
        if (typeof window !== 'undefined' && window.dataLayer) {
          // Generate unique transaction ID
          const transactionId = `contact_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`

          window.dataLayer.push({
            'event': 'conversion_complete',
            'conversion_type': 'contact_form',
            'transaction_id': transactionId,
            'value': 1
          })
        }
      } else {
        setSubmitMessage(result.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-tech-grid bg-gradient-to-br from-background-light via-secondary/10 to-purple-light/5 dark:from-background-dark dark:via-purple-dark/5 dark:to-accent-dark/3">
      <Navbar />
      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16" tabIndex={-1}>
        <div className="panel p-8 md:p-10">
          <div className="mb-8">
            <span className="eyebrow">{'// contact'}</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark">
              Say hi
            </h1>
            <p className="mt-3 text-lg text-muted-light dark:text-muted-dark">
              Questions, collaborations, criticism, weird ideas about
              microneedles — bring them all. We read everything.
            </p>
          </div>

          {!mounted ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
            </div>
          ) : isSuccess ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h2 className="text-xl font-semibold text-green-800 dark:text-green-200">
                  Message Sent Successfully!
                </h2>
              </div>
              <p className="text-green-700 dark:text-green-300 mb-4">
                Thank you for reaching out to us. We&apos;ve received your message and will get back to you within 1-2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    maxLength={120}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-text-light dark:text-text-dark placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent"
                    placeholder="Your full name"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    maxLength={254}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-text-light dark:text-text-dark placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent"
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  maxLength={200}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-text-light dark:text-text-dark placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent"
                  placeholder="What's this about?"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  maxLength={5000}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-text-light dark:text-text-dark placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent resize-vertical"
                  placeholder="Tell us about your inquiry, collaboration ideas, or how you'd like to support our research..."
                  disabled={isSubmitting}
                />
              </div>

              {/* Honeypot field — hidden from humans, attractive to bots. */}
              <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="website">Leave this field blank</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-accent-light dark:bg-accent-dark text-white px-8 py-3 rounded-lg font-medium hover:bg-accent-light/90 dark:hover:bg-accent-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>

              {submitMessage && !isSuccess && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-200">
                    {submitMessage}
                  </p>
                </div>
              )}
            </form>
          )}

          <div className="mt-12 pt-8 border-t border-purple-200/60 dark:border-purple-500/20">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-accent-light dark:text-accent-dark mb-4">
              {'// other ways in'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">
                  Collaborate
                </h3>
                <p className="text-muted-light dark:text-muted-dark text-sm">
                  Research partnership, lab loaner, or co-authoring? Tell us
                  what you&apos;re working on — we don&apos;t bite.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-light dark:text-text-dark mb-2">
                  Fund the work
                </h3>
                <p className="text-muted-light dark:text-muted-dark text-sm">
                  Grants, donations, or just lab supplies on our wishlist.
                  Every dollar is documented in public.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}