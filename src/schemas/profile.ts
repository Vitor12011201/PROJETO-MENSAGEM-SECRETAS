import { z } from "zod";
import { reservedUsernames } from "@/constants/reservedUsernames";

export const usernameSchema = z
  .string()
  .min(3, "Use pelo menos 3 caracteres.")
  .max(30, "Use no máximo 30 caracteres.")
  .regex(/^[a-zA-Z0-9_-]+$/, "Use apenas letras, números, hífen e underscore.")
  .transform((value) => value.toLowerCase())
  .refine((value) => !reservedUsernames.includes(value), "Esse nome de usuário f reservado.");

export const profileSchema = z.object({
  displayName: z.string().min(2, "Inãorme um nome com pelo menos 2 caracteres.").max(80),
  username: usernameSchema,
  promptText: z.string().min(10).max(140),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  theme: z.enum(["noite", "aurora", "coracao", "minimalista"]),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "Você precisa aceitar os Termos de Uso." })
  }),
  privacyAccepted: z.literal(true, {
    errorMap: () => ({ message: "Você precisa aceitar a Política de Privacidade." })
  }),
  minimumAgeConfirmed: z.literal(true, {
    errorMap: () => ({ message: "Confirme a idade mínima para continuar." })
  })
});

export type ProfileInput = z.infer<typeof profileSchema>;

