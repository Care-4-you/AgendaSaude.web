import Map from "./_components/map";
import db from "../../Api/db.json";
import { ClinicaAPI } from "./types";

// Transform db.json structure to ClinicaAPI format
const transformClinicas = (clinicas: typeof db.clinicas): ClinicaAPI[] => {
  return clinicas.map((clinica, index) => ({
    id: clinica.id,
    name: clinica.nome,
    phone: clinica.contato?.telefone || "",
    cellPhone: clinica.contato?.telefone || "",
    whatsapp: clinica.contato?.telefone || "",
    hasNumber: true,
    houseNumber: clinica.endereco.numero,
    acceptTerm: true,
    email: "",
    cnpj: "",
    address: clinica.endereco.rua,
    cep: clinica.endereco.cep,
    city: clinica.endereco.cidade,
    state: clinica.endereco.uf,
    neighborhood: clinica.endereco.bairro,
    complement: "",
    latitude: clinica.endereco.geo.lat,
    longitude: clinica.endereco.geo.lng,
    createdAt: new Date().toISOString(),
    specialty: clinica.especialidades.map((esp, idx) => ({
      id: idx,
      value: esp.toLowerCase().replace(/\s+/g, "_"),
      label: esp
    })),
    healthInsurance: clinica.convenios_aceitos.map((conv, idx) => ({
      id: idx,
      value: conv.toLowerCase().replace(/\s+/g, "_"),
      label: conv
    })),
    imagem_url: clinica.imagem_url,
    avaliacao: clinica.avaliacao
  }));
};

export default function MapPage() {
  const transformedClinicas = transformClinicas(db.clinicas);

  return (
    <main>
      <Map clinicas={transformedClinicas} />
    </main>
  );
}
