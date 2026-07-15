export type Plan = "free" | "pro";

export type Role = "user" | "admin";

export type MessageCategory =
  | "crush"
  | "elogio"
  | "saudade"
  | "desculpa"
  | "agradecimento"
  | "convite"
  | "outro_positivo";

export type ModerationStatus = "approved" | "rejected" | "needs_review";

export type ThemeName = "noite" | "aurora" | "coracao" | "minimalista";

export type SubscriptionStatus = "active" | "pending" | "canceled" | "free";

export interface User {
  id: string;
  email: string;
  password: string;
  role: Role;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  promptText: string;
  theme: ThemeName;
  isPublic: boolean;
  isPaused: boolean;
  allowCustomMessages: boolean;
  allowOtherCategory: boolean;
  positivePresetOnly: boolean;
  hideCounter: boolean;
  showUsernameOnShares: boolean;
  strictModeration: boolean;
  mediumRiskNeedsReview: boolean;
  customBlockedWords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  recipientProfileId: string;
  content: string;
  category: MessageCategory;
  moderationStatus: ModerationStatus;
  moderationScore: number;
  moderationReasons: string[];
  isRead: boolean;
  isFavorite: boolean;
  isReported: boolean;
  senderHash: string;
  createdAt: string;
  deletedAt?: string;
}

export interface Report {
  id: string;
  messageId: string;
  reporterUserId: string;
  reason: string;
  description?: string;
  status: "open" | "resolved";
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface BlockedSender {
  id: string;
  profileId: string;
  senderHash: string;
  reason: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  provider: "mock" | "mercado_pago";
  providerCustomerId?: string;
  providerSubscriptionId?: string;
  plan: Plan;
  status: SubscriptionStatus;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsEvent {
  id: string;
  profileId?: string;
  eventType:
    | "profile_view"
    | "message_started"
    | "message_sent"
    | "message_rejected"
    | "share_click"
    | "account_created_after_send"
    | "checkout_started"
    | "payment_approved";
  anonymousSessionHash?: string;
  metadata: Record<string, string | number | boolean>;
  createdAt: string;
}

export interface ModerationLog {
  id: string;
  messageId?: string;
  status: ModerationStatus;
  score: number;
  reasons: string[];
  provider: string;
  createdAt: string;
}

export interface AppState {
  users: User[];
  profiles: Profile[];
  messages: Message[];
  reports: Report[];
  blockedSenders: BlockedSender[];
  subscriptions: Subscription[];
  analyticsEvents: AnalyticsEvent[];
  moderationLogs: ModerationLog[];
  currentUserId?: string;
}

export interface SubmitMessageResult {
  ok: boolean;
  status: ModerationStatus;
  userMessage: string;
  messageId?: string;
}

