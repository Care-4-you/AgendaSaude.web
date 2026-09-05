"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateDoctorFormSchema,
  CreateDoctorFormData
} from "../_schema/create-doctor-schema";

export interface UseCreateDoctorFormProps {
  initialValues?: {
    UF: {
      value: string;
      label: string;
    };
    CRM: string;
  };
}

export function useCreateDoctor({ initialValues }: UseCreateDoctorFormProps) {
  const createDoctorForm = useForm<CreateDoctorFormData>({
    resolver: zodResolver(CreateDoctorFormSchema),
    defaultValues: initialValues || {
      UF: {
        value: "",
        label: ""
      },
      CRM: ""
    }
  });

  return { createDoctorForm };
}
