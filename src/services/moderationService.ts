import type { ModerationStatus } from "@/types/domain";

export interface ModerationResult {
  status: ModerationStatus;
  categories: string[];
  riskScore: number;
  internalReason: string;
  userMessage: string;
}

export interface ModerationContext {
  customBlockedWords?: string[];
  strictMode?: boolean;
  mediumRiskNeedsReview?: boolean;
}

interface Rule {
  category: string;
  pattern: RegExp;
  score: number;
  reviewOnly?: boolean;
}

const baseRules: Rule[] = [
  { category: "ameaca", pattern: /\b(matar|morro|acabar com voce|te pegar|vinganca)\b/i, score: 90 },
  { category: "perseguicao", pattern: /\b(te sigo|sei onde voce mora|estou te vigiando|aparecer na sua casa)\b/i, score: 85 },
  { category: "chantagem", pattern: /\b(se nao|vou espalhar|vou expor|chantagem)\b/i, score: 80 },
  { category: "odio", pattern: /\b(racista|nazista|inferior|odeio sua raca)\b/i, score: 85 },
  { category: "sexual_explicito", pattern: /\b(sexo explicito|nude|nudes|pornografia)\b/i, score: 75 },
  { category: "telefone", pattern: /(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\s?)?\d{4}[-.\s]?\d{4}/, score: 70 },
  { category: "cpf", pattern: /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/, score: 90 },
  { category: "endereco", pattern: /\b(rua|avenida|av\.|travessa)\s+[a-z0-9\s]{4,},?\s*\d{1,5}\b/i, score: 75 },
  { category: "acusacao_crime", pattern: /\b(roubou|assaltou|estuprou|matou|crime|criminoso)\b/i, score: 80 },
  { category: "traicao", pattern: /\b(traiu|traicao|chifre|corno|corna)\b/i, score: 60, reviewOnly: true },
  { category: "automutilacao", pattern: /\b(se corta|automutilacao|se machucar)\b/i, score: 85 },
  { category: "suicidio", pattern: /\b(se mata|suicidio|tirar sua vida)\b/i, score: 95 },
  { category: "violencia", pattern: /\b(socar|bater|espancar|violencia)\b/i, score: 80 },
  { category: "humilhacao", pattern: /\b(ridiculo|lixo|fracassado|vergonha)\b/i, score: 65, reviewOnly: true },
  { category: "bullying", pattern: /\b(gordo|feio|burro|nojento)\b/i, score: 65, reviewOnly: true },
  { category: "segredo_terceiros", pattern: /\b(nao conta pra ninguem|segredo de|vou revelar)\b/i, score: 60, reviewOnly: true },
  { category: "links", pattern: /https?:\/\/|www\./i, score: 55, reviewOnly: true },
  { category: "spam", pattern: /\b(clique aqui|ganhe dinheiro|pix agora|promocao imperdivel)\b/i, score: 70 }
];

export function moderationService(message: string, context: ModerationContext = {}): ModerationResult {
  const customRules: Rule[] = (context.customBlockedWords ?? [])
    .filter(Boolean)
    .map((word) => ({
      category: "palavra_bloqueada_personalizada",
      pattern: new RegExp(escapeRegExp(word), "i"),
      score: 80
    }));

  const hits = [...baseRules, ...customRules].filter((rule) => rule.pattern.test(message));
  const duplicateCharacterRatio = repeatedCharacterRatio(message);
  const repetitionScore = duplicateCharacterRatio > 0.45 ? 45 : 0;
  const score = Math.min(100, hits.reduce((total, rule) => total + rule.score, 0) + repetitionScore);
  const categories = [...new Set([...hits.map((hit) => hit.category), ...(repetitionScore ? ["repeticao"] : [])])];
  const hasRejectRule = hits.some((hit) => !hit.reviewOnly && hit.score >= 70);
  const mediumRisk = score >= (context.strictMode ? 35 : 55);
  const status: ModerationStatus =
    hasRejectRule || score >= 90 ? "rejected" : mediumRisk && context.mediumRiskNeedsReview !== false ? "needs_review" : "approved";

  if (status === "approved") {
    return {
      status,
      categories,
      riskScore: score,
      internalReason: "Mensagem aprovada pelos filtros locais.",
      userMessage: "Mensagem enviada. Sua identidade não será exibida ao destinatário."
    };
  }

  if (status === "needs_review") {
    return {
      status,
      categories,
      riskScore: score,
      internalReason: `Revisão necessária: ${categories.join(", ") || "risco médio"}.`,
      userMessage: "Sua mensagem foi enviada para revisão de segurança antes de aparecer para o destinatário."
    };
  }

  return {
    status,
    categories,
    riskScore: score,
    internalReason: `Mensagem rejeitada: ${categories.join(", ")}.`,
    userMessage:
      "Essa mensagem não pôde ser enviada porque pode violar nossas diretrizes de segurança. Tente reescrevê-la de forma respeitosa e sem acusações."
  };
}

function repeatedCharacterRatio(value: string) {
  if (!value.length) {
    return 0;
  }
  const mostCommon = [...value.toLowerCase()].reduce<Record<string, number>>((acc, char) => {
    acc[char] = (acc[char] ?? 0) + 1;
    return acc;
  }, {});
  return Math.max(...Object.values(mostCommon)) / value.length;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}



