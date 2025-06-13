import { NextRequest, NextResponse } from 'next/server';
import { authenticate, createSession } from '@/lib/auth';
import { rateLimiter } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  try {
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    // Rate limiting
    if (rateLimiter.isRateLimited(clientIP)) {
      const remainingTime = rateLimiter.getRemainingTime(clientIP);
      return NextResponse.json(
        { 
          error: 'Too many login attempts. Try again later.',
          retryAfter: Math.ceil(remainingTime / 1000)
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      rateLimiter.recordAttempt(clientIP);
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const isValid = await authenticate(username, password);

    if (!isValid) {
      rateLimiter.recordAttempt(clientIP);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Reset rate limit on successful login
    rateLimiter.reset(clientIP);

    // Create session
    const sessionPayload = {
      userId: '1',
      username,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    };

    const token = await createSession(sessionPayload);

    const response = NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set('admin-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours in seconds
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}