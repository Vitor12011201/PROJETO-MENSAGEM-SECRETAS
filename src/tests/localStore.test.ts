import { beforeEach, describe, expect, it } from "vitest";
import { blockSender, createUser, deleteCurrentAccount, getVisibleMessagesForCurrentUser, login, resetDemoState, submitAnonymousMessage, upsertProfile } from "@/lib/local-store";

describe("local app flow", () => {
  beforeEach(() => resetDemoState());

  it("creates a profile and receives a valid message", () => {
    const created = createUser("novo@demo.local", "Senha123!");
    expect(created.ok).toBe(true);
    const profile = upsertProfile({ displayName: "Novo", username: "novo_user", promptText: "Tem algo para me dizer?", theme: "noite" });
    expect(profile.ok).toBe(true);
    const result = submitAnonymousMessage({ username: "novo_user", content: "Voc  uma pessoa incrvel.", category: "elogio", technicalId: "visitor_one" });
    expect(result.ok).toBe(true);
    expect(getVisibleMessagesForCurrentUser()).toHaveLength(1);
  });

  it("keeps users from seeing messages from another profile", () => {
    login("gratis@demo.local", "Senha123!");
    const freeMessages = getVisibleMessagesForCurrentUser();
    login("pro@demo.local", "Senha123!");
    const proMessages = getVisibleMessagesForCurrentUser();
    expect(freeMessages.every((message) => !proMessages.some((other) => other.id === message.id))).toBe(true);
  });

  it("blocks a sender after a message", () => {
    login("gratis@demo.local", "Senha123!");
    const message = getVisibleMessagesForCurrentUser()[0];
    expect(message).toBeDefined();
    blockSender(message.id);
    const result = submitAnonymousMessage({ username: "vitoria", content: "Outra mensagem gentil.", category: "elogio", technicalId: message.content });
    expect(result.ok).toBe(false);
  });

  it("deletes an account only with confirmation", () => {
    login("gratis@demo.local", "Senha123!");
    expect(deleteCurrentAccount("errado").ok).toBe(false);
    expect(deleteCurrentAccount("EXCLUIR").ok).toBe(true);
  });
});

