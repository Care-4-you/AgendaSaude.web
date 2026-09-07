import { z } from "zod";

export const MyAccountFormSchema = z.object({
  name: z
    .string()
    .min(3, "Campo obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  cnpj: z.string().min(1, "Campo obrigatório"),
  healthInsurance: z
    .array(
      z.object({
        value: z.string().min(1, "Selecione um convênio"),
        label: z.string()
      })
    )
    .optional(),
  phone: z.string().min(1, "Campo obrigatório"),
  cellPhone: z.string().min(1, "Campo obrigatório"),
  zipcode: z
    .string("Campo obrigatório")
    .min(9, "CEP inválido")
    .max(9, "CEP inválido"),
  state: z.string("Campo obrigatório").min(1, "Campo obrigatório"),
  city: z.string("Campo obrigatório").min(1, "Campo obrigatório"),
  neighborhood: z.string("Campo obrigatório").min(1, "Campo obrigatório"),
  address: z.string("Campo obrigatório").min(1, "Campo obrigatório"),
  houseNumber: z.string().optional(),
  hasNumber: z.boolean().optional(),
  addressComplement: z.string().optional()
});

export type MyAccountFormData = z.infer<typeof MyAccountFormSchema>;
