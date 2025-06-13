import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Missing',
    ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'Not set',
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH ? 'Set' : 'Missing',
    NODE_ENV: process.env.NODE_ENV,
  });
}