import { describe, expect, it } from "vitest";
import { usernameSchema } from "@/schemas/profile";

describe("username validation", () => {
  it("accepts valid usernames", () => {
    expect(usernameSchema.parse("vitor_123")).toBe("vitor_123");
  });

  it("rejects reserved names", () => {
    expect(() => usernameSchema.parse("admin")).toThrow();
  });
});

