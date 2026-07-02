import { z } from "zod";



export const StepOneFormSchema = z.object({
  name: z
    .string()
    .min(3, "Campo obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  phone: z.string().min(1, "Campo obrigatório"),
  cellPhone: z.string().min(1, "Campo obrigatório"),
  whatsapp: z.string().optional(),
  isWhatsapp: z.boolean().optional(),
 
  
});

export const  StepTwoFormSchema = z.object({
  zipcode: z.string("Campo obrigatório").min(9, "CEP inválido").max(9, "CEP inválido"),
  state: z.string("Campo obrigatório").min(1, "Campo obrigatório"),
  city: z.string("Campo obrigatório").min(1, "Campo obrigatório"),
  neighborhood: z.string("Campo obrigatório").min(1, "Campo obrigatório"),
  address: z.string("Campo obrigatório").min(1, "Campo obrigatório"),
  houseNumber: z.string().optional(),
  hasNumber: z.boolean().optional(),
  addressComplement: z.string().optional()
}).superRefine((data, ctx) => {
  if (!data.hasNumber && (!data.houseNumber || data.houseNumber.trim().length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["houseNumber"],
      message: "Campo obrigatório",
    });
  }
})

export const StepThreeFormSchema = z.object({
  healthInsurance: z
    .array(
      z.object({
        value: z.string().min(1, "Selecione um convênio"),
        label: z.string(),
      })
    )
    .min(1, "Selecione ao menos um convênio"),
});

export const StepFourFormSchema = z.object({
  email: z.string().min(1, "Campo obrigatório"),
  cnpj: z.string().min(1, "Campo obrigatório"),
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
    .refine((value) => /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~]).+$/.test(value), {
      message: "Deve conter caracters especiaos Ex. @ # $"
    }),
  confirmPassword: z.string().min(1, "Campo obrigatório"),
  acceptTerm: z.boolean().refine((value) => value === true, {
    message: "Você deve aceitar os termos e condições"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

export type StepFourFormData = z.infer<typeof StepFourFormSchema>;
export type StepThreeFormData = z.infer<typeof StepThreeFormSchema>;
export type StepTwoFormData = z.infer<typeof StepTwoFormSchema>;
export type StepOneFormData = z.infer<typeof StepOneFormSchema>;
