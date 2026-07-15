import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Inãorme um e-mail vflido."),
  password: z.string().min(8, "Use pelo menos 8 caracteres.")
});

export type AuthInput = z.infer<typeof authSchema>;

