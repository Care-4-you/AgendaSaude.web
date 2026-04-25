export interface IClinica {
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

export type ClinicaFormData = {
  name: string;
  phone: string;
  cellPhone: string;
  whatsapp: string;
  cnpj: string;
  address: string;
  cep: string;
  state: string;
  houseNumber: string;
  city: string;
  neighborhood: string;
  addressComplement: string;
  specialty: {
    value: string;
    label: string;
  };
  healthInsurance: {
    value: string;
    label: string;
  };
  email: string;
  password: string;
  passwordConfirmation: string;
  acceptTerm: boolean;
  isWhatsapp: boolean;
  hasNumber: boolean;
};

export type FormLogin = {
  username: string;
  password: string;
};

export type ResetPassowrdEmail = {
  username: string;
};
export type ResetPassowrdTokenEmail = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type ChangeEmailandPassword = {
  email: string;
  password: string;
}

export type SearchDoctorProps = {
  state: {
    value: string;
    label: string;
  };
  councilsNumber: string;
};
