import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface IProps {
  uf: string;
  crm: string;
}

const fetchUf = async ({ uf, crm }: IProps) => {
  const { data } = await axios.get(
    `https://www.consultacrm.com.br/api/index.php?tipo=crm&uf=${uf}&q=${crm}&chave=2610609739&destino=json`
  );
  return data;
};
export const UseSeachCRM = ({ uf, crm }: IProps) => {
  const {
    data: CrmData,
    isLoading: CrmDataIsLoading,
    error: CrmDataError
  } = useQuery({
    queryKey: ["UF", uf, crm],
    queryFn: () => fetchUf({ uf, crm }),
    enabled: !!uf && !!crm
    // staleTime: 1000 * 60 * 5,
  });

  return { CrmData, CrmDataIsLoading, CrmDataError };
};
