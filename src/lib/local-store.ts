"use client";

import { plans } from "@/config/plans";
import { moderationService } from "@/services/moderationService";
import { checkRateLimit, type RateLimitAttempt } from "@/services/rateLimit";
import type {
  AnalyticsEvent,
  AppState,
  Message,
  MessageCategory,
  ModerationLog,
  Plan,
  Profile,
  Report,
  SubmitMessageResult,
  Subscription,
  ThemeName,
  User
} from "@/types/domain";

const storageKey = "nunca-te-disse-state-v1";
const attemptsKey = "nunca-te-disse-rate-attempts-v1";
const defaultPrompt = "Tem alguma coisa que você nunca teve coragem de me dizer?";

export const categoryLabels: Record<MessageCategory, string> = {
  crush: "Crush",
  elogio: "Elogio",
  saudade: "Saudade",
  desculpa: "Desculpa",
  agradecimento: "Agradecimento",
  convite: "Convite",
  outro_positivo: "Outro positivo"
};

export const themeLabels: Record<ThemeName, string> = {
  noite: "Noite",
  aurora: "Aurora",
  coracao: "Coração",
  minimalista: "Minimalista"
};

export function getState(): AppState {
  if (typeof window === "undefined") {
    return createSeedState();
  }

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    const seeded = createSeedState();
    saveState(seeded);
    return seeded;
  }

  try {
    return JSON.parse(raw) as AppState;
  } catch {
    const seeded = createSeedState();
    saveState(seeded);
    return seeded;
  }
}

export function saveState(state: AppState) {
  window.localStorage.setItem(storageKey, JSON.stringify(state));
}

export function resetDemoState() {
  saveState(createSeedState());
  window.localStorage.removeItem(attemptsKey);
}

export function createUser(email: string, password: string) {
  const state = getState();
  const existing = state.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return { ok: false, message: "Já existe uma conta com esse e-mail." };
  }

  const user: User = {
    id: createId("user"),
    email: email.toLowerCase(),
    password,
    role: "user",
    createdAt: now()
  };

  state.users.push(user);
  state.currentUserId = user.id;
  state.subscriptions.push(createSubscription(user.id, "free"));
  saveState(state);
  return { ok: true, message: "Conta criada.", user };
}

export function login(email: string, password: string) {
  const state = getState();
  const user = state.users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
  if (!user) {
    return { ok: false, message: "E-mail ou senha inválidos." };
  }

  state.currentUserId = user.id;
  saveState(state);
  return { ok: true, message: "Login realizado.", user };
}

export function logout() {
  const state = getState();
  state.currentUserId = undefined;
  saveState(state);
}

export function getCurrentUser() {
  const state = getState();
  return state.users.find((user) => user.id === state.currentUserId);
}

export function getCurrentProfile() {
  const user = getCurrentUser();
  if (!user) {
    return undefined;
  }
  return getState().profiles.find((profile) => profile.userId === user.id);
}

export function getCurrentSubscription() {
  const user = getCurrentUser();
  if (!user) {
    return undefined;
  }
  return getState().subscriptions.find((subscription) => subscription.userId === user.id);
}

export function isUsernameAvailable(username: string, currentProfileId?: string) {
  const normalized = username.toLowerCase();
  return !getState().profiles.some((profile) => profile.username === normalized && profile.id !== currentProfileId);
}

export function upsertProfile(input: {
  displayName: string;
  username: string;
  promptText: string;
  avatarUrl?: string;
  theme: ThemeName;
}) {
  const state = getState();
  const user = state.users.find((item) => item.id === state.currentUserId);
  if (!user) {
    return { ok: false, message: "Faça login para criar sua caixa." };
  }

  const existing = state.profiles.find((profile) => profile.userId === user.id);
  if (!isUsernameAvailable(input.username, existing?.id)) {
    return { ok: false, message: "Esse nome de usuário já está em uso." };
  }

  const profile: Profile = {
    id: existing?.id ?? createId("profile"),
    userId: user.id,
    username: input.username.toLowerCase(),
    displayName: input.displayName,
    avatarUrl: input.avatarUrl || undefined,
    promptText: input.promptText,
    theme: input.theme,
    isPublic: existing?.isPublic ?? true,
    isPaused: existing?.isPaused ?? false,
    allowCustomMessages: existing?.allowCustomMessages ?? true,
    allowOtherCategory: existing?.allowOtherCategory ?? true,
    positivePresetOnly: existing?.positivePresetOnly ?? false,
    hideCounter: existing?.hideCounter ?? false,
    showUsernameOnShares: existing?.showUsernameOnShares ?? true,
    strictModeration: existing?.strictModeration ?? false,
    mediumRiskNeedsReview: existing?.mediumRiskNeedsReview ?? true,
    customBlockedWords: existing?.customBlockedWords ?? [],
    createdAt: existing?.createdAt ?? now(),
    updatedAt: now()
  };

  state.profiles = existing ? state.profiles.map((item) => (item.id === existing.id ? profile : item)) : [...state.profiles, profile];
  saveState(state);
  return { ok: true, message: "Caixa configurada.", profile };
}

export function updateProfileSettings(profileId: string, patch: Partial<Profile>) {
  const state = getState();
  const profile = state.profiles.find((item) => item.id === profileId);
  const user = state.users.find((item) => item.id === state.currentUserId);
  if (!profile || !user || profile.userId !== user.id) {
    return { ok: false, message: "Não foi possível atualizar essa caixa." };
  }

  state.profiles = state.profiles.map((item) => (item.id === profileId ? { ...item, ...patch, updatedAt: now() } : item));
  saveState(state);
  return { ok: true, message: "Alterações salvas." };
}

export function getProfileByUsername(username: string) {
  return getState().profiles.find((profile) => profile.username === username.toLowerCase());
}

export function submitAnonymousMessage(input: {
  username: string;
  content: string;
  category: MessageCategory;
  technicalId: string;
}): SubmitMessageResult {
  const state = getState();
  const profile = state.profiles.find((item) => item.username === input.username.toLowerCase());
  if (!profile) {
    return { ok: false, status: "rejected", userMessage: "Essa caixa não existe ou foi removida." };
  }

  if (!profile.isPublic) {
    return { ok: false, status: "rejected", userMessage: "Essa caixa está privada no momento." };
  }

  if (profile.isPaused) {
    return { ok: false, status: "rejected", userMessage: "Essa caixa está pausada no momento." };
  }

  const senderHash = stableHash(input.technicalId);
  const isBlocked = state.blockedSenders.some((blocked) => blocked.profileId === profile.id && blocked.senderHash === senderHash);
  if (isBlocked) {
    return { ok: false, status: "rejected", userMessage: "Não foi possível enviar esta mensagem para essa caixa." };
  }

  const attempts = getAttempts();
  const contentHash = stableHash(input.content.trim().toLowerCase());
  const rateResult = checkRateLimit(attempts, {
    key: senderHash,
    recipientId: profile.id,
    contentHash,
    createdAt: Date.now()
  });

  if (!rateResult.allowed) {
    return {
      ok: false,
      status: "rejected",
      userMessage:
        rateResult.reason === "duplicate"
          ? "Essa mensagem parece repetida. Tente escrever algo novo."
          : "Muitas tentativas em pouco tempo. Aguarde um pouco antes de enviar novamente."
    };
  }

  const moderation = moderationService(input.content, {
    customBlockedWords: profile.customBlockedWords,
    strictMode: profile.strictModeration,
    mediumRiskNeedsReview: profile.mediumRiskNeedsReview
  });

  const message: Message = {
    id: createId("msg"),
    recipientProfileId: profile.id,
    content: input.content.trim(),
    category: input.category,
    moderationStatus: moderation.status,
    moderationScore: moderation.riskScore,
    moderationReasons: moderation.categories,
    isRead: false,
    isFavorite: false,
    isReported: false,
    senderHash,
    createdAt: now()
  };

  state.messages.push(message);
  state.moderationLogs.push({
    id: createId("modlog"),
    messageId: message.id,
    status: moderation.status,
    score: moderation.riskScore,
    reasons: moderation.categories,
    provider: "local",
    createdAt: now()
  });
  state.analyticsEvents.push(createAnalyticsEvent("message_sent", profile.id, senderHash));
  saveAttempts([...attempts, { key: senderHash, recipientId: profile.id, contentHash, createdAt: Date.now() }]);
  saveState(state);

  return {
    ok: moderation.status !== "rejected",
    status: moderation.status,
    userMessage: moderation.userMessage,
    messageId: message.id
  };
}

export function getVisibleMessagesForCurrentUser() {
  const profile = getCurrentProfile();
  if (!profile) {
    return [];
  }
  return getState().messages.filter(
    (message) => message.recipientProfileId === profile.id && !message.deletedAt && message.moderationStatus !== "rejected"
  );
}

export function toggleFavorite(messageId: string) {
  updateMessage(messageId, (message) => ({ ...message, isFavorite: !message.isFavorite }));
}

export function markRead(messageId: string) {
  updateMessage(messageId, (message) => ({ ...message, isRead: true }));
}

export function deleteMessage(messageId: string) {
  updateMessage(messageId, (message) => ({ ...message, deletedAt: now() }));
}

export function reportMessage(messageId: string, reason = "Contefdo ofensivo") {
  const state = getState();
  const user = state.users.find((item) => item.id === state.currentUserId);
  const message = state.messages.find((item) => item.id === messageId);
  if (!user || !message) {
    return;
  }

  const report: Report = {
    id: createId("report"),
    messageId,
    reporterUserId: user.id,
    reason,
    status: "open",
    createdAt: now()
  };

  state.reports.push(report);
  state.messages = state.messages.map((item) => (item.id === messageId ? { ...item, isReported: true } : item));
  saveState(state);
}

export function blockSender(messageId: string) {
  const state = getState();
  const profile = getCurrentProfile();
  const message = state.messages.find((item) => item.id === messageId);
  if (!profile || !message) {
    return;
  }

  state.blockedSenders.push({
    id: createId("block"),
    profileId: profile.id,
    senderHash: message.senderHash,
    reason: "Bloqueado pelo destinatário",
    createdAt: now()
  });
  saveState(state);
}

export function upgradeCurrentUserToPro() {
  const state = getState();
  const user = state.users.find((item) => item.id === state.currentUserId);
  if (!user) {
    return { ok: false, message: "Faça login para alterar o plano." };
  }

  state.subscriptions = state.subscriptions.map((subscription) =>
    subscription.userId === user.id
      ? {
          ...subscription,
          plan: "pro",
          status: "active",
          providerSubscriptionId: `mock_sub_${user.id}`,
          currentPeriodStart: now(),
          currentPeriodEnd: addDays(30),
          updatedAt: now()
        }
      : subscription
  );
  state.analyticsEvents.push(createAnalyticsEvent("payment_approved"));
  saveState(state);
  return { ok: true, message: "Plano Pro ativado em modo mock." };
}

export function getAdminMetrics() {
  const state = getState();
  const activeSubscriptions = state.subscriptions.filter((subscription) => subscription.plan === "pro" && subscription.status === "active").length;
  return {
    totalUsers: state.users.length,
    totalMessages: state.messages.length,
    approved: state.messages.filter((message) => message.moderationStatus === "approved").length,
    rejected: state.messages.filter((message) => message.moderationStatus === "rejected").length,
    review: state.messages.filter((message) => message.moderationStatus === "needs_review").length,
    openReports: state.reports.filter((report) => report.status === "open").length,
    suspendedUsers: 0,
    activeSubscriptions,
    estimatedRevenue: activeSubscriptions * 9.9
  };
}

export function reviewMessage(messageId: string, status: "approved" | "rejected") {
  updateMessage(messageId, (message) => ({ ...message, moderationStatus: status }));
}

export function resolveReport(reportId: string) {
  const state = getState();
  state.reports = state.reports.map((report) =>
    report.id === reportId ? { ...report, status: "resolved", resolvedAt: now(), resolvedBy: state.currentUserId } : report
  );
  saveState(state);
}

export function eraseCurrentUserMessages() {
  const profile = getCurrentProfile();
  if (!profile) {
    return;
  }
  const state = getState();
  state.messages = state.messages.map((message) =>
    message.recipientProfileId === profile.id ? { ...message, deletedAt: now() } : message
  );
  saveState(state);
}

export function deleteCurrentAccount(confirmText: string) {
  if (confirmText !== "EXCLUIR") {
    return { ok: false, message: "Digite EXCLUIR para confirmar." };
  }

  const state = getState();
  const userId = state.currentUserId;
  if (!userId) {
    return { ok: false, message: "Nenhuma conta ativa." };
  }

  const profileIds = state.profiles.filter((profile) => profile.userId === userId).map((profile) => profile.id);
  state.users = state.users.filter((user) => user.id !== userId);
  state.profiles = state.profiles.filter((profile) => profile.userId !== userId);
  state.messages = state.messages.filter((message) => !profileIds.includes(message.recipientProfileId));
  state.subscriptions = state.subscriptions.filter((subscription) => subscription.userId !== userId);
  state.currentUserId = undefined;
  saveState(state);
  return { ok: true, message: "Conta exclufda." };
}

export function exportCurrentUserData() {
  const state = getState();
  const user = state.users.find((item) => item.id === state.currentUserId);
  const profile = getCurrentProfile();
  return {
    user: user ? { id: user.id, email: user.email, role: user.role, createdAt: user.createdAt } : null,
    profile,
    messages: profile ? state.messages.filter((message) => message.recipientProfileId === profile.id) : [],
    subscription: getCurrentSubscription()
  };
}

export function registerProfileView(profileId: string) {
  const state = getState();
  state.analyticsEvents.push(createAnalyticsEvent("profile_view", profileId, getTechnicalId()));
  saveState(state);
}

export function getTechnicalId() {
  if (typeof window === "undefined") {
    return "server-session";
  }
  const key = "nunca-te-disse-technical-id";
  const existing = window.localStorage.getItem(key);
  if (existing) {
    return existing;
  }
  const created = createId("visitor");
  window.localStorage.setItem(key, created);
  return created;
}

function updateMessage(messageId: string, updater: (message: Message) => Message) {
  const state = getState();
  state.messages = state.messages.map((message) => (message.id === messageId ? updater(message) : message));
  saveState(state);
}

function getAttempts(): RateLimitAttempt[] {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = window.localStorage.getItem(attemptsKey);
  return raw ? (JSON.parse(raw) as RateLimitAttempt[]) : [];
}

function saveAttempts(attempts: RateLimitAttempt[]) {
  window.localStorage.setItem(attemptsKey, JSON.stringify(attempts));
}

function createSeedState(): AppState {
  const freeUser: User = { id: "user_free", email: "gratis@demo.local", password: "Senha123!", role: "user", createdAt: now() };
  const proUser: User = { id: "user_pro", email: "pro@demo.local", password: "Senha123!", role: "user", createdAt: now() };
  const adminUser: User = { id: "user_admin", email: "admin@demo.local", password: "Admin123!", role: "admin", createdAt: now() };
  const freeProfile = createProfile(freeUser.id, "vitoria", "Vitória", "aurora");
  const proProfile = createProfile(proUser.id, "vitor", "Vitor", "noite");
  const approvedMessage: Message = createMessage(freeProfile.id, "Você me ajudou mais do que imagina.", "agradecimento", "approved", 0);
  const reviewMessageSeed: Message = createMessage(freeProfile.id, "Sinto falta da nossa amizade e queria conversar.", "saudade", "needs_review", 45);
  const rejectedMessage: Message = createMessage(proProfile.id, "Meu telefone f 11999999999, me chama.", "convite", "rejected", 90);

  return {
    users: [freeUser, proUser, adminUser],
    profiles: [freeProfile, proProfile],
    messages: [approvedMessage, reviewMessageSeed, rejectedMessage],
    reports: [
      {
        id: "report_1",
        messageId: reviewMessageSeed.id,
        reporterUserId: freeUser.id,
        reason: "Precisa de revisão",
        status: "open",
        createdAt: now()
      }
    ],
    blockedSenders: [],
    subscriptions: [createSubscription(freeUser.id, "free"), createSubscription(proUser.id, "pro"), createSubscription(adminUser.id, "pro")],
    analyticsEvents: [
      createAnalyticsEvent("profile_view", freeProfile.id),
      createAnalyticsEvent("share_click", freeProfile.id),
      createAnalyticsEvent("checkout_started")
    ],
    moderationLogs: [
      createModerationLog(approvedMessage),
      createModerationLog(reviewMessageSeed),
      createModerationLog(rejectedMessage)
    ]
  };
}

function createProfile(userId: string, username: string, displayName: string, theme: ThemeName): Profile {
  return {
    id: `profile_${username}`,
    userId,
    username,
    displayName,
    promptText: defaultPrompt,
    theme,
    isPublic: true,
    isPaused: false,
    allowCustomMessages: true,
    allowOtherCategory: true,
    positivePresetOnly: false,
    hideCounter: false,
    showUsernameOnShares: true,
    strictModeration: false,
    mediumRiskNeedsReview: true,
    customBlockedWords: [],
    createdAt: now(),
    updatedAt: now()
  };
}

function createMessage(
  recipientProfileId: string,
  content: string,
  category: MessageCategory,
  moderationStatus: Message["moderationStatus"],
  moderationScore: number
): Message {
  return {
    id: createId("msg"),
    recipientProfileId,
    content,
    category,
    moderationStatus,
    moderationScore,
    moderationReasons: moderationStatus === "approved" ? [] : ["seed"],
    isRead: moderationStatus === "approved",
    isFavorite: moderationStatus === "approved",
    isReported: moderationStatus === "needs_review",
    senderHash: stableHash(content),
    createdAt: now()
  };
}

function createSubscription(userId: string, plan: Plan): Subscription {
  return {
    id: createId("sub"),
    userId,
    provider: "mock",
    providerSubscriptionId: plan === "pro" ? `mock_sub_${userId}` : undefined,
    plan,
    status: plan === "pro" ? "active" : "free",
    currentPeriodStart: plan === "pro" ? now() : undefined,
    currentPeriodEnd: plan === "pro" ? addDays(30) : undefined,
    createdAt: now(),
    updatedAt: now()
  };
}

function createAnalyticsEvent(eventType: AnalyticsEvent["eventType"], profileId?: string, anonymousSessionHash?: string): AnalyticsEvent {
  return {
    id: createId("event"),
    profileId,
    eventType,
    anonymousSessionHash: anonymousSessionHash ? stableHash(anonymousSessionHash) : undefined,
    metadata: {},
    createdAt: now()
  };
}

function createModerationLog(message: Message): ModerationLog {
  return {
    id: createId("modlog"),
    messageId: message.id,
    status: message.moderationStatus,
    score: message.moderationScore,
    reasons: message.moderationReasons,
    provider: "local",
    createdAt: now()
  };
}

function stableHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return `h_${Math.abs(hash).toString(36)}`;
}

function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function now() {
  return new Date().toISOString();
}

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export function getPlanLimitLabel(plan: Plan) {
  const limit = plans[plan].monthlyMessageLimit;
  return limit === "unlimited" ? "Ilimitadas" : `${limit} por mês`;
}

