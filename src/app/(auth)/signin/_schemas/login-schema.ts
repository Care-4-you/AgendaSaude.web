import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().nonempty("Email é obrigatório"),
  password: z
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .nonempty("Senha é obrigatória")
});

export type LoginFormData = z.infer<typeof LoginSchema>;
