export interface RateLimitAttempt {
  key: string;
  recipientId?: string;
  contentHash?: string;
  createdAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  reason?: "too_many_from_sender" | "too_many_to_recipient" | "duplicate";
}

export function checkRateLimit(attempts: RateLimitAttempt[], nextAttempt: RateLimitAttempt, now = Date.now()): RateLimitResult {
  const windowMs = 60 * 60 * 1000;
  const recent = attempts.filter((attempt) => now - attempt.createdAt < windowMs);
  const senderCount = recent.filter((attempt) => attempt.key === nextAttempt.key).length;
  const recipientCount = recent.filter((attempt) => attempt.recipientId === nextAttempt.recipientId).length;
  const duplicate = recent.some(
    (attempt) => attempt.key === nextAttempt.key && attempt.recipientId === nextAttempt.recipientId && attempt.contentHash === nextAttempt.contentHash
  );

  if (duplicate) {
    return { allowed: false, reason: "duplicate" };
  }

  if (senderCount >= 5) {
    return { allowed: false, reason: "too_many_from_sender" };
  }

  if (recipientCount >= 25) {
    return { allowed: false, reason: "too_many_to_recipient" };
  }

  return { allowed: true };
}

