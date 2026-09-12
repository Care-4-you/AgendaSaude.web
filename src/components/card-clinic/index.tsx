"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FilterPills } from "@/components/ui/filter-pills";
import { Phone, Pin } from "lucide-react";

import Button from "../calendar-feature/Button";

interface Specialty {
  value: string;
  label: string;
}

interface HealthInsurance {
  id: number;
  label: string;
}

interface CardClinicaProps {
  clinica: {
    id: number;
    name: string;
    address: string;
    houseNumber?: string;
    neighborhood?: string;
    phone?: string;
    imagem_url?: string[];
    healthInsurance?: HealthInsurance[];
    specialty?: Specialty[];
    avaliacao?: number;
  };
  /** Especialidade filtrada no mapa: já vem marcada se a clínica atender. */
  specialty?: string;
}

export default function CardClinica({ clinica, specialty }: CardClinicaProps) {
  const clinicSpecialties = clinica.specialty ?? [];
  const [fetchedSpecialties, setFetchedSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_SERVER_URL;

  /**
   * A clínica já chega com as especialidades; a busca na API é só para quando
   * os dados vierem sem elas.
   */
  useEffect(() => {
    if (clinicSpecialties.length > 0 || !url) return;

    async function fetchEspecialidades() {
      try {
        setLoading(true);
        const res = await fetch(`${url}/clinics/${clinica.id}/specialties`);
        const json = await res.json();
        setFetchedSpecialties(json.data?.specialties || []);
      } catch (err) {
        console.error("Erro ao buscar especialidades:", err);
        setFetchedSpecialties([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEspecialidades();
  }, [clinica.id, clinicSpecialties.length, url]);

  const especialidades =
    clinicSpecialties.length > 0 ? clinicSpecialties : fetchedSpecialties;

  /** O filtro do mapa manda, desde que a clínica atenda a especialidade. */
  const filteredSpecialty = specialty
    ? especialidades.find(
        (esp) => esp.label.toLowerCase() === specialty.toLowerCase()
      )?.label
    : undefined;

  const specialtyToSchedule =
    selectedSpecialty || filteredSpecialty || especialidades[0]?.label || "";

  const healthInsurance = clinica.healthInsurance ?? [];
  const houseNumber = clinica.houseNumber ?? "–";
  const neighborhood = clinica.neighborhood ?? "–";
  const phone = clinica.phone ?? "–";

  const handleSchedule = () => {
    const params = new URLSearchParams({ clinicId: String(clinica.id) });

    if (specialtyToSchedule) {
      params.set("especialidade", specialtyToSchedule);
    }

    router.push(`/agendamento?${params.toString()}`);
  };

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
          {clinica.address}, nº {houseNumber}, {neighborhood}
        </p>

        <p className="mt-1 flex items-center text-gray-600">
          <Phone className="mr-1 h-4 w-4" />
          {phone}
        </p>

        <div className="mt-2">
          <h4 className="font-semibold">Planos aceitos:</h4>
          {healthInsurance.length > 0 ? (
            <ul className="ml-4 list-disc">
              {healthInsurance.map((plano) => (
                <li key={plano.id}>{plano.label}</li>
              ))}
            </ul>
          ) : (
            <p>Não informado</p>
          )}
        </div>

        <div className="mt-2">
          <h4 className="font-semibold">Especialidades:</h4>
          {loading ? (
            <p>Carregando...</p>
          ) : especialidades.length > 0 ? (
            <FilterPills
              size="xs"
              aria-label="Especialidade para agendar"
              options={especialidades.map((esp) => ({
                value: esp.label,
                label: esp.label
              }))}
              value={specialtyToSchedule}
              onChange={setSelectedSpecialty}
              className="mt-1 gap-1"
            />
          ) : (
            <p>Não informado</p>
          )}
        </div>

        <Button
          type="button"
          title={
            specialtyToSchedule
              ? `Agendar ${specialtyToSchedule}`
              : "Agendar consulta"
          }
          onClick={handleSchedule}
          className="mt-2 flex justify-center text-xs"
        >
          Agendar
        </Button>
      </div>
    </div>
  );
}
