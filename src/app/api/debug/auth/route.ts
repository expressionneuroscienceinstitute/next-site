import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || '';
    const testPassword = 'admin123!';
    
    console.log('Debug auth test:');
    console.log('- adminUsername:', adminUsername);
    console.log('- adminPasswordHash:', adminPasswordHash);
    console.log('- testPassword:', testPassword);
    
    if (!adminPasswordHash) {
      return NextResponse.json({
        error: 'No password hash found',
        adminUsername,
        hasPasswordHash: false
      });
    }
    
    const isValid = await bcrypt.compare(testPassword, adminPasswordHash);
    console.log('- bcrypt.compare result:', isValid);
    
    return NextResponse.json({
      adminUsername,
      hasPasswordHash: true,
      passwordHashLength: adminPasswordHash.length,
      testPassword,
      isValid,
      debug: 'Password verification test completed'
    });
  } catch (error) {
    console.error('Debug auth error:', error);
    return NextResponse.json({
      error: 'Error in debug auth test',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}