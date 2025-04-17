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

import { destroyCookie, setCookie } from "nookies";

import { api } from "../Api/api";

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
  role: any;
  pendingAnnouncement?: any;
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
      try {
        const { data: dataApi } = await api.post("/auth/login", {
          email,
          password
        });
        console.log(dataApi);

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
          maxAge: 60 * 60 * 24,
          path: "/"
        });

        setCookie({}, "@Saude:user", JSON.stringify(userToSave), {
          path: "/",
          maxAge: 60 * 60 * 24
        });

        setData({
          token: dataApi.acessToken,
          user: userToSave
        });

        router.push("/");
      } catch (error) {
        console.log("Err", error);
        alert("erro no login");
      }
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
  console.log(data);
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
