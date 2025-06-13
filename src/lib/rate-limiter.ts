interface RateLimitData {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private attempts: Map<string, RateLimitData> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts = 10, windowMs = 15 * 60 * 1000) { // 15 minutes
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const data = this.attempts.get(identifier);

    if (!data || now > data.resetTime) {
      return false;
    }

    return data.count >= this.maxAttempts;
  }

  recordAttempt(identifier: string): void {
    const now = Date.now();
    const data = this.attempts.get(identifier);

    if (!data || now > data.resetTime) {
      this.attempts.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      });
    } else {
      data.count++;
    }
  }

  getRemainingTime(identifier: string): number {
    const data = this.attempts.get(identifier);
    if (!data) return 0;

    const remaining = data.resetTime - Date.now();
    return Math.max(0, remaining);
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export const rateLimiter = new RateLimiter(
  parseInt(process.env.RATE_LIMIT_MAX || '10'),
  parseInt(process.env.RATE_LIMIT_WINDOW || '900000')
);