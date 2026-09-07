"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreatePacientSchema,
  CreatePacientFormData
} from "../_schema/create-pacient-schema";

export interface UseCreatePacientFormProps {
  initialValues?: {
    name: string;
    email: string;
    phone: string;
    cellphone: string;
    cpf: string;
  };
}

export function useCreatePacient({ initialValues }: UseCreatePacientFormProps) {
  const createPacientForm = useForm<CreatePacientFormData>({
    resolver: zodResolver(CreatePacientSchema),
    defaultValues: initialValues || {
      name: "",
      email: "",
      phone: "",
      cellphone: "",
      cpf: ""
    }
  });

  return { createPacientForm };
}
