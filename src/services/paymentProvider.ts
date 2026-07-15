import type { Plan, SubscriptionStatus } from "@/types/domain";

export interface CheckoutSession {
  checkoutUrl: string;
  providerSubscriptionId: string;
}

export interface ProviderSubscription {
  providerSubscriptionId: string;
  plan: Plan;
  status: SubscriptionStatus;
}

export interface PaymentWebhookResult {
  providerSubscriptionId: string;
  status: SubscriptionStatus;
  plan: Plan;
}

export interface PaymentProvider {
  createCheckout(userId: string, plan: Plan): Promise<CheckoutSession>;
  getSubscription(providerSubscriptionId: string): Promise<ProviderSubscription>;
  cancelSubscription(providerSubscriptionId: string): Promise<ProviderSubscription>;
  handleWebhook(payload: unknown): Promise<PaymentWebhookResult>;
}

