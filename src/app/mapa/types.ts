export interface ClinicaAPI {
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
  address: string;
  cep: string;
  city: string;
  state: string;
  neighborhood: string;
  complement: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  specialty: { id: number; value: string; label: string }[];
  healthInsurance: { id: number; value: string; label: string }[];
  imagem_url?: string[];
  avaliacao?: number;
}
