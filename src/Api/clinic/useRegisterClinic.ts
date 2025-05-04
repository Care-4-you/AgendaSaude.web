import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "../../config/api";
import { ClinicaFormData } from "../../shared/interfaces/IClinica";

type ClinicResponse = {
  message: string;
  data: ClinicData;
};

type ClinicData = {
  id: number;
  name: string;
  phone: string;
  cellPhone: string;
  whatsapp: string;
  hasNumber: boolean;
  houseNumber: string;
  acceptTerm: boolean;
  email: string;
  cnpj: string;
  isAuthenticated: boolean;
  address: string;
  cep: string;
  city: string;
  state: string;
  neighborhood: string;
  complement: string | null;
  createdAt: string;
};

const endPoint = async (data: ClinicaFormData): Promise<ClinicResponse> => {
  const res = await api.post("/clinics", data);
  return res.data.data;
};

export const UseRegisterClinic = () => {
  const { mutate, isPending, status, data } = useMutation({
    mutationFn: endPoint,
    onSuccess: async () => {
      console.log(data);
    },
    onError: async (erro: AxiosError) => {
      if (erro.response) {
        alert("Clinica, email ou CNPJ ja estao cadastrado no sistema");
      } else {
        console.log("Erro desconhecido:", erro.message);
      }
    }
  });

  return { mutate, isPending, status, data };
};
