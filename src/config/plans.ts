import type { Plan } from "@/types/domain";

export interface PlanConfig {
  id: Plan;
  name: string;
  priceLabel: string;
  monthlyMessageLimit: number | "unlimited";
  features: string[];
}

export const plans: Record<Plan, PlanConfig> = {
  free: {
    id: "free",
    name: "Gratuito",
    priceLabel: "R$ 0",
    monthlyMessageLimit: 20,
    features: [
      "Pfgina pública",
      "Atf 20 mensagens por mês",
      "Categorias bfsicas",
      "Compartilhamento do link",
      "Denfncia e bloqueio"
    ]
  },
  pro: {
    id: "pro",
    name: "Pro",
    priceLabel: "R$ 9,90/mês",
    monthlyMessageLimit: "unlimited",
    features: [
      "Mensagens ilimitadas",
      "Temas personalizados",
      "Mensagens favoritas",
      "Estatfsticas",
      "Caixa sem marca",
      "Efeitos visuais",
      "Mensagem com mêsica",
      "Agendamento de abertura"
    ]
  }
};

