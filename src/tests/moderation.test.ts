import { describe, expect, it } from "vitest";
import { moderationService } from "@/services/moderationService";

describe("moderationService", () => {
  it("approves a positive message", () => {
    const result = moderationService("Você me ajudou mais do que imagina.");
    expect(result.status).toBe("approved");
  });

  it("blocks offensive and risky content", () => {
    const result = moderationService("Eu sei onde voce mora e vou te pegar.");
    expect(result.status).toBe("rejected");
    expect(result.categories).toContain("perseguicao");
  });

  it("detects phone numbers", () => {
    const result = moderationService("me chama não 11999999999");
    expect(result.categories).toContain("telefone");
  });

  it("detects CPF", () => {
    const result = moderationService("meu cpf  123.456.789-10");
    expect(result.categories).toContain("cpf");
  });
});

