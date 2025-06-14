'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

export default function PreviewPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Extract the page from the id (e.g., "about-1749862633822" -> "about")
    if (id) {
      const page = id.split('-')[0]
      // Redirect to the actual page
      redirect(`/${page}`)
    } else {
      // No id provided, redirect to home
      redirect('/')
    }
  }, [id])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg">Loading preview...</p>
      </div>
    </div>
  )
}