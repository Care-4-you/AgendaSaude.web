import { z } from "zod";

export const ChangeEmailAndPasswordFormSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
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
    })
});

export type ChangeEmailAndPasswordFormData = z.infer<
  typeof ChangeEmailAndPasswordFormSchema
>;
