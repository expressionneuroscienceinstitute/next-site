import { NextRequest, NextResponse } from 'next/server'

const MONDAY_API_URL = 'https://api.monday.com/v2'
const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN
const MONDAY_BOARD_ID = process.env.MONDAY_BOARD_ID

interface FormData {
  type: 'contact'
  name: string
  email: string
  subject?: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json()

    if (!MONDAY_API_TOKEN || !MONDAY_BOARD_ID) {
      return NextResponse.json(
        { error: 'Monday.com credentials not configured' },
        { status: 500 }
      )
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Create contact form entry
    const combinedMessage = `Subject: ${formData.subject || 'No subject'}\n\nMessage: ${formData.message}`
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD format

    const columnValues = {
      "text_mkvxkk": formData.name,
      "email_mkvx8na9": { email: formData.email, text: formData.email },
      "color_mkvxfneg": { index: 0 },
      "long_text_mkvxv79k": combinedMessage,
      "text_mkvxw0x2": "Website",
      "date_mkvxjsgz": { date: today }
    }

    const mutation = `
      mutation CreateContactItem($boardId: ID!, $name: String!, $columnValues: JSON!) {
        create_item(
          board_id: $boardId
          item_name: $name
          column_values: $columnValues
        ) {
          id
        }
      }
    `

    const variables = {
      boardId: MONDAY_BOARD_ID,
      name: formData.name,
      columnValues: JSON.stringify(columnValues)
    }

    // Send request to Monday.com API
    const response = await fetch(MONDAY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': MONDAY_API_TOKEN
      },
      body: JSON.stringify({
        query: mutation,
        variables
      })
    })

    // Check if HTTP response is successful before parsing JSON
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Monday.com API HTTP error:', response.status, errorText)
      return NextResponse.json(
        { error: 'Failed to submit to Monday.com', details: `HTTP ${response.status}: ${errorText}` },
        { status: 500 }
      )
    }

    const result = await response.json()

    if (result.errors) {
      console.error('Monday.com API errors:', result.errors)
      return NextResponse.json(
        { error: 'Failed to submit to Monday.com', details: result.errors },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      itemId: result.data?.create_item?.id
    })

  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}