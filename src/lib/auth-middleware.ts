import { NextRequest, NextResponse } from 'next/server';
import { verifySession, isSessionExpired } from './auth';

export async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  try {
    const token = request.cookies.get('admin-session')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const session = await verifySession(token);

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    if (isSessionExpired(session.expiresAt)) {
      return NextResponse.json(
        { error: 'Session expired' },
        { status: 401 }
      );
    }

    // Authentication successful
    return null;
  } catch (error) {
    console.error('Auth middleware error:', error);
    return NextResponse.json(
      { error: 'Authentication error' },
      { status: 500 }
    );
  }
}