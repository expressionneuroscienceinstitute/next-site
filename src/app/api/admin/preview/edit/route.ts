import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-middleware';
import { getConfigById, writeConfigFile, backupAllConfigs } from '@/lib/content-manager';

export async function POST(request: NextRequest) {
  // Check authentication for saving from preview mode
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { configId, content, saveChanges } = await request.json();

    if (!configId || !content) {
      return NextResponse.json(
        { error: 'Config ID and content are required' },
        { status: 400 }
      );
    }

    const configFile = getConfigById(configId);
    if (!configFile) {
      return NextResponse.json(
        { error: 'Config file not found' },
        { status: 404 }
      );
    }

    // If saveChanges is true, actually save to the file system
    if (saveChanges) {
      try {
        // Create backup before saving
        await backupAllConfigs();
        
        // Save the content to the actual file
        await writeConfigFile(configFile.path, content);
        
        return NextResponse.json({
          success: true,
          message: 'Content saved successfully',
          saved: true
        });
      } catch (saveError) {
        return NextResponse.json(
          { error: saveError instanceof Error ? saveError.message : 'Failed to save content' },
          { status: 500 }
        );
      }
    } else {
      // Just validate the content without saving
      try {
        // Basic validation - check that it's valid TypeScript-like syntax
        if (!content.includes('export') || !content.includes('Config')) {
          throw new Error('Content must include export statement and config object');
        }

        return NextResponse.json({
          success: true,
          message: 'Content validated successfully',
          saved: false
        });
      } catch (validationError) {
        return NextResponse.json(
          { error: 'Invalid content format' },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error('Preview edit error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}