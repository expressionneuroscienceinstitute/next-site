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
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || '';
  
  if (username !== adminUsername) {
    return false;
  }
  
  return await verifyPassword(password, adminPasswordHash);
}

export function isSessionExpired(expiresAt: Date): boolean {
  return Date.now() >= expiresAt.getTime();
}