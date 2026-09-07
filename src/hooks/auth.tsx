/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  useContext,
  createContext,
  useCallback,
  useState
} from "react";

import { findMockUserByCredentials } from "@/app/(auth)/signin/_hook/mock-users";
import { destroyCookie, setCookie } from "nookies";

import { api } from "../Api/api";

export type UserRole = "USER" | "medico" | "paciente";

export interface IUser {
  id?: number;
  email: string;
  name: string;
  gender: any;
  birthdate: string;
  document: string;
  phone: string;
  zipcode: string;
  key: string;
  url: string;
  cellphone?: string;
  address?: string;
  city?: string;
  state?: string;
  instagram?: string;
  role: UserRole;
  pendingAnnouncement?: any;
  addressComplement?: string;
  houseNumber?: string;
  neighborhood?: string;
  healthInsurance?: {
    value: string;
    label: string;
  }[];
  medicalRecord?: {
    councilsNumber: string;
    councils: {
      value: string;
      label: string;
    };
    councilsUF: {
      value: string;
      label: string;
    };
  }[];
  specialty?: {
    value: string;
    label: string;
  }[];
}

interface AuthState {
  token: string;
  user: IUser;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextInterface {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  onUpdateUser: (user: IUser) => void;
  user: IUser;
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

interface Props {
  children: ReactNode;
  initialToken?: string;
  initialUser?: IUser | null;
}

const roleRedirectMap: Record<string, string> = {
  USER: "/dashboard/clinica",
  paciente: "/dashboard/paciente",
  medico: "/dashboard/medico"
};

export function AuthProvider({
  children,
  initialToken = "",
  initialUser = null
}: Props) {
  const router = useRouter();

  const [data, setData] = useState<AuthState>(() => {
    if (initialToken && initialUser) {
      api.defaults.headers.common.Authorization = `Bearer ${initialToken}`;
      return {
        token: initialToken,
        user: initialUser
      };
    }

    delete api.defaults.headers.common.Authorization;
    return {} as AuthState;
  });

  const signOut = useCallback(() => {
    destroyCookie({}, "@Saude:token", {
      path: "/"
    });
    destroyCookie({}, "@Saude:user", {
      path: "/"
    });
    api.defaults.headers.common.Authorization = "";

    setData({} as AuthState);
    router.push("/signin");
  }, [router]);

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      // ============================================================
      // FLUXO MOCKADO (sem backend)
      // Valida as credenciais contra os usuários de
      // src/app/(auth)/signin/_hook/mock-users.ts
      // Para voltar a usar a API real, restaure o bloco "FLUXO REAL"
      // comentado no final desta função e remova o bloco mockado.
      // ============================================================
      try {
        // Simula a latência de uma chamada de rede
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mockSession = findMockUserByCredentials(email, password);

        if (!mockSession) {
          alert("Email ou senha inválidos");
          return;
        }

        const { token, user } = mockSession;

        setCookie({}, "@Saude:token", token, {
          path: "/"
        });

        setCookie({}, "@Saude:user", JSON.stringify(user), {
          path: "/"
        });

        setData({
          token,
          user
        });

        const redirectPath = roleRedirectMap[user.role];

        router.push(redirectPath);
      } catch (error) {
        console.log("Err", error);
        alert("erro no login");
      }

      /* ============================================================
       * FLUXO REAL (API) — preservado para quando o backend existir.
       * ============================================================
      try {
        const { data: dataApi } = await api.post("/auth/login", {
          email,
          password
        });

        api.interceptors.request.use((config) => {
          if (config.headers) {
            config.headers.Authorization = `Bearer ${dataApi.acessToken}`;
          }
          return config;
        });

        if (dataApi.pendingAnnouncement?.post) {
          delete dataApi.pendingAnnouncement.post;
        }

        const userToSave = {
          ...dataApi.user,
          pendingAnnouncement: dataApi.pendingAnnouncement
        };

        setCookie({}, "@Saude:token", dataApi.acessToken, {
          path: "/"
        });

        setCookie({}, "@Saude:user", JSON.stringify(userToSave), {
          path: "/"
        });

        setData({
          token: dataApi.acessToken,
          user: userToSave
        });

        const redirectPath = roleRedirectMap[userToSave.role];

        router.push(redirectPath);
      } catch (error) {
        console.log("Err", error);
        alert("erro no login");
      }
      */
    },
    [router]
  );

  const handleUpdateUser = useCallback((user: IUser) => {
    setCookie({}, "@Saude:user", JSON.stringify(user), {
      path: "/",
      maxAge: 60 * 60 * 24
    });
    setData((old) => {
      return {
        ...old,
        user
      };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: data.user,
        signOut: () => {
          setData({} as AuthState);
          signOut();
        },
        onUpdateUser: handleUpdateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextInterface {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used withn an AuthProvider");
  }

  return context;
}
