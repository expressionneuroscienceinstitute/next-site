import { NextRequest, NextResponse } from 'next/server'

const MONDAY_API_URL = 'https://api.monday.com/v2'
const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN
const MONDAY_BOARD_ID = process.env.MONDAY_BOARD_ID

// Hard cap on the raw request body so we can't be DoSed by enormous payloads.
const MAX_BODY_BYTES = 16 * 1024 // 16 KB is more than enough for a contact form

// Per-field length limits.
const FIELD_LIMITS = {
  name: 120,
  email: 254, // RFC 5321
  subject: 200,
  message: 5000,
} as const

// Loose, well-known email pattern (RFC 5322 simplified).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// In-memory token bucket per client IP. Replaced with a real store
// (Redis / Upstash / Cloudflare) once we move beyond a single instance.
type Bucket = { count: number; resetAt: number }
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const rateLimitBuckets = new Map<string, Bucket>()

const getClientIp = (request: NextRequest): string => {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0]!.trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return 'unknown'
}

const isRateLimited = (ip: string): boolean => {
  const now = Date.now()
  const bucket = rateLimitBuckets.get(ip)
  if (!bucket || bucket.resetAt < now) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  bucket.count += 1
  if (bucket.count > RATE_LIMIT_MAX) return true
  return false
}

// Periodic cleanup so the map cannot grow forever on a long-running instance.
const reapInterval = setInterval(() => {
  const now = Date.now()
  for (const [ip, bucket] of rateLimitBuckets) {
    if (bucket.resetAt < now) rateLimitBuckets.delete(ip)
  }
}, RATE_LIMIT_WINDOW_MS)
// Allow the process to exit cleanly in dev/edge runtimes.
if (typeof reapInterval.unref === 'function') reapInterval.unref()

interface FormData {
  type?: 'contact'
  name?: unknown
  email?: unknown
  subject?: unknown
  message?: unknown
  // Honeypot: real users never fill this; bots scraping the form likely will.
  website?: unknown
  // Time-trap: front-end stamps when the form mounted. Submissions that are
  // suspiciously fast are almost certainly bots.
  renderedAt?: unknown
}

const isString = (value: unknown): value is string => typeof value === 'string'

const sanitize = (value: string, max: number): string =>
  value.replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max)

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    // Defensive content-type check.
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json(
        { error: 'Unsupported content type.' },
        { status: 415 }
      )
    }

    // Enforce body-size limit. We read the raw text so we can measure bytes
    // before parsing untrusted JSON.
    const rawBody = await request.text()
    if (rawBody.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: 'Request body too large.' },
        { status: 413 }
      )
    }

    let parsed: FormData
    try {
      parsed = JSON.parse(rawBody) as FormData
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload.' },
        { status: 400 }
      )
    }

    // Honeypot: silently succeed so bots don't learn we rejected them.
    if (isString(parsed.website) && parsed.website.trim().length > 0) {
      return NextResponse.json({ success: true, message: 'Form submitted successfully' })
    }

    // Time-trap: anything under ~1.5s is almost certainly an automated submit.
    if (typeof parsed.renderedAt === 'number') {
      const elapsed = Date.now() - parsed.renderedAt
      if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < 1500) {
        return NextResponse.json({ success: true, message: 'Form submitted successfully' })
      }
    }

    if (!isString(parsed.name) || !isString(parsed.email) || !isString(parsed.message)) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    const name = sanitize(parsed.name, FIELD_LIMITS.name)
    const email = sanitize(parsed.email, FIELD_LIMITS.email)
    const message = sanitize(parsed.message, FIELD_LIMITS.message)
    const subject = isString(parsed.subject)
      ? sanitize(parsed.subject, FIELD_LIMITS.subject)
      : ''

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    if (!MONDAY_API_TOKEN || !MONDAY_BOARD_ID) {
      console.error('Monday.com credentials are not configured.')
      return NextResponse.json(
        { error: 'Contact form is temporarily unavailable. Please email us directly.' },
        { status: 503 }
      )
    }

    const combinedMessage = `Subject: ${subject || 'No subject'}\n\nMessage: ${message}`
    const today = new Date().toISOString().split('T')[0]

    const columnValues = {
      text_mkvxkk: name,
      email_mkvx8na9: { email, text: email },
      color_mkvxfneg: { index: 0 },
      long_text_mkvxv79k: combinedMessage,
      text_mkvxw0x2: 'Website',
      date_mkvxjsgz: { date: today },
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
      name,
      columnValues: JSON.stringify(columnValues),
    }

    // Time out the upstream call so we never hang the request.
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)

    let response: Response
    try {
      response = await fetch(MONDAY_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: MONDAY_API_TOKEN,
        },
        body: JSON.stringify({ query: mutation, variables }),
        signal: controller.signal,
      })
    } catch (err) {
      console.error('Monday.com request failed:', err)
      return NextResponse.json(
        { error: 'Unable to deliver your message right now. Please try again later.' },
        { status: 502 }
      )
    } finally {
      clearTimeout(timeout)
    }

    if (!response.ok) {
      // Log the upstream error server-side, but never echo it to the client.
      const errorText = await response.text().catch(() => '<unreadable>')
      console.error('Monday.com API HTTP error:', response.status, errorText)
      return NextResponse.json(
        { error: 'Unable to deliver your message right now. Please try again later.' },
        { status: 502 }
      )
    }

    const result = (await response.json().catch(() => null)) as
      | { data?: { create_item?: { id?: string } }; errors?: unknown }
      | null

    if (!result || result.errors) {
      console.error('Monday.com API errors:', result?.errors)
      return NextResponse.json(
        { error: 'Unable to deliver your message right now. Please try again later.' },
        { status: 502 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
    })
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
