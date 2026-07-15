import { describe, expect, it } from "vitest";
import { checkRateLimit } from "@/services/rateLimit";

describe("rate limit", () => {
  it("blocks duplicate messages", () => {
    const attempt = { key: "sender", recipientId: "profile", contentHash: "same", createdAt: Date.now() };
    const result = checkRateLimit([attempt], attempt);
    expect(result.allowed).toBe(false);
    expect(result.reason).toBe("duplicate");
  });

  it("blocks too many messages from one sender", () => {
    const attempts = Array.from({ length: 5 }, (_, index) => ({ key: "sender", recipientId: `p_${index}`, contentHash: `h_${index}`, createdAt: Date.now() }));
    expect(checkRateLimit(attempts, { key: "sender", recipientId: "next", contentHash: "next", createdAt: Date.now() }).allowed).toBe(false);
  });
});

