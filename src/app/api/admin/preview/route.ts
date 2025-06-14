import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-middleware';

// Store preview content in memory (for demonstration - in production you might use Redis)
const previewStore = new Map<string, any>();

export async function POST(request: NextRequest) {
  // Check authentication for creating previews
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { configId, content } = await request.json();

    if (!configId || !content) {
      return NextResponse.json(
        { error: 'Config ID and content are required' },
        { status: 400 }
      );
    }

    // Parse the content to extract the configuration object
    let parsedConfig;
    try {
      // Create a safe evaluation context
      const moduleCode = content.replace('export ', '');
      const configMatch = moduleCode.match(/const\s+(\w+Config)\s*=\s*({[\s\S]*?});/);
      
      if (configMatch) {
        const configObject = configMatch[2];
        // Use Function constructor for safer evaluation than eval
        parsedConfig = new Function('return ' + configObject)();
      } else {
        throw new Error('Could not parse config object');
      }
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid configuration syntax' },
        { status: 400 }
      );
    }

    // Store preview content temporarily
    const previewId = `${configId}-${Date.now()}`;
    previewStore.set(previewId, {
      configId,
      content: parsedConfig,
      timestamp: Date.now(),
      expiresAt: Date.now() + (30 * 60 * 1000) // 30 minutes
    });

    // Clean up old preview data
    cleanupExpiredPreviews();

    return NextResponse.json({
      success: true,
      previewId,
      previewUrl: `/preview?id=${previewId}`
    });
  } catch (error) {
    console.error('Preview creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create preview' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // No authentication required for GET - preview page needs to access this
  const { searchParams } = new URL(request.url);
  const previewId = searchParams.get('id');

  if (!previewId) {
    return NextResponse.json(
      { error: 'Preview ID required' },
      { status: 400 }
    );
  }

  const previewData = previewStore.get(previewId);

  if (!previewData) {
    return NextResponse.json(
      { error: 'Preview not found or expired' },
      { status: 404 }
    );
  }

  // Check if preview has expired
  if (Date.now() > previewData.expiresAt) {
    previewStore.delete(previewId);
    return NextResponse.json(
      { error: 'Preview expired' },
      { status: 410 }
    );
  }

  return NextResponse.json({
    success: true,
    configId: previewData.configId,
    content: previewData.content
  });
}

function cleanupExpiredPreviews() {
  const now = Date.now();
  for (const [key, value] of previewStore.entries()) {
    if (now > value.expiresAt) {
      previewStore.delete(key);
    }
  }
}