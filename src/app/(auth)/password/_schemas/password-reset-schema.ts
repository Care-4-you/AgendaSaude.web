import { z } from "zod";

export const PasswordResetSchema = z.object({
  email: z.string().nonempty("Email é obrigatório")
});

export const PasswordResetSchemaWithPassword = z
  .object({
    token: z.string().nonempty("Token é obrigatório"),
    password: z
      .string()
      .min(1, "Campo obrigatório")
      .min(8, "Senha deve ter no minimo 8 caracters")
      .refine((value) => /^(?=.*[A-Z]).+$/.test(value), {
        message: "Deve conter no minimo uma letra maiúscula"
      })
      .refine((value) => /^(?=.*[a-z]).+$/.test(value), {
        message: "Deve conter no minimo uma letra minuscula"
      })
      .refine((value) => /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~]).+$/.test(value), {
        message: "Deve conter caracters especiaos Ex. @ # $"
      }),
    confirmPassword: z.string().min(1, "Campo obrigatório")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
  });

export type PasswordResetFormData = z.infer<typeof PasswordResetSchema>;
export type PasswordResetFormDataWithPassword = z.infer<
  typeof PasswordResetSchemaWithPassword
>;
