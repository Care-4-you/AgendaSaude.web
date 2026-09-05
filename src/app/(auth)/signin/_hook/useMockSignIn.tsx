"use client";

import { useRouter } from "next/navigation";

import { setCookie } from "nookies";

import { useAuth } from "@/hooks/auth";

import { MockUser } from "./mock-users";

const roleRedirectMap: Record<string, string> = {
  medico: "/dashboard/medico",
  paciente: "/dashboard/paciente",
  USER: "/dashboard/medico"
};

export function useMockSignIn() {
  const router = useRouter();
  const { onUpdateUser } = useAuth();

  const signInMock = ({ token, user }: MockUser) => {
    setCookie({}, "@Saude:token", token, {
      path: "/"
    });

    setCookie({}, "@Saude:user", JSON.stringify(user), {
      path: "/"
    });

    onUpdateUser(user);

    router.push(roleRedirectMap[user.role] || "/");
  };

  return { signInMock };
}
