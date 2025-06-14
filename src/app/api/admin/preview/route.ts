import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { error: 'Preview ID is required' },
      { status: 400 }
    )
  }

  // Extract the page name from the id (e.g., "about-1749862633822" -> "about")
  const pageName = id.split('-')[0]

  // In a real implementation, you might fetch preview data from a CMS or database
  // For now, we'll just return the page information
  return NextResponse.json({
    id,
    page: pageName,
    timestamp: Date.now(),
    preview: true,
    // You can add more preview-specific data here
  })
}