"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { api } from "@/lib/api";
import { IClinica } from "@/shared/interfaces/IClinica";

interface ClinicasContextData {
  clinicas: IClinica[];
}

const ClinicasContext = createContext<ClinicasContextData>(
  {} as ClinicasContextData
);
ClinicasContext.displayName = "Clinicas";

interface ClinicaProviderProps {
  children: ReactNode;
}

export function ClinicaProvider({ children }: ClinicaProviderProps) {
  const [clinicas, setClinicas] = useState<IClinica[]>([]);

  useEffect(() => {
    api
      .get("/clinicas")
      .then((response) => setClinicas(response.data.clinicas));
  }, []);

  return (
    <ClinicasContext.Provider value={{ clinicas }}>
      {children}
    </ClinicasContext.Provider>
  );
}

export function useClinicas() {
  const context = useContext(ClinicasContext);

  return context;
}
