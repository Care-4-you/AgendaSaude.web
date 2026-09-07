import { z } from "zod";

export const CreateDoctorFormSchema = z.object({
  UF: z.object({
    value: z.string().min(1, "Selecione um estado"),
    label: z.string()
  }),
  CRM: z.string().min(1, "CRM é obrigatório")
});

export type CreateDoctorFormData = z.infer<typeof CreateDoctorFormSchema>;
