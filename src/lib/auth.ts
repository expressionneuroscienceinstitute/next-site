import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-for-development'
);

export interface SessionPayload {
  userId: string;
  username: string;
  expiresAt: Date;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(payload: SessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as SessionPayload;
  } catch (error) {
    return null;
  }
}

export async function authenticate(username: string, password: string): Promise<boolean> {
  console.log('authenticate() called with username:', username);
  
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || '';
  
  console.log('Environment check in authenticate():');
  console.log('- adminUsername from env:', adminUsername);
  console.log('- adminPasswordHash from env:', adminPasswordHash ? 'Set' : 'Missing');
  console.log('- provided username matches:', username === adminUsername);
  
  if (username !== adminUsername) {
    console.log('Username mismatch');
    return false;
  }
  
  if (!adminPasswordHash) {
    console.log('No password hash found in environment');
    return false;
  }
  
  try {
    const result = await verifyPassword(password, adminPasswordHash);
    console.log('Password verification result:', result);
    return result;
  } catch (error) {
    console.log('Error in password verification:', error);
    return false;
  }
}

export function isSessionExpired(expiresAt: Date): boolean {
  return Date.now() >= expiresAt.getTime();
}