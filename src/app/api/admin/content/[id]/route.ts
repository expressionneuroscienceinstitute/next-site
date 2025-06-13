import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-middleware';
import { getConfigById, readConfigFile, writeConfigFile, backupAllConfigs } from '@/lib/content-manager';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const config = getConfigById(params.id);
    
    if (!config) {
      return NextResponse.json(
        { error: 'Config file not found' },
        { status: 404 }
      );
    }

    const content = await readConfigFile(config.path);

    return NextResponse.json({
      success: true,
      config,
      content
    });
  } catch (error) {
    console.error('Error reading config file:', error);
    return NextResponse.json(
      { error: 'Failed to read config file' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const config = getConfigById(params.id);
    
    if (!config) {
      return NextResponse.json(
        { error: 'Config file not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Create backup before saving
    try {
      await backupAllConfigs();
    } catch (backupError) {
      console.warn('Backup creation failed:', backupError);
      // Continue with save operation even if backup fails
    }

    await writeConfigFile(config.path, content);

    return NextResponse.json({
      success: true,
      message: 'Content updated successfully'
    });
  } catch (error) {
    console.error('Error updating config file:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update config file' },
      { status: 500 }
    );
  }
}