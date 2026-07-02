"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PasswordResetFormData,
  PasswordResetSchema,
  PasswordResetFormDataWithPassword,
  PasswordResetSchemaWithPassword
} from "../_schemas/password-reset-schema";

export interface UsePasswordResetFormProps {
  initialValues?: {
    email: string;
  };
  passwordValue?:{
    token: string;
    password: string;
    confirmPassword: string;
  }
}

export function usePasswordReset({ initialValues, passwordValue }: UsePasswordResetFormProps) {
  const Form = useForm<PasswordResetFormData>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: initialValues || {
      email: ""
    }
  });

  const PasswordForm = useForm<PasswordResetFormDataWithPassword>({
    resolver: zodResolver(PasswordResetSchemaWithPassword),
    defaultValues: passwordValue || {
      token: "",
      password: "",
      confirmPassword: ""
    }
  })

  

  return { Form, PasswordForm };
}
