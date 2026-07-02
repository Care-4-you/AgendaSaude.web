"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormData } from "../_schemas/login-schema";

export interface UseLoginFormProps {
  initialValues?: {
    email: string;
    password: string;
  };
}

export function useLogin({ initialValues }: UseLoginFormProps) {
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: initialValues || {
      email: "",
      password: ""
    }
  });

  return { loginForm };
}
