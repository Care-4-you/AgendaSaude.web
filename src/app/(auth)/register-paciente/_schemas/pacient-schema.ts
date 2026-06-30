import { z } from "zod";

const MIN_BIRTH_DATE = new Date(1900, 0, 1);

function parseBirthDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day);

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null;
  }

  return parsedDate;
}

function getMaxBirthDate() {
  const today = new Date();
  return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
}

export const StepOneFormSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  date: z
    .string()
    .min(1, "Data de nascimento inválida")
    .refine((value) => parseBirthDate(value) !== null, {
      message: "Data de nascimento inválida"
    })
    .refine((value) => {
      const date = parseBirthDate(value);
      return date !== null && date >= MIN_BIRTH_DATE;
    }, {
      message: "Ano de nascimento inválido"
    })
    .refine((value) => {
      const date = parseBirthDate(value);
      return date !== null && date <= getMaxBirthDate();
    }, {
      message: "Você deve ter pelo menos 18 anos"
    }),

  gender: z.object({
    value: z.string().min(1, "Selecione um gênero"),
    label: z.string()
  })
});

export const  StepTwoFormSchema = z.object({
  zipcode: z.string("Campo obrigatório").min(9, "CEP inválido").max(9, "CEP inválido"),
  state: z.string("Campo obrigatório").min(1, "Campo obrigatório"),
  city: z.string("Campo obrigatório").min(1, "Campo obrigatório"),
  neighborhood: z.string("Campo obrigatório").min(1, "Campo obrigatório"),
  address: z.string("Campo obrigatório").min(1, "Campo obrigatório"),
  addressComplement: z.string().optional()
})


export const StepThreeFormSchema = z.object({
  email: z.string().min(1, "Campo obrigatório"),
  cpf: z.string().min(1, "Campo obrigatório"),
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

export type StepThreeFormData = z.infer<typeof StepThreeFormSchema>;
export type StepTwoFormData = z.infer<typeof StepTwoFormSchema>;
export type StepOneFormData = z.infer<typeof StepOneFormSchema>;
