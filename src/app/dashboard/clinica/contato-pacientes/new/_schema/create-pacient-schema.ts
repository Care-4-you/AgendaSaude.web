import { z } from "zod";

export const CreatePacientSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  phone: z.string().nonempty("Telefone é obrigatório"),
  cellphone: z.string().nonempty("Celular é obrigatório"),
  cpf: z.string().nonempty("CPF é obrigatório")
});

export type CreatePacientFormData = z.infer<typeof CreatePacientSchema>;
