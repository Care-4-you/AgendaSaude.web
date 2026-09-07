export interface IPaciente {
  id: number;
  nome: string;
  titulo: string;
  imagem_url: string[];
  avaliacao?: number;
  endereco: {
    numero?: string;
    rua?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
}

export type PacienteFormData = {
  name: string;
  cellPhone: string;
  whatsapp: string;
  cpf: string;
  address: string;
  zipcode: string;
  state: string;
  city: string;
  neighborhood: string;
  addressComplement: string;
  date: string;
  gender: {
    value: string;
    label: string;
  };
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerm: boolean;
};
