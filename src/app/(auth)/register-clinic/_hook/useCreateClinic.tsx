"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  StepOneFormData,
  StepOneFormSchema,
  StepFourFormSchema,
  StepFourFormData,
  StepThreeFormSchema,
  StepThreeFormData,
  StepTwoFormData,
  StepTwoFormSchema
} from "../_schemas/clinic-schema";

export interface UseCreatePacientFormProps {
  initialValues?: {
    name: string;
    phone: string;
    cellPhone: string;
    whatsapp: string;
    isWhatsapp: boolean;
  };
  stepTwoInitialValues?: {
    zipcode: string;
    state: string;
    city: string;
    neighborhood: string;
    address: string;
    addressComplement?: string;
    hasNumber?: boolean;
    houseNumber?: string;
  };
  stepThreeInitialValues?: Pick<StepThreeFormData, "healthInsurance">;
  stepFourInitialValues?: {
    email: string;
    cnpj: string;
    password: string;
    confirmPassword: string;
    acceptTerm: boolean;
  };
}

export function useCreateClinic({
  initialValues,
  stepTwoInitialValues,
  stepThreeInitialValues,
  stepFourInitialValues
}: UseCreatePacientFormProps) {
  const StepOneForm = useForm<StepOneFormData>({
    resolver: zodResolver(StepOneFormSchema),
    defaultValues: initialValues || {
      name: "",
      phone: "",
      cellPhone: "",
      whatsapp: "",
      isWhatsapp: false
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
      addressComplement: "",
      hasNumber: false,
      houseNumber: ""
    }
  });

  const StepThreeForm = useForm<StepThreeFormData>({
    resolver: zodResolver(StepThreeFormSchema),
    defaultValues: stepThreeInitialValues || {
      healthInsurance: []
    }
  });

  const StepFourForm = useForm<StepFourFormData>({
    resolver: zodResolver(StepFourFormSchema),
    defaultValues: stepFourInitialValues || {
      email: "",
      cnpj: "",
      password: "",
      confirmPassword: "",
      acceptTerm: false
    }
  });

  return { StepOneForm, StepTwoForm, StepThreeForm, StepFourForm };
}
