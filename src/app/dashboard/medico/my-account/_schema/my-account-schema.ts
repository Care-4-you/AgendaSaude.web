import { z } from "zod";

const selectOptionSchema = z.object({
  value: z.string().min(1, "Campo obrigatório"),
  label: z.string()
});

export const MyAccountFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cellphone: z.string().min(1, "Celular é obrigatório"),
  phone: z.string().min(1, "Telefone é obrigatório"),

  medicalRecord: z
    .array(
      z.object({
        councilsNumber: z.string().min(1, "Número do Conselho é obrigatório"),
        councils: selectOptionSchema,
        councilsUF: selectOptionSchema
      })
    )
    .min(1, "Adicione pelo menos um conselho"),

  specialty: z.array(selectOptionSchema).min(1, "Especialidade é obrigatória")
});

export type MyAccountFormData = z.infer<typeof MyAccountFormSchema>;
