import { describe, expect, it } from "vitest";
import { MockPaymentProvider } from "@/services/mockPaymentProvider";

describe("MockPaymentProvider", () => {
  it("creates checkout and handles webhook", async () => {
    const provider = new MockPaymentProvider();
    const checkout = await provider.createCheckout("user_1", "pro");
    expect(checkout.checkoutUrl).toContain("mockCheckout=success");
    const webhook = await provider.handleWebhook({ providerSubscriptionId: checkout.providerSubscriptionId, status: "active", plan: "pro" });
    expect(webhook.status).toBe("active");
  });
});

