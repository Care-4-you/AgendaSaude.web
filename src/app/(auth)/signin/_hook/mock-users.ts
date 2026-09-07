import { StaticImageData } from "next/image";

import pacienteImage from "@/assets/paciente.png";
import { IUser } from "@/hooks/auth";

export interface MockUser {
  label: string;
  token: string;
  password: string;
  image: StaticImageData | string;
  user: IUser;
}

export const mockUsers: MockUser[] = [
  {
    label: "Paciente",
    token: "mock-token-paciente",
    password: "123456",
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
      url: pacienteImage.src,
      houseNumber: "23",
      neighborhood: "Harmonia"
    }
  },
  {
    label: "Medico",
    token: "mock-token-medico",
    password: "123456",
    image:
      "https://images.pexels.com/photos/12660379/pexels-photo-12660379.jpeg",
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
      url: "https://images.pexels.com/photos/12660379/pexels-photo-12660379.jpeg",
      medicalRecord: [
        {
          councilsNumber: "123456",
          councils: { value: "crm", label: "CRM" },
          councilsUF: { value: "SP", label: "SP" }
        },
        {
          councilsNumber: "223342",
          councils: { value: "crm", label: "CRM" },
          councilsUF: { value: "RJ", label: "RJ" }
        }
      ],
      specialty: [
        { value: "ortopedia", label: "Ortopedia" },
        { value: "oncologia", label: "Oncologia" }
      ]
    }
  },
  {
    label: "Clinica",
    token: "mock-token-clinica",
    password: "123456",
    image: "https://images.pexels.com/photos/8459996/pexels-photo-8459996.jpeg",
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
      addressComplement: "",
      houseNumber: "23",
      neighborhood: "Harmonia",
      city: "Sao Paulo",
      state: "SP",
      key: "mock-key-clinica",
      url: "https://images.pexels.com/photos/8459996/pexels-photo-8459996.jpeg",
      healthInsurance: [
        { value: "amil", label: "Amil" },
        { value: "assim", label: "Assim" },
        { value: "notreDame", label: "NotreDame" }
      ]
    }
  }
];

export function findMockUserByCredentials(email: string, password: string) {
  const found = mockUsers.find(
    (mock) =>
      mock.user.email.toLowerCase() === email.trim().toLowerCase() &&
      mock.password === password
  );

  if (!found) {
    return null;
  }

  return {
    token: found.token,
    user: found.user
  };
}
