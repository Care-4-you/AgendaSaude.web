import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "../../config/api";
import { DoctorFormData } from "../../shared/interfaces/IDoctor";

type ClinicResponse = {
  message: string;
  data: DoctorFormData;
};

const endPoint = async (data: DoctorFormData): Promise<ClinicResponse> => {
  const res = await api.post("/medics", data);
  return res.data.data;
};

export const UseRegisterDoctor = () => {
  const { mutateAsync, isPending, status, data } = useMutation({
    mutationFn: endPoint,
    onSuccess: async () => {
      console.log(data);
    },
    onError: async (erro: AxiosError) => {
      if (erro.response) {
        alert("Erro cadastrado no sistema");
      } else {
        console.log("Erro desconhecido:", erro.message);
      }
    }
  });

  return { mutateAsync, isPending, status, data };
};
