import { z } from "zod";

export const categories = [
  "crush",
  "elogio",
  "saudade",
  "desculpa",
  "agradecimento",
  "convite",
  "outro_positivo"
] as const;

export const messageSchema = z.object({
  content: z.string().trim().min(3, "Escreva pelo menos 3 caracteres.").max(500, "Use atf 500 caracteres."),
  category: z.enum(categories),
  safetyConfirmation: z.literal(true, {
    errorMap: () => ({ message: "Confirme que a mensagem respeita as regras de segurança." })
  })
});

export type MessageInput = z.infer<typeof messageSchema>;

