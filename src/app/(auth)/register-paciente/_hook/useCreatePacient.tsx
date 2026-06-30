"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  StepOneFormData,
  StepOneFormSchema,
  StepThreeFormSchema,
  StepThreeFormData,
  StepTwoFormData,
  StepTwoFormSchema
} from "../_schemas/pacient-schema";

export interface UseCreatePacientFormProps {
  initialValues?: {
    name: string;
    date: string;
    gender: {
      value: string;
      label: string;
    };
  };
  stepTwoInitialValues?: {
    zipcode: string;
    state: string;
    city: string;
    neighborhood: string;
    address: string;
    addressComplement?: string;
  };
  stepThreeInitialValues?: {
    email: string;
    cpf: string;
    password: string;
    confirmPassword: string;
    acceptTerm: boolean;
  };
}

export function useCreatePacient({
  initialValues,
  stepTwoInitialValues,
  stepThreeInitialValues
}: UseCreatePacientFormProps) {
  const StepOneForm = useForm<StepOneFormData>({
    resolver: zodResolver(StepOneFormSchema),
    defaultValues: initialValues || {
      name: "",
      date: "",
      gender: { value: "", label: "" }
    }
  });

  const StepTwoForm = useForm<StepTwoFormData>({
    resolver: zodResolver(StepTwoFormSchema),
    defaultValues: stepTwoInitialValues || {
      zipcode: "",
      state: "",
      city: "",
      neighborhood: "",
      address: "",
      addressComplement: ""
    }
  });

  const StepThreeForm = useForm<StepThreeFormData>({
    resolver: zodResolver(StepThreeFormSchema),
    defaultValues: stepThreeInitialValues || {
      email: "",
      cpf: "",
      password: "",
      confirmPassword: "",
      acceptTerm: false
    }
  });

  return { StepOneForm, StepTwoForm, StepThreeForm };
}
