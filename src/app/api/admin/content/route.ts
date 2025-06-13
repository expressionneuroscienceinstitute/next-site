import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-middleware';
import { configFiles } from '@/lib/content-manager';

export async function GET(request: NextRequest) {
  // Check authentication
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    return NextResponse.json({
      success: true,
      files: configFiles
    });
  } catch (error) {
    console.error('Error listing content files:', error);
    return NextResponse.json(
      { error: 'Failed to list content files' },
      { status: 500 }
    );
  }
}