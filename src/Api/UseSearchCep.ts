import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ICep {
  cep: string;
}

interface ICity {
  bairro: string;
  cep: string;
  complemento: string;
  estado: string;
  localidade: string;
  logradouro: string;
}

const fetchAddress = async ({ cep }: ICep): Promise<ICity> => {
  const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  return data;
};

export const UseSearchCep = ({ cep }: ICep) => {
  const {
    data: CepData,
    isLoading: CepDataIsLoading,
    error: CepDataError
  } = useQuery({
    queryKey: ["cep", cep],
    queryFn: () => fetchAddress({ cep })
    // enabled: !!cep,
    // staleTime: 1000 * 60 * 5,
    // retry: 2
  });

  return { CepData, CepDataIsLoading, CepDataError };
};
