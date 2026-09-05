import { StaticImageData } from "next/image";

import clinicaImage from "@/assets/clinica.png";
import medicoImage from "@/assets/medico.png";
import pacienteImage from "@/assets/paciente.png";
import { IUser } from "@/hooks/auth";

export interface MockUser {
  label: string;
  token: string;
  image: StaticImageData;
  user: IUser;
}

export const mockUsers: MockUser[] = [
  {
    label: "Paciente",
    token: "mock-token-paciente",
    image: pacienteImage,
    user: {
      id: 1,
      name: "Maria Silva",
      email: "paciente@agendasaude.com",
      role: "paciente",
      gender: "female",
      birthdate: "1992-04-18",
      document: "123.456.789-00",
      phone: "(11) 3333-1001",
      cellphone: "(11) 99999-1001",
      zipcode: "01310-100",
      address: "Av. Paulista, 1000",
      city: "Sao Paulo",
      state: "SP",
      key: "mock-key-paciente",
      url: pacienteImage.src
    }
  },
  {
    label: "Medico",
    token: "mock-token-medico",
    image: medicoImage,
    user: {
      id: 2,
      name: "Dr. Carlos Mendes",
      email: "medico@agendasaude.com",
      role: "medico",
      gender: "male",
      birthdate: "1980-09-27",
      document: "987.654.321-00",
      phone: "(11) 3333-2002",
      cellphone: "(11) 99999-2002",
      zipcode: "04538-133",
      address: "Rua Funchal, 500",
      city: "Sao Paulo",
      state: "SP",
      key: "mock-key-medico",
      url: medicoImage.src
    }
  },
  {
    label: "Clinica",
    token: "mock-token-clinica",
    image: clinicaImage,
    user: {
      id: 3,
      name: "Clinica Vida Saudavel",
      email: "clinica@agendasaude.com",
      role: "USER",
      gender: null,
      birthdate: "2010-01-10",
      document: "12.345.678/0001-90",
      phone: "(11) 3333-3003",
      cellphone: "(11) 99999-3003",
      zipcode: "05425-070",
      address: "Rua Harmonia, 250",
      city: "Sao Paulo",
      state: "SP",
      key: "mock-key-clinica",
      url: clinicaImage.src
    }
  }
];
