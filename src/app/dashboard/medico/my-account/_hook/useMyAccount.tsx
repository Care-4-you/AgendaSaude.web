"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  MyAccountFormSchema,
  MyAccountFormData
} from "../_schema/my-account-schema";

export interface UseMyAccountFormProps {
  initialValues?: {
    name?: string;
    cellphone?: string;
    phone?: string;
    medicalRecord?: {
      councilsNumber: string;
      councils: { value: string; label: string };
      councilsUF: { value: string; label: string };
    }[];
  };
}

export function useMyAccount({ initialValues }: UseMyAccountFormProps) {
  const myAccountForm = useForm<MyAccountFormData>({
    resolver: zodResolver(MyAccountFormSchema),
    defaultValues: initialValues || {
      name: "",
      cellphone: "",
      phone: "",
      medicalRecord: [
        {
          councilsNumber: "",
          councils: { value: "", label: "" },
          councilsUF: { value: "", label: "" }
        }
      ]
    }
  });

  return { myAccountForm };
}
