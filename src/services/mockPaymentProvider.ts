import type { CheckoutSession, PaymentProvider, PaymentWebhookResult, ProviderSubscription } from "@/services/paymentProvider";
import type { Plan, SubscriptionStatus } from "@/types/domain";

export class MockPaymentProvider implements PaymentProvider {
  async createCheckout(userId: string, plan: Plan): Promise<CheckoutSession> {
    return {
      checkoutUrl: `/pricing?mockCheckout=success&user=${encodeURIComponent(userId)}&plan=${plan}`,
      providerSubscriptionId: `mock_sub_${userId}_${Date.now()}`
    };
  }

  async getSubscription(providerSubscriptionId: string): Promise<ProviderSubscription> {
    return {
      providerSubscriptionId,
      plan: "pro",
      status: "active"
    };
  }

  async cancelSubscription(providerSubscriptionId: string): Promise<ProviderSubscription> {
    return {
      providerSubscriptionId,
      plan: "free",
      status: "canceled"
    };
  }

  async handleWebhook(payload: unknown): Promise<PaymentWebhookResult> {
    const parsed = parsePayload(payload);
    return {
      providerSubscriptionId: parsed.providerSubscriptionId,
      status: parsed.status,
      plan: parsed.plan
    };
  }
}

function parsePayload(payload: unknown): { providerSubscriptionId: string; status: SubscriptionStatus; plan: Plan } {
  if (typeof payload === "object" && payload !== null) {
    const record = payload as Record<string, unknown>;
    return {
      providerSubscriptionId: typeof record.providerSubscriptionId === "string" ? record.providerSubscriptionId : "mock_sub_unknown",
      status: record.status === "canceled" || record.status === "pending" ? record.status : "active",
      plan: record.plan === "free" ? "free" : "pro"
    };
  }

  return {
    providerSubscriptionId: "mock_sub_unknown",
    status: "active",
    plan: "pro"
  };
}

