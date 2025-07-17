import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface IProps {
  councilsUF: string;
  councilsNumber: string;
}
type MedicoStatus = {
  exists: boolean;
  message: string;
  number: string;
  name: string;
  state: string;
};
const fetchUf = async ({
  councilsUF,
  councilsNumber
}: IProps): Promise<MedicoStatus> => {
  const { data } = await axios.get(
    `http://localhost:8080/medics?number=${councilsNumber}&state=${councilsUF}`
  );
  return data;
};

export const UseSeachDoctor = ({ councilsUF, councilsNumber }: IProps) => {
  const {
    data: DoctorData,
    isLoading: DoctorDataIsLoading,
    error: DoctorDataError
  } = useQuery({
    queryKey: ["get-doctor", councilsUF, councilsNumber],
    queryFn: () => fetchUf({ councilsUF, councilsNumber }),
    enabled: !!councilsUF && !!councilsNumber
    // staleTime: 1000 * 60 * 5,
  });

  return { DoctorData, DoctorDataIsLoading, DoctorDataError };
};
