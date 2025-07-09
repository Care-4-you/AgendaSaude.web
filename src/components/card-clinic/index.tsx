import Image from "next/image";
import Button from "../Button";
import { Phone, Pin } from "lucide-react";

interface CardClinicaProps {
  clinica: {
    id: number;
    name: string;
    address: string;
    houseNumber: string;
    neighborhood: string;
    phone: string;
    imagem_url?: string[];
    specialty: { id: number; label: string }[];
    healthInsurance: { id: number; label: string }[];
    avaliacao?: number;
  };
}

export default function CardClinica({ clinica }: CardClinicaProps) {
  return (
    <div className="m-0 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow">
      <Image
        src={
          clinica.imagem_url?.[0] ??
          "https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
        }
        alt="Imagem da clínica"
        width={208}
        height={120}
        className="h-24 w-full rounded-t-xl object-cover"
      />

      <div className="flex flex-col p-2 text-xs">
        <h3 className="text-sm font-bold">{clinica.name}</h3>

        <p className="mt-1 flex items-start text-gray-600">
          <Pin className="mr-1 h-4 w-4" />
          {clinica.address}, nº {clinica.houseNumber}, {clinica.neighborhood}
        </p>

        <p className="mt-1 flex items-center text-gray-600">
          <Phone className="mr-1 h-4 w-4" />
          {clinica.phone}
        </p>

        <div className="mt-2">
          <h4 className="font-semibold">Especialidades:</h4>
          <ul className="ml-4 list-disc">
            {clinica.specialty.map((esp) => (
              <li key={esp.id}>{esp.label}</li>
            ))}
          </ul>
        </div>

        <div className="mt-2">
          <h4 className="font-semibold">Planos aceitos:</h4>
          <ul className="ml-4 list-disc">
            {clinica.healthInsurance.map((plano) => (
              <li key={plano.id}>{plano.label}</li>
            ))}
          </ul>
        </div>

        <Button
          type="button"
          title="Agendar"
          className="mt-2 flex justify-center text-xs"
        >
          Agendar
        </Button>
      </div>
    </div>
  );
}
