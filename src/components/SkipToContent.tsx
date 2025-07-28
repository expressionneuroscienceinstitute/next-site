'use client'

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="fixed top-4 left-4 z-50 px-4 py-2 bg-accent-light dark:bg-accent-dark text-white rounded-md shadow-lg outline-none ring-2 ring-accent-light dark:ring-accent-dark ring-offset-2 transform -translate-y-16 focus:translate-y-0 transition-transform"
      tabIndex={0}
    >
      Skip to main content
    </a>
  )
}