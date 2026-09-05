"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { MyAccountFormSchema, MyAccountFormData } from "../_schema/my-account-schema";

export interface UseMyAccountFormProps {
  initialValues?: {
    name?: string;
    cnpj?: string;
    healthInsurance?: { value: string; label: string }[];
    phone?: string;
    cellPhone?: string;
    zipcode?: string;
    state?: string;
    city?: string;
    neighborhood?: string;
    address?: string;
    houseNumber?: string;
    hasNumber?: boolean;
    addressComplement?: string;
  };
}

export function useMyAccount({ initialValues }: UseMyAccountFormProps) {
  const myAccountForm = useForm<MyAccountFormData>({
    resolver: zodResolver(MyAccountFormSchema),
    defaultValues: initialValues || {
      name: "",
      cellPhone: "",
      phone: "",
      zipcode: "",
      state: "",
      city: "",
      neighborhood: "",
      address: "",
      houseNumber: "",
      hasNumber: false,
      addressComplement: ""
    }
  });

  return { myAccountForm };
}
