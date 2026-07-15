import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
const knownBrokenAnonymousCopy = "Mensagens " + "annimas consentidas";
const allText = () => collectText(root).join("\n");

describe("copy review", () => {
  it("keeps the main landing copy in pt-BR", () => {
    const page = read("src/app/page.tsx");
    expect(page).toContain("Descubra o que as pessoas");
    expect(page).toContain("nunca tiveram coragem");
    expect(page).toContain("Sua caixa secreta fica pronta em menos de 1 minuto");
    expect(page).toContain("Criar minha caixa grátis");
    expect(page).toContain("Ver uma caixa funcionando");
    expect(page).toContain("Sua identidade não será exibida ao destinatário.");
  });

  it("keeps public message and success copy correct", () => {
    expect(read("src/features/profiles/PublicProfile.tsx")).toContain("Enviar mensagem");
    expect(read("src/services/moderationService.ts")).toContain("Mensagem enviada. Sua identidade não será exibida ao destinatário.");
  });

  it("keeps dashboard, safety and admin headings correct", () => {
    expect(read("src/features/dashboard/MessagesPageClient.tsx")).toContain("Mensagens recebidas");
    expect(read("src/features/dashboard/DashboardHome.tsx")).toContain("Sua caixa ainda não existe");
    expect(read("src/app/safety/page.tsx")).toContain("Segurança");
    expect(read("src/features/admin/AdminPageClient.tsx")).toContain("Painel administrativo");
  });

  it("does not contain the known broken anonymous message copy", () => {
    const text = allText();
    expect(text).not.toContain(knownBrokenAnonymousCopy);
    expect(text).toContain("Sua caixa secreta fica pronta em menos de 1 minuto");
    expect(text).toContain("Criar minha caixa grátis");
  });
});

function collectText(dir: string): string[] {
  const ignored = new Set(["node_modules", ".next", ".open-next", ".wrangler", "dist", "build", "coverage", "test-results", ".git"]);
  const extensions = new Set([".ts", ".tsx", ".md", ".sql"]);
  const output: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    const relative = path.relative(root, full).replace(/\\/g, "/");
    if (relative === "src/tests/copy.test.ts") continue;
    if (entry.isDirectory()) output.push(...collectText(full));
    else if (extensions.has(path.extname(entry.name))) output.push(fs.readFileSync(full, "utf8"));
  }
  return output;
}
