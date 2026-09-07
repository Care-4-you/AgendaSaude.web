"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  ChangeEmailAndPasswordFormSchema,
  ChangeEmailAndPasswordFormData
} from "../_schema/Email-password-schema";

export interface UseChangeEmailAndPasswordFormProps {
  initialValues?: {
    email?: string;
    password?: string;
  };
}

export function useChangeEmailAndPassword({
  initialValues
}: UseChangeEmailAndPasswordFormProps) {
  const changeEmailAndPasswordForm = useForm<ChangeEmailAndPasswordFormData>({
    resolver: zodResolver(ChangeEmailAndPasswordFormSchema),
    defaultValues: initialValues || {
      email: "",
      password: ""
    }
  });

  return { changeEmailAndPasswordForm };
}
